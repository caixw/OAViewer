<!-- SPDX-License-Identifier: MIT -->

<template>
    <fragment>
        <tr>
            <th>{{prefix}}{{param.name}}</th>
            <td>{{typeName}}</td>
            <td>
                <v-icon>{{checkbox(param.optional)}}</v-icon>
                {{param.default}}
            </td>
            <td v-html="description" />
        </tr>
        <template v-if="hasParams(param.params)">
            <x-api-request-body
                v-for="(p, index) of [...param.params]"
                :key="index"
                :prefix="namePrefix"
                :param="p"
            />
        </template>
    </fragment>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Fragment } from 'vue-fragment';
import * as apidoc from '@/components/apidoc';

@Component({
    name: 'x-api-request-body',
    components: { Fragment }
})
export default class XApiRequestBody extends Vue {
    @Prop() readonly param!: apidoc.Param | apidoc.RequestBody;
    @Prop({ default: '' }) readonly prefix!: string;

    get namePrefix(): string {
        if (!this.param.name) {
            return '';
        }

        return this.prefix + this.param.name + '.';
    }

    get typeName(): string {
        if (this.param.array) {
            return this.param.type + '[]';
        }
        return this.param.type;
    }

    get description(): string {
        const dest = apidoc.getDescription(this.param.summary, this.param.description);
        return apidoc.getDescriptionWithEnum(dest, this.param.enums);
    }

    hasParams(param?: apidoc.Param[]): boolean {
        return param !== undefined && param.length > 0;
    }

    checkbox(optional: boolean): string {
        return optional ? 'mdi-checkbox-blank-outline' : 'mdi-check-box-outline';
    }
}
</script>
