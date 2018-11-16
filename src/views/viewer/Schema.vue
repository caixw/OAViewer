<template>
  <div>
    <v-toolbar flat dense>
      <v-toolbar-title v-t="'viewer.api.schema'" />
      <v-spacer></v-spacer>
      <v-btn-toggle v-model="state">
        <v-btn flat value="schema"><v-icon>code</v-icon></v-btn>
        <v-btn flat value="list"><v-icon>list</v-icon></v-btn>
      </v-btn-toggle>
    </v-toolbar>

    <v-card flat class="pl-2 pr-2 pt-2 pb-2">
    <code v-show="state=='schema'" class="code overflow-y-hidden pr-1 pl-1 pt-1 pb-1">{{schema}}</code>
    <code v-show="state=='list'" class="code overflow-y-hidden pr-1 pl-1 pt-1 pb-1">{{schema.type}}</code>
    </v-card>
  </div>
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

  private state: 'list'|'schema' = 'schema'
}
</script>
