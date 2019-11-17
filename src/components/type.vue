<!-- SPDX-License-Identifier: MIT -->

<!--
Type 用于描述文档中表示类型的文档
-->

<template>
    <article :id="id">
        <h3>{{type.name}}</h3>

        <section v-html="$i18n.t(id)" />

        <v-simple-table dense v-if="hasItems">
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
                <tr v-for="(item, index) in type.items" :key="index">
                    <th>{{item.name}}</th>
                    <td>{{item.type}}</td>
                    <td>{{item.required}}</td>
                    <td>{{$i18n.t(id + '.' + item.name)}}</td>
                </tr>
            </tbody>
        </template>
        </v-simple-table>
    </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as types from '@/config/types';
import VueI18n from 'vue-i18n';

@Component
export default class Type extends Vue {
    @Prop()
    type?: types.Type;

    // 获取当前对象的名称
    //
    // 该名称会被当作 ID 使用，同时也被当作从翻译内容中获取相关翻译的前缀字符。
    get id(): string {
        if (this.type === undefined) {
            return '';
        }

        return 'type.' + this.type.name;
    }

    get hasItems(): boolean {
        return (this.type !== undefined) &&
            (this.type.items !== undefined) &&
            (this.type.items.length > 0)
    }
}
</script>
