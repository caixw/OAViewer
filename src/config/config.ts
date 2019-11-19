// SPDX-License-Identifier: MIT

import pkg from '../../package.json';

// 网站的一些配置信息
export default {
    name: pkg.name, // 程序名称
    url: pkg.homepage, // 网站地址
    titleSuffix: pkg.name, // 网站标题的后缀，比如：`xx | suffix` 的 `suffix` 部分
    titleSeparator: ' | ' // 网站标题的分隔符，比如：`xx | suffix` 的 ` | ` 部分
}
