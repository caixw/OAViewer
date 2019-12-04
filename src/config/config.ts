// SPDX-License-Identifier: MIT

import pkg from '../../package.json';

// 网站的一些配置信息
export default {
    name: pkg.name, // 程序名称
    url: pkg.homepage, // 网站地址
    titleSuffix: pkg.name, // 网站标题的后缀，比如：`xx | suffix` 的 `suffix` 部分
    titleSeparator: ' | ', // 网站标题的分隔符，比如：`xx | suffix` 的 ` | ` 部分
    defaultRender: 'markdown', // 默认的渲染工具，可以是 html 和 markdown

    // 导航菜单项
    nav: [
        {
            langID: 'nav.home',
            url: 'home'
        },
        {
            langID: 'nav.api',
            url: 'api'
        },
        {
            langID: 'nav.about',
            url: 'about'
        }
    ],

    // 各类请求方法的颜色
    methodsColor: new Map<string, string>([
        ['delete', 'error'],
        ['put', 'warning'],
        ['patch', 'warning'],
        ['post', 'warning'],
        ['get', 'success'],
        ['options', 'success'],
        ['connect', 'success']
    ])
};
