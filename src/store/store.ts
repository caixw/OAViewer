// SPDX-License-Identifier: MIT

import * as vuex from 'vuex';
import * as types from './types';
import { DocTree } from '@/components/DocTree.ts';
import config from '@/config/config.ts';

const state: State = {
    htmlTitle: '',
    title: config.name,
    docTree: []
};

const getters: vuex.GetterTree<State, State> = {
    // TODO
};

const mutations: vuex.MutationTree<State> = {
    // 设置 html>head>title 的内容
    [types.SET_HTML_TITLE](state: State, title?: string) {
        if (title === undefined || title === '') {
            document.title = config.titleSuffix;
            return;
        }

        state.htmlTitle = title;
        document.title = title + config.titleSeparator + config.titleSuffix;
    },

    // 设置 toolbar 上的标题内容的翻译 ID
    [types.SET_TITLE](state: State, title: string) {
        state.title = title;
    },

    [types.CLEAR_DOC_TREE](state: State) {
        state.docTree.length = 0;
    },

    [types.ADD_DOC_TREE](state: State, tree: DocTree) {
        state.docTree.push(tree);
    }
};

const actions: vuex.ActionTree<State, State> = {
    //
};

export const store: vuex.StoreOptions<State> = {
    state,
    getters,
    mutations,
    actions
};

export interface State {
    htmlTitle: string
    title: string
    docTree: DocTree[]
}
