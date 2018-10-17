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
      locale: 'headers.header-specification',
      value: 'specification',
      align: 'left'
    }
  ]

  private items = this.getItems('Accept', 'Accept-Charset', 'Accept-Encoding', 'Accept-Language', 'Allow', 'Authorization', 'Content-Type', 'Date', 'Expect', 'Location', 'Referer', 'Server', 'Upgrade', 'WWW-Authenticate')

  private getItems(...headers:string[]) :Array<Object> {
    const objs: Array<Object> = []

    for (const header of headers) {
      objs.push({
        name: header,
        description: 'headers.' + header + '.description',
        specification: 'headers.' + header + '.specification'
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
}
</script>
