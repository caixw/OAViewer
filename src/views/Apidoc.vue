<template>
  <div>
    <v-snackbar v-model="snackbar.visible" v-t="snackbar.text" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import yaml from 'js-yaml'

@Component
export default class Headers extends Vue {
  private snackbar = {
    visible: false,
    text: ''
  }
  private data: Object = {}

  /**
   * 加载数据
   */
  public load() {
    const url = this.$route.query['url']
    let type = this.$route.query['type']
    if (type === '') {
      type = url.substring(url.lastIndexOf('.')+1)
    }
    if (type === '') {
      console.error('无法判断类型')
      alert('必须指定文件类型') // TODO 用 dialog 表示
    }

    fetch(url).then(resp => {
      return resp.text()
    }).then(data => {
      switch (type) {
        case 'json':
          this.data = JSON.parse(data)
          break
        case 'yaml':
          this.data = yaml.load(data)
          break
      }
    }).catch(reason => {
      console.error('加载文档内容失败：', reason)
    })
  }

  public mounted() {
    this.load()
  }
}
</script>
