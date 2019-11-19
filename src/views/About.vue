<template>
    <div class="about">
        <h1>This is an about page</h1>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as types from '@/store/types.ts';

@Component
export default class About extends Vue {
    created() {
        this.$store.commit(types.SET_HTML_TITLE, this.$i18n.t('nav.about'));
        this.$store.commit(types.SET_TITLE, 'nav.about');

        this.$store.commit(types.CLEAR_DOC_TREE);

        // TODO 加载文档内容
    }
}
</script>
