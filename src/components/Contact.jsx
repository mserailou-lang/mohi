import { useState } from 'react';
import { contactDetails } from '../data/site.js';
import { MailIcon, PhoneIcon, socialIcons } from './icons.jsx';
import './Contact.css';

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please tell me your name.';
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.subject.trim().length < 2) errors.subject = 'Please add a short subject.';
  if (values.message.trim().length < 10) errors.message = 'Please write at least a few words.';
  return errors;
}

function Field({ id, label, error, children }) {
  return (
    <p className={`field${error ? ' has-error' : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      {children}
      {error && (
        <span className="field__error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </p>
  );
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [notice, setNotice] = useState('');

  const update = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => (current[name] ? { ...current, [name]: undefined } : current));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus('error');
      setNotice('Please check the highlighted fields and try again.');
      return;
    }

    setStatus('submitting');
    setNotice('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        setStatus('error');
        setNotice(data.message || 'Your message could not be sent. Please try again.');
        return;
      }

      setValues(EMPTY_FORM);
      setErrors({});
      setStatus('success');
      setNotice('Thank you — your message has been received. Nicole will reply within one working day.');
    } catch {
      setStatus('error');
      setNotice('Your message could not be sent. Please check your connection and try again.');
    }
  };

  const isSending = status === 'submitting';

  return (
    <section id="contact" className="contact section" aria-labelledby="contact-title">
      <div className="container contact__inner">
        <header className="contact__head">
          <h2 id="contact-title" className="contact__title">
            Contact Me
          </h2>
          <p className="contact__intro">
            Have a question or would like to learn more about my services? I’d love to hear from
            you.
          </p>
        </header>

        {status === 'success' ? (
          <div className="contact__success" role="status">
            <p className="contact__success-text">{notice}</p>
            <button type="button" className="u-link contact__link" onClick={() => setStatus('idle')}>
              Send another message
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit} noValidate>
            {status === 'error' && notice && (
              <p className="form__notice" role="alert">
                {notice}
              </p>
            )}

            <div className="form__row">
              <Field id="name" label="Name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={update}
                  autoComplete="name"
                  aria-invalid={errors.name ? 'true' : undefined}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  required
                />
              </Field>

              <Field id="email" label="Email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={update}
                  autoComplete="email"
                  aria-invalid={errors.email ? 'true' : undefined}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  required
                />
              </Field>
            </div>

            <Field id="subject" label="Subject" error={errors.subject}>
              <input
                id="subject"
                name="subject"
                type="text"
                value={values.subject}
                onChange={update}
                aria-invalid={errors.subject ? 'true' : undefined}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                required
              />
            </Field>

            <Field id="message" label="Message" error={errors.message}>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={values.message}
                onChange={update}
                aria-invalid={errors.message ? 'true' : undefined}
                aria-describedby={errors.message ? 'message-error' : undefined}
                required
              />
            </Field>

            <p className="form__submit">
              <button type="submit" className="u-link contact__link" disabled={isSending}>
                {isSending ? 'Sending…' : 'Send'}
              </button>
            </p>
          </form>
        )}

        <ul className="contact__details">
          <li>
            <a className="contact__detail" href={contactDetails.phoneHref}>
              <PhoneIcon aria-hidden="true" />
              <span>{contactDetails.phoneLabel}</span>
            </a>
          </li>
          <li className="contact__socials">
            {contactDetails.socials.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <a
                  key={social.label}
                  className="contact__social"
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Follow Mother & More on ${social.label}`}
                >
                  <Icon aria-hidden="true" />
                </a>
              );
            })}
          </li>
          <li>
            <a className="contact__detail" href={`mailto:${contactDetails.email}`}>
              <MailIcon aria-hidden="true" />
              <span>{contactDetails.email}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
