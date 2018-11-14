<template>
  <div>
    <code>{{schema}}</code>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Schema } from './types'

@Component
export default class VSchema extends Vue {
  @Prop()
  schema?: Schema
}
</script>
