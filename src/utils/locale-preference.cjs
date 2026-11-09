const LOCALE_STORAGE_KEY = 'docs.preferredLocale';

function readPreferredLocale() {
  try {
    const locale = globalThis.localStorage.getItem(LOCALE_STORAGE_KEY);
    return locale === 'en' || locale === 'zh' ? locale : null;
  } catch {
    return null;
  }
}

function rememberLocale(locale) {
  if (locale !== 'en' && locale !== 'zh') return;
  try {
    globalThis.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Language navigation still works when browser storage is unavailable.
  }
}

function localeFromPath(pathname) {
  // The selector is served by English too, so it must not replace an existing choice.
  if (/^\/(en|zh)\/language\/?$/.test(pathname)) return null;
  return pathname.match(/^\/(en|zh)(?:\/|$)/)?.[1] ?? null;
}

module.exports = {LOCALE_STORAGE_KEY, readPreferredLocale, rememberLocale, localeFromPath};
