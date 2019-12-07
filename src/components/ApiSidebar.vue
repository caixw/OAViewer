<!-- SPDX-License-Identifier: MIT -->

<template>
    <div>
        <v-list>
            <v-subheader>
                <v-icon class="mr-2">mdi-server</v-icon>
                {{$i18n.t('filter.server')}}
            </v-subheader>

            <v-list-item-group multiple v-model="selectedServers">
                <v-list-item two-line v-for="(srv, index) of servers" :key="index" :value="srv.name">
                    <template v-slot:default="{active,toggle}">
                        <v-list-item-action>
                            <v-checkbox v-model="active" @click="toggle" />
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{srv.name}}</v-list-item-title>
                            <v-list-item-subtitle>{{srv.url}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </template>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <v-divider />

        <v-list>
            <v-subheader>
                <v-icon class="mr-2">mdi-filter</v-icon>
                {{$i18n.t('filter.method')}}
            </v-subheader>

            <v-list-item-group multiple v-model="selectedMethods">
                <v-list-item v-for="(method, index) of methods" :key="index" :value="method">
                    <template v-slot:default="{active,toggle}">
                        <v-list-item-action>
                            <v-checkbox v-model="active" @click="toggle" />
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{method}}</v-list-item-title>
                        </v-list-item-content>
                    </template>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <v-divider />

        <v-list>
            <v-subheader>
                <v-icon class="mr-2">mdi-tag-multiple</v-icon>
                {{$i18n.t('filter.tag')}}
            </v-subheader>

            <v-list-item-group multiple v-model="selectedTags">
                <v-list-item v-for="(tag, index) of tags" :key="index" :value="tag.name">
                    <template v-slot:default="{active,toggle}">
                        <v-list-item-action>
                            <v-checkbox @click="toggle" v-model="active" />
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{tag.title}}</v-list-item-title>
                        </v-list-item-content>
                    </template>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as types from '@/store/types.ts';
import * as apidoc from '@/components/apidoc.ts';

@Component
export default class XAPISidebar extends Vue {
    get selectedMethods(): string[] {
        return this.$store.state.method.filter;
    }
    set selectedMethods(val: string[]) {
        this.$store.commit(types.SET_METHOD_FILTER, val);
    }

    get selectedTags(): string[] {
        return this.$store.state.tag.filter;
    }
    set selectedTags(val: string[]) {
        this.$store.commit(types.SET_TAG_FILTER, val);
    }

    get selectedServers(): string[] {
        return this.$store.state.server.filter;
    }
    set selectedServers(val: string[]) {
        this.$store.commit(types.SET_SERVER_FILTER, val);
    }

    get methods(): string[] {
        return this.$store.state.method.methods;
    }

    get servers(): apidoc.Server[] {
        return this.$store.state.server.servers;
    }

    get tags(): apidoc.Tag[] {
        return this.$store.state.tag.tags;
    }
}
</script>
