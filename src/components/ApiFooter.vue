<!-- SPDX-License-Identifier: MIT -->

<template>
    <fragment>
        <p class="mt-2 mb-1" v-if="license" v-html="$i18n.t('footer.api.license', $i18n.locale, {license})" />
        <p class="mt-1 mb-2" v-html="$i18n.t('footer.api.created', $i18n.locale, {created:build})" />
        <p class="mt-1 mb-2" v-html="$i18n.t('footer.api.created_contact', $i18n.locale, {created:build, contact})" />
    </fragment>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Fragment } from 'vue-fragment';

@Component({
    components: { Fragment }
})
export default class XApiFooter extends Vue {
    build = '';
    contact = '';
    license = '';

    created() {
        this.build = this.$store.state.apiFooter!.created;

        this.contact = this.getContact();
        this.license = this.getLicense();
    }

    getContact(): string {
        const c = this.$store.state.apiFooter!.contact;
        if (c === undefined) {
            return '';
        }

        let href = c.url;
        if (href === undefined) {
            href = 'mailto:' + c.email;
        }

        return `<a href="${href}">${c.name}</a>`;
    }

    getLicense(): string {
        const c = this.$store.state.apiFooter!.license;
        if (c === undefined) {
            return '';
        }
        return `<a href="${c.url}">${c.name}</a>`;
    }
}
</script>

<style scoped>

</style>
