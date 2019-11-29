<!-- SPDX-License-Identifier: MIT -->

<template>
    <v-expansion-panels multiple>
        <x-api v-for="(api, index) in apis" :key="index" :api="api" v-show="visible(api)" />
    </v-expansion-panels>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as types from '@/store/types';
import * as store from '@/store/store';
import XApi from '@/components/Api.vue';
import * as apidoc from '@/components/apidoc';
import convert from 'xml-js';
import Vuex from 'vuex';
import Router from 'vue-router';
import VueI18n from 'vue-i18n';

@Component({
    components: { XApi }
})
export default class Api extends Vue {
    apidoc?: apidoc.ApiDoc;
    apis: apidoc.Api[] = [];

    visible(api: apidoc.Api): boolean {
        const state = this.$store.state;

        if (!state.method.filter.includes(api.$attr.method)) {
            return false;
        }

        let visible = false;
        const servers = apidoc.arrays(api.server);
        for (const srv of servers) {
            if (state.server.filter.includes(srv.$text)) {
                visible = true;
                break;
            }
        }
        if (!visible) { return false; }

        const tags = apidoc.arrays(api.tag);
        if (tags.length > 0) {
            for (const tag of tags) {
                if (state.tag.filter.includes(tag.$text)) {
                    return true;
                }
            }
            return false;
        }

        return visible;
    }

    /**
     * 加载从 URL 中传递地来的地址参数
     */
    async load() {
        let url: string = '';
        const q = this.$route.query.url;
        if (Array.isArray(q)) {
            const first = q[0];
            url = first === null ? '' : first;
        } else {
            url = q;
        }

        if (url === '') {
            this.$store.commit(types.SET_MESSAGE, {
                message: 'error.url-empty',
                type: 'warning'
            });
            return;
        }

        const resp = await fetch(url);
        const text = await resp.text();
        this.apidoc = JSON.parse(convert.xml2json(text, convertOptions)).apidoc;
        if (this.apidoc === undefined) {
            throw new Error('error.apidoc-empty');
        }

        if (this.apidoc.api === undefined) {
            throw new Error('error.api-empty');
        }

        const apis: apidoc.Api[] = [];
        if (Array.isArray(this.apidoc.api)) {
            apis.push(...this.apidoc.api);
        } else {
            apis.push(this.apidoc.api);
        }

        if (!apidoc.notEmpty(this.apidoc.response)) {
            this.apis.push(...apis);
            return;
        }

        const resps = apidoc.arrays(this.apidoc.response);
        for (const api of apis) {
            const apiResp = apidoc.arrays(api.response);
            apiResp.push(...resps);
            api.response = apiResp;
            this.apis.push(api);
        }
    }

    async created() {
        this.$store.commit(types.SET_HTML_TITLE, this.$i18n.t('nav.api'));
        this.$store.commit(types.SET_TITLE, 'nav.api');

        this.$store.commit(types.CLEAR_DOC_TREE);

        try {
            await this.load();
        } catch (e) {
            this.$store.commit(types.SET_MESSAGE, e.toString());
        }

        this.initFilter();
    }

    initFilter() {
        if (this.apidoc === undefined) {
            return;
        }

        const methods: string[] = [];
        for (const api of this.apis) {
            if (!methods.includes(api.$attr.method)) {
                methods.push(api.$attr.method);
            }
        }
        this.$store.commit(types.INIT_METHOD_FILTER, methods);

        const servers: store.Server[] = [];
        for (const srv of apidoc.arrays(this.apidoc.server)) {
            servers.push({
                id: srv.$attr.name,
                url: srv.$attr.url,
                description: srv.$text
            });
        }
        this.$store.commit(types.INIT_SERVER_FILTER, servers);

        if (this.apidoc.tag !== undefined) {
            const tags: store.Tag[] = [];
            for (const tag of apidoc.arrays(this.apidoc.tag)) {
                tags.push({ id: tag.$attr.name, title: tag.$attr.title });
            }
            this.$store.commit(types.INIT_TAG_FILTER, tags)
        }
    } // end initFilter
}

// xml-js 转换的配置项
const convertOptions = {
    compact: true,
    attributesKey: '$attr',
    textKey: '$text',
    cdataKey: '$cdata'
}
</script>
