const sections = require('../src/data/mxt-sidebar.json');

module.exports = function mxtSidebar(docs, locale) {
  const ids = new Set(docs.map(doc => doc.id));
  const id = page => `mod/mxt/${page}`;
  function entries(items, parentKey) {
    return items.flatMap((item, index) => {
      const label = item[locale] ?? item.text?.[locale];
      const key = `${parentKey}/${item.page ?? index}`;
      const hasPage = item.page && ids.has(id(item.page));
      let children = item.items ? entries(item.items, key) : [];
      if (item.alpha) {
        const name = entry => entry.id?.split('/').at(-1) ?? entry.label;
        children.sort((a, b) => {
          const left = name(a);
          const right = name(b);
          if (left === 'mxt' || right === 'mxt') return left === right ? 0 : left === 'mxt' ? -1 : 1;
          return left.localeCompare(right, 'en');
        });
      }
      if (children.length) {
        return [{
          type: 'category', label, key, collapsed: true, items: children,
          ...(hasPage ? {link: {type: 'doc', id: id(item.page)}} : {}),
        }];
      }
      return hasPage ? [{type: 'doc', id: id(item.page), label}] : [];
    });
  }
  return {
    type: 'category', label: 'MiXianTu', key: 'mod/mxt', collapsed: true,
    customProps: {sortName: 'MiXianTu'},
    link: {type: 'doc', id: id('index')}, items: entries(sections, 'mod/mxt'),
  };
};
