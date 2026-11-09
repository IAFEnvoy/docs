import assert from 'node:assert/strict';
import {test} from 'node:test';
import generator from './sidebar-items.cjs';
import mxtSidebar from './mxt-sidebar.cjs';
import {readdir} from 'node:fs/promises';

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
      ['mxt', 'MiXianTu', '觅仙途'],
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
    assert.deepEqual(output.map(item => item.customProps.project ?? item.link?.id?.split('/')[1]), [
      'avaritia-reborn', 'dragon-mounts-reforged', 'ice-and-fire-ce', 'mite', 'mxt', 'mobs-banner',
      'origins', 'origins-js', 'pendulum', 'system', 'tameable',
    ]);
    for (const item of output) {
      if (item.link?.id === 'mod/mxt/index') continue;
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

for (const locale of ['en', 'zh']) {
  test(`library projects use the requested order in ${locale} while preserving child and unlisted project order`, async () => {
    const projects = ['zebra', 'neptune', 'uranus', 'jupiter', 'alpha', 'annotation-lib', 'saturn'];
    const docs = projects.flatMap(project => ['advanced', 'install'].map(page => ({
      id: `library/${project}/${page}`, title: page, frontMatter: {},
      source: locale === 'zh' ? `@site/i18n/zh/library/${project}/${page}.md` : `@site/docs-en/library/${project}/${page}.md`,
    })));
    const output = await generator({
      item: {dirName: 'library'}, docs,
      defaultSidebarItemsGenerator: async () => projects.map(project => ({
        type: 'category', label: project,
        link: project === 'saturn' ? {type: 'doc', id: `library/${project}/advanced`} : {type: 'generated-index'},
        items: ['advanced', 'install'].map(page => ({type: 'doc', id: `library/${project}/${page}`})),
      })),
    });
    assert.deepEqual(output.map(item => item.items[0].id.split('/')[1]), [
      'annotation-lib', 'jupiter', 'saturn', 'uranus', 'neptune', 'zebra', 'alpha',
    ]);
    for (const item of output) {
      assert.deepEqual(item.items.map(child => child.id.split('/').at(-1)), ['advanced', 'install']);
    }
  });
}

test('MiXianTu keeps nested definition families and both locales share the same document order', async () => {
  async function collect(directory, prefix = '') {
    const docs = [];
    for (const entry of await readdir(directory, {withFileTypes: true})) {
      const name = `${prefix}${entry.name}`;
      if (entry.isDirectory()) docs.push(...await collect(new URL(`${entry.name}/`, directory), `${name}/`));
      else if (entry.name.endsWith('.md')) docs.push({id: `mod/mxt/${name.slice(0, -3)}`});
    }
    return docs;
  }
  const docs = await collect(new URL('../docs-en/mod/mxt/', import.meta.url));
  const en = mxtSidebar(docs, 'en');
  const zh = mxtSidebar(docs, 'zh');
  const allItems = item => [item, ...(item.items ?? []).flatMap(allItems)];
  const references = sidebar => allItems(sidebar).flatMap(item => item.id ?? item.link?.id ?? []);
  assert.deepEqual(references(en), references(zh));
  const links = references(en);
  assert.equal(new Set(links).size, links.length);
  assert.equal(new Set(links).size, docs.length - 2); // Standalone editors are reached from their tool pages.
  assert(links.includes('mod/mxt/java/interfaces/index'));
  assert(!links.some(id => id.endsWith('-full')));
  const nested = allItems(en).find(item => item.link?.id === 'mod/mxt/datapack/json/ability');
  assert(nested.items.some(item => item.id === 'mod/mxt/datapack/types/other/ability'));
  const commands = allItems(en).find(item => item.link?.id === 'mod/mxt/player-guide/commands');
  assert.equal(commands.items[0].id, 'mod/mxt/player-guide/commands/mxt');
  assert.equal(zh.items[1].label, '游玩指南');
});
