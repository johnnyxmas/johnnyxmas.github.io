// Shared dark-mode toggle logic for both Vite entries (main site + media
// coverage). Keep in sync with the pre-paint inline script duplicated in
// each entry's index.html — that copy has to stay inline to run before
// first paint, so it can't import this module.

export const THEME_KEY = 'theme-preference';
export const THEME_CYCLE = ['system', 'light', 'dark'];

export function readStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'system';
  } catch (e) {
    return 'system';
  }
}

export function applyTheme(preference) {
  const root = document.documentElement;
  if (preference === 'system') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', preference);
  }
}

export function storeTheme(preference) {
  try {
    localStorage.setItem(THEME_KEY, preference);
  } catch (e) { /* private browsing, etc. */ }
}

export function nextTheme(current) {
  return THEME_CYCLE[(THEME_CYCLE.indexOf(current) + 1) % THEME_CYCLE.length];
}

export function themeIconFor(preference) {
  if (preference === 'dark') return 'fa-solid fa-moon';
  if (preference === 'light') return 'fa-solid fa-sun';
  return 'fa-solid fa-circle-half-stroke';
}

export function themeLabelFor(preference, systemPrefersDark) {
  return preference === 'system'
    ? `Theme: matching system (currently ${systemPrefersDark ? 'dark' : 'light'})`
    : `Theme: ${preference}`;
}
