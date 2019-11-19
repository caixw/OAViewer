<!-- SPDX-License-Identifier: MIT -->

<template>
    <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as types from '@/store/types.ts';

@Component
export default class API5 extends Vue {
    created() {
        this.$store.commit(types.SET_HTML_TITLE, this.$i18n.t('nav.api'));
        this.$store.commit(types.SET_TITLE, 'nav.api');

        this.$store.commit(types.CLEAR_DOC_TREE);

        // TODO
    }
}
</script>
