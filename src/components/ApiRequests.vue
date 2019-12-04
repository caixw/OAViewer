<!-- SPDX-License-Identifier: MIT -->

<template>
    <fragment>
        <v-tabs v-model="tab">
            <v-tab v-for="(req, index) of requests"
                :key="index"
                class="subtitle-2 my-2 primary--text"
            >{{getTitle(req)}}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item v-for="(req, index) of requests" :key="index">
                <x-api-param
                    v-if="showHeaders(req)"
                    :params="[...req.header]"
                    title="api.header"
                />

                <div v-if="showBody(req)">
                    <h4 class="subtitle-2">{{$i18n.t('api.body')}}</h4>
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
                                <x-api-request-body :param="req" />
                            </tbody>
                        </template>
                    </v-simple-table>
                </div>
            </v-tab-item>
        </v-tabs-items>
    </fragment>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Fragment } from 'vue-fragment';
import * as apidoc from '@/components/apidoc';
import XApiRequestBody from '@/components/ApiRequestBody.vue';
import XApiParam from '@/components/ApiParam.vue';

@Component({
    components: { XApiRequestBody, XApiParam, Fragment }
})
export default class XApiRequests extends Vue {
    private tab: any = null;

    @Prop() requests!: apidoc.RequestBody[];

    getTitle(req: apidoc.RequestBody): string {
        let title = req.$attr.mimetype;
        if (req.$attr.status !== undefined) {
            title += '(' + req.$attr.status.toString() + ')';
        }

        return title;
    }

    showHeaders(req: apidoc.RequestBody): boolean {
        return apidoc.notEmpty(req.header);
    }

    showBody(body: apidoc.RequestBody): boolean {
        return body.$attr.type !== 'none';
    }
}
</script>
