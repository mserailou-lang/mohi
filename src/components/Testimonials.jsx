import { useCallback, useEffect, useState } from 'react';
import { testimonials } from '../data/site.js';
import { ArrowIcon } from './icons.jsx';
import './Testimonials.css';

const AUTOPLAY_MS = 7000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const goTo = useCallback((next) => {
    setInteracted(true);
    setIndex(((next % testimonials.length) + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused || interacted || reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, interacted, reduceMotion]);

  const active = testimonials[index];

  return (
    <section id="testimonials" className="testimonials section" aria-labelledby="testimonials-title">
      <div className="container">
        <header className="section-head testimonials__head">
          <p className="eyebrow">Kind words</p>
          <h2 id="testimonials-title" className="section-head__title">
            Testimonials
          </h2>
        </header>

        <div
          className="carousel"
          role="group"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="carousel__viewport">
            {testimonials.map((item, itemIndex) => (
              <blockquote
                key={`${item.author}-${itemIndex}`}
                className={`quote${itemIndex === index ? ' is-active' : ''}`}
                aria-hidden={itemIndex !== index ? 'true' : undefined}
              >
                <p className="quote__text">“{item.quote}”</p>
                <footer className="quote__meta">
                  <cite className="quote__author">{item.author}</cite>
                  {item.context && <span className="quote__context">{item.context}</span>}
                </footer>
              </blockquote>
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            {active.quote} — {active.author}
          </p>

          <div className="carousel__controls">
            <button
              type="button"
              className="carousel__arrow"
              onClick={() => goTo(index - 1)}
              aria-label="Previous testimonial"
            >
              <ArrowIcon direction="left" />
            </button>

            <div className="carousel__dots">
              {testimonials.map((item, itemIndex) => (
                <button
                  key={`dot-${itemIndex}`}
                  type="button"
                  className={`dot${itemIndex === index ? ' is-active' : ''}`}
                  onClick={() => goTo(itemIndex)}
                  aria-label={`Show testimonial ${itemIndex + 1} of ${testimonials.length}`}
                  aria-current={itemIndex === index ? 'true' : undefined}
                />
              ))}
            </div>

            <button
              type="button"
              className="carousel__arrow"
              onClick={() => goTo(index + 1)}
              aria-label="Next testimonial"
            >
              <ArrowIcon />
            </button>
          </div>

          <p className="testimonials__note">Sample testimonials — replace with your own client words.</p>
        </div>
      </div>
    </section>
  );
}
