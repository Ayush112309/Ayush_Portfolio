# Ayush Jhori — Portfolio

React 18 + Vite 5, written in plain JavaScript (JSX). Styling is Tailwind CSS (compiled to CSS by PostCSS at build time) plus custom CSS in `src/styles/index.css`. Animation uses Framer Motion; icons use lucide-react.

## Run it

Requires Node 18 or newer.

```bash
npm install
npm run dev       # local dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Where things live

```
src/
  content/        ← ALL site text and data. Edit these, not the components.
    personal.js     name, email, hero headline, intro, availability, about copy
    siteConfig.js   site URL, SEO, accent colours, nav, resumes, contact-form endpoint
    socialLinks.js  GitHub / LinkedIn / email (empty href = hidden)
    experience.js   internships and jobs (timeline)
    projects.js     featured projects (cards + case studies) and the smaller "More experiments" list
    skills.js       skill categories and skills
    education.js    degree, CGPA, coursework, school results
    leadership.js   leadership stats, roles, principles
    systems.js      "How I think about systems" domains
    schema.js       documentation of every content shape
  sections/       one component per page section
  components/     layout (navbar, footer), UI primitives, SVG visuals, project modal
  hooks/          theme, active section, in-view, copy-to-clipboard
  utils/          helpers (validation, colour, resume)
  styles/index.css  design tokens (colours for dark and light), base styles, buttons, fields
public/
  resume/         the four resume PDFs
  favicon.svg, og-image.png, apple-touch-icon.png
```

## Common edits

- **Add a project:** copy an object in `src/content/projects.js`, give it a unique `slug`, set `featured: true`. Pick a `visual` from `twin | rag | mqtt | pos | audio`. Its `domains` field links it into the systems section automatically.
- **Add repo or demo links:** fill `links.github` / `links.live`. Empty strings are hidden.
- **Update the resume:** replace the PDF in `public/resume/` with the same file name, or edit `resumes` in `siteConfig.js`. The entry with `primary: true` powers the hero button.
- **Change the accent colour:** `theme.accentDark` / `theme.accentLight` in `siteConfig.js`.
- **Change the headline:** `hero.headline` in `personal.js` (each array item is one line).
- **Change colours or fonts globally:** tokens at the top of `src/styles/index.css`; font families in `tailwind.config.js`.

## Before deploying

1. Set `siteUrl` in `src/content/siteConfig.js` to your real domain. It is used for the canonical URL, Open Graph tags and the generated `sitemap.xml` / `robots.txt`.
2. Optional: make the contact form send messages directly. Create a form on a service such as Formspree and paste its endpoint into `contactForm.endpoint`. Until then, the form validates input and opens the visitor's email app with the message filled in, and says so on the page.
3. Optional: show your phone number by setting `showPhone: true`.

## Deploy

Any static host works. Build command `npm run build`, output folder `dist`.

- **Vercel / Netlify:** import the repo; both detect Vite automatically.
- **GitHub Pages:** if the site lives at `username.github.io/repo-name/`, add `base: '/repo-name/'` to `vite.config.js`.
