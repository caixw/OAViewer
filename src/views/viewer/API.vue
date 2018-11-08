<template>
  <div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { API } from './types'

@Component
export default class VAPI extends Vue {
  @Prop()
  data?: API
}
</script>
