<!-- SPDX-License-Identifier: MIT -->

<!--
TreeSidebar 树型目录结构的侧边栏
-->

<template>
<div>
    <v-toolbar color="primary">
        <img src="../assets/logo.svg" class="app-logo" alt="logo" />
        <v-toolbar-title>APIDOC</v-toolbar-title>
    </v-toolbar>

    <template v-for="(item, index) in tree">
        <v-list v-if="item.items===undefined || item.items.length===0" :key="index">
            <v-list-item :to="{hash:item.id}">
                <v-list-item-content>{{item.titleText($i18n)}}</v-list-item-content>
            </v-list-item>
        </v-list>

        <v-list-group v-else :key="index">
            <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title>{{item.titleText($i18n)}}</v-list-item-title>
                </v-list-item-content>
            </template>

            <v-list-item v-for="(sub, key) in item.items" :key="key" :to="{hash:sub.id}">
                <v-list-item-title>{{sub.titleText($i18n)}}</v-list-item-title>
            </v-list-item>
        </v-list-group>
    </template>
</div>
</template>

<style scoped>
.app-logo {
    width: 32px;
    height: 32px;
    margin-right: 10px;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { DocTree } from '@/components/DocTree.ts';

@Component
export default class DocTreeSidebar extends Vue {
    get tree(): DocTree[] {
        return this.$store.state.docTree;
    }
}
</script>
