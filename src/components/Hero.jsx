import { useRef } from 'react';
import { brand } from '../data/site.js';
import useReducedMotion from '../hooks/useReducedMotion.js';
import useScrollScrub from '../hooks/useScrollScrub.js';
import './Hero.css';

const POSTER = '/images/hero-poster.jpg';
// Re-encoded from the supplied clip with a keyframe on every frame, which is
// what makes frame-accurate seeking possible. Same resolution, frame rate and
// visual quality as the original.
const VIDEO = '/videos/hero-scrub.mp4';

export default function Hero() {
  const wrapperRef = useRef(null);
  const pinRef = useRef(null);
  const videoRef = useRef(null);

  const reducedMotion = useReducedMotion();
  const status = useScrollScrub({
    wrapperRef,
    pinRef,
    videoRef,
    enabled: !reducedMotion,
  });

  const isStatic = reducedMotion || status === 'failed';

  return (
    <section
      id="home"
      ref={wrapperRef}
      className={`hero${isStatic ? ' is-static' : ''}`}
      aria-labelledby="hero-title"
    >
      <div className="hero__pin" ref={pinRef}>
        <div className="hero__media" aria-hidden="true">
          {isStatic ? (
            <img className="hero__poster" src={POSTER} width="752" height="416" alt="" />
          ) : (
            <video
              ref={videoRef}
              className="hero__video"
              src={VIDEO}
              poster={POSTER}
              preload="auto"
              muted
              playsInline
              disablePictureInPicture
              tabIndex={-1}
              aria-hidden="true"
            />
          )}
        </div>

        <div className="hero__scrim" aria-hidden="true" />

        <div className="hero__content container">
          <h1 id="hero-title" className="hero__title">
            Mother <span className="hero__amp">&amp;</span> More
          </h1>
          <p className="hero__subtitle">
            {brand.consultant}, {brand.role}
          </p>
          <a className="u-link hero__cta" href="#services">
            My Services
          </a>
        </div>
      </div>
    </section>
  );
}
