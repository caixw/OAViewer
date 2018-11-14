// Copyright 2018 by caixw, All rights reserved.
// Use of this source code is governed by a MIT
// license that can be found in the LICENSE file.

// 定义一些通用函数

import { VuetifyTheme } from 'vuetify'

/**
 * 根据名称，从当前主题中找到相关的颜色表示。
 */
export function methodColor (theme: VuetifyTheme, method: string): string {
  switch (method) {
    case 'PUT':
    case 'POST':
    case 'PATCH':
      return theme.warning.toString()
    case 'DELETE':
      return theme.error.toString()
    default:
      return theme.success.toString()
  }
}


/**
 * 生成布尔值的图标内容
 */
export function checkbox(check: boolean): string {
  return check ? 'check_box' : 'check_box_outline_blank'
}
