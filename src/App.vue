<!-- SPDX-License-Identifier: MIT -->

<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app>
            <template v-slot:prepend>
                <v-toolbar color="primary">
                    <img src="./assets/logo.svg" class="app-logo mr-3" alt="logo" />
                    <v-toolbar-title class="text-uppercase">{{appName}}</v-toolbar-title>
                </v-toolbar>
            </template>

            <router-view name="sidebar" />
        </v-navigation-drawer>

        <v-app-bar color="primary" app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>{{title}}</v-toolbar-title>

            <v-spacer />
            <v-toolbar-items>
                <v-menu offset-y>
                    <template v-slot:activator="{on}">
                        <v-btn v-on="on" text>
                            <v-icon class="mr-1">mdi-dots-vertical-circle-outline</v-icon>
                            <span class="hidden-xs-only">{{$i18n.t('nav')}}</span>
                            <v-icon class="mr-1 hidden-xs-only">mdi-menu-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="val of menus" :key="val.langID" :to="{name: val.url}" exact>
                            <v-list-item-title>{{$i18n.t(val.langID)}}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <v-menu offset-y>
                    <template v-slot:activator="{on}">
                        <v-btn v-on="on" text>
                            <v-icon class="mr-1">mdi-web</v-icon>
                            <span class="hidden-xs-only">{{$i18n.t('language')}}</span>
                            <v-icon class="mr-1 hidden-xs-only">mdi-menu-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="(val, key) in languages" :key="key" @click.stop="language=key">
                            <v-icon class="mr-1" v-if="language!==key">mdi-radiobox-blank</v-icon>
                            <v-icon class="mr-1" v-if="language===key">mdi-radiobox-marked</v-icon>
                            <v-list-item-title>{{val.displayName}}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <v-menu offset-y>
                    <template v-slot:activator="{on}">
                        <v-btn v-on="on" text>
                            <v-icon class="mr-1">mdi-brightness-6</v-icon>
                            <span class="hidden-xs-only">{{$i18n.t('theme')}}</span>
                            <v-icon class="mr-1 hidden-xs-only">mdi-menu-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click.stop="dark=!dark">
                            <v-icon class="mr-1" v-if="!dark">mdi-checkbox-blank-outline</v-icon>
                            <v-icon class="mr-1" v-if="dark">mdi-check-box-outline</v-icon>
                            <v-list-item-title>{{$i18n.t('theme.dark')}}</v-list-item-title>
                        </v-list-item>

                        <v-divider />

                        <v-list-item v-for="name of themes" :key="name" @click="theme=name">
                            <v-icon class="mr-1" v-if="theme!==name">mdi-radiobox-blank</v-icon>
                            <v-icon class="mr-1" v-if="theme===name">mdi-radiobox-marked</v-icon>
                            <v-list-item-title>{{$i18n.t('theme.'+name)}}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-app-bar>

        <v-content>
            <router-view />

            <v-snackbar v-model="snackbar" top right :color="message.type">
                {{$i18n.t(message.message)}}
                <v-btn text color="primary" @click="snackbar=false">{{$i18n.t('close')}}</v-btn>
            </v-snackbar>
        </v-content>
        <v-footer>
            <p>&copy; 2019 by <a :href="appURL">{{appName}}</a></p>
        </v-footer>
    </v-app>
</template>

<style scoped>
.app-logo {
    width: 32px;
    height: 32px;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueI18n from 'vue-i18n';
import Vuetify from 'vuetify';
import config from '@/config/config.ts';
import * as themes from '@/config/themes';
import * as store from '@/store/store.ts';
import * as types from '@/store/types.ts';

@Component
export default class App extends Vue {
    drawer = false;
    themeID = 'default'; // 初始的主题永远是 default
    themesMap = new Map<string, Object>();
    menus = config.nav;
    appName = config.name;
    appURL = config.url;

    get message(): store.Message {
        return this.$store.state.message;
    }

    get snackbar(): boolean {
        return this.$store.state.message.message !== '';
    }
    set snackbar(show: boolean) {
        this.$store.commit(types.SET_MESSAGE, '');
    }

    get title(): string {
        return this.$i18n.t(this.$store.state.title).toString();
    }

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
        const origin = this.$vuetify.theme.themes;
        this.$vuetify.theme.themes = Object.assign(origin, this.themesMap.get(id));
    }

    created() {
        this.dark = themes.dark;
        const origin = this.$vuetify.theme.themes;

        for (let key in themes.themes) {
            let obj = {
                dark: { ...origin.dark, ...themes.themes[key].dark },
                light: { ...origin.light, ...themes.themes[key].light }
            };
            this.themesMap.set(key, obj);
        }

        if (!this.themesMap.has('default')) {
            this.themesMap.set('default', { ...origin });
        } else {
            this.$vuetify.theme.themes = { ...origin, ...this.themesMap.get('default') };
        }
    }
}
</script>
