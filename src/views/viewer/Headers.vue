<template>
  <div>
    <v-toolbar flat dense><v-toolbar-title v-t="'viewer.api.headers'" /></v-toolbar>
    <v-data-table
    :headers="paramsHeaders"
    :items="headers"
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Header } from './types'
import { DataTableHeadersItem } from '../../vuetify-types'
import { checkbox } from '../../utils'

@Component
export default class VHeaders extends Vue {
  @Prop()
  headers?: Header[] // NOTE: 数组属性必须为空值，否则会提示出错

  private paramsHeaders: DataTableHeadersItem[] = [
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

  private checkbox(check: boolean): string {
    return checkbox(check)
  }
}
</script>
