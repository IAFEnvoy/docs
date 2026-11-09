import assert from 'node:assert/strict';
import {test} from 'node:test';
import {LOCALE_STORAGE_KEY, readPreferredLocale, rememberLocale, localeFromPath} from '../src/utils/locale-preference.cjs';

function installStorage(t, storage) {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  Object.defineProperty(globalThis, 'localStorage', {configurable: true, get: storage});
  t.after(() => {
    if (previous) Object.defineProperty(globalThis, 'localStorage', previous);
    else delete globalThis.localStorage;
  });
}

test('locale memory persists the latest supported choice and ignores invalid values', t => {
  const values = new Map();
  installStorage(t, () => ({getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value)}));
  assert.equal(readPreferredLocale(), null);
  rememberLocale('zh');
  assert.equal(values.get(LOCALE_STORAGE_KEY), 'zh');
  assert.equal(readPreferredLocale(), 'zh');
  rememberLocale('en');
  assert.equal(readPreferredLocale(), 'en');
  rememberLocale('fr');
  assert.equal(readPreferredLocale(), 'en');
  values.set(LOCALE_STORAGE_KEY, 'https://example.com');
  assert.equal(readPreferredLocale(), null);
});

test('blocked browser storage does not interrupt language navigation', t => {
  installStorage(t, () => { throw new Error('Storage is disabled'); });
  assert.equal(readPreferredLocale(), null);
  assert.doesNotThrow(() => rememberLocale('zh'));
});

test('storage quota and read failures leave manual selection available', t => {
  installStorage(t, () => ({
    getItem() { throw new Error('Read blocked'); },
    setItem() { throw new Error('Quota exceeded'); },
  }));
  assert.equal(readPreferredLocale(), null);
  assert.doesNotThrow(() => rememberLocale('en'));
});

test('explicit locale paths update memory while language selectors and old URLs do not', () => {
  for (const [pathname, expected] of [
    ['/en/', 'en'], ['/zh', 'zh'], ['/zh/docs/mod/mxt', 'zh'], ['/en/docs/library/jupiter', 'en'],
    ['/', null], ['/docs/mod/mxt', null], ['/en/language', null], ['/en/language/', null],
    ['/zh/language', null], ['/zh/language/', null], ['/enough/', null], ['/fr/docs/', null],
  ]) assert.equal(localeFromPath(pathname), expected, pathname);
});
