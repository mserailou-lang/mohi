# Mother & More

An editorial one-page website for **Nicole Knight, Lactation Consultant** — soft pastels, quiet
whitespace, serif headlines and warm, natural-light photography.

## Stack

- **React 18 + Vite** — single page, no router; sections are anchors.
- **Plain CSS with design tokens** (`src/styles/tokens.css`) — palette, type scale and spacing are
  defined once and used by every component.
- **Small Express API** (`server/`) — receives the contact form and stores messages as JSON.
- **Self-hosted fonts** (`public/fonts`) — Cormorant Garamond for display, Inter for everything else.
  No third-party font or image requests at runtime.

## Running locally

```bash
npm install
npm run dev:api   # API on http://localhost:8000
npm run dev       # site on http://localhost:5173 (proxies /api to the API)
```

`npm run build` produces a static build in `dist/`; `npm start` runs the API on its own.

`API_PROXY_TARGET` overrides the dev-server proxy target (default `http://localhost:8000`).

## Editing content

Everything an editor is likely to change lives in [`src/data/site.js`](src/data/site.js):

- navigation labels and anchors
- phone, email and social links
- the three services (short description, long description, what's included)
- testimonials — **these are placeholder samples**, replace them with real, permission-granted words
  before launch
- journal entries shown by the “Mother & Blog” banner — also placeholder copy

Photography lives in `public/images/` as two sizes per picture (`hero-900/1600`, `about-700/1200`,
`blog-900/1600`). Replace the files with your own photography at the same aspect ratios and update
the `alt` text in the components if the subject changes. The current photographs are from Unsplash
and are placeholders.

## Hero video

The hero is pinned and scrubbed by scroll, not autoplayed: `src/hooks/useScrollScrub.js` maps the
scroll progress of the hero runway onto `video.currentTime`, one frame at a time. The clip lives at
`public/videos/hero-scrub.mp4` and its first frame at `public/images/hero-poster.jpg`.

`hero-scrub.mp4` is the supplied footage re-encoded with **a keyframe on every frame** (`-g 1`), at
the original resolution and frame rate, because the source had a single keyframe for the whole clip
and browsers could not seek it smoothly. If you replace the video, encode it the same way — H.264,
yuv420p, `-g 1 -sc_threshold 0`, `-movflags +faststart`, no audio — and export the poster from the
first frame. A short clip (5–10 s) at 1440–1920 px wide scrubs best; very long or very heavy files
will stutter.

Visitors with `prefers-reduced-motion: reduce` get the poster frame and normal scrolling instead.

## Contact form

`POST /api/contact` validates `name`, `email`, `subject` and `message` (required, length limits,
email format) and appends the message to `$DATA_DIR/contact-messages.json`
(`DATA_DIR` defaults to `./data`, which is git-ignored). The form shows inline field errors, a
network/server error banner, and only reports success once the API has actually stored the message.

There is no email delivery yet — connect a transactional email provider in `server/index.js` if the
practice wants messages in an inbox.

## Accessibility & motion

Skip link, semantic landmarks, labelled form fields, visible focus rings, `aria-live` carousel
announcements, and `prefers-reduced-motion` support that turns the hero into a static frame and removes
scroll reveals and carousel autoplay.
