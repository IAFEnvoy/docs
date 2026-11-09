import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, readFile, stat, rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {test} from 'node:test';
import {syncI18n} from './sync-i18n.mjs';

test('localized overrides preserve fallback documents and assets, and track edits and removals', async t => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'docs-i18n-test-'));
  if (!root.startsWith(path.join(os.tmpdir(), 'docs-i18n-test-'))) throw new Error('Invalid test directory');
  t.after(() => rm(root, {recursive: true, force: true}));
  async function put(relative, content) {
    const file = path.join(root, relative);
    await mkdir(path.dirname(file), {recursive: true});
    await writeFile(file, content);
  }
  const generated = path.join(root, 'i18n/zh/docusaurus-plugin-content-docs/current');
  await put('docs-en/mod/demo/index.md', '# English');
  await put('docs-en/mod/demo/api.md', '# API');
  await put('docs-en/mod/demo/imgs/logo.webp', Buffer.from([0, 128, 255]));
  await put('docs-zh/mod/demo/index.md', '# 中文');
  await put('locales/zh/code.json', '{"hello":{"message":"你好"}}');
  await syncI18n(root);
  assert.equal(await readFile(path.join(generated, 'mod/demo/index.md'), 'utf8'), '# 中文');
  assert.equal(await readFile(path.join(generated, 'mod/demo/api.md'), 'utf8'), '# API');
  assert.deepEqual(await readFile(path.join(generated, 'mod/demo/imgs/logo.webp')), Buffer.from([0, 128, 255]));
  assert.equal(await readFile(path.join(root, 'i18n/zh/code.json'), 'utf8'), '{"hello":{"message":"你好"}}');
  const before = (await stat(path.join(generated, 'mod/demo/index.md'))).mtimeMs;
  await syncI18n(root);
  assert.equal((await stat(path.join(generated, 'mod/demo/index.md'))).mtimeMs, before);
  await rm(path.join(root, 'docs-zh/mod/demo/index.md'));
  await rm(path.join(root, 'docs-en/mod/demo/api.md'));
  await put('docs-en/mod/demo/index.md', '# Updated English');
  await put('docs-zh/mod/demo/new.md', '# 新文档');
  await syncI18n(root);
  assert.equal(await readFile(path.join(generated, 'mod/demo/index.md'), 'utf8'), '# Updated English');
  await assert.rejects(stat(path.join(generated, 'mod/demo/api.md')), {code: 'ENOENT'});
  assert.equal(await readFile(path.join(generated, 'mod/demo/new.md'), 'utf8'), '# 新文档');
  assert.equal(await readFile(path.join(root, 'docs-en/mod/demo/index.md'), 'utf8'), '# Updated English');
});
