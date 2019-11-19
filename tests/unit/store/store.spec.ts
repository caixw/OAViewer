// SPDX-License-Identifier: MIT

import { assert } from 'chai';
import * as vuex from 'vuex';
import * as types from '@/store/types.ts';
import { store, State } from '@/store/store.ts';
import config from '@/config/config.ts';

describe('store', () => {
    it('mutations SET_HTML_TITLE', () => {
        const o = {
            htmlTitle: '',
            title: '',
            docTree: []
        };

        const state = Object.assign({}, o);
        (store.mutations as vuex.MutationTree<State>)[types.SET_HTML_TITLE](state);
        assert.strictEqual(state.htmlTitle, '');
        assert.strictEqual(document.title, config.titleSuffix);

        (store.mutations as vuex.MutationTree<State>)[types.SET_HTML_TITLE](state, 'xx');
        assert.strictEqual(state.htmlTitle, 'xx');
        assert.strictEqual(document.title, 'xx' + config.titleSeparator + config.titleSuffix);
    });
});
