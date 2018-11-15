<template>
  <div>
    <h3 class="subheading" v-if="request.mimetype != '*'">{{request.mimetype}}</h3>

    <v-headers :headers="request.headers" v-if="hasHeaders" />

    <v-schema :schema="request.type" />

    <v-examples :examples="request.examples" v-if="hasExamples" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Request } from './types'
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
