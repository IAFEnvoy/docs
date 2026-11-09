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
