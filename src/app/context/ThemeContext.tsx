/**
 * Lightweight theme context for Conv AI.
 *
 * • Persists choice to localStorage ('theme' key).
 * • Supports 'dark' | 'light' | 'system'.
 * • Applies class="dark" or class="light" to <html> on every change.
 * • Listens to OS preference changes when theme === 'system'.
 * • Exposes useTheme() — drop-in compatible with next-themes' hook shape.
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

export type Theme         = 'dark' | 'light' | 'system';
export type ResolvedTheme = 'dark' | 'light';

interface ThemeContextValue {
  /** The stored preference ('dark' | 'light' | 'system'). */
  theme: Theme;
  /** The actual theme that is rendered right now ('dark' | 'light'). */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeCtx = createContext<ThemeContextValue>({
  theme:         'dark',
  resolvedTheme: 'dark',
  setTheme:      () => {},
});

// ── Helpers ────────────────────────────────────────────────────────────────────
function getSystemTheme(): ResolvedTheme {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

function resolve(t: Theme): ResolvedTheme {
  return t === 'system' ? getSystemTheme() : t;
}

function applyToDOM(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.remove('dark', 'light');
  root.classList.add(resolved);
}

function readPersisted(): Theme {
  try {
    const stored = localStorage.getItem('conv-ai-theme') as Theme | null;
    if (stored === 'dark' || stored === 'light' || stored === 'system') return stored;
  } catch { /* SSR / private browsing */ }
  return 'dark';
}

// ── Provider ───────────────────────────────────────────────────────────────────
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readPersisted);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolve(readPersisted()));

  // Apply theme class and update resolved state
  const applyTheme = useCallback((t: Theme) => {
    const resolved = resolve(t);
    setResolvedTheme(resolved);
    applyToDOM(resolved);
  }, []);

  // Public setter — persists + applies
  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try { localStorage.setItem('conv-ai-theme', t); } catch { /* ignore */ }
    applyTheme(t);
  }, [applyTheme]);

  // On mount: apply the stored theme immediately so there's no flash
  useEffect(() => {
    applyTheme(theme);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-resolve when OS preference changes (only matters while theme === 'system')
  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const handler = () => applyTheme('system');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme, applyTheme]);

  return (
    <ThemeCtx.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────────────────
export function useTheme(): ThemeContextValue {
  return useContext(ThemeCtx);
}
