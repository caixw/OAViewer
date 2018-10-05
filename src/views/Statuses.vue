<template>
  <div>
    <v-data-table :headers="headers" :items="items" item-key="name" :hide-actions="true">
      <template slot="headers" slot-scope="props">
        <tr class="al">
          <th v-for="h in props.headers" :key="h.locale">
            <span v-t="h.locale" />
            <v-tooltip bottom v-if="h.localeTip">
              <v-icon slot="activator" size="14">help</v-icon>
              <span v-t="h.localeTip" />
            </v-tooltip>
          </th>
        </tr>
      </template>

      <template slot="items" slot-scope="props">
        <th>
          <div class="chip white--text" :style="{background:methodColor(props.item.status)}">{{props.item.status}}</div>
        </th>
        <td v-t="props.item.title" />
        <td v-t="props.item.description" />
        <td v-html="$t(props.item.specification)" />
      </template>
    </v-data-table>
  </div>
</template>

<style scoped>
.al {
  text-align: left
}

.chip {
  min-width: 6rem;
  text-align: center !important;
  padding: .45rem .1rem;
  border-radius: 3px;
}
</style>

<script lang="ts">
import VueI18n from 'vue-i18n'
import { DataTableHeadersItem } from '../vuetify-types'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Statuses extends Vue {
  private headers: Array<DataTableHeadersItem> = [
    {
      locale: 'status.header-status',
      value: 'status',
      align: 'left',
      width: '3rem',
      sortable: true
    },
    {
      locale: 'status.header-title',
      value: 'title',
      align: 'left'
    },
    {
      locale: 'status.header-description',
      localeTip: 'status.header-description-tip',
      value: 'description',
      align: 'left'
    },
    {
      locale: 'status.header-specification',
      value: 'specification',
      align: 'left'
    }
  ]

  private items: Array<Object> = [
    {
      status: 100,
      title: 'title',
      description: 'status.100.description',
      specification: 'method.get.specification'
    }
  ]

  /**
   * 生成布尔值的图标内容
   */
  private checkbox(check: boolean): string {
    return check ? 'check_box' : 'check_box_outline_blank'
  }

  private methodColor(code: number): string {
    const theme = this.$vuetify.theme

    switch (true) {
      case code<200:
        return theme.info.toString()
      case code<300:
        return theme.secondary.toString()
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
