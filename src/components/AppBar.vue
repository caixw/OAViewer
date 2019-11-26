<!-- SPDX-License-Identifier: MIT -->

<template>
    <v-toolbar color="primary">
        <img src="../assets/logo.svg" class="app-logo mr-3" alt="logo" />
        <v-toolbar-title class="text-uppercase">{{name}}</v-toolbar-title>
    </v-toolbar>
</template>

<style scoped>
.app-logo {
    width: 32px;
    height: 32px;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import config from '@/config/config.ts';

@Component
export default class XAppBar extends Vue {
    private name: string = config.name;
}
</script>
