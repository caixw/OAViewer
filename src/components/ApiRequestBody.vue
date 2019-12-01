<!-- SPDX-License-Identifier: MIT -->

<template>
    <fragment>
        <tr>
            <th>{{prefix}}{{param.$attr.name}}</th>
            <td>{{param.$attr.type}}</td>
            <td>
                <v-icon>{{checkbox(param.$attr.optional)}}</v-icon>
                {{param.$attr.default}}
            </td>
            <td v-html="description" />
        </tr>
        <template v-if="hasParams(param.param)">
            <x-api-request-body v-for="(p, index) of [...param.param]" :key="index" :prefix="namePrefix" :param="p" />
        </template>
    </fragment>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Fragment } from 'vue-fragment';
import * as apidoc from '@/components/apidoc';
import marked from 'marked';
import config from '@/config/config';

@Component({
    name: 'x-api-request-body',
    components: { Fragment }
})
export default class XApiRequestBody extends Vue {
    @Prop() readonly param!: apidoc.Param | apidoc.RequestBody;
    @Prop({ default: '' }) readonly prefix!: string;

    get namePrefix(): string {
        if (!this.param.$attr.name) {
            return '';
        }

        return this.prefix + this.param.$attr.name + '.';
    }

    get description(): string {
        return apidoc.getDescription(this.param.$attr.summary, this.param.description);
    }

    hasParams(param?: apidoc.Param[] | apidoc.Param): boolean {
        return apidoc.notEmpty(param);
    }

    checkbox(optional: boolean): string {
        return optional ? 'mdi-checkbox-blank-outline' : 'mdi-check-box-outline';
    }
}
</script>
