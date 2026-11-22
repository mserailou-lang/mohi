import { useEffect, useState } from 'react';
import { brand, navLinks } from '../data/site.js';
import './Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="site-header__inner">
        <a
          className="brand"
          href="#home"
          onClick={() => setOpen(false)}
          aria-label={`${brand.name} — back to top`}
        >
          <span className="brand__mark" aria-hidden="true">
            &amp;
          </span>
          <span className="brand__name">
            Mother <span aria-hidden="true">&amp;</span> More
          </span>
        </a>

        <nav id="primary-nav" className="nav" aria-label="Primary">
          <ul className="nav__list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  className={`nav__link${active === link.href ? ' is-active' : ''}`}
                  href={link.href}
                  aria-current={active === link.href ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>
      </div>
    </header>
  );
}
