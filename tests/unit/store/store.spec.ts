// SPDX-License-Identifier: MIT

import { assert } from 'chai';
import * as vuex from 'vuex';
import * as types from '@/store/types.ts';
import { store, State, Message } from '@/store/store.ts';
import config from '@/config/config.ts';

describe('store', () => {
    const o: State = {
        htmlTitle: '',
        title: '',
        message: {
            message: '',
            type: 'error'
        },
        filter: {
            methods: new Map<string, boolean>(),
            servers: new Map<string, boolean>(),
            tags: new Map<string, boolean>()
        },
        docTree: []
    };

    it('mutations SET_HTML_TITLE', () => {
        const state = Object.assign({}, o);
        (store.mutations as vuex.MutationTree<State>)[types.SET_HTML_TITLE](state);
        assert.strictEqual(state.htmlTitle, '');
        assert.strictEqual(document.title, config.titleSuffix);

        (store.mutations as vuex.MutationTree<State>)[types.SET_HTML_TITLE](state, 'xx');
        assert.strictEqual(state.htmlTitle, 'xx');
        assert.strictEqual(document.title, 'xx' + config.titleSeparator + config.titleSuffix);
    });

    it('mutations SET_MESSAGE with string', () => {
        const state = { ...o };
        assert.isDefined(state.message);
        (store.mutations as vuex.MutationTree<State>)[types.SET_MESSAGE](state, 'string');
        assert.isDefined(state.message);
        const msg = state.message as Message;
        assert.strictEqual(msg.type, 'error');
        assert.strictEqual(msg.message, 'string');
    });

    it('mutations SET_MESSAGE without type', () => {
        const state = { ...o };
        (store.mutations as vuex.MutationTree<State>)[types.SET_MESSAGE](state, { message: 'obj' });
        const msg = state.message as Message;
        assert.strictEqual(msg.type, 'error');
        assert.strictEqual(msg.message, 'obj');
    });

    it('mutations SET_MESSAGE with type', () => {
        const state = { ...o };
        (store.mutations as vuex.MutationTree<State>)[types.SET_MESSAGE](state, { message: 'obj', type: 'warning' });
        const msg = state.message as Message;
        assert.strictEqual(msg.type, 'warning');
        assert.strictEqual(msg.message, 'obj');
    });

    it('mutations FILTER_METHODS', () => {
        const state = { ...o };
        assert.strictEqual(state.filter.methods.size, 0);
        (store.mutations as vuex.MutationTree<State>)[types.INIT_METHOD_FILTER](state, [['1', true], ['2', false]]);
        assert.strictEqual(state.filter.methods.size, 2);
        assert.isTrue(state.filter.methods.get('1'));
        assert.isFalse(state.filter.methods.get('2'));

        (store.mutations as vuex.MutationTree<State>)[types.SET_METHOD_FILTER](state, ['1', '2']);
        assert.strictEqual(state.filter.methods.size, 2);
        assert.isTrue(state.filter.methods.get('1'));
        assert.isTrue(state.filter.methods.get('2'));
    });
});
