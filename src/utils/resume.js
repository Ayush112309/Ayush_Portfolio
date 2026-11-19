import { siteConfig } from '@/content';

const list = siteConfig.resumes;

export const resumes = list;

export const primaryResume = list.find((r) => r.primary) ?? list[0];
