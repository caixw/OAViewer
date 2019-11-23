<!-- SPDX-License-Identifier: MIT -->

<template>
    <v-expansion-panel>
        <v-expansion-panel-header class="my-0 py-0">
            <h2>
                <v-chip class="action d-inline-block mr-3 text-center" :color="methodColor(api.$attr.method)" label>
                    {{api.$attr.method}}
                </v-chip>
                <span class="subtitle-1">{{api.path.$attr.path}}</span>
            </h2>
            <span class="subtitle-1 text-right mr-3">{{api.$attr.summary}}</span>
        </v-expansion-panel-header>
            <v-divider />
        <v-expansion-panel-content>
            <section>{{api.description}}</section>
            <v-divider />

            <!-- api body -->
            <div class="d-flex flex-column flex-sm-row justify-space-between">
                <div class="flex-grow-1 flex-shrink-1 mr-2 left">
                    <p class="subtitle-2">{{$i18n.t('api.request')}}</p>
                    <x-api-param v-if="hasParams(api.path.param)" :params="[...api.path.param]" title="api.param" />
                    <x-api-param v-if="hasParams(api.path.query)" :params="[...api.path.query]" title="api.query" />
                    <x-api-param v-if="hasParams(api.header)" :params="[...api.header]" title="api.header" />

                    <template v-for="(request, index) of requests">
                        <h3 :key="index">{{request.$attr.mimetype}}</h3>
                        <x-api-param :key="`a-${index}`" v-if="hasParams(request.header)" :params="[...request.header]" title="api.header" />
                        <x-api-request :key="`b-${index}`" :params="[request]" title="api.body" />
                    </template>
                </div>

                <div class="flex-grow-1 flex-shrink-1">
                    <p class="subtitle-2">{{$i18n.t('api.response')}}</p>
                    <template v-for="(request, index) of responses">
                        <h3 :key="index">{{request.$attr.mimetype}}({{request.$attr.status}})</h3>
                        <x-api-param :key="`a-${index}`" v-if="hasParams(request.header)" :params="[...request.header]" title="api.header" />
                        <x-api-request :key="`b-${index}`" :params="[request]" title="api.body" />
                    </template>
                </div>
            </div>

            <!-- callback -->
            <div>
                <p>callback</p>
            </div>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<style scoped>
.action {
    min-width: 4.8rem;
}

.left {
    border-right: 1px dotted;
}
</style>

<script lang="ts">
import config from '@/config/config.ts';
import * as apidoc from '@/components/apidoc.ts';
import { Component, Prop, Vue } from 'vue-property-decorator';
import XApiParam from '@/components/ApiParam.vue';
import XApiRequest from '@/components/ApiRequest.vue';

@Component({
    components: { XApiParam, XApiRequest }
})
export default class XApi extends Vue {
    @Prop()
    api!: apidoc.Api;

    get requests(): apidoc.RequestBody[] {
        return apidoc.arrays(this.api.request);
    }

    get responses(): apidoc.RequestBody[] {
        return apidoc.arrays(this.api.response);
    }

    methodColor(method: string): string {
        const color = config.methodsColor.get(method.toLowerCase());
        if (color !== undefined) {
            return color;
        }
        return 'info';
    }

    hasParams(param?: apidoc.Param[] | apidoc.Param | apidoc.RequestBody[] | apidoc.RequestBody): boolean {
        return apidoc.notEmpty(param);
    }
}
</script>
