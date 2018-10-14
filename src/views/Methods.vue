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
          <div class="chip white--text" :style="{background:methodColor(props.item.name)}">{{props.item.name}}</div>
        </th>
        <td v-html="$t(props.item.description)" />
        <td><v-icon>{{checkbox(props.item.safe)}}</v-icon></td>
        <td><v-icon>{{checkbox(props.item.idempotent)}}</v-icon></td>
        <td><v-icon>{{checkbox(props.item.cacheable)}}</v-icon></td>
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
export default class Methods extends Vue {
  private headers: Array<DataTableHeadersItem> = [
    {
      locale: 'method.header-name',
      value: 'name',
      align: 'left',
      width: '3rem',
      sortable: true
    },
    {
      locale: 'method.header-description',
      value: 'description',
      align: 'left'
    },
    {
      locale: 'method.header-safe',
      localeTip: 'method.header-safe-tip',
      value: 'safe',
      align: 'left',
      width: '3rem',
      sortable: true
    },
    {
      locale: 'method.header-idempotent',
      localeTip: 'method.header-idempotent-tip',
      value: 'idempotent',
      align: 'left',
      width: '3rem',
      sortable: true
    },
    {
      locale: 'method.header-cacheable',
      localeTip: 'method.header-cacheable-tip',
      value: 'cacheable',
      align: 'left',
      width: '3rem',
      sortable: true
    },
    {
      locale: 'method.header-specification',
      value: 'specification',
      align: 'left'
    }
  ]

  private items: Array<Object> = [
    {
      name: 'GET',
      description: 'method.get.description',
      safe: true,
      idempotent: true,
      cacheable: true,
      specification: 'method.get.specification'
    },
    {
      name: 'HEAD',
      description: 'method.head.description',
      safe: true,
      idempotent: true,
      cacheable: true,
      specification: 'method.head.specification'
    },
    {
      name: 'OPTIONS',
      description: 'method.options.description',
      safe: true,
      idempotent: true,
      cacheable: false,
      specification: 'method.options.specification'
    },
    {
      name: 'POST',
      description: 'method.post.description',
      safe: false,
      idempotent: false,
      cacheable: false,
      specification: 'method.post.specification'
    },
    {
      name: 'PUT',
      description: 'method.put.description',
      safe: false,
      idempotent: true,
      cacheable: false,
      specification: 'method.put.specification'
    },
    {
      name: 'PATCH',
      description: 'method.patch.description',
      safe: false,
      idempotent: true,
      cacheable: false,
      specification: 'method.patch.specification'
    },
    {
      name: 'DELETE',
      description: 'method.delete.description',
      safe: false,
      idempotent: true,
      cacheable: false,
      specification: 'method.delete.specification'
    }
  ]

  /**
   * 生成布尔值的图标内容
   */
  private checkbox(check: boolean): string {
    return check ? 'check_box' : 'check_box_outline_blank'
  }

  private methodColor(method: string): string {
    switch (method) {
      case 'PUT':
      case 'POST':
      case 'PATCH':
        return this.$vuetify.theme.warning.toString()
      case 'DELETE':
        return this.$vuetify.theme.error.toString()
      default:
        return this.$vuetify.theme.success.toString()
    }
  }
}
</script>
