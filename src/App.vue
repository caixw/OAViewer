<template>
  <v-app :dark="dark">
    <v-toolbar app="app">
      <v-toolbar-title class="title" @click="$router.push({name:'home'})">
        <img src="./assets/logo.svg" alt="LOGO" />
        <span class="hidden-sm-and-down">APIDOC</span>
      </v-toolbar-title>

      <v-spacer />
      <v-toolbar-items>
        <!-- 文档 -->
        <v-menu offset-y>
          <v-btn slot="activator" flat class="text-uppercase subheading">
            <span class="hidden-sm-and-down">{{$t('toolbar.docs')}}<v-icon>arrow_drop_down</v-icon></span>
            <v-icon class="hidden-md-and-up">library_books</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile :to="{name: 'methods'}">
              <v-icon>library_books</v-icon>
              <v-list-tile-title class="menu-title" v-t="'toolbar.methods'" />
            </v-list-tile>

            <v-list-tile :to="{name: 'statuses'}">
              <v-icon>library_books</v-icon>
              <v-list-tile-title class="menu-title" v-t="'toolbar.statuses'" />
            </v-list-tile>

            <v-list-tile :to="{name: 'headers'}">
              <v-icon>library_books</v-icon>
              <v-list-tile-title class="menu-title" v-t="'toolbar.headers'" />
            </v-list-tile>

            <v-list-tile :to="{name: 'auths'}">
              <v-icon>library_books</v-icon>
              <v-list-tile-title class="menu-title" v-t="'toolbar.auths'" />
            </v-list-tile>

            <v-divider />
            <v-list-tile :to="{name: 'about'}">
              <v-icon>info</v-icon>
              <v-list-tile-title class="menu-title" v-t="'toolbar.about'" />
            </v-list-tile>

            <v-list-tile href="https://github.com/caixw/apidoc.tools">
              <v-icon>open_in_new</v-icon>
              <v-list-tile-title class="menu-title">Github</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <!-- 主题 -->
        <v-menu offset-y>
          <v-btn slot="activator" flat class="text-uppercase subheading">
            <span class="hidden-sm-and-down">{{$t('toolbar.theme')}}<v-icon>arrow_drop_down</v-icon></span>
            <v-icon class="hidden-md-and-up">visibility</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile @click="dark=!dark">
              <v-icon>{{checkbox(dark)}}</v-icon>
              <v-list-tile-title v-t="'toolbar.theme-dark'" class="menu-title" />
            </v-list-tile>

            <v-divider />
            <v-list-tile v-for="(val, key) in themes" :key="key" @click="theme=key">
              <v-icon>{{checkbox(key==theme)}}</v-icon>
              <v-list-tile-title v-t="key" class="menu-title" />
            </v-list-tile>
          </v-list>
        </v-menu>

        <!-- 翻译 -->
        <v-menu offset-y>
          <v-btn slot="activator" flat class="text-uppercase subheading">
            <span class="hidden-sm-and-down">{{localeDisplayName}}<v-icon>arrow_drop_down</v-icon></span>
            <v-icon class="hidden-md-and-up">translate</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="(val, key) in locales" :key="key" @click="locale=key">
              <v-icon>{{checkbox(key==locale)}}</v-icon>
              <v-list-tile-title class="menu-title">{{val}}</v-list-tile-title>
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

    <v-footer app="app" height="auto">
      <v-card flat class="footer" width="100%">
        <p>&copy;2018 by <strong>caixw</strong></p>
      </v-card>
    </v-footer>
  </v-app>
</template>

<style scoped>
.title {
  cursor: pointer;
}

.title img {
  width: 24px;
  height: 24px;
  margin-right: .5rem;
  margin-bottom: -5px;
}

.menu-title {
  padding-left: 1rem
}

.footer {
  padding: 1rem;
  display: block
}
</style>

<script lang="ts">
import VueI18n from 'vue-i18n'
import Vuetify from 'vuetify'
import { Component, Vue } from 'vue-property-decorator'
import getThemes from './themes'

@Component
export default class App extends Vue {
  private dark = false
  private themes = getThemes(this.$vuetify)
  private theme_ = 'toolbar.theme-default'

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
