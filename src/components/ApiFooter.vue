<!-- SPDX-License-Identifier: MIT -->

<template>
    <fragment>
        <p class="mt-2 mb-1" v-if="license" v-html="$i18n.t('footer.api.license', $i18n.locale, {license})" />
        <p class="mt-1 mb-2" v-if="build && contact" v-html="$i18n.t('footer.api.created_contact', $i18n.locale, {created:build, contact})" />
        <p class="mt-1 mb-2" v-else-if="build" v-html="$i18n.t('footer.api.created', $i18n.locale, {created:build})" />
    </fragment>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Vuex from 'vuex';
import { Fragment } from 'vue-fragment';

@Component({
    components: { Fragment }
})
export default class XApiFooter extends Vue {
    get build(): string {
        return this.$store.state.apiFooter.created;
    }

    get license(): string {
        return this.$store.state.apiFooter.license;
    }

    get contact(): string {
        return this.$store.state.apiFooter.contact;
    }
}
</script>
