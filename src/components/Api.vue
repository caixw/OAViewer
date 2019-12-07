<!-- SPDX-License-Identifier: MIT -->

<template>
    <v-expansion-panel>
        <v-expansion-panel-header class="my-0 py-0">
            <h2 :class="api.deprecated ? 'deprecated' : ''">
                <v-chip
                    class="action d-inline-block mr-3 text-center"
                    :color="methodColor(api.method)"
                    label
                >{{api.method}}</v-chip>
                <span class="subtitle-1">{{api.path.path}}</span>
            </h2>
            <span class="subtitle-1 text-right mr-3">{{api.summary}}</span>
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
                        v-if="hasParams(api.path.params)"
                        :params="api.path.params"
                        title="api.param"
                    />
                    <x-api-param
                        v-if="hasParams(api.path.queries)"
                        :params="api.path.queries"
                        title="api.query"
                    />
                    <x-api-param
                        v-if="hasParams(api.headers)"
                        :params="api.headers"
                        title="api.header"
                    />

                    <x-api-requests :requests="api.requests" />
                </v-col>

                <v-col cols="12" sm="6">
                    <p class="subtitle-1">{{$i18n.t('api.response')}}</p>
                    <x-api-requests :requests="api.responses" />
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

    get description(): string {
        return apidoc.getDescription(this.api.summary, this.api.description);
    }

    methodColor(method: string): string {
        const color = config.methodsColors.get(method.toLowerCase());
        if (color !== undefined) {
            return color;
        }
        return 'info';
    }

    hasParams(param?: apidoc.Param[]): boolean {
        return param !== undefined && param.length > 0;
    }
}
</script>
