import { services } from '../data/site.js';
import { serviceIcons } from './icons.jsx';
import useReveal from '../hooks/useReveal.js';
import './Services.css';

export default function Services({ onOpenService }) {
  const [gridRef, gridVisible] = useReveal();

  return (
    <section id="services" className="services section" aria-labelledby="services-title">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">What I offer</p>
          <h2 id="services-title" className="section-head__title">
            Services
          </h2>
        </header>

        <ul ref={gridRef} className={`services__grid reveal${gridVisible ? ' is-visible' : ''}`}>
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <li key={service.id}>
                <button
                  type="button"
                  className="service"
                  onClick={() => onOpenService(service.id)}
                  aria-haspopup="dialog"
                >
                  <span className="service__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="service__title">{service.title}</span>
                  <span className="service__desc">{service.description}</span>
                  <span className="service__more" aria-hidden="true">
                    Learn more
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="services__footer">
          <button
            type="button"
            className="u-link"
            onClick={() => onOpenService(null)}
            aria-haspopup="dialog"
          >
            Read More
          </button>
        </p>
      </div>
    </section>
  );
}
