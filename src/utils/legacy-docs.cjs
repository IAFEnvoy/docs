const {LOCALE_STORAGE_KEY, readPreferredLocale} = require('./locale-preference.cjs');

function languageLinks(currentUrl) {
  const url = new URL(currentUrl, 'https://docs.iafenvoy.com');
  const suffix = url.pathname + url.search + url.hash;
  return {en: '/en' + suffix, zh: '/zh' + suffix};
}

function isLegacyDocs(pathname) {
  return pathname === '/docs' || pathname.startsWith('/docs/');
}

function languageChoiceUrl(currentUrl) {
  const url = new URL(currentUrl, 'https://docs.iafenvoy.com');
  if (!isLegacyDocs(url.pathname)) return '/en/language';
  return '/en/language?from=' + encodeURIComponent(url.pathname + url.search + url.hash);
}

function languageEntryUrl(currentUrl) {
  const locale = readPreferredLocale();
  return locale ? languageLinks(currentUrl)[locale] : languageChoiceUrl(currentUrl);
}

function languageChoiceHtml(currentUrl, fallback = false) {
  const target = languageChoiceUrl(currentUrl);
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>选择语言 / Choose a language</title>
<script>const LOCALE_STORAGE_KEY=${JSON.stringify(LOCALE_STORAGE_KEY)};const readPreferredLocale=${readPreferredLocale.toString()};const isLegacyDocs=${isLegacyDocs.toString()};const languageLinks=${languageLinks.toString()};const languageChoiceUrl=${languageChoiceUrl.toString()};${fallback ? 'if(isLegacyDocs(location.pathname))' : ''}location.replace((${languageEntryUrl.toString()})(location.href));</script></head>
<body><main><h1>${fallback ? '404' : '选择语言 / Choose a language'}</h1><a href="${escape(target)}">选择语言 / Choose a language</a></main></body></html>\n`;
}

module.exports = {languageLinks, isLegacyDocs, languageChoiceUrl, languageEntryUrl, languageChoiceHtml};
