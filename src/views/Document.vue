<template>
<v-card flat tag="article" class="article">
  <h1>APIDOC</h1>

  <section id="about">
    <p>apidoc 是一个简单的 <abbr title="Representational State Transfer">RESTful</abbr>&#160;<abbr title="Application Programming Interface">API</abbr> 文档生成工具，它从代码注释中提取特定格式的内容，生成文档。目前已支持以下语言：C#、C/C++、D、Erlang、Go、Groovy、Java、Javascript、Pascal/Delphi、Perl、PHP、Python、Rust、Ruby、Scala 和 Swift。</p>
    <p>apidoc 拥有以下特点：</p>
    <ol>
      <li>跨平台，linux、windows、macOS 等都支持；</li>
      <li>支持语言广泛，即使是不支持，也很方便扩展；</li>
      <li>支持多个不同语言的多个项目生成一份文档；</li>
      <li>输出模板可自定义；</li>
    </ol>

    <p>这是关于 apidoc 相关介绍。包括命令行的参数指令，以及各个标签的使用格式。</p>
    <pre>
/**
  * @api GET /users/:id 获取指定用户的相关信息
  * @apiTags users
  * @apiParam id int 表示用户 id 的唯一值
  *
  * @apiResponse 200 object *
  * @apiExample application/json
  * {"id":1, "name": "n1"}
  */
    </pre>
    <p>多行注释中，每一行中以<code>空白字符+symbol+空白字符</code>开头的，这些字符将会被过滤，symbol 表示该注释块的起始字符中的任意字符。比如以上代码中，所有的 <var>*</var> 将被过滤。</p>
  </section>

  <section id="usage">
    <h2>基本用法</h2>
    <p>TODO</p>
  </section>

  <section id="syntax">
    <h2>语法</h2>
    <p>在 apidoc 中，标签存在一定的从属关系，下文中均会注明所有标签的父标或及子标签。判断一个标签属于哪个父标签，只需要根据当前标签往前查找，直到找到可作为该标签的父标签的标签即可。</p>

    <section :id="'syntax'+tag.name" v-for="tag of tags" :key="tag.name">
      <h3>{{tag.name}}</h3>
      <p>{{tag.description}}</p>

      <section>
        <h4>语法:<code>{{tag.syntax.syntax}}</code></h4>
        <v-data-table :headers="headers" :items="tag.syntax.params" item-key="name" :hide-actions="true">
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
              {{props.item.name}}
            </th>
            <td><v-icon>{{checkbox(props.item.required)}}</v-icon></td>
            <td v-html="$t(props.item.description)" />
          </template>
        </v-data-table>
      </section>

      <section v-if="tag.children">
        <h4>子标签</h4>
        <v-chip small v-for="child of tag.children" :key="child">{{child}}</v-chip>
      </section>
    </section>

  </section>
</v-card>
</template>

<style scoped>
.article {
  padding: 1rem;
}

h2 {
  margin-top:1.5rem
}

h3 {
  margin-top: 1rem
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DataTableHeadersItem } from '../vuetify-types'
import tags from './tags'

@Component
export default class Document extends Vue {
  private tags = tags
  private headers: Array<DataTableHeadersItem> = [
    {
      locale: 'doc.header-name',
      value: 'name',
      align: 'left',
      width: '3rem',
      sortable: true
    },
    {
      locale: 'doc.header-description',
      value: 'required',
      width: '3rem',
      align: 'left'
    },
    {
      locale: 'doc.header-safe',
      value: 'description',
      align: 'left',
      sortable: true
    }
  ]

  /**
   * 生成布尔值的图标内容
   */
  private checkbox(check: boolean): string {
    return check ? 'check_box' : 'check_box_outline_blank'
  }
}
</script>
