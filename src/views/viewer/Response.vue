<template>
  <div>
    <h3 class="display-1 mt-1 pl-3 pr-3 pt-1 pb-1 primary" v-if="response.mimetype != '*'">{{response.mimetype}}</h3>

    <v-headers :headers="response.headers" v-if="hasHeaders" />

    <v-schema :schema="response.type" />

    <v-examples :examples="response.examples" v-if="hasExamples" />
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
import { Response } from './types'
import { DataTableHeadersItem } from '../../vuetify-types'
import { checkbox } from '../../utils'
import VSchema from './Schema.vue'
import VHeaders from './Headers.vue'
import VExamples from './Examples.vue'

@Component({
  components:{
  VSchema,
  VHeaders,
  VExamples
  }
  })
export default class VResponse extends Vue {
  @Prop()
  response?: Response

  /**
   * 是否存在报头内容
   */
  private get hasHeaders(): boolean {
    return !!this.response &&
      !!this.response.headers &&
      this.response.headers.length > 0
  }

  /**
   * 是否存在示例代码
   */
  private get hasExamples(): boolean {
    return !!this.response &&
      !!this.response.examples &&
      this.response.examples.length > 0
  }

  private checkbox(check: boolean): string {
    return checkbox(check)
  }
}
</script>
