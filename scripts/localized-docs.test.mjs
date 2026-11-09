import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const {contentPath} = require('../plugins/localized-docs.cjs');

test('default locale continues to read the maintained English source', () => {
  assert.equal(contentPath({i18n: {currentLocale: 'en', defaultLocale: 'en'}}, {path: 'docs-en'}), 'docs-en');
});

test('Chinese discovers locale-only documents in the merged native i18n directory', () => {
  const localizationDir = path.resolve('i18n/zh');
  const result = contentPath({i18n: {currentLocale: 'zh', defaultLocale: 'en'}, localizationDir}, {path: 'docs-en'});
  assert.equal(result, path.join(localizationDir, 'docusaurus-plugin-content-docs/current'));
  assert.notEqual(result, 'docs-zh');
});
