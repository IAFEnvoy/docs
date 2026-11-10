import assert from 'node:assert/strict';
import {test} from 'node:test';
import {previewUrl, isPreviewSource} from '../src/utils/link-preview.cjs';

const current = 'http://localhost:3000/zh/docs/mod/system/?source=navbar';
const site = 'https://docs.iafenvoy.com';

test('preview resolves internal and legacy links without losing locale, search or hash', () => {
  for (const [href, expected] of [
    ['../../library/jupiter', '/zh/docs/library/jupiter'],
    ['/en/docs/mod/mxt?ref=link#installation', '/en/docs/mod/mxt?ref=link#installation'],
    ['/docs/library/saturn?ref=old#setup', '/zh/docs/library/saturn?ref=old#setup'],
    [site + '/en/docs/library/jupiter/', '/en/docs/library/jupiter/'],
    ['/', '/zh/'],
    ['/zh', '/zh'],
  ]) assert.equal(previewUrl(href, current, 'zh', site), expected, href);
});

test('preview leaves external links, downloads, selectors and same-page anchors alone', () => {
  for (const href of [
    'https://example.com/zh/docs/', 'mailto:test@example.com', 'javascript:alert(1)',
    'https://docs.iafenvoy.com.example.com/zh/docs/', 'https://user@docs.iafenvoy.com/en/',
    '/zh/docs/mod/system#setup', '#setup', '?another=1', '/zh/docs/mod/system/',
    '/zh/assets/sample.jar', '/en/resources/file.pdf', '/en/img/demo.webp', '/en/language?choose=1',
    '/resources/file', '/tools/editor/index.html',
  ]) assert.equal(previewUrl(href, current, 'zh', site), null, href);
});

test('preview sources are distinguished from normal windows and tolerate inaccessible frames', t => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'frameElement');
  t.after(() => {
    if (previous) Object.defineProperty(globalThis, 'frameElement', previous);
    else delete globalThis.frameElement;
  });
  assert.equal(isPreviewSource(), false);
  Object.defineProperty(globalThis, 'frameElement', {configurable: true, value: {hasAttribute: name => name === 'data-docs-preview-source'}});
  assert.equal(isPreviewSource(), true);
  Object.defineProperty(globalThis, 'frameElement', {configurable: true, get() { throw new Error('Cross origin frame'); }});
  assert.equal(isPreviewSource(), false);
});
