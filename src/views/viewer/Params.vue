<template>
  <v-data-table
  :headers="headers"
  :items="params"
  item-key="name"
  :hide-actions="true">
    <template slot="headerCell" slot-scope="props">
      <span v-t="props.header.locale" />
    </template>

    <template slot="items" slot-scope="props">
      <th class="text-xs-left">{{props.item.name}}</th>
      <td><v-icon>{{checkbox(!props.item.optional)}}</v-icon></td>
      <td>{{props.item.type.default}}</td>
      <td>{{props.item.type.type}}</td>
      <td v-html="props.item.summary" />
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Param } from './types'
import { DataTableHeadersItem } from '../../vuetify-types'
import { methodColor } from '../../utils'

@Component
export default class VParams extends Vue {
  private headers: DataTableHeadersItem[] = [
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
      locale: 'viewer.api.header-default',
      value: 'default',
      sortable: false,
      width: '3rem'
    },
    {
      locale: 'viewer.api.header-type',
      sortable: false,
      value: 'type'
    },
    {
      locale: 'viewer.api.header-summary',
      sortable: false,
      value: 'summary'
    }
  ]

  @Prop()
  params?: Param[]

  /**
   * 生成布尔值的图标内容
   */
  private checkbox(check: boolean): string {
    return check ? 'check_box' : 'check_box_outline_blank'
  }

  public methodColor(method: string): string {
    return methodColor(this.$vuetify.theme, method)
  }
}
</script>
