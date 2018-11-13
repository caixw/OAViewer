<template>
  <div>
    <v-data-table :headers="headers" :items="items" item-key="name" :hide-actions="true">
      <template slot="headerCell" slot-scope="props">
        <span v-t="props.header.locale" />
        <v-tooltip bottom v-if="props.header.localeTip">
          <v-icon class="show" slot="activator" size="14">help</v-icon>
          <span v-t="props.header.localeTip" />
        </v-tooltip>
      </template>

      <template slot="items" slot-scope="props">
        <th>
          <div class="chip white--text" :style="{background:statusColor(props.item.status)}">{{props.item.status}}</div>
        </th>
        <td v-t="props.item.title" />
        <td v-html="$t(props.item.description)" />
        <td v-html="$t(props.item.specification)" />
      </template>
    </v-data-table>
  </div>
</template>

<style scoped>
.chip {
  min-width: 6rem;
  text-align: center !important;
  padding: .45rem .1rem;
  border-radius: 3px;
}
</style>

<script lang="ts">
import { DataTableHeadersItem } from '../vuetify-types'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Statuses extends Vue {
  private headers: Array<DataTableHeadersItem> = [
    {
      locale: 'status.header-status',
      value: 'status',
      align: 'left',
      width: '3rem'
    },
    {
      locale: 'status.header-title',
      value: 'title'
    },
    {
      locale: 'status.header-description',
      value: 'description',
      sortable: false
    },
    {
      locale: 'status.header-specification',
      value: 'specification',
      sortable: false
    }
  ]

  private items = this.getItems(100, 101, 200, 201, 202, 203, 204, 205, 206, 300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 511)

  private getItems(...statuses:number[]) :Array<Object> {
    const objs: Array<Object> = []

    for (const status of statuses) {
      objs.push({
        status: status,
        title: 'status.' + status + '.title',
        description: 'status.' + status + '.description',
        specification: 'status.' + status + '.specification'
      })
    }

    return objs
  }

  /**
   * 生成布尔值的图标内容
   */
  private checkbox(check: boolean): string {
    return check ? 'check_box' : 'check_box_outline_blank'
  }

  private statusColor(code: number): string {
    const theme = this.$vuetify.theme

    switch (true) {
      case code<200:
        return theme.info.toString()
      case code<300:
        return theme.success.toString()
      case code<400:
        return theme.info.toString()
      case code<500:
        return theme.error.toString()
      case code<600:
        return theme.warning.toString()
      default:
        return theme.error.toString()
    }
  }
}
</script>
