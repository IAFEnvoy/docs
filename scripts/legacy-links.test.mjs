import assert from 'node:assert/strict';
import http from 'node:http';
import {mkdtemp, mkdir, readFile, rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import {test} from 'node:test';
import legacyLinks from '../plugins/legacy-links.cjs';
import {languageLinks, languageChoiceUrl, languageChoiceHtml} from '../src/utils/legacy-docs.cjs';

test('language choices only prepend a locale and preserve the full original URL', () => {
  const old = '/docs/mod/ice-and-fire-ce/faq?ref=wiki#questions';
  assert.deepEqual(languageLinks('https://docs.iafenvoy.com' + old), {en: '/en' + old, zh: '/zh' + old});
  assert.deepEqual(languageLinks('/docs/mod/mxt/installation'), {en: '/en/docs/mod/mxt/installation', zh: '/zh/docs/mod/mxt/installation'});
  const html = languageChoiceHtml('/docs/mod/ice-and-fire-ce/faq');
  let target;
  vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1], {URL, location: {href: 'https://docs.iafenvoy.com' + old, replace: value => { target = value; }}});
  const choice = new URL(target, 'https://docs.iafenvoy.com');
  assert.equal(choice.pathname, '/en/language');
  assert.equal(choice.searchParams.get('from'), old);
  assert.deepEqual(languageLinks(choice.searchParams.get('from')), {en: '/en' + old, zh: '/zh' + old});
  assert.equal(languageChoiceUrl('/'), '/en/language');
});

test('static error fallback opens the themed choice only for legacy docs URLs', () => {
  for (const [url, expected] of [
    ['https://docs.iafenvoy.com/docs/removed?x=1#intro', '/docs/removed?x=1#intro'],
    ['https://docs.iafenvoy.com/unrelated', null],
  ]) {
    let target;
    vm.runInNewContext(languageChoiceHtml('/', true).match(/<script>([\s\S]*?)<\/script>/)[1], {URL, location: {href: url, pathname: new URL(url).pathname, replace: value => { target = value; }}});
    assert.equal(target ? new URL(target, url).searchParams.get('from') : null, expected);
  }
});

test('development serves the language choice for all old docs paths and passes localized paths through', async t => {
  const plugin = legacyLinks({i18n: {currentLocale: 'en'}});
  const [{middleware}] = plugin.configureWebpack().devServer.setupMiddlewares([]);
  const server = http.createServer((request, response) => middleware(request, response, () => response.writeHead(404).end()));
  t.after(() => { server.closeAllConnections(); server.close(); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  for (const old of ['/', '/docs', '/docs/mod/demo?ref=wiki', '/docs/previously-removed']) {
    const response = await fetch(origin + old);
    assert.equal(response.status, 200);
    assert.match(await response.text(), /选择语言 \/ Choose a language/);
  }
  for (const url of ['/en/docs/example', '/zh/docs/example', '/docs-example']) {
    assert.equal((await fetch(origin + url)).status, 404);
  }
});

test('static builds put language choices at original docs URLs outside the locale folders', async t => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'docs-language-choice-'));
  t.after(() => rm(root, {recursive: true, force: true}));
  const outDir = path.join(root, 'en');
  await mkdir(outDir);
  const plugin = legacyLinks({i18n: {currentLocale: 'en'}});
  plugin.allContentLoaded({allContent: {'docusaurus-plugin-content-docs': {default: {loadedVersions: [{docs: [{permalink: '/en/docs/mod/demo/faq'}]}]}}}});
  await plugin.postBuild({outDir});
  const html = await readFile(path.join(root, 'docs/mod/demo/faq/index.html'), 'utf8');
  assert.match(html, /href="\/en\/language\?from=%2Fdocs%2Fmod%2Fdemo%2Ffaq"/);
  assert.match(await readFile(path.join(root, 'index.html'), 'utf8'), /Choose a language/);
});
