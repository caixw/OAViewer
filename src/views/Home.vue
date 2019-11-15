<template>
<div>
    <article>
        <h2>{{$i18n.t('doc.about')}}</h2>
        {{$i18n.t('doc.about.content')}}
    </article>

    <article>
        <h2>{{$i18n.t('doc.usage')}}</h2>
        {{$i18n.t('doc.usage.content')}}
    </article>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueI18n from 'vue-i18n';

@Component
export default class Home extends Vue {
    name: 'Home'
}
</script>
