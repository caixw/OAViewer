// Copyright 2018 by caixw, All rights reserved.
// Use of this source code is governed by a MIT
// license that can be found in the LICENSE file.

// 定义了部分 vuetify 中需要用到的接口类型

export interface DataTableHeadersItem {
  locale: string // 本地化的值
  localeTip?: string // tip 的本地化 ID

  // 以下为 vuetify 中需要提供的信息
  value: string // 对应数据中的显示字段名
  text?: string // 显示在 header 中的内容
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  width?: string
}
