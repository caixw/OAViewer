<!-- SPDX-License-Identifier: MIT -->

<template>
    <div>
        <h2 class="title">{{$i18n.t('api.callback')}}</h2>
    </div>
</template>

<style scoped>

</style>

<script lang="ts">
import 'reflect-metadata';
import { Component, Vue, Prop } from 'vue-property-decorator';
import * as apidoc from '@/components/apidoc.ts';

@Component
export default class XCallback extends Vue {
    @Prop() readonly callback!: apidoc.Callback;
}
</script>
