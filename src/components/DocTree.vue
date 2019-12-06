<!-- SPDX-License-Identifier: MIT -->

<!--
XDocType 将 DocTree 描述的内容渲染为文档
-->

<template>
    <article :id="tree.id">
        <h1 v-if="level===1" class="headline font-weight-bold mt-6 mb-2">{{title}}</h1>
        <h2 v-if="level===2" class="title mt-6 mb-2">{{title}}</h2>
        <h3 v-else-if="level===3" class="subtitle-1 font-weight-bold mt-3 mb-2">{{title}}</h3>
        <h4 v-else-if="level===4" class="subtitle-1 font-weight-bold mt-3 mb-2">{{title}}</h4>
        <h5 v-else-if="level===5" class="subtitle-1 font-weight-bold mt-3 mb-2">{{title}}</h5>
        <h6 v-else>{{tree.title}}</h6>

        <section v-if="tree.content.length>0" v-html="tree.contentText($i18n)" />

        <v-simple-table dense v-if="hasTypeItems" class="transparent">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th v-html="$i18n.t('type.table.header.name')" />
                        <th v-html="$i18n.t('type.table.header.type')" />
                        <th v-html="$i18n.t('type.table.header.required')" />
                        <th v-html="$i18n.t('type.table.header.description')" />
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tree.contentType.items" :key="index">
                        <th>{{item.name}}</th>
                        <td>{{item.type}}</td>
                        <td :aria-label="item.required">
                            <v-icon aria-hidden="true">{{checkbox(item.required)}}</v-icon>
                        </td>
                        <td v-html="$i18n.t(tree.i18nPrefix + '.' + item.name)" />
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <x-doc-tree v-for="(sub, index) in tree.items" :key="index" :tree="sub" :level="level+1" />
    </article>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';
import VueI18n from 'vue-i18n';
import { DocTree } from '@/components/DocTree.ts';

@Component({
    name: 'XDocTree'
})
export default class XDocTree extends Vue {
    @Prop() readonly tree!: DocTree;

    // 标题的级别，表示 h1、h2 等
    @Prop({ default: 1 }) readonly level!: number;

    // 当前文档的标题
    get title(): string {
        if (this.tree === undefined) {
            return '';
        }

        return this.tree.titleText(this.$i18n);
    }

    get hasTypeItems(): boolean {
        // TODO ts 3.7 可以使用 this.type?.items?.length > 0 代替？
        return (this.tree !== undefined) &&
            (this.tree.contentType !== undefined) &&
            (this.tree.contentType.items !== undefined) &&
            (this.tree.contentType.items.length > 0);
    }

    checkbox(required: boolean): string {
        return required ? 'mdi-check-box-outline' : 'mdi-checkbox-blank-outline';
    }
}
</script>
