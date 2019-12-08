// SPDX-License-Identifier: MIT

// 当前文件仅涉处理文档的加载功能，
// 不应该有额外的加工功能，比如提前将 markdown 转换成 html 等，
// 那是组件应该处理的事情。

import convert from 'xml-js';
import marked from 'marked';
import config from '@/config/config';

/**
 * 加载指定地址的文档内容
 *
 * 根据文档的后缀名确定是 xml 和 json 格式。
 *
 * @param url 文档的路径，后缀名必须是 xml 或是 json，其它情况下抛出异常
 */
export async function load(url: string): Promise<ApiDoc> {
    const index = url.lastIndexOf('.');
    if (index <= 0) {
        return await loadXml(url);
    }

    switch (url.slice(index).toLowerCase()) {
    case '.json':
        return await loadJson(url);
    case '.xml':
        return await loadXml(url);
    default:
        throw new Error('error.invalid-file-format');
    }
}

/**
 * 返回正确的描述信息
 * @param summary 简单的摘要，在没有 desc 时，返回此值
 * @param desc 需要同时兼容 Enum 和 Description 两个接口中有关 description 的描述
 */
export function getDescription(summary?: string, desc?: Description): string {
    if (desc === undefined) {
        return summary || '';
    }

    switch (desc.textType) {
        case 'html':
            return desc.content || '';
        case 'markdown':
            return desc.content ? marked(desc.content) : '';
        case '':
            if (config.defaultRender === 'markdown') {
                return desc.content ? marked(desc.content) : '';
            }
            return desc.content || '';
        default:
            return desc.content || '';
    }
}

/**
 * 将 Example 的内容转换成 HTML
 */
export function getExampleContent(e: Example): string {
    return e.content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function getDescriptionWithEnum(desc: string, enums?: Enum[] | Enum): string {
    const es = arrays(enums);
    if (es.length === 0) {
        return desc;
    }

    desc += '<ul>';
    for (const e of es) {
        const enumDesc = getEnumDescription(e);
        desc += '<li>' + e.value + ':' + enumDesc + '</li>';
    }
    desc += '</ul>';

    return desc;
}

function getEnumDescription(e: Enum): string {
    if (!e.content) {
        return e.summary ? e.summary : '';
    }

    const t = e.textType ? e.textType : config.defaultRender;
    if (t === 'markdown') {
        return marked(e.content);
    }
    return e.content;
}

function fromDescription(desc: XmlDescription): Description {
    return {
        textType: desc.$attr.textType,
        content: desc.$cdata
    }
}

function fromServer(srv: XmlServer): Server {
    return {
        name: srv.$attr.name,
        url: srv.$attr.url,
        deprecated: srv.$attr.deprecated,
        textType: srv.$attr.textType,
        content: srv.$cdata
    }
}

function fromRequestBody(req: XmlRequestBody): RequestBody {
    return {
        name: req.$attr.name,
        type: req.$attr.type,
        summary: req.$attr.summary,
        array: req.$attr.array,
        status: req.$attr.status,
        mimetype: req.$attr.mimetype,
        description: req.description ? fromDescription(req.description) : undefined,
        params: fromArrays(req.param, fromParam),
        headers: fromArrays(req.header, fromParam),
        enums: fromArrays(req.enum, fromEnum),
        deprecated: req.$attr.deprecated,
        example: req.example ? fromExample(req.example) : undefined
    };
}

function fromExample(e: XmlExample): Example {
    return {
        mimetype: e.$attr.mimetype,
        summary: e.$attr.summary,
        content: e.$cdata,
        description: e.description ? fromDescription(e.description) : undefined
    }
}

function fromApi(api: XmlApi): Api {
    const ret: Api = {
        version: api.$attr.version,
        method: api.$attr.method,
        summary: api.$attr.summary,
        id: api.$attr.id,
        description: api.description ? fromDescription(api.description) : undefined,
        path: fromPath(api.path),
        requests: fromArrays(api.request, fromRequestBody) || [],
        responses: fromArrays(api.response, fromRequestBody) || [],
        tags: fromArrays(api.tag, (tag:XmlApiTag): string => {
            return tag.$text;
        }),
        servers: fromArrays(api.server, (srv: XmlApiTag): string => {
            return srv.$text;
        }) || [],
        headers: fromArrays(api.header, fromParam)
    };

    if (api.callback !== undefined) {
        ret.callback = {
            method: api.callback.$attr.method,
            summary: api.callback.$attr.summary,
            description: api.callback.description ? fromDescription(api.callback.description) : undefined,
            path: fromPath(api.path),
            requests: fromArrays(api.request, fromRequestBody) || [],
            responses: fromArrays(api.response, fromRequestBody) || [],
            deprecated: api.$attr.deprecated
        }
    }

    return ret;
}

function fromEnum(e: XmlEnum): Enum {
    return {
        value: e.$attr.value,
        summary: e.$attr.summary,
        deprecated: e.$attr.deprecated,
        textType: e.$attr.textType,
        content: e.$cdata
    }
}

function fromPath(p: XmlPath): Path {
    return {
        path: p.$attr.path,
        params: fromArrays(p.param, fromParam),
        queries: fromArrays(p.query, fromParam)
    }
}

function fromParam(p: XmlParam): Param {
    return {
        name: p.$attr.name,
        type: p.$attr.type,
        default: p.$attr.default,
        optional: p.$attr.optional,
        array: p.$attr.array,
        summary: p.$attr.summary,
        description: p.description ? fromDescription(p.description) : undefined,
        enums: fromArrays(p.enum, fromEnum),
        params: fromArrays(p.param, fromParam),
        deprecated: p.$attr.deprecated
    };
}

async function loadJson(url: string): Promise<ApiDoc> {
    const resp = await fetch(url);
    return await resp.json();
}

async function loadXml(url: string): Promise<ApiDoc> {
    const resp = await fetch(url);
    const text = await resp.text();
    const obj = JSON.parse(convert.xml2json(text, convertOptions)).apidoc;
    if (obj === null) {
        throw new Error('error.apidoc-empty');
    }

    if (obj.api === undefined) {
        throw new Error('error.api-empty');
    }

    const ret: ApiDoc = {
        version: obj.$attr.version,
        created: obj.$attr.created,
        lang: obj.$attr.lang,
        logo: obj.$attr.logo,
        title: obj.title.$text,
        description: fromDescription(obj.description),
        tags: fromArrays(obj.tag, (tag: XmlTag): Tag => {
            return { ...tag.$attr };
        }),
        servers: [],
        responses: fromArrays(obj.response, fromRequestBody),
        apis: fromArrays(obj.api, fromApi)
    };

    if (obj.contact !== undefined) {
        ret.contact = {
            email: obj.contact.$attr.email,
            url: obj.contact.$attr.url,
            name: obj.contact.$text
        }
    }

    if (obj.license !== undefined) {
        ret.license = obj.license.$attr
    }

    for (const srv of arrays(obj.server)) {
        ret.servers.push(fromServer(srv));
    }

    return ret;
}

function arrays<T>(element: T | T[] | undefined): T[] {
    if (element === undefined) {
        return [];
    }
    return Array.isArray(element) ? element : [element];
}

function fromArrays<I, R>(element: I | I[] | undefined, conv: {(i:I):R}): R[] | undefined {
    const elements = arrays(element);
    if (elements.length === 0) {
        return undefined;
    }

    const ret: Array<R> = [];
    for (const e of elements) {
        ret.push(conv(e));
    }

    return ret;
}

export interface ApiDoc {
    version: string,
    created?: string,
    lang?: string,
    logo?: string
    title: string,
    description: Description,
    contact?: {
        name: string,
        url?: string,
        email?: string
    },
    license?: Link,
    tags?: Tag[],
    servers: Server[],
    responses?: RequestBody[],
    apis?: Api[]
}

interface Deprecated {
    deprecated?: string
}

interface Description {
    textType?: string,
    content?: string
}

export interface Server extends Deprecated, Description {
    name: string,
    url: string,
}

export interface Tag extends Deprecated {
    name: string,
    title: string,
}

interface Link {
    url: string
    text: string
}

export interface Api extends Deprecated {
    version?: string,
    method: string,
    summary: string,
    id?: string,
    description?: Description,
    path: Path,
    requests: RequestBody[],
    responses: RequestBody[],
    callback?: Callback,
    tags?: string[],
    servers: string[],
    headers?: Param[]
}

export interface RequestBody extends Deprecated {
    name: string,
    type: string,
    summary: string,
    array?: boolean,
    status?: number,
    mimetype: string,
    description?: Description,
    enums?: Enum[],
    params?: Param[],
    example?: Example,
    headers?: Param[]
}

export interface Param extends Deprecated {
    name: string,
    type: string,
    default?: string,
    optional?: boolean,
    array?: boolean,
    summary: string,
    description?: Description,
    enums?: Enum[],
    params?: Param[]
}

export interface Example {
    mimetype: string,
    summary?: string,
    content: string,
    description?: Description
}

// Enum 需要实现 Description
interface Enum extends Deprecated, Description {
    value: string,
    summary?: string,
}

export interface Callback extends Deprecated {
    method: string,
    summary: string,
    description?: Description,
    path: Path,
    requests: RequestBody[],
    responses: RequestBody[]
}

interface Path {
    path: string
    params?: Param[],
    queries?: Param[]
}

/** 以下是针对 xml 文件转换的接口定义 */

// xml-js 转换的配置项
const convertOptions = {
    compact: true,
    attributesKey: '$attr',
    textKey: '$text',
    cdataKey: '$cdata'
};

interface XmlApiDoc {
    $attr: {
        version: string,
        created?: string,
        lang?: string,
        logo?: string
    },
    title: {
        $text: string
    },
    description: XmlDescription,
    contact?: {
        $attr: {
            url?: string,
            email?: string
        },
        $text: string
    },
    license?: { $attr: Link },
    tag?: XmlTag[] | XmlTag,
    server: XmlServer[] | XmlServer,
    response?: XmlRequestBody[] | XmlRequestBody,
    api?: XmlApi[] | XmlApi
}

interface XmlTag { $attr: Tag }

// Enum 需要实现 Description
interface XmlServer {
    $attr: {
        name: string,
        url: string,
        deprecated?: string,
        textType: string
    },
    $cdata: string
}

interface XmlApi {
    $attr: {
        version?: string,
        method: string,
        summary: string,
        deprecated?: string,
        id?: string
    },
    description?: XmlDescription,
    path: XmlPath,
    request: XmlRequestBody[] | XmlRequestBody,
    response: XmlRequestBody[] | XmlRequestBody,
    callback?: XmlCallback,
    tag?: XmlApiTag[] | XmlApiTag,
    server: XmlApiTag[] | XmlApiTag,
    header?: XmlParam[] | XmlParam
}

interface XmlApiTag {
    $text: string
}

interface XmlRequestBody {
    $attr: {
        name: string,
        type: string,
        deprecated?: string,
        summary: string,
        array?: boolean,
        status?: number,
        mimetype: string
    },
    description?: XmlDescription,
    enum?: XmlEnum[] | XmlEnum,
    param?: XmlParam[] | XmlParam,
    example?: XmlExample,
    header?: XmlParam[] | XmlParam
}

interface XmlParam {
    $attr: {
        name: string,
        type: string,
        deprecated?: string,
        default?: string,
        optional?: boolean,
        array?: boolean,
        summary: string
    },
    description?: XmlDescription,
    enum?: XmlEnum[] | XmlEnum,
    param?: XmlParam[] | XmlParam
}

interface XmlExample {
    $attr: {
        mimetype: string,
        summary?: string
    },
    $cdata: string,
    description?: XmlDescription
}

// Enum 需要实现 Description
interface XmlEnum {
    $attr: {
        value: string,
        summary?: string,
        deprecated?: string,
        textType?: string,
    }
    $cdata?: string
}

interface XmlCallback {
    $attr: {
        method: string,
        summary: string,
        deprecated?: string,
    },
    description?: XmlDescription,
    path: XmlPath,
    request: XmlRequestBody[] | XmlRequestBody,
    response: XmlRequestBody[] | XmlRequestBody
}

interface XmlPath {
    $attr: {
        path: string
    },
    param?: XmlParam[] | XmlParam,
    query?: XmlParam[] | XmlParam
}

interface XmlDescription {
    $attr: {
        textType?: string
    },
    $cdata: string
}
