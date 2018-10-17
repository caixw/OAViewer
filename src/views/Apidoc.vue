<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Headers extends Vue {
  private data: Object = {}

  public load(url: string) {
    fetch(url).then(resp => {
      // TODO
    }).catch(reason => {
      console.error('加载文档内容失败：', reason)
    })
  }
}
</script>
