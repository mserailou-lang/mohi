import { brand } from '../data/site.js';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <picture>
          <source media="(max-width: 700px)" srcSet="/images/hero-900.jpg" />
          <img
            src="/images/hero-1600.jpg"
            srcSet="/images/hero-900.jpg 900w, /images/hero-1600.jpg 1600w"
            sizes="100vw"
            width="1600"
            height="1067"
            alt="A mother cradling her newborn baby in the soft light of a quiet bedroom"
            decoding="async"
          />
        </picture>
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
    </section>
  );
}
