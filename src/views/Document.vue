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
  * @apiGroup users
  * @apiParam id int 表示用户 id 的唯一值
  *
  * @apiSuccess 200 json ok
  * @apiExample
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

    <!-- @apidoc -->
    <section id="syntax-apidoc">
      <h3>@apidoc</h3>
      <p>@apidoc 用于指定一些全局性的设定，本身带一个标题属性，整个文档中只能出现一次。子元素有：
        <a href="#syntax-apiversion">@apiVersion</a>、
        <a href="#syntax-apibaseurl">@apiBaseURL</a>、
        <a href="#syntax-apilicense">@apiLicense</a> 和
        <a href="#syntax-apicontent">@apiContent</a>。
      </p>
      <p>语法:<code>@apidoc title</code></p>
      <table class="ui very compact table">
        <thead>
          <tr>
            <th>参数</th><th>必填</th><th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>title</td><td>true</td><td>文档的标题，到行尾</td>
          </tr>
        </tbody>
      </table>
      <p>示例：</p>
        <pre>
/**
  * @apidoc title of doc
  * @apiVersion 2.0
  * @apiBaseURL https://api.caixw.io
  * @apiLicense MIT https://opensource.org/licenses/MIT
  * @apiContent
  * &lt;p&gt;这里可以是html&lt;/p&gt;
  * &lt;p&gt;会被原样输出&lt;/p&gt;
  */
      </pre>
    </section>

    <!-- @apiVersion -->
    <section id="syntax-apiversion">
      <h3>@apiVerson</h3>
      <p>用于指定文档的版本号。父标签：<a href="#apidoc">@apidoc</a>。</p>
      <p>语法:<code>@apiVersion version</code>。</p>
      <table class="ui very compact table">
        <thead>
          <tr>
            <th>参数</th><th>必填</th><th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>title</td>
            <td>true</td>
            <td>文档的版本号，可以是任何字符串形式的内容</td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</v-card>
</template>

<style scoped>
.article {
  padding: 1rem;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Document extends Vue {}
</script>
