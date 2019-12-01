// SPDX-License-Identifier: MIT

import * as apidoc from '@/components/apidoc';
import { assert } from 'chai';
import marked from 'marked';

describe('apidoc', () => {
    it('arrays', () => {
        let ret = apidoc.arrays<string>(undefined);
        assert.lengthOf(ret, 0);

        ret = apidoc.arrays('string');
        assert.lengthOf(ret, 1);

        ret = apidoc.arrays(['string']);
        assert.lengthOf(ret, 1);
    });

    it('notEmpty', () => {
        let ret = apidoc.notEmpty(undefined);
        assert.isFalse(ret);

        ret = apidoc.notEmpty<string>('');
        assert.isTrue(ret);

        ret = apidoc.notEmpty('string');
        assert.isTrue(ret);

        ret = apidoc.notEmpty(['string', 'string2']);
        assert.isTrue(ret);

        ret = apidoc.notEmpty([]);
        assert.isFalse(ret);
    });

    it('getDescription', () => {
        let ret = apidoc.getDescription('summary');
        assert.strictEqual(ret, 'summary');

        ret = apidoc.getDescription('summary', { $attr: { textType: 'html' }, $cdata: 'desc' });
        assert.strictEqual(ret, 'desc');

        ret = apidoc.getDescription('summary', { $attr: { textType: 'markdown' }, $cdata: '==desc' });
        assert.notStrictEqual(ret, '==desc');
        assert.strictEqual(ret, marked('==desc'))
    });
});
