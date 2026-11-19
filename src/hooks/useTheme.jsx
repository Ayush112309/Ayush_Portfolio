import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { siteConfig } from '@/content';
import { hexToChannels } from '@/utils/color';

const KEY = 'aj-theme';

const ThemeContext = createContext({ theme: 'dark', toggle: () => {} });

function initialTheme() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    /* storage unavailable */
  }
  const d = siteConfig.theme.defaultTheme;
  if (d === 'dark' || d === 'light') return d;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    // Accent comes from siteConfig so it can be changed in one place.
    const ch = hexToChannels(theme === 'dark' ? siteConfig.theme.accentDark : siteConfig.theme.accentLight);
    if (ch) root.style.setProperty('--accent', ch);
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);
  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
