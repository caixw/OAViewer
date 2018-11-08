<template>
  <div>
    <v-snackbar v-model="snackbar.visible">
      {{$t(snackbar.text)}}
      <v-btn dark>{{$t('viewer.close')}}</v-btn>
    </v-snackbar>

    <v-subheader>
      <span class="display-2 text-uppercase">{{data.title}}</span>
      <v-chip v-if="data.version" disabled small>{{data.version}}</v-chip>
    </v-subheader>

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
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { DataTableHeadersItem } from '../vuetify-types'
import { API } from './viewer/types'
import VAPI from './viewer/API.vue'
import yaml from 'js-yaml'

@Component({
  components: {
  VAPI
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
