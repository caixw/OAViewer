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

    <!--v-example :example="response.example" /-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Response } from './types'
import { DataTableHeadersItem } from '../../vuetify-types'
import { checkbox } from '../../utils'
import VSchema from './Schema.vue'
import VExample from './Example.vue'

@Component({
  components:{
  VSchema,
  VExample
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

  private checkbox(check: boolean): string {
    return checkbox(check)
  }
}
</script>
