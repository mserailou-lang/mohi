import './BlogBanner.css';

export default function BlogBanner({ onOpenJournal }) {
  return (
    <section id="blog" className="banner" aria-labelledby="blog-title">
      <img
        className="banner__img"
        src="/images/blog-1600.jpg"
        srcSet="/images/blog-900.jpg 900w, /images/blog-1600.jpg 1600w"
        sizes="100vw"
        width="1600"
        height="1195"
        alt="A mother gently holding her newborn baby against soft white bedding"
        loading="lazy"
        decoding="async"
      />
      <div className="banner__veil" aria-hidden="true" />
      <div className="banner__content">
        <h2 id="blog-title" className="banner__title">
          Mother <span className="banner__amp">&amp;</span> Blog
        </h2>
        <button
          type="button"
          className="u-link banner__cta"
          onClick={onOpenJournal}
          aria-haspopup="dialog"
        >
          Read Blog
        </button>
      </div>
    </section>
  );
}
