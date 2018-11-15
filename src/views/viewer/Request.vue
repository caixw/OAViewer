<template>
  <div>
    <h3 class="subheading" v-if="request.mimetype != '*'">{{request.mimetype}}</h3>

    <v-headers :headers="request.headers" v-if="hasHeaders" />

    <v-schema :schema="request.type" />

    <!-- examples -->
    <h4 v-if="hasExamples" class="subheading pl-3 mt-3" v-t="'viewer.api.examples'" />
    <v-tabs v-if="hasExamples">
      <v-tab v-for="(exp, index) of request.examples" :key="index">{{exp.mimetype}}</v-tab>

      <v-tab-item v-for="(exp, index) of request.examples" :key="index">
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
import { Request } from './types'
import { DataTableHeadersItem } from '../../vuetify-types'
import { checkbox } from '../../utils'
import VSchema from './Schema.vue'
import VHeaders from './Headers.vue'

@Component({
  components:{
  VSchema,
  VHeaders
  }
  })
export default class VRequest extends Vue {
  @Prop()
  request?: Request

  /**
   * 是否存在报头内容
   */
  private get hasHeaders(): boolean {
    return !!this.request &&
      !!this.request.headers &&
      this.request.headers.length > 0
  }

  /**
   * 是否存在示例代码
   */
  private get hasExamples(): boolean {
    return !!this.request &&
      !!this.request.examples &&
      this.request.examples.length > 0
  }

  private checkbox(check: boolean): string {
    return checkbox(check)
  }
}
</script>
