<template>
  <v-app :dark="dark">
    <v-toolbar app="app">
      <v-toolbar-title class="title" @click="$router.push({name:'home'})">APIDOC</v-toolbar-title>

      <v-btn fab flat><v-icon>search</v-icon></v-btn>

      <v-spacer />
      <v-toolbar-items>
        <!-- 文档 -->
        <v-menu offset-y>
          <v-btn slot="activator" flat class="text-uppercase subheading">
            {{$t('docs')}}<v-icon>arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile :to="{name: 'methods'}">
              <v-icon>library_books</v-icon>
              <v-list-tile-title class="menu-title" v-t="'methods'" />
            </v-list-tile>

            <v-list-tile :to="{name: 'document'}">
              <v-icon>library_books</v-icon>
              <v-list-tile-title class="menu-title">apidoc</v-list-tile-title>
            </v-list-tile>

            <v-divider />
            <v-list-tile :to="{name: 'about'}">
              <v-icon>info</v-icon>
              <v-list-tile-title class="menu-title" v-t="'about'" />
            </v-list-tile>

            <v-list-tile href="https://github.com/caixw/apidoc.tools">
              <v-icon>open_in_new</v-icon>
              <v-list-tile-title class="menu-title">Github</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <!-- 翻译 -->
        <v-menu offset-y>
          <v-btn slot="activator" flat class="text-uppercase subheading">
            {{localeDisplayName}}<v-icon>arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="(val, key) in locales" :key="key" @click="locale=key">
              <v-icon>{{checkbox(key==locale)}}</v-icon>
              <v-list-tile-title class="menu-title">{{val}}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <!-- 主题 -->
        <v-menu offset-y>
          <v-btn slot="activator" flat class="text-uppercase subheading">
            {{$t('theme')}}<v-icon>arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile @click="dark=!dark">
              <v-icon>{{checkbox(dark)}}</v-icon>
              <v-list-tile-title v-t="'theme-dark'" class="menu-title" />
            </v-list-tile>

            <v-divider />
            <v-list-tile v-for="(val, key) in themes" :key="key" @click="theme=key">
              <v-icon>{{checkbox(key==theme)}}</v-icon>
              <v-list-tile-title v-t="key" class="menu-title" />
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>

    <v-footer app="app"></v-footer>
  </v-app>
</template>

<style scoped>
.title {
  cursor: pointer;
}
.menu-title {
  padding-left: 1rem
}
</style>

<script lang="ts">
import VueI18n from 'vue-i18n'
import Vuetify from 'vuetify'
import { Component, Vue } from 'vue-property-decorator'
import getThemes, { Themes } from './themes'

@Component
export default class App extends Vue {
  private dark: boolean = false
  private themes: Themes = getThemes(this.$vuetify)
  private theme_: string = 'theme-default'

  /**
   * 保存当前支持的语言以及该语言下的显示名称
   *
   * 键名为语言 ID，键值为该语种下的显示名称。
   */
  private locales: {[key:string]:string;} = {}

  /**
   * 获取当前有的语言名称
   */
  private get locale(): string {
    return this.$i18n.locale
  }

  /**
   * 设置当前的语言
   */
  private set locale(locale: string) {
    console.info('设置当前语言为：', locale)
    this.$i18n.locale = locale
  }

  /**
   * 获取当前的主题
   */
  private get theme(): string {
    return this.theme_
  }

  /**
   * 改变当前的主题
   */
  private set theme(t: string) {
    const theme = this.themes[t]

    if (!theme) { // 不存在，则不修改
      console.error('主题不存在：', t)
      return
    }

    Object.assign(this.$vuetify.theme, theme)
    this.theme_ = t
  }

  /**
   * 获取当前语言的显示名称
   */
  private get localeDisplayName():string {
    let name = this.locales[this.locale]

    if (!name) {
      console.error('无法获取当前的语言信息:', this.locale, name)
      name = '未知语言'
    }

    return name
  }

  /**
   * 生成布尔值的图标内容
   */
  private checkbox(check: boolean): string {
    return check ? 'check_box' : 'check_box_outline_blank'
  }

  public created() {
    // 初始化 locales
    for (let i in this.$i18n.messages) {
      const name = this.$i18n.t('localeDisplayName', i).toString()
      this.locales[i] = name
    }
  }
}
</script>
