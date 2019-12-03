<!-- SPDX-License-Identifier: MIT -->

<template>
    <fragment>
        <template v-for="(req, index) of requests">
            <h3
                :key="`a-${index}`"
                class="subtitle-2 my-2 primary--text"
            >{{req.$attr.mimetype}}({{req.$attr.status}})</h3>

            <x-api-param
                :key="`b-${index}`"
                v-if="showHeaders(req)"
                :params="[...req.header]"
                title="api.header"
            />

            <div v-if="showBody(req)" :key="`c-${index}`">
                <h4 class="subtitle-2">{{$i18n.t('api.body')}}</h4>
                <v-simple-table dense :key="`d-${index}`">
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
                            <x-api-request-body :param="req" />
                        </tbody>
                    </template>
                </v-simple-table>
            </div>
        </template>
    </fragment>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Fragment } from 'vue-fragment';
import * as apidoc from '@/components/apidoc.ts';
import XApiRequestBody from '@/components/ApiRequestBody.vue';
import XApiParam from '@/components/ApiParam.vue';

@Component({
    components: { XApiRequestBody, XApiParam, Fragment }
})
export default class XApiRequests extends Vue {
    @Prop() readonly requests!: apidoc.RequestBody[];

    showHeaders(req: apidoc.RequestBody): boolean {
        return apidoc.notEmpty(req.header);
    }

    showBody(body: apidoc.RequestBody): boolean {
        return body.$attr.type !== 'none';
    }
}
</script>
