// SPDX-License-Identifier: MIT

import { assert } from 'chai';
import { DocTree } from '@/components/DocTree.ts';
import { Type } from '@/config/types.ts';

describe('DocTree', () => {
    it('DocTree.constructor', () => {
        const tree = new DocTree('id', 'name', 'content');
        assert.equal(tree.title, 'name');
        assert.equal(tree.id, 'id');
        assert.equal(tree.content, 'content');
        assert.isUndefined(tree.items);
    });

    it('DocTree.add', () => {
        const tree = new DocTree('id', 'name', '');
        tree.add('id1', 'name1', 'c1');

        assert.notStrictEqual(tree.items, undefined);
        assert.lengthOf<DocTree[]>(tree.items as DocTree[], 1);

        const sub = (tree.items as DocTree[])[0];
        assert.equal(sub.title, 'name1');
        assert.equal(sub.id, 'id_id1');
        assert.equal(sub.content, 'c1');
        assert.isUndefined(sub.contentType);
        assert.isUndefined(sub.i18nPrefix);
        assert.isUndefined(sub.items);
    });

    it('DocTree.addType', () => {
        const tree = new DocTree('id', 'name', '');
        tree.addType('id1', 'i18n.', { name: 'type' });

        assert.notStrictEqual(tree.items, undefined);
        assert.lengthOf<DocTree[]>(tree.items as DocTree[], 1);

        const sub = (tree.items as DocTree[])[0];
        assert.equal(sub.title, '');
        assert.equal(sub.id, 'id_id1');
        assert.equal(sub.i18nPrefix, 'i18n.');
        assert.equal((sub.contentType as Type).name, 'type');
        assert.isUndefined(sub.items);
    });

    it('DocTree.clear', () => {
        const tree = new DocTree('id', 'name', '');
        tree.add('id1', 'name1', 'c1');
        tree.clear();
        assert.lengthOf<DocTree[]>(tree.items as DocTree[], 0);
    });
});
