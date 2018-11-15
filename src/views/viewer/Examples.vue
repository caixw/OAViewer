<template>
  <div>
    <v-toolbar flat dense>
      <v-toolbar-title v-t="'viewer.api.examples'" />
      <v-spacer></v-spacer>
      <v-btn-toggle v-model="type" v-if="showSwitcher">
        <v-btn flat v-for="(exp, index) of examples" :key="index" :value="exp.mimetype">{{index}}/{{exp.mimetype}}</v-btn>
      </v-btn-toggle>
    </v-toolbar>
    <v-card v-for="(exp, index) of examples" :key="index"
    v-show="state=exp.mimetype"
    class="pl-2 pr-2 pt-2 pb-2">
      <p>{{exp.summary}}</p>
      <code class="code">{{exp.value}}</code>
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
import { Example } from './types'

@Component
export default class VExamples extends Vue {
  @Prop()
  examples?: Example[] // NOTE: 数组属性必须为空值，否则会提示出错

  private type: string = '*'

  /**
   * 是否存在多条示例代码。
   */
  private get showSwitcher(): boolean {
    return !!this.examples && this.examples.length > 1
  }
}
</script>
