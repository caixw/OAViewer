<template>
  <div>
    <v-snackbar v-model="snackbar.visible">
      {{$t(snackbar.text)}}
      <v-btn dark>{{$t('viewer.close')}}</v-btn>
    </v-snackbar>

    <v-expansion-panel>
      <v-expansion-panel-content>

        <v-subheader slot="header">
          <span class="display-1 text-uppercase">{{data.title}}</span>
          <v-chip v-if="data.version" disabled small>{{data.version}}</v-chip>
        </v-subheader>

        <v-layout row>
          <v-flex v-if="data.contact">
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-avatar><v-icon>contacts</v-icon></v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-t="'viewer.contacts'" />
                  <v-list-tile-sub-title class="info-content">
                    {{data.contact.name}}
                    <a v-if="data.contact.email" :href="'mailto:'+data.contact.email">{{data.contact.email}}</a>
                    <a v-if="data.contact.url" :href="data.contact.email">{{data.contact.url}}</a>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-flex>

          <v-flex v-if="data.license">
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-avatar><v-icon>copyright</v-icon></v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-t="'viewer.license'" />
                  <v-list-tile-sub-title class="info-content">
                    <span class="text-uppercase">{{data.license.text}}</span>
                    <a :href="data.license.url">{{data.license.url}}</a>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-card width="100%" flat class="pl-3 pr-3">
            <vue-markdown :source="data.content" />
          </v-card>
        </v-layout>

      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-data-table class="elevation-1" :headers="headers" :items="data.apis" :hide-actions="true">
      <template slot="headerCell" slot-scope="props">
        <span v-t="props.header.locale" />
      </template>
      <template slot="items" slot-scope="props">
        <tr @click="setAPI(props.item)" class="api">
          <td><v-chip small label>{{props.item.method}}</v-chip></td>
          <td>{{props.item.path}}</td>
          <td>
            <v-chip small v-for="tag of props.item.tags" :key="tag">{{tag}}</v-chip>
          </td>
          <td>{{props.item.summary}}</td>
        </tr>
      </template>
    </v-data-table>

    <v-api data="api.data" />
  </div>
</template>

<style scoped>
.api {
  cursor: pointer;
}

.info-content a {
  margin-left: 1rem;
}
</style>

<script lang="ts">
import VueMarkdown from 'vue-markdown'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { DataTableHeadersItem } from '../vuetify-types'
import { API } from './viewer/types'
import Dlg from './viewer/Dlg.vue'
import yaml from 'js-yaml'

@Component({
  components: {
  VueMarkdown,
  Dlg
  }
  })
export default class Viewer extends Vue {
  private snackbar = {
    visible: false,
    text: ''
  }

  private api: Object = {}

  private data: Object = {}

  private headers: Array<DataTableHeadersItem> = [
    {
      locale: 'viewer.header-method',
      value: 'method',
      align: 'left',
      width: '3rem'
    },
    {
      locale: 'viewer.header-path',
      value: 'path',
      align: 'left'
    },
    {
      locale: 'viewer.header-tags',
      value: 'tags',
      align: 'left'
    },
    {
      locale: 'viewer.header-description',
      value: 'description',
      align: 'left',
      sortable: false
    }
  ]

  private setAPI(api: API) {
    // TODO
  }

  /**
   * 加载数据
   */
  private load() {
    const url = this.$route.query['url']
    if (!url) {
      this.alert('参数不正确')
      return
    }

    let type = this.$route.query['type']
    if (!type) {
      type = url.substring(url.lastIndexOf('.')+1)
    }
    if (!type) {
      this.alert('无法确定文件类型')
    }

    fetch(url).then(resp => {
      return resp.text()
    }).then(data => {
      switch (type) {
        case 'json':
          this.data = JSON.parse(data)
          break
        case 'yaml':
          this.data = yaml.load(data)
          break
      }
    }).catch(reason => {
      this.alert('加载文档内容失败：' + reason)
    })
  }

  /**
   * alsert 显示一个警告信息框
   */
  private alert(text: string) {
    this.snackbar.visible = text !== ''
    this.snackbar.text = text
  }

  /**
   * mounted
   */
  public mounted() {
    this.load()
  }
}
</script>
