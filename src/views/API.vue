<!-- SPDX-License-Identifier: MIT -->

<template>
    <v-expansion-panels multiple>
        <x-api v-for="(api, index) in apis" :key="index" :api="api" />
    </v-expansion-panels>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as types from '@/store/types.ts';
import XApi from '@/components/Api.vue';
import * as apidoc from '@/components/apidoc.ts';
import convert from 'xml-js';

@Component({
    components: { XApi }
})
export default class Api extends Vue {
    apidoc?: apidoc.ApiDoc;
    apis: apidoc.Api[] = [];

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
            // TODO error
            return;
        }

        const resp = await fetch(url);
        const text = await resp.text();
        this.apidoc = JSON.parse(convert.xml2json(text, convertOptions)).apidoc;
        if (this.apidoc === undefined) {
            // TODO error
            return;
        }

        this.apis.length = 0;
        if (this.apidoc.api !== undefined) {
            if (Array.isArray(this.apidoc.api)) {
                this.apis.push(...this.apidoc.api);
            } else {
                this.apis.push(this.apidoc.api);
            }
        }
    }

    async created() {
        this.$store.commit(types.SET_HTML_TITLE, this.$i18n.t('nav.api'));
        this.$store.commit(types.SET_TITLE, 'nav.api');

        this.$store.commit(types.CLEAR_DOC_TREE);

        await this.load();
    }
}

// xml-js 转换的配置项
const convertOptions = {
    compact: true,
    attributesKey: '$attr',
    textKey: '$text',
    cdataKey: '$cdata'
}
</script>
