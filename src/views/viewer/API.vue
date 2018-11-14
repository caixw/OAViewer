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

      <v-card-text class="pl-0 pr-0">

        <h1 class="pl-3 pr-3 subheading">
        <v-chip disabled label small :color="methodColor(api.method)">
          {{api.method}}
        </v-chip>
        {{api.path}}
        </h1>

        <vue-markdown class="pl-3 pr-3" v-if="api.description" :source="api.description" />

        <v-tabs class="mt-3 pl-3 pr-3">
          <v-tab v-if="hasParams">{{$t('viewer.api.params')}}</v-tab>
          <v-tab v-if="hasQueries">{{$t('viewer.api.queries')}}</v-tab>
          <v-tab>{{$t('viewer.api.request')}}</v-tab>
          <v-tab>{{$t('viewer.api.response')}}</v-tab>

          <!-- params -->
          <v-tab-item v-if="hasParams">
            <v-data-table
            :headers="paramsHeaders"
            :items="api.params"
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
          </v-tab-item>

          <!-- query -->
          <v-tab-item v-if="hasQueries">
            <v-data-table
            :headers="paramsHeaders"
            :items="api.queries"
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
          </v-tab-item>

          <v-tab-item>
            <v-request v-for="(val, index) of api.requests" :key="index" :request="val" />
          </v-tab-item>

          <v-tab-item>
            <v-response v-for="(val, index) of api.responses" :key="index" :response="val" />
          </v-tab-item>

        </v-tabs>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import VueMarkdown from 'vue-markdown'
import VRequest from './Request.vue'
import VResponse from './Response.vue'
import { Component, Vue } from 'vue-property-decorator'
import { API, Param, api as apiDefault } from './types'
import { DataTableHeadersItem } from '../../vuetify-types'
import { methodColor } from '../../utils'

@Component({
  components: {
  VueMarkdown,
  VRequest,
  VResponse
  }
  })
export default class VApi extends Vue {
  api: API = apiDefault
  visible_: boolean = false

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

  private get visible(): boolean {
    return this.visible_
  }

  private set visible(v: boolean) {
    this.visible_ = v
    if (!v) {
      this.api = apiDefault
    }
  }

  /**
   * 设置 API 的内容。
   * 设置内容之后，自动使对话框可见。
   */
  public show(api: API) {
    this.api = api
    this.visible = true
  }

  /**
   * 是否存在地址参数或是查询参数
   */
  private get hasParams(): boolean {
    return !!this.api.params && this.api.params.length > 0
  }

  /**
   * 是否存在查询参数
   */
  private get hasQueries(): boolean {
    return !!this.api.queries && this.api.queries.length > 0
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
