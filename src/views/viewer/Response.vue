<template>
  <div>
    <h3 class="subheading" v-if="response.mimetype != '*'">{{response.mimetype}}</h3>

    <v-data-table v-if="hasHeaders"
    :headers="paramsHeaders"
    :items="response.headers"
    :hide-actions="true">
      <template slot="headerCell" slot-scope="props">
        <span v-t="props.header.locale" />
      </template>

      <template slot="items" slot-scope="props">
        <th class="text-xs-left">{{props.item.name}}</th>
        <td><v-icon>{{checkbox(!props.item.optional)}}</v-icon></td>
        <td v-html="props.item.summary" />
      </template>
    </v-data-table>

    <v-schema :schema="response.type" />

    <!-- examples -->
    <h4 v-if="hasExamples" class="subheading pl-3 mt-3" v-t="'viewer.api.examples'" />
    <v-tabs v-if="hasExamples">
      <v-tab v-for="(exp, index) of response.examples" :key="index">{{exp.mimetype}}</v-tab>

      <v-tab-item v-for="(exp, index) of response.examples" :key="index">
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
import { Response } from './types'
import { DataTableHeadersItem } from '../../vuetify-types'
import { checkbox } from '../../utils'
import VSchema from './Schema.vue'

@Component({
  components:{
  VSchema
  }
  })
export default class VResponse extends Vue {
  @Prop()
  response?: Response

  private paramsHeaders: Array<DataTableHeadersItem> = [
    {
      locale: 'viewer.api.header-name',
      value: 'name',
      align: 'left',
      width: '3rem'
    },
    {
      locale: 'viewer.api.header-required',
      value: 'required',
      width: '3rem'
    },
    {
      locale: 'viewer.api.header-summary',
      sortable: false,
      value: 'summary'
    }
  ]

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
