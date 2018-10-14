// Copyright 2018 by caixw, All rights reserved.
// Use of this source code is governed by a MIT
// license that can be found in the LICENSE file.

import { VuetifyObject, VuetifyThemeItem } from 'vuetify'
import colors from 'vuetify/es5/util/colors'

/**
 * 所有主题颜色的定义在此处
 *
 * 需要至少指定 primary 和 secondary 两种颜色。
 *
 * 键名为主题的唯一名称，键值为主题的颜色列表。
 * 键名在展示前会从当前语言文件中查找相关的本地化字符串，若找不到，则直接显示。
 */
const themes: Themes = {
  'toolbar.theme-green': {
    primary: colors.green.darken4,
    secondary: colors.green.lighten1,
    accent: colors.blue.lighten2,
    error: colors.red.base,
    warning: colors.yellow.darken2,
    info: colors.lime.darken2,
    success: colors.lightGreen.accent4
  },

  'toolbar.theme-brown': {
    primary: colors.brown.darken4,
    secondary: colors.brown.lighten2,
    accent: colors.orange.accent4,
    error: colors.pink.lighten1,
    warning: colors.amber.lighten1,
    info: colors.lightGreen.base,
    success: colors.lightGreen.accent4
  },
  'toolbar.theme-red': {
    primary: colors.red.base,
    secondary: colors.red.lighten2,
    accent: colors.purple.base,
    error: colors.red.base,
    warning: colors.yellow.base,
    info: colors.blue.base,
    success: colors.green.base
  }
}

/**
 * 单个主题需要指定的颜色值。
 *
 * 定义基本上 VeutifyTheme 相同，将部分值改为可选。
 */
interface Theme {
  readonly primary: VuetifyThemeItem;
  readonly secondary: VuetifyThemeItem;
  readonly accent?: VuetifyThemeItem;
  readonly error?: VuetifyThemeItem;
  readonly info?: VuetifyThemeItem;
  readonly success?: VuetifyThemeItem;
  readonly warning?: VuetifyThemeItem;
}

interface Themes{
  [key:string]:Theme;
}

export default function getThemes(vuetify: VuetifyObject): Themes {
  themes['toolbar.theme-default'] = Object.assign({}, vuetify.theme)
  return themes
}
