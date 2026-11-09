import assert from 'node:assert/strict';
import http from 'node:http';
import {test} from 'node:test';
import {createLocaleProxy} from './locale-proxy.mjs';

async function listen(server) {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return server.address().port;
}

test('one public origin routes pages, assets, query strings, and request bodies to the right locale', async t => {
  const servers = [];
  t.after(() => { for (const server of servers) { server.closeAllConnections(); server.close(); } });
  const ports = {};
  for (const locale of ['en', 'zh']) {
    const server = http.createServer(async (request, response) => {
      const chunks = [];
      for await (const chunk of request) chunks.push(chunk);
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify({locale, url: request.url, method: request.method, body: Buffer.concat(chunks).toString()}));
    });
    servers.push(server);
    ports[locale] = await listen(server);
  }
  const proxy = createLocaleProxy(ports);
  servers.push(proxy);
  const origin = `http://127.0.0.1:${await listen(proxy)}`;
  for (const [url, locale] of [['/', 'en'], ['/docs/example', 'en'], ['/en/docs/example', 'en'], ['/zh/', 'zh'], ['/zh/main.js?t=123', 'zh'], ['/zhang', 'en']]) {
    const result = await (await fetch(origin + url)).json();
    assert.equal(result.locale, locale);
    assert.equal(result.url, url);
  }
  const result = await (await fetch(origin + '/zh/update?x=1', {method: 'POST', body: '中文 update'})).json();
  assert.deepEqual(result, {locale: 'zh', url: '/zh/update?x=1', method: 'POST', body: '中文 update'});
  const redirect = await fetch(origin + '/zh', {redirect: 'manual'});
  assert.equal(redirect.headers.get('location'), '/zh/');
  const enRedirect = await fetch(origin + '/en?ref=wiki', {redirect: 'manual'});
  assert.equal(enRedirect.headers.get('location'), '/en/?ref=wiki');
});

test('English and Chinese hot reload upgrades reach separate backends', async t => {
  const servers = [];
  const sockets = [];
  t.after(() => { for (const socket of sockets) socket.destroy(); for (const server of servers) server.close(); });
  const ports = {};
  for (const locale of ['en', 'zh']) {
    const server = http.createServer();
    server.on('upgrade', (request, socket) => {
      sockets.push(socket);
      socket.write(`HTTP/1.1 101 Switching Protocols\r\nConnection: Upgrade\r\nUpgrade: test\r\nX-Locale: ${locale}\r\n\r\n`);
    });
    servers.push(server);
    ports[locale] = await listen(server);
  }
  const proxy = createLocaleProxy(ports);
  servers.push(proxy);
  const port = await listen(proxy);
  for (const locale of ['en', 'zh']) {
    const responseLocale = await new Promise((resolve, reject) => {
      const request = http.get({hostname: '127.0.0.1', port, path: `/__docs_hmr/${locale}`, headers: {Connection: 'Upgrade', Upgrade: 'test'}});
      request.on('upgrade', (response, socket) => { sockets.push(socket); resolve(response.headers['x-locale']); });
      request.on('error', reject);
    });
    assert.equal(responseLocale, locale);
  }
});
