<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Response } from './types'

@Component
export default class VResponse extends Vue {
  @Prop()
  resoponse?: Response
}
</script>
