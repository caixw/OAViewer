// SPDX-License-Identifier: MIT

export const apidocYAML: Type = {
    name: 'apidoc.yaml',
    items: [
        { name: 'version', type: 'version', required: true },

        // inputs
        { name: 'inputs', type: 'object[]', required: true },
        { name: 'inputs.dir', type: 'string', required: true },
        { name: 'inputs.recursive', type: 'boolean', required: false },
        { name: 'inputs.encoding', type: 'string', required: false },
        { name: 'inputs.lang', type: 'string', required: false },

        // output
        { name: 'output', type: 'object', required: true },
        { name: 'output.path', type: 'string', required: true },
        { name: 'output.tags', type: 'string', required: false },
        { name: 'output.style', type: 'string', required: false }
    ]
};

export const types: Type[] = [
    { // apidoc
        name: 'apidoc',
        items: [
            { name: '@version', type: 'version', required: true },
            { name: '@lang', type: 'string', required: false },
            { name: '@logo', type: 'string', required: false },
            { name: 'created', type: 'string', required: false },
            { name: 'title', type: 'string', required: true },
            { name: 'description', type: 'string', required: true },
            { name: 'contact', type: 'contact', required: false },
            { name: 'license', type: 'link', required: false },
            { name: 'tag', type: 'tag[]', required: false },
            { name: 'server', type: 'server[]', required: false },
            { name: 'response', type: 'request[]', required: false },
            { name: 'api', type: 'api[]', required: false }
        ]
    },
    { // link
        name: 'link',
        items: [
            { name: '@url', type: 'string', required: true },
            { name: '.', type: 'string', required: true }
        ]
    },
    { // contact
        name: 'contact',
        items: [
            { name: '@url', type: 'string', required: true },
            { name: '@email', type: 'string', required: true },
            { name: '.', type: 'string', required: true }
        ]
    },
    { // tag
        name: 'tag',
        items: [
            { name: '@name', type: 'string', required: true },
            { name: '@title', type: 'string', required: true },
            { name: '@deprecated', type: 'version', required: false }
        ]
    },
    { // server
        name: 'server',
        items: [
            { name: '@name', type: 'string', required: true },
            { name: '@url', type: 'string', required: true },
            { name: '@deprecated', type: 'version', required: false },
            { name: '.', type: 'string', required: true }
        ]
    },
    { // api
        name: 'api',
        items: [
            { name: '@version', type: 'version', required: false },
            { name: '@method', type: 'string', required: true },
            { name: '@summary', type: 'string', required: true },
            { name: '@deprecated', type: 'version', required: false },
            { name: '@id', type: 'string', required: false },
            { name: 'description', type: 'string', required: false },
            { name: 'path', type: 'path', required: false },
            { name: 'request', type: 'request[]', required: false },
            { name: 'response', type: 'request[]', required: true },
            { name: 'callback', type: 'callback', required: false },
            { name: 'tag', type: 'string[]', required: false },
            { name: 'server', type: 'string[]', required: false },
            { name: 'header', type: 'header[]', required: false }
        ]
    },
    { // path
        name: 'path',
        items: [
            { name: '@path', type: 'string', required: true },
            { name: 'param', type: 'param[]', required: false },
            { name: 'query', type: 'param[]', required: false }
        ]
    },
    { // request
        name: 'request',
        items: [
            { name: '@name', type: 'string', required: true },
            { name: '@type', type: 'string', required: true },
            { name: '@deprecated', type: 'version', required: false },
            { name: '@summary', type: 'string', required: true },
            { name: '@array', type: 'bool', required: false },
            { name: '@status', type: 'number', required: false },
            { name: '@mimetype', type: 'string', required: false },
            { name: 'description', type: 'string', required: false },
            { name: 'enum', type: 'enum[]', required: false },
            { name: 'param', type: 'param[]', required: false },
            { name: 'example', type: 'example', required: false },
            { name: 'header', type: 'header[]', required: false }
        ]
    },
    { // param
        name: 'param',
        items: [
            { name: '@name', type: 'string', required: true },
            { name: '@type', type: 'string', required: true },
            { name: '@deprecated', type: 'version', required: false },
            { name: '@default', type: 'string', required: false },
            { name: '@optional', type: 'bool', required: false },
            { name: '@summary', type: 'string', required: true },
            { name: '@array', type: 'bool', required: false },
            { name: 'description', type: 'string', required: false },
            { name: 'enum', type: 'enum[]', required: false },
            { name: 'param', type: 'param[]', required: false }
        ]
    },
    { // enum
        name: 'enum',
        items: [
            { name: '@value', type: 'string', required: true },
            { name: '@deprecated', type: 'version', required: false },
            { name: '.', type: 'string', required: true }
        ]
    },
    { // example
        name: 'example',
        items: [
            { name: '@mimetype', type: 'string', required: true },
            { name: '.', type: 'string', required: true }
        ]
    },
    { // header
        name: 'header',
        items: [
            { name: '@name', type: 'string', required: true },
            { name: '@deprecated', type: 'version', required: false },
            { name: '@summary', type: 'string', required: true },
            { name: 'description', type: 'string', required: true }
        ]
    },
    { // callback
        name: 'callback',
        items: [
            { name: '@method', type: 'string', required: true },
            { name: '@summary', type: 'string', required: true },
            { name: '@deprecated', type: 'version', required: false },
            { name: 'description', type: 'string', required: false },
            { name: 'path', type: 'path', required: true },
            { name: 'request', type: 'request[]', required: true },
            { name: 'response', type: 'request[]', required: true }
        ]
    },
    { // version
        name: 'version'
    }
];

export interface Type {
    name: string
    items?: Item[]
}

interface Item {
    name: string
    type: string
    required?: boolean
}
