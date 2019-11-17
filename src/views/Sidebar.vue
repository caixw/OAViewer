<!-- SPDX-License-Identifier: MIT -->

<template>
    <div>
        <v-toolbar color="primary">
            <img src="../assets/logo.svg" class="app-logo" alt="logo" />
            <v-toolbar-title>APIDOC</v-toolbar-title>
        </v-toolbar>

        <v-list dense>
            <v-list-item link>
                <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link>
                <v-list-item-action>
                    <v-icon>mdi-contact-mail</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Contact</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>

<style scoped>
.app-logo {
    width: 32px;
    height: 32px;
    margin-right: 10px;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Sidebar extends Vue { }
</script>
