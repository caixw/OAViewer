<!-- SPDX-License-Identifier: MIT -->

<template>
    <fragment v-if="bodies.size > 0">
        <v-tabs v-model="tab">
            <v-tab v-for="(req, index) of Array.from(bodies)"
                :key="index"
            >{{getTitle(req[0])}}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item v-for="(reqs, key) of Array.from(bodies)" :key="key">
                <v-card v-for="(req, index) of reqs[1]" :key="index" flat class="mt-2">
                    <v-card-title v-if="req.status" class="subtitle-2 px-2 py-1 status">
                        <v-chip small :color="statusColor(req.status)">
                            {{req.status}}
                        </v-chip>
                    </v-card-title>
                    <x-api-param
                        v-if="showHeaders(req)"
                        :params="req.headers"
                        title="api.header"
                    />

                    <template v-if="req.type !== 'none'">
                        <h5 class="subtitle-2 px-2">{{$i18n.t('api.body')}}</h5>
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

                        <template v-if="req.example !== undefined">
                            <h5>{{$i18n.t('api.example')}}</h5>
                            <pre v-html="example(req.example)" />
                        </template>
                    </template>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </fragment>
</template>

<style scoped>
.status:hover {
    background-color: var(--v-primary-base);
}
</style>

<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Fragment } from 'vue-fragment';
import * as apidoc from '@/components/apidoc';
import XApiRequestBody from '@/components/ApiRequestBody.vue';
import XApiParam from '@/components/ApiParam.vue';
import config from '@/config/config';

@Component({
    components: { XApiRequestBody, XApiParam, Fragment }
})
export default class XApiRequests extends Vue {
    tab: any = null;
    bodies = new Map<string, apidoc.RequestBody[]>();

    @Prop() requests!: apidoc.RequestBody[];

    @Watch('requests', { immediate: true })
    onRequestsChanged(val: apidoc.RequestBody[], old: apidoc.RequestBody[]) {
        if (val.length === 0) {
            return;
        }

        this.bodies = reorganizationRequests(val);
    }

    getTitle(title: string): string {
        const index = title.indexOf('/');
        if (index < 0) {
            return title;
        }
        return title.slice(index + 1);
    }

    showHeaders(req: apidoc.RequestBody): boolean {
        return req.headers !== undefined && req.headers.length > 0;
    }

    statusColor(status?: number): string {
        if (status === undefined) {
            return 'info';
        }

        for (const color of config.statusColors) {
            if (status >= color.min && status <= color.max) {
                return color.color;
            }
        }

        return 'info';
    }

    example(example: apidoc.Example): string {
        return example.content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}

// 重新组织 apidoc.RequestBody 内容
// 按 mimetype 进行分类返回
function reorganizationRequests(requests: apidoc.RequestBody[]): Map<string, apidoc.RequestBody[]> {
    const ret = new Map<string, apidoc.RequestBody[]>();

    // all 保存着 mimetype 值为 * 的内容，在返回之前，
    // 将该元素听所有内容依赖添加至 ret 中。
    const all: apidoc.RequestBody[] = [];

    for (const req of requests) {
        if (req.mimetype === '*') {
            all.push(req);
            continue;
        }

        const types = req.mimetype.split(/\s/);

        for (const t of types) {
            if (!ret.has(t)) {
                ret.set(t, [req]);
            } else {
                ret.get(t)!.push(req);
            }
        }
    } // end for

    if (all.length === 0) {
        return ret;
    }

    if (ret.size > 0) {
        for (const key of ret.keys()) {
            ret.get(key)!.push(...all);
        }
    } else { // 只有 *
        ret.set('*', all);
    }

    return ret;
}
</script>
