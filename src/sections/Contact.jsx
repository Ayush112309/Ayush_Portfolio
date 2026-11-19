import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Download, Loader2, Mail } from 'lucide-react';
import { activeLinks, personal, siteConfig } from '@/content';
import { resumes } from '@/utils/resume';
import { validateContact } from '@/utils/validation';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { Reveal } from '@/components/ui/Reveal';

const endpoint = siteConfig.contactForm.endpoint.trim();

const hasBackend = endpoint !== '';

const actionLabel = hasBackend ? 'Send message' : 'Open in email app';

function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const refs = {
    name: useRef(null),
    email: useRef(null),
    message: useRef(null),
  };
  const set = (k) => (e) => {
    const v = { ...values, [k]: e.target.value };
    setValues(v);
    if (errors[k]) setErrors(validateContact(v));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validateContact(values);
    setErrors(errs);
    const first = ['name', 'email', 'message'].find((k) => errs[k]);
    if (first) {
      refs[first].current?.focus();
      return;
    }
    if (!hasBackend) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${values.name.trim()}`);
      const body = encodeURIComponent(`${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`);
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
      setStatus('handoff');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      setValues({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };
  const field = (k, label, el) => (
    <div>
      <label htmlFor={`cf-${k}`} className="mb-2 block text-sm text-muted">
        {label}
      </label>
      {el}
      <AnimatePresence>
        {errors[k] && (
          <motion.p
            id={`cf-${k}-err`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-sm text-red-600 dark:text-red-400"
          >
            {errors[k]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="space-y-5 rounded-3xl border bg-surface/60 p-6 sm:p-8"
      aria-describedby="cf-note"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {field(
          'name',
          'Name',
          <input
            ref={refs.name}
            id="cf-name"
            name="name"
            autoComplete="name"
            className="field"
            value={values.name}
            onChange={set('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'cf-name-err' : undefined}
          />,
        )}
        {field(
          'email',
          'Email',
          <input
            ref={refs.email}
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className="field"
            value={values.email}
            onChange={set('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'cf-email-err' : undefined}
          />,
        )}
      </div>
      {field(
        'message',
        'Message',
        <textarea
          ref={refs.message}
          id="cf-message"
          name="message"
          rows={5}
          className="field resize-y"
          placeholder="What are you working on?"
          value={values.message}
          onChange={set('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'cf-message-err' : undefined}
        />,
      )}

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p id="cf-note" className="max-w-[36ch] text-[0.8125rem] leading-snug text-muted">
          {hasBackend
            ? 'Your message goes straight to my inbox.'
            : 'This form isn’t connected to a server yet, so it opens your email app with your message filled in.'}
        </p>
        <button type="submit" className="btn btn-primary shrink-0" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Mail className="h-4 w-4" aria-hidden="true" />
          )}
          {status === 'sending' ? 'Sending…' : actionLabel}
        </button>
      </div>

      <div aria-live="polite" className="min-h-0">
        {status === 'sent' && (
          <p className="flex items-center gap-2 text-sm text-ink">
            <Check className="h-4 w-4 text-accent" aria-hidden="true" /> Message sent. I’ll reply by email.
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-600 dark:text-red-400">
            The message couldn’t be sent. Try again, or email{' '}
            <a className="underline" href={`mailto:${personal.email}`}>
              {personal.email}
            </a>{' '}
            directly.
          </p>
        )}
        {status === 'handoff' && (
          <p className="text-sm text-muted">
            Your email app should now be open with the message ready to send. If nothing opened, email{' '}
            <a className="text-ink underline" href={`mailto:${personal.email}`}>
              {personal.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

export function Contact() {
  const external = activeLinks.filter((l) => l.id !== 'email');
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="page">
        <Reveal className="border-t pt-8">
          <p className="text-sm text-muted">Contact</p>
          <h2 id="contact-title" className="mt-8 text-[clamp(2.4rem,6.4vw,5.2rem)] leading-[1] tracking-[-0.04em]">
            <span className="block">Have an interesting problem?</span>
            <span className="block text-muted">Let’s build something meaningful.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <a
              href={`mailto:${personal.email}`}
              className="link-underline break-all font-display text-[clamp(1.25rem,2.4vw,1.75rem)] tracking-tight text-ink"
            >
              {personal.email}
            </a>
            <div className="mt-5 flex flex-wrap gap-2">
              <CopyEmail email={personal.email} />
              <a href={`mailto:${personal.email}`} className="btn btn-ghost h-10 px-4 text-sm">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Write an email
              </a>
            </div>
            {siteConfig.showPhone && personal.phone && (
              <p className="mt-4 text-muted">
                <a href={`tel:${personal.phone.replace(/\s/g, '')}`} className="link-underline">
                  {personal.phone}
                </a>
              </p>
            )}

            {external.length > 0 && (
              <ul className="mt-12 border-t">
                {external.map((l) => (
                  <li key={l.id} className="border-b">
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between py-4 text-ink"
                    >
                      <span className="flex items-center gap-3">
                        <SocialIcon id={l.id} />
                        {l.label}
                        <span className="text-sm text-muted">{l.handle}</span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {resumes.length > 0 && (
              <div className="mt-12">
                <h3 className="font-sans text-sm font-normal text-muted">Resume, by focus</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {resumes.map((r) => (
                    <li key={r.file}>
                      <a href={r.file} download className="btn btn-outline h-10 px-4 text-sm">
                        <Download className="h-4 w-4" aria-hidden="true" />
                        {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
