const path = require('node:path');
const {createRequire} = require('node:module');

const presetRequire = createRequire(require.resolve('@docusaurus/preset-classic'));
const docs = presetRequire('@docusaurus/plugin-content-docs');

function contentPath(context, options) {
  if (context.i18n.currentLocale === context.i18n.defaultLocale) return options.path;
  // sync-i18n already merges fallback documents and translations, including locale-only pages.
  return path.join(context.localizationDir, 'docusaurus-plugin-content-docs', 'current');
}

module.exports = function localizedDocs(context, options) {
  return docs.default(context, {...options, path: contentPath(context, options)});
};
module.exports.validateOptions = docs.validateOptions;
module.exports.contentPath = contentPath;
