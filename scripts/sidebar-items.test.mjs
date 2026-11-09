import assert from 'node:assert/strict';
import {test} from 'node:test';
import generator from './sidebar-items.cjs';

test('translated sidebar labels keep duplicate category names distinct and API identifiers unchanged', async () => {
  const docs = [
    {id: 'mod/a/index', title: 'Installation', source: '@site/i18n/zh/docs/a.md', frontMatter: {}},
    {id: 'mod/b/index', title: 'HolderWrapper', source: '@site/i18n/zh/docs/b.md', frontMatter: {}},
  ];
  const output = await generator({
    item: {dirName: 'mod'}, docs,
    defaultSidebarItemsGenerator: async () => [
      {type: 'category', label: 'a', items: [{type: 'category', label: 'API Reference', items: [{type: 'doc', id: docs[0].id}]}]},
      {type: 'category', label: 'b', items: [{type: 'category', label: 'API Reference', items: [{type: 'doc', id: docs[1].id}]}]},
    ],
  });
  const first = output[0].items[0];
  const second = output[1].items[0];
  assert.equal(first.label, 'API 参考');
  assert.equal(second.label, 'API 参考');
  assert.notEqual(first.key, second.key);
  assert.equal(first.items[0].label, '安装');
  assert.equal(second.items[0].label, 'HolderWrapper');
});

for (const locale of ['en', 'zh']) {
  test(`mod projects use English alphabetical order in ${locale} without reordering their pages`, async () => {
    const projects = [
      ['system', 'System', '系统'],
      ['origins-js', 'Origins JS', '起源JS'],
      ['ice-and-fire-ce', 'Ice And Fire: Community Edition', '冰火传说社区版'],
      ['avaritia-reborn', 'Avaritia Reborn', '无尽贪婪：复兴'],
      ['origins', 'Origins (NeoForge)', '起源（NeoForge）'],
      ['tameable', 'Tameable', 'Tameable'],
      ['dragon-mounts-reforged', 'Dragon Mounts: Reforged', '龙骑士：重铸'],
      ['mobs-banner', 'Mobs Banner', 'Mobs Banner'],
      ['mite', 'MITE: Reforged', 'MITE：重铸'],
      ['pendulum', 'Pendulum', 'Pendulum'],
    ];
    const docs = projects.flatMap(([project]) => ['advanced', 'install'].map(page => ({
      id: `mod/${project}/${page}`,
      title: page,
      source: locale === 'zh' ? `@site/i18n/zh/mod/${project}/${page}.md` : `@site/docs-en/mod/${project}/${page}.md`,
      frontMatter: {},
    })));
    const output = await generator({
      item: {dirName: 'mod'}, docs,
      defaultSidebarItemsGenerator: async () => projects.map(([project, en, zh]) => ({
        type: 'category',
        label: locale === 'zh' ? zh : en,
        customProps: {project},
        // Both generated index categories and categories linked to a document are supported.
        link: project === 'system' ? {type: 'doc', id: `mod/${project}/advanced`} : {type: 'generated-index'},
        items: ['advanced', 'install'].map(page => ({type: 'doc', id: `mod/${project}/${page}`})),
      })),
    });
    assert.deepEqual(output.map(item => item.customProps.project), [
      'avaritia-reborn', 'dragon-mounts-reforged', 'ice-and-fire-ce', 'mite', 'mobs-banner',
      'origins', 'origins-js', 'pendulum', 'system', 'tameable',
    ]);
    for (const item of output) {
      assert.deepEqual(item.items.map(child => child.id.split('/').at(-1)), ['advanced', 'install']);
    }
  });
}

test('other sidebars keep their configured project order', async () => {
  const docs = ['zebra', 'alpha'].map(project => ({
    id: `library/${project}/index`, title: project, source: `@site/docs-en/library/${project}/index.md`, frontMatter: {},
  }));
  const output = await generator({
    item: {dirName: 'library'}, docs,
    defaultSidebarItemsGenerator: async () => docs.map(doc => ({type: 'doc', id: doc.id})),
  });
  assert.deepEqual(output.map(item => item.id), ['library/zebra/index', 'library/alpha/index']);
});
