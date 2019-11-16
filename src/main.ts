// SPDX-License-Identifier: MIT

import Vue from 'vue';
import Router from 'vue-router';
import Vuetify from 'vuetify/lib';
import VueI18n from 'vue-i18n';

import * as locale from '@/config/locale';
import { mode, routes } from '@/config/router';
import App from '@/App.vue';

Vue.use(Vuetify);
Vue.use(Router);
Vue.use(VueI18n);

Vue.config.productionTip = false;

const i18n = new VueI18n({
    locale: locale.locale,
    fallbackLocale: locale.fallbackLocale,
    messages: locale.messages
});

const vuetify = new Vuetify({
    lang: {
        locales: locale.vuetifyLocales,
        current: locale.locale
    }
});

const router = new Router({
    mode: mode,
    base: process.env.BASE_URL,
    routes: routes
});

new Vue({
    router,
    vuetify,
    i18n,
    render: h => h(App)
}).$mount('#app');
