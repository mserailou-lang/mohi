const base = {
  viewBox: '0 0 40 40',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 0.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  focusable: 'false',
  'aria-hidden': 'true',
};

export function StrollerIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M11 21h18l-1.7 6.5a4 4 0 0 1-3.9 3H16.6a4 4 0 0 1-3.9-3Z" />
      <path d="M11 21a9 9 0 0 1 18 0" />
      <path d="M11 21 7.5 13.5" />
      <circle cx="16" cy="34.5" r="2" />
      <circle cx="24.5" cy="34.5" r="2" />
    </svg>
  );
}

export function DropIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 7.5c4.3 5 9 11.2 9 15.4a9 9 0 0 1-18 0c0-4.2 4.7-10.4 9-15.4Z" />
      <path d="M15.6 23.4a4.6 4.6 0 0 0 4.4 4.5" />
    </svg>
  );
}

export function MotherBabyIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="14.5" cy="12.5" r="4.6" />
      <path d="M6.6 33.2c0-7.4 3.5-11.6 7.9-11.6 2.4 0 4.5 1.3 5.9 3.7" />
      <circle cx="26.6" cy="20.6" r="3.6" />
      <path d="M22.4 33.2c0-4.6 1.9-7.4 4.2-7.4s4.2 2.8 4.2 7.4" />
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" strokeWidth={1.2} {...props}>
      <path d="M5.4 3.6h3l1.5 3.8-2 1.4a11.5 11.5 0 0 0 5.3 5.3l1.4-2 3.8 1.5v3a1.9 1.9 0 0 1-2.1 1.9A15.6 15.6 0 0 1 3.5 5.7 1.9 1.9 0 0 1 5.4 3.6Z" />
    </svg>
  );
}

export function MailIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" strokeWidth={1.2} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="1.4" />
      <path d="m3.8 6.7 8.2 6 8.2-6" />
    </svg>
  );
}

export function FacebookIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" strokeWidth={1.2} {...props}>
      <path d="M14.6 8.4V6.9c0-.7.4-1 1-1h1.5V3.4h-2.2c-2.1 0-3.2 1.3-3.2 3.2v1.8H9.4v2.6h2.3V20h3V11h2.2l.4-2.6Z" />
    </svg>
  );
}

export function InstagramIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" strokeWidth={1.2} {...props}>
      <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="4.4" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowIcon({ direction = 'right', ...props }) {
  const isLeft = direction === 'left';
  return (
    <svg {...base} viewBox="0 0 24 24" strokeWidth={1.1} {...props}>
      {isLeft ? <path d="M14 5 7 12l7 7M7 12h11" /> : <path d="m10 5 7 7-7 7M17 12H6" />}
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" strokeWidth={1.1} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export const serviceIcons = {
  stroller: StrollerIcon,
  drop: DropIcon,
  mother: MotherBabyIcon,
};

export const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
};
