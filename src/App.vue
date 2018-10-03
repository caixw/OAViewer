<template>
  <v-app :dark="dark">
    <v-toolbar app="app" color="primary">
      <v-toolbar-title>APIDOC</v-toolbar-title>

      <v-btn fab flat><v-icon>search</v-icon></v-btn>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-menu offset-y>
          <v-btn slot="activator" flat class="text-uppercase subheading">
            {{$t('docs')}}<v-icon>arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile :to="{name: 'methods'}">
              <v-list-tile-title v-t="'methods'" />
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-menu offset-y>
          <v-btn slot="activator" flat class="text-uppercase subheading">
            {{$t('theme')}}<v-icon>arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile @click="dark=!dark">
              <v-list-tile-avatar>
                <v-icon v-if="dark">check_box</v-icon>
                <v-icon v-else>check_box_outline_blank</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-t="'theme-dark'" />
              </v-list-tile-content>
            </v-list-tile>

            <v-divider />

            <v-list-tile v-for="(val, key) in themes" :key="key" @click="theme=key">
              <v-list-tile-avatar>
                <v-icon v-if="theme==key">check_box</v-icon>
                <v-icon v-else>check_box_outline_blank</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-t="key" />
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-menu offset-y>
          <v-btn slot="activator" flat class="text-uppercase subheading">
            {{localeDisplayName}}<v-icon>arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="(val, key) in locales" :key="key" @click="locale=key">
              <v-list-tile-avatar>
                <v-icon v-if="key==locale">check_box</v-icon>
                <v-icon v-else>check_box_outline_blank</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{val}}
                </v-list-tile-title>
              </v-list-tile-content>
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

<script lang="ts">
import VueI18n from 'vue-i18n'
import Vuetify from 'vuetify'
import { Component, Vue } from 'vue-property-decorator'
import getThemes, { Themes } from './themes'

@Component
export default class App extends Vue {
  private dark: boolean = false
  private themes: Themes
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

  public created() {
    // 初始化 locales
    for (let i in this.$i18n.messages) {
      const name = this.$i18n.t('localeDisplayName', i).toString()
      this.locales[i] = name
    }

    // 初始化主题
    this.themes = getThemes(this.$vuetify)
  }
}
</script>
