<!-- SPDX-License-Identifier: MIT -->

<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app :dark="dark">
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
                            <v-icon class="menu-chk">mdi-dots-vertical-circle-outline</v-icon>
                            <span class="hidden-xs-only">{{$i18n.t('nav')}}</span>
                            <v-icon class="menu-chk hidden-xs-only">mdi-menu-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="val of menus" :key="val.langID" :to="{name: val.url}">
                            <v-list-item-title>{{$i18n.t(val.langID)}}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <v-menu offset-y>
                    <template v-slot:activator="{on}">
                        <v-btn v-on="on" text>
                            <v-icon class="menu-chk">mdi-web</v-icon>
                            <span class="hidden-xs-only">{{$i18n.t('language')}}</span>
                            <v-icon class="menu-chk hidden-xs-only">mdi-menu-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="(val, key) in languages" :key="key" @click.stop="language=key">
                            <v-icon class="menu-chk" v-if="language!==key">mdi-radiobox-blank</v-icon>
                            <v-icon class="menu-chk" v-if="language===key">mdi-radiobox-marked</v-icon>
                            <v-list-item-title>{{val.displayName}}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <v-menu offset-y>
                    <template v-slot:activator="{on}">
                        <v-btn v-on="on" text>
                            <v-icon class="menu-chk">mdi-brightness-6</v-icon>
                            <span class="hidden-xs-only">{{$i18n.t('theme')}}</span>
                            <v-icon class="menu-chk hidden-xs-only">mdi-menu-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click.stop="dark=!dark">
                            <v-icon class="menu-chk" v-if="!dark">mdi-checkbox-blank-outline</v-icon>
                            <v-icon class="menu-chk" v-if="dark">mdi-check-box-outline</v-icon>
                            <v-list-item-title>{{$i18n.t('theme.dark')}}</v-list-item-title>
                        </v-list-item>

                        <v-divider />

                        <v-list-item v-for="name of themes" :key="name" @click="theme=name">
                            <v-icon class="menu-chk" v-if="theme!==name">mdi-radiobox-blank</v-icon>
                            <v-icon class="menu-chk" v-if="theme===name">mdi-radiobox-marked</v-icon>
                            <v-list-item-title>{{$i18n.t('theme.'+name)}}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-app-bar>

        <v-content>
            <v-container fluid>
                <router-view />
            </v-container>
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
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueI18n from 'vue-i18n';
import Vuetify from 'vuetify';
import { themes, dark } from '@/config/themes';

@Component
export default class App extends Vue {
    drawer = false;
    title = 'apidoc';
    themeID = 'default'; // 初始的主题永远是 default
    themesMap = new Map<string, Object>();

    // 导般菜单
    menus: Object[] = [
        {
            langID: 'nav.home',
            url: 'home'
        },
        {
            langID: 'nav.api',
            url: 'api.v5'
        },
        {
            langID: 'nav.about',
            url: 'about'
        }
    ];

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
        this.dark = dark;

        for (let key in themes) {
            this.themesMap.set(key, themes[key]);
        }

        const origin = this.$vuetify.theme.themes;
        if (!this.themesMap.has('default')) {
            this.themesMap.set('default', Object.assign({}, origin));
        } else {
            this.$vuetify.theme.themes = Object.assign(origin, this.themesMap.get('default'));
        }
    }
}
</script>
