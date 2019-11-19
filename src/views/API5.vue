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
        this.$store.commit(types.SET_HTML_TITLE, 'API');
        this.$store.commit(types.SET_TITLE, 'API');

        this.$store.commit(types.CLEAR_DOC_TREE);

        // TODO
    }
}
</script>
