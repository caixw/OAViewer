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
    },

    chainWebpack: config => {
        config.module
            .rule("yaml")
            .test(/\.ya?ml$/)
            .use("json-loader")
            .loader("json-loader")
            .end()
            .use("yaml-loader")
            .loader("yaml-loader");
    }
};
