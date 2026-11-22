import useReveal from '../hooks/useReveal.js';
import './About.css';

export default function About() {
  const [textRef, textVisible] = useReveal();
  const [figureRef, figureVisible] = useReveal();

  return (
    <section id="about" className="about section" aria-labelledby="about-title">
      <div className="container about__grid">
        <div ref={textRef} className={`about__copy reveal${textVisible ? ' is-visible' : ''}`}>
          <h2 id="about-title" className="about__title">
            About Me
          </h2>
          <p className="about__lead">Every motherhood journey is unique.</p>
          <div className="about__body">
            <p className="about__dropcap">
              I’m Nicole Knight, a dedicated lactation consultant passionate about helping mothers
              feel confident, supported, and informed throughout their breastfeeding journey.
            </p>
            <p>
              My approach combines professional knowledge, compassionate care, and personalized
              guidance to make every mother feel understood and supported.
            </p>
          </div>
          <p className="about__signature">Nicole</p>
        </div>

        <figure
          ref={figureRef}
          className={`about__figure reveal${figureVisible ? ' is-visible' : ''}`}
        >
          <img
            src="/images/about-1200.jpg"
            srcSet="/images/about-700.jpg 700w, /images/about-1200.jpg 1200w"
            sizes="(max-width: 860px) 90vw, 42vw"
            width="1200"
            height="1800"
            alt="Nicole sitting on a bright bed, smiling as she holds her baby close"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
