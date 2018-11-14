<template>
  <v-tabs right>
    <v-tab>schema</v-tab>
    <v-tab>list</v-tab>

    <v-tab-item>
      <code class="code overflow-y-hidden pr-1 pl-1 pt-1 pb-1">{{schema}}</code>
    </v-tab-item>

    <v-tab-item>
      {{schema}}
    </v-tab-item>
  </v-tabs>
</template>

<style scoped>
.code {
  box-shadow: none;
  width: 100%
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Schema } from './types'

@Component
export default class VSchema extends Vue {
  @Prop()
  schema?: Schema
}
</script>
