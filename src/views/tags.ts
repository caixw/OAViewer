// Copyright 2018 by caixw, All rights reserved.
// Use of this source code is governed by a MIT
// license that can be found in the LICENSE file.

interface Tag {
  name: string
  description: string
  syntax: Syntax
  parents?: string[]
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
      ],
      example: `
      @apidoc APIDOC
      @apiVersion 0.1.0
      @apiServer admin https://admin.example.com 后台操作
      @apiServer client https://api.example.com 开放给用户的 API
      @apiTag user 用户相关操作
      @apiTag order 订单模块的操作
      @apiTag auth 权限验证的相关功能
      @apiLicense MIT https://opensource.org/licenses/MIT
      @apiContact admin webmaster@example.com https://example.com
      @apiContent 这是一个支持 markdown 格式的多行文本，
      可以介绍该文档相关的一些注意事项等内容。`
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
    parents: ['@apidoc']
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
    parents: ['@apidoc']
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
    parents: ['@apidoc']
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
    parents: ['@apidoc']
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
    parents: ['@apidoc', '@api']
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
    parents: ['@apidoc']
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
    parents: ['@apidoc']
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
    children: ['@apiTags', '@apiServers', '@apiDeprecated', '@apiParam', '@apiQuery', '@apiRequest', '@apiResponse', '@apiCallback']
  },

  // @apiTags
  {
    name: '@apiTags',
    description: '指定标签 ID，文档可以根据标签进行分类。',
    syntax: {
      syntax: '@apiTags tags',
      params: [
        {
          name: 'tags',
          required: true,
          description: '在 @api'
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
    children: ['@apiTags', '@apiServers', '@apiDeprecated', '@apiParam', '@apiQuery', '@apiRequest', '@apiResponse']
  },

  // @apiServers
  {
    name: '@apiServers',
    description: '指定该接口文档所属于服务器信息',
    syntax: {
      syntax: '@apiServers servers',
      params: [
        {
          name: 'servrs',
          required: true,
          description: '指定由 @apidoc 的子标签 @apiServer 中的服务名称'
        }
      ]
    },
    parents: ['@api']
  },

  // @apiDeprecated
  {
    name: '@apiDeprecated',
    description: '表示该文档已经废弃',
    syntax: {
      syntax: '@apiDeprecated reason',
      params: [
        {
          name: 'reason',
          required: true,
          description: '废弃的理由，以及替代方法等。'
        }
      ]
    },
    parents: ['@api']
  },

  // @apiParam
  {
    name: '@apiParam',
    description: '指定参数类型',
    syntax: {
      syntax: '@apiParam name type optional description',
      params: [
        {
          name: 'name',
          required: true,
          description: '参数名称，子元素则使用 name.subname 的格式'
        },
        {
          name: 'type',
          required: true,
          description: '类型，如果是数组，还需要指定其子类型，比如 array.string 表示一个字符串数组'
        },
        {
          name: 'optional',
          required: true,
          description: '是否为可选的类型，required 表示必填，optional 表示可选，如果有默认值，则应该是 optional.default 的形式指定默认值。'
        },
        {
          name: 'description',
          required: true,
          description: '该变量的描述信息'
        }
      ]
    },
    parents: ['@api', '@apiCallback', '@apiRequest', '@apiResponse']
  },

  // @apiQuery
  {
    name: '@apiQuery',
    description: '指定参数类型',
    syntax: {
      syntax: '@apiQuery name type optional description',
      params: [
        {
          name: 'name',
          required: true,
          description: '参数名称，子元素则使用 name.subname 的格式'
        },
        {
          name: 'type',
          required: true,
          description: '类型，如果是数组，还需要指定其子类型，比如 array.string 表示一个字符串数组'
        },
        {
          name: 'optional',
          required: true,
          description: '是否为可选的类型，required 表示必填，optional 表示可选，如果有默认值，则应该是 optional.default 的形式指定默认值。'
        },
        {
          name: 'description',
          required: true,
          description: '该变量的描述信息'
        }
      ]
    },
    parents: ['@api', '@apiCallback', '@apiRequest', '@apiResponse']
  },

  // @apiRequest
  {
    name: '@apiRequest',
    description: '指定请求的内容',
    syntax: {
      syntax: '@apiRequest type mimetype description',
      params: [
        {
          name: 'type',
          required: true,
          description: '类型，如果是数组类型，还需要指定子类型，比如 array.object'
        },
        {
          name: 'mimetype',
          required: true,
          description: '媒体类型，可以使用 * 代替适用所有非特定类型'
        },
        {
          name: 'description',
          required: false,
          description: '描述信息'
        }
      ]
    },
    parents: ['@api', '@apiCallback'],
    children: ['@apiHeader', '@apiParam', '@apiExample']
  },

  // @apiResponse
  {
    name: '@apiResponse',
    description: '指定返回的内容',
    syntax: {
      syntax: '@apiRequest status type mimetype description',
      params: [
        {
          name: 'status',
          required: true,
          description: '返回的状态码'
        },
        {
          name: 'type',
          required: true,
          description: '类型，如果是数组类型，还需要指定子类型，比如 array.object'
        },
        {
          name: 'mimetype',
          required: true,
          description: '媒体类型，可以使用 * 代替适用所有非特定类型'
        },
        {
          name: 'description',
          required: false,
          description: '描述信息'
        }
      ]
    },
    parents: ['@api', '@apiCallback'],
    children: ['@apiHeader', '@apiParam', '@apiExample']
  },

  // @apiHeader
  {
    name: '@apiHeader',
    description: '指定报头',
    syntax: {
      syntax: '@apiHeader name optional description',
      params: [
        {
          name: 'name',
          required: true,
          description: '报头名称'
        },
        {
          name: 'optional',
          required: true,
          description: '是否为可选，值可以是 required 和 optional'
        },
        {
          name: 'description',
          required: true,
          description: '描述信息'
        }
      ]
    }
  },

  // @apiExample
  {
    name: '@apiExample',
    description: '示例代码',
    syntax: {
      syntax: '@apiExample mimetype code',
      params: [
        {
          name: 'mimetype',
          required: true,
          description: '媒体类型，比如 application/json'
        },
        {
          name: 'code',
          required: true,
          description: '示例代码，可以是多行，直到下一个标签或是结束。'
        }
      ]
    }
  },

  // @apiCallback
  {
    name: '@apiCallback',
    description: '回调内容',
    syntax: {
      syntax: '@apiCallback method description',
      params: [
        {
          name: 'method',
          required: true,
          description: '回调时采用的请法语方法'
        },
        {
          name: 'description',
          required: false,
          description: '该回调的描述信息'
        }
      ]
    },
    parents: ['@api'],
    children: ['@apiQuery', '@apiParam', '@apiRequest', '@apiResponse']
  }
]

export default tags
