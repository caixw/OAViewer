module.exports = {
    'outputDir': 'dist',

    'transpileDependencies': [
        'vuetify'
    ],

    pluginOptions: {
        i18n: {
            locale: 'zh-hans',
            fallbackLocale: 'zh-hans',
            localeDir: 'locales',
            enableInSFC: false
        }
    }
};
