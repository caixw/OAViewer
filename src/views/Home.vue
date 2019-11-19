<!-- SPDX-License-Identifier: MIT -->

<template>
    <div>
        <x-doc-tree v-for="(item, index) of tree" :key="index" :tree="item" :level="2" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import XDocTree from '@/components/DocTree.vue';
import { DocTree } from '@/components/DocTree.ts';
import { apidocYAML, types as specTypes } from '@/config/types.ts';
import * as types from '@/store/types.ts';

@Component({
    components: { XDocTree }
})
export default class Home extends Vue {
    get tree(): DocTree[] {
        return this.$store.state.docTree;
    }

    created() {
        this.$store.commit(types.SET_HTML_TITLE);
        this.$store.commit(types.SET_TITLE, 'nav.home');

        this.$store.commit(types.CLEAR_DOC_TREE);

        // about
        const about = new DocTree('doc-intro', 'doc.intro', 'doc.intro.content');
        this.$store.commit(types.ADD_DOC_TREE, about);

        // usage
        const usage = new DocTree('doc-usage', 'doc.usage', '');
        usage.add('install', 'doc.usage.install', 'doc.usage.install.content');
        usage.add('env', 'doc.usage.env', 'doc.usage.env.content');
        usage.add('cli', 'doc.usage.cli', 'doc.usage.cli.content');
        usage.addType('apidoc-yaml', 'type.apidoc.yaml', apidocYAML);
        this.$store.commit(types.ADD_DOC_TREE, usage);

        // spec
        const spec = new DocTree('doc-spec', 'doc.spec', '');
        for (const val of specTypes) {
            spec.addType(val.name.replace('.', '-'), 'type.' + val.name, val);
        }
        this.$store.commit(types.ADD_DOC_TREE, spec);
    }
}
</script>
