// Copyright 2018 by caixw, All rights reserved.
// Use of this source code is governed by a MIT
// license that can be found in the LICENSE file.


export interface API {
  method: string
  path: string
  params: Param[]
  queries: Param[]
  summary: string
  requests: Request[]
  responses: Response[]
  tags?: string[]
  servers?: string[]
  callback?: Callback
  deprecated?: string
  description?: string
}

export interface Callback {
  method: string
  params: Param[]
  queries: Param[]
  summary: string
  requests: Request[]
  responses: Response[]
}

export interface Request {
	mimetype: string
	type: Schema
	headers?: Header[]
	examples?: Example
}

export interface Response {
  status: number
	mimetype: string
	type: Schema
	headers?: Header[]
	examples?: Example
}

export interface Param {
	name: string
	type: Schema
	summary: string
	optional?: boolean
}

export interface Header{
	name: string
	summary: string
	optional?: boolean
}

export interface Example{
	mimetype: string
	summary: string
	value: string
}

export interface Schema {
  [key: string]: any
}