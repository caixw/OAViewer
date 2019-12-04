// SPDX-License-Identifier: MIT

import Vue from 'vue';
import Vuex from 'vuex';
import Router, { Route } from 'vue-router';
import Vuetify from 'vuetify/lib';
import VueI18n from 'vue-i18n';

import * as locale from '@/config/locale';
import * as store from './store/store';
import { mode, routes } from '@/config/router';
import App from '@/App.vue';

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(Router);
Vue.use(VueI18n);

Vue.config.productionTip = false;

const vuex = new Vuex.Store<store.State>(store.store);

const i18n = new VueI18n({
    locale: locale.locale,
    fallbackLocale: locale.fallbackLocale,
    messages: locale.messages
});

const vuetify = new Vuetify();

const router = new Router({
    mode: mode,
    base: process.env.BASE_URL,
    routes: routes,
    scrollBehavior(to: Route, from: Route, savedPosition: any) {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.hash) {
            return { selector: to.hash };
        }

        return false;
    }
});

new Vue({
    router,
    vuetify,
    i18n,
    store: vuex,
    render: h => h(App)
}).$mount('#app');
