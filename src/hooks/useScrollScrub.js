import { useEffect, useRef, useState } from 'react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// How far the last frame is left from the very end of the file, so the final
// frame is fully presented instead of landing on an empty tail.
const END_PADDING = 0.04;

// A seek that never reports back (a dropped `seeked` event) would freeze the
// scrub, so it is released after this long.
const SEEK_TIMEOUT = 350;

/**
 * Drives a paused <video> from the scroll position of `wrapperRef`.
 *
 * The video never plays: every animation frame the wrapper's scroll progress is
 * mapped onto `video.currentTime`, so the frame follows the scroll exactly.
 * Only one seek is in flight at a time — positions that arrive meanwhile are
 * coalesced into the latest one, which keeps fast scrolling cheap and still
 * settles on the right frame when the scroll stops.
 */
export default function useScrollScrub({ wrapperRef, pinRef, videoRef, enabled = true }) {
  const [status, setStatus] = useState('loading');
  const seekRef = useRef({ seeking: false, wanted: -1, startedAt: 0 });

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    const pin = pinRef.current;
    if (!enabled || !video || !wrapper || !pin) return undefined;

    const state = seekRef.current;
    let rafId = 0;
    let startY = 0;
    let distance = 1;
    let duration = 0;

    const measure = () => {
      startY = wrapper.getBoundingClientRect().top + window.scrollY;
      distance = Math.max(1, wrapper.offsetHeight - pin.offsetHeight);
    };

    const seekTo = (time) => {
      if (Math.abs(video.currentTime - time) < 0.02) return;
      state.seeking = true;
      state.startedAt = performance.now();
      video.currentTime = time;
    };

    const render = () => {
      rafId = 0;
      if (!duration) return;

      const progress = clamp((window.scrollY - startY) / distance, 0, 1);
      pin.style.setProperty('--hero-progress', progress.toFixed(4));

      const time = progress * duration;
      if (state.seeking && performance.now() - state.startedAt < SEEK_TIMEOUT) {
        state.wanted = time;
        return;
      }
      state.seeking = false;
      seekTo(time);
    };

    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(render);
    };

    const onSeeked = () => {
      state.seeking = false;
      if (state.wanted < 0) return;
      const time = state.wanted;
      state.wanted = -1;
      seekTo(time);
    };

    const onMetadata = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      duration = Math.max(0, video.duration - END_PADDING);
      measure();
      schedule();
    };

    const onData = () => {
      measure();
      schedule();
      setStatus('ready');
    };

    const onError = () => setStatus('failed');

    // Muted is what lets browsers seek the clip programmatically; it must never
    // play on its own.
    video.muted = true;
    video.pause();

    if (video.readyState >= 1) onMetadata();
    if (video.readyState >= 2) onData();

    video.addEventListener('loadedmetadata', onMetadata);
    video.addEventListener('loadeddata', onData);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('error', onError);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);

    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      video.removeEventListener('loadedmetadata', onMetadata);
      video.removeEventListener('loadeddata', onData);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('error', onError);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
    };
  }, [enabled, wrapperRef, pinRef, videoRef]);

  return status;
}
