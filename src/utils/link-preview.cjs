function previewUrl(href, currentHref, locale, siteUrl) {
  try {
    const current = new URL(currentHref);
    const target = new URL(href, current);
    const siteOrigin = siteUrl ? new URL(siteUrl).origin : current.origin;
    if (!['http:', 'https:'].includes(target.protocol)
      || ![current.origin, siteOrigin].includes(target.origin)
      || target.username || target.password) return null;
    target.protocol = current.protocol;
    target.host = current.host;
    if (target.pathname === '/' || /^\/docs(?:\/|$)/.test(target.pathname)) {
      target.pathname = '/' + locale + target.pathname;
    }
    if (!/^\/(en|zh)(?:\/|$)/.test(target.pathname)
      || /^\/(en|zh)\/language\/?$/.test(target.pathname)
      || /\.(?:png|jpe?g|webp|gif|svg|ico|avif|pdf|zip|7z|gz|jar|json|jsonc|js|mjs|css|map|txt|xml|md|mdx|mp[34]|ogg|wav|webm|woff2?|ttf|otf)$/i.test(target.pathname)
      || target.pathname.replace(/\/$/, '') === current.pathname.replace(/\/$/, '')) return null;
    return target.pathname + target.search + target.hash;
  } catch {
    return null;
  }
}

function isPreviewSource() {
  try {
    return globalThis.frameElement?.hasAttribute('data-docs-preview-source') ?? false;
  } catch {
    return false;
  }
}

module.exports = {previewUrl, isPreviewSource};
