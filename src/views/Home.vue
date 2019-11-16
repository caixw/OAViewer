<template>
<div>
    <article>
        <h2>{{$i18n.t('doc.about')}}</h2>
        <section v-html="$i18n.t('doc.about.content')" />
    </article>

    <article>
        <h2>{{$i18n.t('doc.usage')}}</h2>

        <h3>{{$i18n.t('doc.usage.install')}}</h3>
        <section v-html="$i18n.t('doc.usage.install.content')" />

        <h3>{{$i18n.t('doc.usage.env')}}</h3>
        <section v-html="$i18n.t('doc.usage.env.content')" />

        <h3>{{$i18n.t('doc.usage.cli')}}</h3>
        <section v-html="$i18n.t('doc.usage.cli.content')" />
    </article>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueI18n from 'vue-i18n';

@Component
export default class Home extends Vue {}
</script>
