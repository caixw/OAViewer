<!-- SPDX-License-Identifier: MIT -->

<template>
    <v-expansion-panel>
        <v-expansion-panel-header class="my-0 py-0">
            <h2 :class="api.$attr.deprecated ? 'deprecated' : ''">
                <v-chip
                    class="action d-inline-block mr-3 text-center"
                    :color="methodColor(api.$attr.method)"
                    label
                >{{api.$attr.method}}</v-chip>
                <span class="subtitle-1">{{api.path.$attr.path}}</span>
            </h2>
            <span class="subtitle-1 text-right mr-3">{{api.$attr.summary}}</span>
        </v-expansion-panel-header>
        <v-divider />

        <v-expansion-panel-content>
            <section v-if="api.description" v-html="description" />
            <v-divider />

            <!-- api body -->
            <v-row>
                <v-col cols="12" sm="6">
                    <p class="subtitle-1">{{$i18n.t('api.request')}}</p>
                    <x-api-param
                        v-if="hasParams(api.path.param)"
                        :params="[...api.path.param]"
                        title="api.param"
                    />
                    <x-api-param
                        v-if="hasParams(api.path.query)"
                        :params="[...api.path.query]"
                        title="api.query"
                    />
                    <x-api-param
                        v-if="hasParams(api.header)"
                        :params="[...api.header]"
                        title="api.header"
                    />

                    <x-api-requests :requests="requests" />
                </v-col>

                <v-col cols="12" sm="6">
                    <p class="subtitle-1">{{$i18n.t('api.response')}}</p>
                    <x-api-requests :requests="responses" />
                </v-col>
            </v-row>

            <x-callback v-if="api.callback" :callback="api.callback" />
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<style scoped>
.action {
    min-width: 4.8rem;
}
</style>

<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';
import config from '@/config/config.ts';
import * as apidoc from '@/components/apidoc.ts';
import XApiParam from '@/components/ApiParam.vue';
import XApiRequests from '@/components/ApiRequests.vue';
import XCallback from '@/components/Callback.vue';

@Component({
    components: { XApiParam, XApiRequests, XCallback }
})
export default class XApi extends Vue {
    @Prop() readonly api!: apidoc.Api;

    get requests(): apidoc.RequestBody[] {
        return apidoc.arrays(this.api.request);
    }

    get responses(): apidoc.RequestBody[] {
        return apidoc.arrays(this.api.response);
    }

    get description(): string {
        return apidoc.getDescription(this.api.$attr.summary, this.api.description);
    }

    methodColor(method: string): string {
        const color = config.methodsColors.get(method.toLowerCase());
        if (color !== undefined) {
            return color;
        }
        return 'info';
    }

    hasParams(param?: apidoc.Param[] | apidoc.Param): boolean {
        return apidoc.notEmpty(param);
    }
}
</script>
