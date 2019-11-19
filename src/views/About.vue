<!-- SPDX-License-Identifier: MIT -->

<template>
    <div>
        <x-doc-tree v-for="(item, index) of tree" :key="index" :tree="item" :level="2" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as types from '@/store/types.ts';

@Component
export default class About extends Vue {
    get tree(): DocTree[] {
        return this.$store.state.docTree;
    }

    created() {
        this.$store.commit(types.SET_HTML_TITLE, this.$i18n.t('nav.about'));
        this.$store.commit(types.SET_TITLE, 'nav.about');

        this.$store.commit(types.CLEAR_DOC_TREE);

        // about
        const about = new DocTree('about-about', 'about.about', 'about.about.content');
        this.$store.commit(types.ADD_DOC_TREE, about);
    }
}
</script>
