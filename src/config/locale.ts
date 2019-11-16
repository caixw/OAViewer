// SPDX-License-Identifier: MIT

import { LocaleMessages } from 'vue-i18n';

// vuetify 中用到的本地化信息
import en from 'vuetify/src/locale/en';
import zhHans from 'vuetify/src/locale/zh-Hans';
import zhHant from 'vuetify/src/locale/zh-Hant';

export const messages = loadLocaleMessages()
export const locale = 'zh-hans';
export const fallbackLocale = 'en';
export const vuetifyLocales = { en, zhHans, zhHant };

function loadLocaleMessages(): LocaleMessages {
    const locales = require.context('@/locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
    const messages: LocaleMessages = {};
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key);
        }
    });
    return messages;
};
