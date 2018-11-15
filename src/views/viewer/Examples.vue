<template>
  <div>
    <h4 class="subheading pl-3 mt-3" v-t="'viewer.api.examples'" />
    <v-tabs>
      <v-tab v-for="(exp, index) of examples" :key="index">{{exp.mimetype}}</v-tab>

      <v-tab-item v-for="(exp, index) of examples" :key="index">
        <p>{{exp.summary}}</p>
        <code class="code">{{exp.value}}</code>
      </v-tab-item>
    </v-tabs>
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
}
</script>
