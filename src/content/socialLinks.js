import { personal } from './personal';

/** Leave any `href` empty to hide that link across the site. */
export const socialLinks = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/Ayush112309', handle: 'Ayush112309' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ayushjhori/', handle: 'in/ayushjhori' },
  { id: 'email', label: 'Email', href: `mailto:${personal.email}`, handle: personal.email },
];

export const activeLinks = socialLinks.filter((l) => l.href.trim() !== '');
