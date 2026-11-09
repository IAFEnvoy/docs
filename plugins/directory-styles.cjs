module.exports = function directoryStyles() {
  // Docusaurus normally merges even dynamically imported CSS into one global file.
  // Give directory styles their own higher-priority extraction group.
  const directoryCss = /[/\\]src[/\\]theme[/\\]DocItem[/\\]styles[/\\]([^/\\]+)\.css/;
  return {
    name: 'directory-styles',
    configureWebpack(_config, isServer) {
      if (isServer) return {};
      return {
        optimization: {
          splitChunks: {
            cacheGroups: {
              docDirectoryStyles: {
                test: module => directoryCss.test(module.identifier()),
                name: module => `docs-${module.identifier().match(directoryCss)[1]}`,
                type: 'css/mini-extract',
                chunks: 'async',
                enforce: true,
                priority: 60,
              },
            },
          },
        },
      };
    },
  };
};
