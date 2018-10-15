<template>
  <v-card flat tag="article" class="article">
    <h1>
      <span class="display-3">apidoc.tools</span>
      <v-tooltip bottom>
        <v-chip disabled small slot="activator">{{version}}</v-chip>
        <span v-t="'about.version'" />
      </v-tooltip>
    </h1>
    <v-divider />
    <p>apidoc.tools 是 API 文档生成工具 apidoc 的官方网站。</p>

    <section>
      <h2 v-t="'about.dependencies'" />
      <v-chip disabled small v-for="(ver, name) of deps" :key="name">{{name}}({{ver}})</v-chip>
    </section>

    <section id="copyright">
      <h2 v-t="'about.copyright'" />
      <p>本项目采用 <a href="https://opensource.org/licenses/MIT">MIT</a> 开源授权许可证。</p>
      <p>部分页面（methods、statuses 和 headers）布局参考了 <a href="https://darosh.github.io/oax">https://darosh.github.io/oax/</a> 的内容</p>
    </section>
  </v-card>
</template>

<style scoped>
.article {
  padding: 1rem;
}

.article h2 {
  margin-top: 2rem;
}
</style>

<script lang="ts">
import pkg from '../../package.json'
import { Component, Vue } from 'vue-property-decorator'

interface Dep {
  [key: string]: string
}

function parseDeps(): Dep {
  const obj: {[key: string]: string} = pkg.dependencies
  const dep: Dep = {}

  Object.keys(obj).forEach((name) => {
    let ver = obj[name]
    if ('0123456789'.indexOf(ver.charAt(0)) === -1) {
      ver = ver.slice(1)
    }
    dep[name] = ver
  })
  return dep
}

@Component
export default class About extends Vue {
  private version: string = pkg.version
  private deps = parseDeps()
}
</script>
