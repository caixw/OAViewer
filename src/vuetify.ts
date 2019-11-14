// SPDX-License-Identifier: MIT

import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import en from 'vuetify/src/locale/en';
import zhHans from 'vuetify/src/locale/zh-Hans';
import zhHant from 'vuetify/src/locale/zh-Hant';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
  },

  lang: {
    locales: { en, zhHans, zhHant },
    current: 'zh-Hans'
  }
});
