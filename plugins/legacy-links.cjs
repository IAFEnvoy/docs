const fs = require('node:fs/promises');
const path = require('node:path');
const {isLegacyDocs, languageChoiceHtml} = require('../src/utils/legacy-docs.cjs');

module.exports = function legacyLinks({i18n: {currentLocale}}) {
  let oldPaths = [];
  return {
    name: 'legacy-doc-links',
    allContentLoaded({allContent}) {
      if (currentLocale !== 'en') return;
      oldPaths = allContent['docusaurus-plugin-content-docs'].default.loadedVersions
        .flatMap(version => version.docs.map(doc => doc.permalink.replace(/^\/en/, '')));
    },
    configureWebpack() {
      if (currentLocale !== 'en') return {};
      return {
        devServer: {
          setupMiddlewares(middlewares) {
            middlewares.unshift({
              name: 'legacy-doc-language-choice',
              middleware(request, response, next) {
                const url = new URL(request.url, 'http://localhost');
                if (!['GET', 'HEAD'].includes(request.method) || (url.pathname !== '/' && !isLegacyDocs(url.pathname))) return next();
                response.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
                response.end(request.method === 'HEAD' ? '' : languageChoiceHtml(url.href));
              },
            });
            return middlewares;
          },
        },
      };
    },
    async postBuild({outDir}) {
      if (currentLocale !== 'en') return;
      const root = path.dirname(outDir);
      // The language sites live in build/en and build/zh. Old /docs links only choose a prefix.
      for (const pathname of new Set(['/', '/docs/', ...oldPaths])) {
        const file = path.join(root, pathname, 'index.html');
        await fs.mkdir(path.dirname(file), {recursive: true});
        await fs.writeFile(file, languageChoiceHtml(pathname));
      }
      // Static hosts can use this for arbitrary old /docs/* links, including removed pages.
      await fs.writeFile(path.join(root, '404.html'), languageChoiceHtml('/', true));
    },
  };
};
