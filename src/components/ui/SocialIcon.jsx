import { Mail, Globe, AtSign } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './Icons';

export function SocialIcon({ id, className = 'h-[18px] w-[18px]' }) {
  switch (id) {
    case 'github':
      return <GitHubIcon className={className} />;
    case 'linkedin':
      return <LinkedInIcon className={className} />;
    case 'email':
      return <Mail className={className} aria-hidden="true" />;
    case 'x':
      return <AtSign className={className} aria-hidden="true" />;
    default:
      return <Globe className={className} aria-hidden="true" />;
  }
}
