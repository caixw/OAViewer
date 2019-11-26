<!-- SPDX-License-Identifier: MIT -->

<template>
    <div>
        <x-app-bar />

        <v-list>
            <v-subheader>
                <v-icon class="mr-2">mdi-server</v-icon>
                {{$i18n.t('filter.server')}}
            </v-subheader>

            <v-list-item v-for="(val, index) of Array.from(servers.keys())" :key="index">
                <v-list-item-action>
                    <v-checkbox v-model="selectedServers" :value="val" />
                </v-list-item-action>
                <v-list-item-title>{{val}}</v-list-item-title>
            </v-list-item>
        </v-list>

        <v-list>
            <v-subheader>
                <v-icon class="mr-2">mdi-filter</v-icon>
                {{$i18n.t('filter.method')}}
            </v-subheader>

            <v-list-item v-for="(val, index) of Array.from(methods.keys())" :key="index">
                <v-list-item-action>
                    <v-checkbox v-model="selectedMethods" :value="val" />
                </v-list-item-action>
                <v-list-item-title>{{val}}</v-list-item-title>
            </v-list-item>
        </v-list>

        <v-list>
            <v-subheader>
                <v-icon class="mr-2">mdi-tag-multiple</v-icon>
                {{$i18n.t('filter.tag')}}
            </v-subheader>

            <v-list-item v-for="(val, index) of Array.from(tags.keys())" :key="index">
                <v-list-item-action>
                    <v-checkbox v-model="selectedTags" :value="val" />
                </v-list-item-action>
                <v-list-item-title>{{val}}</v-list-item-title>
            </v-list-item>
        </v-list>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import XAppBar from '@/components/AppBar.vue';
import * as types from '@/store/types.ts';

@Component({
    components: { XAppBar }
})
export default class XAPISidebar extends Vue {
    selectedMethods: string[] = Array.from(this.methods.keys());
    selectedServers: string[] = Array.from(this.servers.keys());
    selectedTags: string[] = Array.from(this.tags.keys());

    @Watch('selectedMethods')
    onMethodsChange(val: any, old: any) {
        this.$store.commit(types.SET_METHOD_FILTER, this.selectedMethods);
    }

    @Watch('selectedServers')
    onServersChange(val: any, old: any) {
        this.$store.commit(types.SET_SERVER_FILTER, this.selectedServers);
    }

    @Watch('selectedTags')
    onTagsChange(val: any, old: any) {
        this.$store.commit(types.SET_TAG_FILTER, this.selectedTags);
    }

    get methods(): Map<string, boolean> {
        return this.$store.state.filter.methods;
    }

    get servers(): Map<string, boolean> {
        return this.$store.state.filter.servers;
    }

    get tags(): Map<string, boolean> {
        return this.$store.state.filter.tags;
    }
}
</script>
