<!-- SPDX-License-Identifier: MIT -->

<template>
<div>
    <article id="about">
        <h2>{{$i18n.t('doc.about')}}</h2>
        <section v-html="$i18n.t('doc.about.content')" />
    </article>

    <article id="usage">
        <h2>{{$i18n.t('doc.usage')}}</h2>

        <article>
            <h3>{{$i18n.t('doc.usage.install')}}</h3>
            <section v-html="$i18n.t('doc.usage.install.content')" />
        </article>

        <article>
            <h3>{{$i18n.t('doc.usage.env')}}</h3>
            <section v-html="$i18n.t('doc.usage.env.content')" />
        </article>

        <article>
            <h3>{{$i18n.t('doc.usage.cli')}}</h3>
            <section v-html="$i18n.t('doc.usage.cli.content')" />
        </article>

        <x-type :type="apidocType" />
    </article>

    <article id="spec">
        <h2>{{$i18n.t('doc.spec')}}</h2>
        <section v-html="$i18n.t('doc.spec.content')" />

        <x-type v-for="(type, index) of types" :key="index" :type="type" />
    </article>
</div>
</template>

<script lang="ts">
import VueI18n from 'vue-i18n';
import { Component, Vue } from 'vue-property-decorator';
import { apidocYAML, types } from '@/config/types';
import XType from '@/components/type.vue';

@Component({
    components: { XType }
})
export default class Home extends Vue {
    get apidocType() {
        return apidocYAML;
    }

    get types() {
        return types;
    }
}
</script>
