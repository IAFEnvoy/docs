const labels = require('../src/data/sidebar-labels.json');

module.exports = async function sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
  const items = await defaultSidebarItemsGenerator(args);
  const locale = args.docs.some(doc => /[/\\]i18n[/\\]zh[/\\]/.test(doc.source)) ? 'zh' : 'en';
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
