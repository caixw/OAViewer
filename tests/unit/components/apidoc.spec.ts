// SPDX-License-Identifier: MIT

import * as apidoc from '@/components/apidoc';
import { assert } from 'chai';
import marked from 'marked';

describe('apidoc', () => {
    it('getDescription', () => {
        let ret = apidoc.getDescription('summary');
        assert.strictEqual(ret, 'summary');

        ret = apidoc.getDescription('summary', { textType: 'html', content: 'desc' });
        assert.strictEqual(ret, 'desc');

        ret = apidoc.getDescription('summary', { textType: 'markdown', content: '==desc' });
        assert.notStrictEqual(ret, '==desc');
        assert.strictEqual(ret, marked('==desc'))
    });
});
