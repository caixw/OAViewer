<!-- SPDX-License-Identifier: MIT -->

<template>
<div>
    <h4 class="subtitle-2">{{$i18n.t(title)}}</h4>

    <v-simple-table dense>
        <template v-slot:default>
            <thead>
                <tr>
                    <th>{{$i18n.t('api.var')}}</th>
                    <th>{{$i18n.t('api.type')}}</th>
                    <th>{{$i18n.t('api.value')}}</th>
                    <th>{{$i18n.t('api.description')}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(param, index) of params" :key="index">
                    <th>{{param.$attr.name}}</th>
                    <td>{{param.$attr.type}}</td>
                    <td>
                        <v-icon>{{checkbox(param.$attr.optional)}}</v-icon>
                        {{param.$attr.default}}
                    </td>
                    <td v-html="getDescription(param)" />
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</div>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as apidoc from '@/components/apidoc.ts';

@Component
export default class XApiParam extends Vue {
    @Prop() readonly params!: apidoc.Param[];
    @Prop() readonly title!: string;

    getDescription(param: apidoc.Param): string {
        const dest = apidoc.getDescription(param.$attr.summary, param.description);
        return apidoc.getDescriptionWithEnum(dest, param.enum);
    }

    checkbox(optional: boolean): string {
        return optional ? 'mdi-checkbox-blank-outline' : 'mdi-check-box-outline';
    }
};
</script>
