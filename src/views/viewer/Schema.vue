<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>test</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn-toggle>
        <v-btn flat @click="list=false">schema</v-btn>
        <v-btn flat @click="list=true">list</v-btn>
      </v-btn-toggle>
    </v-toolbar>

    <code v-show="!list" class="code overflow-y-hidden pr-1 pl-1 pt-1 pb-1">{{schema}}</code>

    <code v-show="list" class="code overflow-y-hidden pr-1 pl-1 pt-1 pb-1">{{schema.type}}</code>
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

  private list: boolean = false
}
</script>
