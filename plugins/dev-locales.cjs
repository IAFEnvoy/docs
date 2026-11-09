module.exports = function devLocales() {
  const locale = process.env.DOCUSAURUS_DEV_LOCALE;
  return {
    name: 'dev-locales',
    configureWebpack(_config, isServer) {
      if (!locale || isServer) return {};
      const socketPath = `/__docs_hmr/${locale}`;
      return {
        devServer: {
          client: {webSocketURL: {pathname: socketPath}},
          webSocketServer: {type: 'ws', options: {path: socketPath}},
        },
      };
    },
  };
};
