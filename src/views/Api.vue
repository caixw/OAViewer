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

        if (!state.method.filter.includes(api.method)) {
            return false;
        }

        let visible = false;
        for (const srv of api.servers) {
            if (state.server.filter.includes(srv)) {
                visible = true;
                break;
            }
        }
        if (!visible) { return false; }

        if (api.tags !== undefined && api.tags.length > 0) {
            for (const tag of api.tags) {
                if (state.tag.filter.includes(tag)) {
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
            url = q || '';
        }

        if (url === '') {
            this.$store.commit(types.SET_MESSAGE, {
                message: 'error.url-empty',
                type: 'warning'
            });
            return;
        }

        try {
            this.apidoc = await apidoc.load(url);
        } catch (e) {
            this.$store.commit(types.SET_MESSAGE, e.toString());
            return;
        }

        const apis = this.apidoc.apis ? [...this.apidoc.apis] : [];
        if (this.apidoc.responses !== undefined) {
            for (const api of apis) {
                api.responses.push(...this.apidoc.responses);
            }
        }
        this.apis.length = 0;
        this.apis.push(...apis);

        this.$store.commit(types.SET_TITLE, this.apidoc.title);
        this.$store.commit(types.SET_HTML_TITLE, this.apidoc.title);

        if (this.apidoc.lang !== undefined) {
            this.$i18n.locale = this.apidoc.lang;
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
            if (!methods.includes(api.method)) {
                methods.push(api.method);
            }
        }
        this.$store.commit(types.INIT_METHOD_FILTER, methods);

        this.$store.commit(types.INIT_SERVER_FILTER, this.apidoc.servers);

        if (this.apidoc.tags !== undefined) {
            this.$store.commit(types.INIT_TAG_FILTER, this.apidoc.tags);
        }

        this.$store.commit(types.SET_API_FOOTER, this.apidoc);
    } // end initFilter
}
</script>
