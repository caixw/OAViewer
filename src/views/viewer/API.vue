<template>
  <v-dialog v-model="visible" width="50rem" scrollable>
    <v-card>
        <v-toolbar flat card dense>
          <v-toolbar-title>
            {{api.summary}}
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="visible=false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

      <v-card-text>
        <v-chip disabled label small :color="methodColor(api.method)">{{api.method}}</v-chip>
        {{api.path}}

        <v-data-table v-if="api.params"
        :headrs="paramsHeaders"
        :items="api.params"
        item-key="name"
        :hide-actions="true">
          <template slot="headerCell" slot-scope="props">
            <span v-t="props.header.locale" />
          </template>

          <template slot="items" slot-scope="props">
            <th>{{props.item.name}}</th>
            <td><v-icon>{{checkbox(!props.item.optional)}}</v-icon></td>
            <td>{{props.item.type.default}}</td>
            <td>{{props.item.type.type}}</td>
            <td v-html="props.item.summary" />
          </template>
        </v-data-table>

        <vue-markdown v-if="api.description" :source="api.description" />

        <v-expansion-panel expand class="panel">
          <v-expansion-panel-content>
            <h2 class="pl-0 pr-0 subheading" slot="header" v-t="'viewer.api.request'" />
            <v-schema v-for="(req, index) of api.requests" :key="index" :schema="req.type" />
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <h2 class="pl-0 pr-0 subheading" slot="header" v-t="'viewer.api.response'" />
            <v-schema v-for="(resp, index) of api.responses" :key="index" :schema="resp.type" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.panel{
  box-shadow: none
}
</style>

<script lang="ts">
import VueMarkdown from 'vue-markdown'
import VSchema from './Schema.vue'
import { Component, Vue } from 'vue-property-decorator'
import { API, api } from './types'
import { DataTableHeadersItem } from '../../vuetify-types'
import { methodColor } from '../../utils'

@Component({
  components: {
  VueMarkdown,
  VSchema
  }
  })
export default class VApi extends Vue {
  api: API = api
  visible: boolean = false

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
      locale: 'viewer.api.header-default',
      value: 'default',
      width: '3rem'
    },
    {
      locale: 'viewer.api.header-type',
      value: 'type'
    },
    {
      locale: 'viewer.api.header-summary',
      value: 'summary'
    }
  ]

  /**
   * 设置 API 的内容。
   * 设置内容之后，自动使对话框可见。
   */
  public show(api: API) {
    this.api = api
    this.visible = true
  }

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
