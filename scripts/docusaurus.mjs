import {spawn} from 'node:child_process';
import {watch} from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {siteDir, syncI18n} from './sync-i18n.mjs';
import {startLocales} from './start-locales.mjs';

await syncI18n();
const args = process.argv.slice(2);
const watchers = [];
if (args[0] === 'start') {
  let timer;
  let pending = Promise.resolve();
  for (const directory of ['docs-en', 'docs-zh', 'locales/zh']) {
    watchers.push(watch(path.join(siteDir, directory), {recursive: true}, () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        pending = pending.then(syncI18n).catch(error => console.error('[sync-i18n]', error));
      }, 150);
    }));
  }
}

const require = createRequire(import.meta.url);
const cli = path.join(path.dirname(require.resolve('@docusaurus/core/package.json')), 'bin/docusaurus.mjs');
const allLocales = args[0] === 'start' && !args.some(arg => arg === '--locale' || arg === '-l' || arg.startsWith('--locale=')) && !args.includes('--help');
const child = allLocales
  ? await startLocales({cli, args: args.slice(1), siteDir})
  : spawn(process.execPath, [cli, ...args], {cwd: siteDir, stdio: 'inherit'});
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal));
}
child.on('error', error => {
  console.error(error);
  for (const watcher of watchers) watcher.close();
  process.exitCode = 1;
});
child.on('exit', code => {
  for (const watcher of watchers) watcher.close();
  process.exitCode = code ?? 1;
});
