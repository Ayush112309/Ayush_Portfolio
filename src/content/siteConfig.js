/**
 * Site-wide settings. Edit this file to change SEO, theme accent,
 * navigation, resumes and the contact form backend.
 */
export const siteConfig = {
  /** TODO: replace with your deployed URL (used for canonical, Open Graph and sitemap). */
  siteUrl: 'https://ayushjhori.vercel.app/',
  seo: {
    title: 'Ayush Jhori — AI, backend and real-time systems engineer',
    description:
      'Portfolio of Ayush Jhori, IIT Hyderabad. Building intelligent systems across AI agents, backend infrastructure, real-time telemetry and industrial IoT.',
    keywords: [
      'Ayush Jhori',
      'IIT Hyderabad',
      'AI engineer',
      'backend engineer',
      'agentic AI',
      'RAG',
      'digital twin',
      'MQTT',
      'FastAPI',
      'portfolio',
    ],
    author: 'Ayush Jhori Prakash Satish',
    /** 1200×630 image in /public. */
    ogImage: '/og-image.png',
  },
  /** Accent colours. Any hex value works; the whole UI follows. */
  theme: {
    accentDark: '#A3E635',
    accentLight: '#5B7C35',
    /** 'dark' | 'light' | 'system' — used only on a visitor's first visit. */
    defaultTheme: 'system',
  },
  /** Navigation entries map to section ids. Reorder or remove freely. */
  nav: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ],
  /**
   * Resume PDFs live in /public/resume. Replace a file with the same name to update it,
   * or add/remove entries here. The entry with `primary: true` powers the hero button.
   */
  resumes: [
    { label: 'Software engineering', file: '/resume/Ayush_Jhori_Resume_Software.pdf', primary: true },
    { label: 'AI / ML', file: '/resume/Ayush_Jhori_Resume_AI_ML.pdf' },
    { label: 'Chemical & process', file: '/resume/Ayush_Jhori_Resume_Chemical.pdf' },
    { label: 'Product & operations', file: '/resume/Ayush_Jhori_Resume_Product.pdf' },
  ],
  /**
   * Contact form backend.
   * - Leave `endpoint` empty: the form validates and then opens the visitor's email app
   *   with the message prefilled (nothing is sent by the site itself).
   * - Set `endpoint` to a Formspree-style URL (e.g. https://formspree.io/f/xxxxxxx) or your own
   *   API that accepts JSON { name, email, message } via POST to send messages directly.
   */
  contactForm: {
    endpoint: '',
  },
  /** Show a phone number in the contact section. Off by default for privacy. */
  showPhone: false,
};
