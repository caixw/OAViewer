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
        <th class="al">{{props.item.name}}</th>
        <td v-t="props.item.description" />
        <td class="bool-width">
          <v-icon v-if="props.item.safe">check_box</v-icon>
          <v-icon v-else>check_box_outline_blank</v-icon>
        </td>
        <td class="bool-width">
          <v-icon v-if="props.item.idempotent">check_box</v-icon>
          <v-icon v-else>check_box_outline_blank</v-icon>
        </td>
        <td v-html="$t(props.item.specification)" />
      </template>
    </v-data-table>
  </div>
</template>

<style lang="sass" scoped>
.al {text-align: left}
.bool-width {width: 3rem}
</style>

<script lang="ts">
import VueI18n from 'vue-i18n'
import { DataTableHeadersItem } from '../vuetify-types'
import { Component, Vue } from 'vue-property-decorator'

// TODO 幂等等介绍

@Component
export default class Methods extends Vue {
  private headers: Array<DataTableHeadersItem> = [
    {
      locale: 'method.header-name',
      value: 'name',
      align: 'left'
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
      align: 'left'
    },
    {
      locale: 'method.header-idempotent',
      localeTip: 'method.header-idempotent-tip',
      value: 'idempotent',
      align: 'left'
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
      specification: 'method.get.specification'
    },
    {
      name: 'HEAD',
      description: 'method.head.description',
      safe: true,
      idempotent: true,
      specification: 'method.head.specification'
    },
    {
      name: 'OPTIONS',
      description: 'method.options.description',
      safe: true,
      idempotent: true,
      specification: 'method.options.specification'
    },
    {
      name: 'POST',
      description: 'method.post.description',
      safe: false,
      idempotent: false,
      specification: 'method.post.specification'
    },
    {
      name: 'PUT',
      description: 'method.put.description',
      safe: false,
      idempotent: true,
      specification: 'method.put.specification'
    },
    {
      name: 'PATCH',
      description: 'method.patch.description',
      safe: false,
      idempotent: true,
      specification: 'method.patch.specification'
    },
    {
      name: 'DELETE',
      description: 'method.delete.description',
      safe: false,
      idempotent: true,
      specification: 'method.delete.specification'
    }
  ]
}
</script>
