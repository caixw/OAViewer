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
        <th class="al">
          <v-chip small>{{props.item.name}}</v-chip>
        </th>
        <td v-html="$t(props.item.description)" />
        <td><v-icon>{{checkbox(props.item.request)}}</v-icon></td>
        <td><v-icon>{{checkbox(props.item.response)}}</v-icon></td>
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
import { DataTableHeadersItem } from '../vuetify-types'
import { Component, Vue } from 'vue-property-decorator'

class Item {
  private name: string
  private request: boolean
  private response: boolean

  constructor(name: string, request: boolean, response: boolean) {
    this.name = name
    this.request = request
    this.response = response
  }

  get description():string {
    return 'headers.' + this.name + '.description'
  }

  get specification(): string {
    return 'headers.' + this.name + '.specification'
  }
}

@Component
export default class Headers extends Vue {
  private headers: Array<DataTableHeadersItem> = [
    {
      locale: 'headers.header-name',
      value: 'name',
      sortable: true
    },
    {
      locale: 'headers.header-description',
      value: 'description',
      align: 'left'
    },
    {
      locale: 'headers.header-request',
      localeTip: 'headers.header-request-tip',
      value: 'description',
      align: 'left'
    },
    {
      locale: 'headers.header-response',
      localeTip: 'headers.header-response-tip',
      value: 'description',
      align: 'left'
    },
    {
      locale: 'headers.header-specification',
      value: 'specification',
      align: 'left'
    }
  ]

  private items: Array<Item> = [
    new Item('Accept', true, false),
    new Item('Accept-Charset', true, false),
    new Item('Accept-Encoding', true, false),
    new Item('Accept-Language', true, false),
    new Item('Allow', false, true),
    new Item('Authorization', true, false),
    new Item('Content-Encoding', false, true),
    new Item('Content-Language', false, true),
    new Item('Content-Length', false, true),
    new Item('Content-Location', false, true),
    new Item('Content-Type', true, true),
    new Item('Date', false, true),
    new Item('Expect', true, false),
    new Item('Location', false, true),
    new Item('Referer', true, false),
    new Item('Retry-After', false, true),
    new Item('Server', false, true),
    new Item('Upgrade', true, true),
    new Item('WWW-Authenticate', false, true)
  ]

  /**
   * 生成布尔值的图标内容
   */
  private checkbox(check: boolean): string {
    return check ? 'check_box' : 'check_box_outline_blank'
  }
}
</script>
