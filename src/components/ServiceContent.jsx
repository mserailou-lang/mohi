import { services } from '../data/site.js';

export default function ServiceContent({ service, onClose }) {
  const list = service ? [service] : services;

  return (
    <>
      <p className="dialog__intro">
        {service
          ? service.summary
          : 'Three ways to work together — each one unhurried, personal, and shaped around your family.'}
      </p>

      {service &&
        service.detail.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}

      {!service && (
        <div className="dialog__services">
          {list.map((item) => (
            <section key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <ul className="dialog__list">
                {item.includes.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {service && (
        <ul className="dialog__list">
          {service.includes.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      )}

      <p className="dialog__cta">
        <a className="u-link" href="#contact" onClick={onClose}>
          Book a consultation
        </a>
      </p>
    </>
  );
}
