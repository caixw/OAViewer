// SPDX-License-Identifier: MIT

import * as vuex from 'vuex';
import * as types from './types';
import { DocTree } from '@/components/DocTree.ts';
import config from '@/config/config.ts';
import set = Reflect.set;

const state: State = {
    htmlTitle: '',
    title: config.name,
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

export interface State {
    htmlTitle: string
    title: string
    message: Message
    docTree: DocTree[]
    filter: {
        methods: Map<string, boolean>,
        servers: Map<string, boolean>,
        tags: Map<string, boolean>
    }
}

export interface Message {
    message: string
    type: 'error' | 'warning' | 'info' | 'success'
}

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

    // 设置弹出的提示信息
    [types.SET_MESSAGE](state: State, message: string | { message: string, type?: 'error' | 'warning' | 'info' | 'success' }) {
        if (typeof message === 'string') {
            state.message.message = message;
            state.message.type = 'error';
            return;
        }

        state.message.message = message.message;
        state.message.type = message.type === undefined ? 'error' : message.type;
    },

    [types.CLEAR_DOC_TREE](state: State) {
        state.docTree.length = 0;
    },

    [types.ADD_DOC_TREE](state: State, tree: DocTree) {
        state.docTree.push(tree);
    },

    [types.INIT_METHOD_FILTER](state: State, kv: Array<[string, boolean]>) {
        initFilter(state.filter.methods, kv);
    },

    [types.INIT_SERVER_FILTER](state: State, kv: Array<[string, boolean]>) {
        initFilter(state.filter.servers, kv);
    },

    [types.INIT_TAG_FILTER](state: State, kv: Array<[string, boolean]>) {
        initFilter(state.filter.tags, kv);
    },

    [types.SET_METHOD_FILTER](state: State, methods: string[]) {
        setFilter(state.filter.methods, methods);
    },

    [types.SET_SERVER_FILTER](state: State, servers: string[]) {
        setFilter(state.filter.methods, servers);
    },

    [types.SET_TAG_FILTER](state: State, tags: string[]) {
        setFilter(state.filter.methods, tags);
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

function initFilter(filter: Map<string, boolean>, kv: Array<[string, boolean]>) {
    for (const v of kv) {
        filter.set(v[0], v[1]);
    }
}

function setFilter(filter: Map<string, boolean>, keys: string[]) {
    for (const key of filter.keys()) {
        filter.set(key, keys.includes(key));
    }
}
