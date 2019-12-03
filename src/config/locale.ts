// SPDX-License-Identifier: MIT

import { LocaleMessages } from 'vue-i18n';

export const messages = loadLocaleMessages();
export const locale = 'zh-hans';
export const fallbackLocale = 'en';

function loadLocaleMessages(): LocaleMessages {
    const locales = require.context('@/locales', true, /[A-Za-z0-9-_,\s]+\.yaml$/i);
    const messages: LocaleMessages = {};
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key);
        }
    });
    return messages;
}
