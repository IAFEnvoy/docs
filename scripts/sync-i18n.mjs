import {existsSync} from 'node:fs';
import {mkdir, readFile, readdir, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const siteDir = fileURLToPath(new URL('../', import.meta.url));

async function collect(directory, prefix = '', files = new Map()) {
  if (!existsSync(directory)) return files;
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const relative = path.posix.join(prefix, entry.name);
    const source = path.join(directory, entry.name);
    if (entry.isDirectory()) await collect(source, relative, files);
    else if (entry.isFile()) files.set(relative, await readFile(source));
  }
  return files;
}

export async function syncI18n(rootDir = siteDir) {
  const outputDir = path.join(rootDir, 'i18n', 'zh');
  // Mirror English first so untranslated pages, MDX imports, and images stay available.
  const files = await collect(path.join(rootDir, 'locales', 'zh'));
  const docs = await collect(path.join(rootDir, 'docs-en'));
  for (const [relative, content] of await collect(path.join(rootDir, 'docs-zh'))) {
    docs.set(relative, content);
  }
  for (const [relative, content] of docs) {
    files.set(`docusaurus-plugin-content-docs/current/${relative}`, content);
  }

  const previous = await collect(outputDir);
  for (const [relative, content] of files) {
    if (previous.get(relative)?.equals(content)) continue;
    const destination = path.join(outputDir, relative);
    await mkdir(path.dirname(destination), {recursive: true});
    await writeFile(destination, content);
  }
  for (const relative of previous.keys()) {
    if (files.has(relative)) continue;
    const destination = path.resolve(outputDir, relative);
    if (!destination.startsWith(outputDir + path.sep)) throw new Error('Invalid generated path');
    await rm(destination);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await syncI18n();
  console.log('Synced docs-en + docs-zh and locales/zh to generated i18n/zh.');
}
