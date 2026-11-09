// Native modules keep this embedded editor independent of the documentation build.
async function read(path, json = false) {
  const response = await fetch(new URL(path, import.meta.url));
  if (!response.ok) throw new Error(`无法加载编辑器资源：${path} (${response.status})`);
  return json ? response.json() : response.text();
}
const manifest = await read('./resources/manifest.json', true);
async function group(name) {
  return Object.fromEntries(await Promise.all(manifest[name].map(async id =>
    [id, await read(`./resources/${name}/${id}.json`, true)])));
}
export const [templates, languages, sharedCSS, themeCSS, previewCSS] = await Promise.all([
  group('templates'), group('lang'), read('./resources/assistant.css'),
  read('./styles/t08-arwes.css'), read('./styles/preview.css'),
]);
