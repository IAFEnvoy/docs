const labels = require('../src/data/sidebar-labels.json');
const mxtSidebar = require('./mxt-sidebar.cjs');
const libraryOrder = ['annotation-lib', 'jupiter', 'saturn', 'uranus', 'neptune'];

function documentId(item) {
  if (item.type === 'doc') return item.id;
  if (item.link?.type === 'doc') return item.link.id;
  for (const child of item.items ?? []) {
    const id = documentId(child);
    if (id) return id;
  }
  return undefined;
}

module.exports = async function sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
  const items = await defaultSidebarItemsGenerator(args);
  const locale = args.docs.some(doc => /[/\\]i18n[/\\]zh[/\\]/.test(doc.source)) ? 'zh' : 'en';
  if (args.item.dirName === 'mod') {
    const mxtIndex = items.findIndex(item => documentId(item)?.startsWith('mod/mxt/'));
    if (mxtIndex !== -1) items[mxtIndex] = mxtSidebar(args.docs, locale);
    // Project directory names are English and stay the same in both locales.
    const name = item => item.customProps?.sortName ?? documentId(item)?.split('/')[1] ?? item.label;
    items.sort((a, b) => name(a).localeCompare(name(b), 'en', {sensitivity: 'base', numeric: true}));
  } else if (args.item.dirName === 'library') {
    const rank = item => {
      const index = libraryOrder.indexOf(documentId(item)?.split('/')[1]);
      return index === -1 ? libraryOrder.length : index;
    };
    items.sort((a, b) => rank(a) - rank(b));
  }
  const docs = new Map(args.docs.map(doc => [doc.id, doc]));
  const translateLabel = label => labels[locale][label] ?? label;
  function localize(item, parentKey = args.item.dirName) {
    if (item.type === 'category') {
      const key = item.key ?? `${parentKey}/${item.label}`;
      return {...item, key, label: translateLabel(item.label), items: item.items.map(child => localize(child, key))};
    }
    if (item.type === 'doc') {
      const doc = docs.get(item.id);
      return {...item, key: item.id, label: translateLabel(item.label ?? doc.frontMatter.sidebar_label ?? doc.title)};
    }
    return item;
  }
  return items.map(item => localize(item));
};
