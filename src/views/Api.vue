<!-- SPDX-License-Identifier: MIT -->

<template>
    <fragment v-if="apidoc!==null">
        <article class="mx-6 my-6">
            <h2 class="mb-3">{{apidoc.title.$text}}</h2>
            <section v-html="description" />
        </article>

        <v-expansion-panels multiple>
            <x-api v-for="(api, index) in apis" :key="index" :api="api" v-show="visible(api)" />
        </v-expansion-panels>
    </fragment>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Fragment } from 'vue-fragment';
import convert from 'xml-js';
import * as types from '@/store/types';
import * as store from '@/store/store';
import XApi from '@/components/Api.vue';
import * as apidoc from '@/components/apidoc';

@Component({
    components: { XApi, Fragment }
})
export default class Api extends Vue {
    apidoc: apidoc.ApiDoc | null = null;
    apis: apidoc.Api[] = [];

    get description(): string {
        return apidoc.getDescription('', this.apidoc!.description);
    }

    /**
     * 当前的 API 是否需要显示
     */
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
        if (this.apidoc === null) {
            throw new Error('error.apidoc-empty');
        }

        if (this.apidoc!.api === undefined) {
            throw new Error('error.api-empty');
        }

        const apis: apidoc.Api[] = [];
        if (Array.isArray(this.apidoc!.api)) {
            apis.push(...this.apidoc!.api);
        } else {
            apis.push(this.apidoc!.api);
        }

        if (!apidoc.notEmpty(this.apidoc!.response)) {
            this.apis.push(...apis);
            return;
        }

        const resps = apidoc.arrays(this.apidoc!.response);
        for (const api of apis) {
            const apiResp = apidoc.arrays(api.response);
            apiResp.push(...resps);
            api.response = apiResp;
            this.apis.push(api);
        }

        this.$store.commit(types.SET_TITLE, this.apidoc.title.$text);
        this.$store.commit(types.SET_HTML_TITLE, this.apidoc.title.$text);

        if (this.apidoc.$attr.lang !== undefined) {
            this.$i18n.locale = this.apidoc.$attr.lang;
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
        if (this.apidoc === null) {
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
        for (const srv of apidoc.arrays(this.apidoc!.server)) {
            servers.push({
                id: srv.$attr.name,
                url: srv.$attr.url,
                description: srv.$cdata,
                descriptionType: srv.$attr.textType
            });
        }
        this.$store.commit(types.INIT_SERVER_FILTER, servers);

        if (this.apidoc!.tag !== undefined) {
            const tags: store.Tag[] = [];
            for (const tag of apidoc.arrays(this.apidoc!.tag)) {
                tags.push({ id: tag.$attr.name, title: tag.$attr.title });
            }
            this.$store.commit(types.INIT_TAG_FILTER, tags);
        }
    } // end initFilter
}

// xml-js 转换的配置项
const convertOptions = {
    compact: true,
    attributesKey: '$attr',
    textKey: '$text',
    cdataKey: '$cdata'
};
</script>
