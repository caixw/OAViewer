// Copyright 2018 by caixw, All rights reserved.
// Use of this source code is governed by a MIT
// license that can be found in the LICENSE file.

import { VuetifyObject, VuetifyThemeItem } from 'vuetify'

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
    primary: '#4CAF50',
    secondary: '#757575'
  },

  'toolbar.theme-brown': {
    primary: '#795548',
    secondary: '#757575'
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
