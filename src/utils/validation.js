const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Enter your name (at least 2 characters).';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email address, like name@example.com.';
  if (v.message.trim().length < 10) e.message = 'Write a message of at least 10 characters.';
  else if (v.message.length > 3000) e.message = 'Keep the message under 3,000 characters.';
  return e;
}
