// Copyright 2018 by caixw, All rights reserved.
// Use of this source code is governed by a MIT
// license that can be found in the LICENSE file.

interface Tag {
  name: string
  description: string
  syntax: Syntax
  parent?: string[]
  children?: string[]
}

interface Syntax {
  syntax: string
  params: Param[]
  example?: string
}

interface Param {
  name: string
  required: boolean
  default?: any
  description: string
}

const tags: Array<Tag> = [
  // @apidoc
  {
    name: '@apidoc',
    description: '用于指定一些全局性的设定，本身带一个标题属性，整个文档中只能出现一次。子元素有',
    syntax: {
      syntax: '@apidoc title',
      params: [
        {
          name: 'title',
          required: true,
          description: '标题内容'
        }
      ]
    },
    children: ['@apiVersion', '@apiServer', '@apiTag', '@apiResponse', '@apiLicense', '@apiContent', '@apiContact']
  },

  // @apiVersion
  {
    name: '@apiVersion',
    description: '指定文档的版本号',
    syntax: {
      syntax: '@apiVersion version',
      params: [
        {
          name: 'version',
          required: true,
          description: '文档版本号，可以是任意内容。'
        }
      ]
    },
    parent: ['@apidoc']
  },

  // @apiServer
  {
    name: '@apiServer',
    description: '指定服务器',
    syntax: {
      syntax: '@apiServer name url description',
      params: [
        {
          name: 'name',
          required: true,
          description: '唯一名称'
        },
        {
          name: 'url',
          required: true,
          description: '对应的请求基地址'
        },
        {
          name: 'description',
          required: true,
          description: '对该服务的地址的详细描述，可以使用 markdown 格式内容'
        }
      ]
    },
    parent: ['@apidoc']
  },

  // @apiTag
  {
    name: '@apiTag',
    description: '指定所有可用的标签内容',
    syntax: {
      syntax: '@apiTag name description',
      params: [
        {
          name: 'name',
          required: true,
          description: '唯一名称'
        },
        {
          name: 'description',
          required: true,
          description: '具体描述信息，可以使用 markdown'
        }
      ]
    },
    parent: ['@apidoc']
  },

  // @apiResponse
  {
    name: '@apiResponse',
    description: '所有接口都有的返回信息，在此处指定。比如一些错误信息',
    syntax: {
      syntax: '@apiResponse status type mimetype description',
      params: [
        {
          name: 'status',
          required: true,
          description: '状态码'
        },
        {
          name: 'type',
          required: true,
          description: '类型'
        },
        {
          name: 'mimetype',
          required: true,
          description: '媒体类型，可以使用 * 表示任意类型。'
        },
        {
          name: 'description',
          required: true,
          description: '具体描述信息，可以使用 markdown'
        }
      ]
    },
    children: ['@apiHeader', '@apiParam', '@apiExample'],
    parent: ['@apidoc']
  },

  // @apiLicense
  {
    name: '@apiLicense',
    description: '指定文档的版权信息',
    syntax: {
      syntax: '@apiLicense name url',
      params: [
        {
          name: 'name',
          required: true,
          description: '名称'
        },
        {
          name: 'url',
          required: true,
          description: '权限文件的地址'
        }
      ]
    },
    parent: ['@apidoc', '@api']
  },

  // @apiContent
  {
    name: '@apiContent',
    description: '文档的一些详细介绍',
    syntax: {
      syntax: '@apiContent description',
      params: [
        {
          name: 'description',
          required: false,
          description: 'markdown 格式，可以多行。'
        }
      ]
    },
    parent: ['@apidoc']
  },

  // @apiContact
  {
    name: '@apiContact',
    description: '文档的联系人员信息',
    syntax: {
      syntax: '@apiContact name url email',
      params: [
        {
          name: 'name',
          required: true,
          description: '名称'
        },
        {
          name: 'url',
          required: false,
          description: '网站地址'
        },
        {
          name: 'email',
          required: false,
          description: '邮箱'
        }
      ]
    },
    parent: ['@apidoc']
  },

  // @api
  {
    name: '@api',
    description: '指定具体的一个 API 接口信息',
    syntax: {
      syntax: '@api method path summary',
      params: [
        {
          name: 'method',
          required: true,
          description: '请求方法'
        },
        {
          name: 'path',
          required: true,
          description: '路径'
        },
        {
          name: 'summary',
          required: true,
          description: '文档的简要说明'
        }
      ]
    },
    children: ['@apiTags', '@apiServer', '@apiDeprecated', '@apiParam', '@apiQuery', '@apiRequest', '@apiResponse']
  }
]

export default tags
