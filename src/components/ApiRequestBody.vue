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
            <td>{{description}}</td>
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
import * as apidoc from '@/components/apidoc.ts';

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
        let content = this.param.description ? this.param.description : this.param.$attr.summary;

        const enums = apidoc.arrays(this.param.enum);
        if (enums.length === 0) {
            return content;
        }

        content += '<br /><ul>';
        for (const e of enums) {
            content += `<li>${e.$attr.value}: ${e.$text}</li>`;
        }
        content += '</ul>';

        return content;
    }

    hasParams(param?: apidoc.Param[] | apidoc.Param): boolean {
        return apidoc.notEmpty(param);
    }

    checkbox(optinal: boolean): string {
        return optinal ? 'mdi-checkbox-blank-outline' : 'mdi-check-box-outline';
    }
}
</script>
