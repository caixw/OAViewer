<!-- SPDX-License-Identifier: MIT -->

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-toolbar color="primary">
          <img src="./assets/logo.svg" class="app-logo" alt="logo" />
        <v-toolbar-title>APIDOC</v-toolbar-title>
      </v-toolbar>

      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{title}}</v-toolbar-title>

      <v-spacer />
      <v-toolbar-items>
        <v-menu offset-y>
          <template v-slot:activator="{on}">
            <v-btn v-on="on" text>
              <v-icon class="menu-chk">mdi-web</v-icon>
              {{$i18n.t('language')}}
              <v-icon class="menu-chk">mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(val, key) in languages" :key="key" @click.stop="language=key">
              <v-icon class="menu-chk" v-if="language!=key">mdi-radiobox-blank</v-icon>
              <v-icon class="menu-chk" v-if="language==key">mdi-radiobox-marked</v-icon>
              <v-list-item-title>{{val.displayName}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu offset-y>
          <template v-slot:activator="{on}">
            <v-btn v-on="on" text>
              <v-icon class="menu-chk">mdi-brightness-6</v-icon>
              {{$i18n.t('theme')}}
              <v-icon class="menu-chk">mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click.stop="dark=!dark">
              <v-icon class="menu-chk" v-if="!dark">mdi-checkbox-blank</v-icon>
              <v-icon class="menu-chk" v-if="dark">mdi-checkbox-marked</v-icon>
              <v-list-item-title>{{$i18n.t('theme.dark')}}</v-list-item-title>
            </v-list-item>

            <v-divider />

            <v-list-item v-for="name of themes" :key="name" @click="theme=name">
              <v-icon class="menu-chk" v-if="theme!=name">mdi-radiobox-blank</v-icon>
              <v-icon class="menu-chk" v-if="theme==name">mdi-radiobox-marked</v-icon>
              <v-list-item-title>{{$i18n.t('theme.'+name)}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid><router-view /></v-container>
    </v-content>
    <v-footer>
      <p>&copy; 2019</p>
    </v-footer>
  </v-app>
</template>

<style scoped>
.menu-chk {
  margin-right: 5px;
}

.app-logo {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueI18n from 'vue-i18n'
import Vuetify from 'vuetify'
import themes from './themes';

@Component
export default class App extends Vue {
  drawer = false;
  title = 'apidoc';
  themeID = 'default'; // 初始的主题永远是 default
  themesMap = new Map<string, Object>();

  // 返回当前的语言列表
  get languages(): VueI18n.LocaleMessages {
    return this.$i18n.messages;
  }

  // 获取和设置当前界面语言
  get language(): string {
    return this.$i18n.locale;
  }
  set language(id: string) {
    this.$i18n.locale = id;
    this.$vuetify.lang.current = id;
  }

  // 获取和设置是否使用深色模式
  get dark(): boolean {
    return this.$vuetify.theme.dark;
  }
  set dark(dark: boolean) {
    this.$vuetify.theme.dark = dark;
  }

  // 当前支持的主题名称列表
  get themes(): string[] {
    return Array.from(this.themesMap.keys());
  }

  // 设置或是获取当前主题的名称
  get theme(): string {
    return this.themeID;
  }
  set theme(id: string) {
    if (!this.themesMap.has(id)) {
      return;
    }

    this.themeID = id;
    this.$vuetify.theme.themes = Object.assign(this.$vuetify.theme.themes, this.themesMap.get(id));
  }

  created() {
    for(let key in themes) {
      this.themesMap.set(key, themes[key]);
    }

    if (!this.themesMap.has('default')) {
      this.themesMap.set('default', Object.assign({}, this.$vuetify.theme.themes));
    } else {
      this.$vuetify.theme.themes = Object.assign(this.$vuetify.theme.themes, this.themesMap.get('default'));
    }
  }
};
</script>
