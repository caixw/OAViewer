// SPDX-License-Identifier: MIT

import marked from 'marked';
import config from '@/config/config';

export interface ApiDoc {
    $attr: {
        version: string,
        lang?: string,
        logo?: string
    },
    title: string,
    description: Description,
    contact?: {
        $attr: {
            url?: string,
            email?: string
        },
        $text: string
    },
    license?: {
        $attr: {
            url: string
            text: string
        }
    },
    tag?: Tag[] | Tag,
    server: Server[] | Server,
    response?: RequestBody[] | RequestBody,
    api?: Api[] | Api
}

interface Tag {
    $attr: {
        name: string,
        title: string,
        deprecated?: string
    }
}

// Enum 需要实现 Description
interface Server {
    $attr: {
        name: string,
        url: string,
        deprecated?: string,
        textType: string
    },
    $cdata: string
}

export interface Api {
    $attr: {
        version?: string,
        method: string,
        summary: string,
        deprecated?: string,
        id?: string
    },
    description?: Description,
    path: Path,
    request: RequestBody[] | RequestBody,
    response: RequestBody[] | RequestBody,
    callback?: Callback,
    tag: ApiTag[] | ApiTag,
    server: ApiTag[] | ApiTag,
    header: Param[] | Param
}

interface ApiTag {
    $text: string
}

export interface RequestBody {
    $attr: {
        name: string,
        type: string,
        deprecated?: string,
        summary: string,
        array?: boolean,
        status?: number,
        mimetype: string
    },
    description?: Description,
    enum?: Enum[] | Enum,
    param?: Param[] | Param,
    example?: Example,
    header?: Param[] | Param
}

export interface Param {
    $attr: {
        name: string,
        type: string,
        deprecated?: string,
        default?: string,
        optional?: boolean,
        array?: boolean,
        summary: string
    },
    description?: Description,
    enum?: Enum[] | Enum,
    param?: Param[] | Param
}

export interface Example {
    $attr: {
        mimetype: string,
        summary?: string
    },
    $cdata: string,
    description?: Description
}

// Enum 需要实现 Description
interface Enum {
    $attr: {
        value: string,
        summary?: string,
        deprecated?: string,
        textType?: string,
    }
    $cdata?: string
}

export interface Callback {
    $attr: {
        method: string,
        summary: string,
        deprecated?: string,
    },
    description?: Description,
    path: Path,
    request: RequestBody[] | RequestBody,
    response: RequestBody[] | RequestBody
}

export interface Path {
    $attr: {
        path: string
    },
    param?: Param[] | Param,
    query?: Param[] | Param
}

interface Description {
    $attr: {
        textType?: string
    },
    $cdata: string
}

/**
 * 将参数转换成数组返回
 * @param element
 */
export function arrays<T>(element: T | T[] | undefined): T[] {
    if (element === undefined) {
        return [];
    }
    return Array.isArray(element) ? element : [element];
}

/**
 * 检测参数是否为空
 * @param element
 */
export function notEmpty<T>(element: T | T[] | undefined): boolean {
    if (element === undefined) {
        return false;
    }
    return Array.isArray(element) ? (element.length > 0) : true;
}

/**
 * 返回正确的描述信息
 * @param summary 简单的摘要，在没有 desc 时，返回此值
 * @param desc 需要同时兼容 Enum 和 Description 两个接口中有关 description 的描述
 */
export function getDescription(summary?: string, desc?: Description): string {
    if (desc === undefined) {
        return summary === undefined ? '' : summary;
    }

    switch (desc.$attr.textType) {
    case 'html':
        return desc.$cdata ? desc.$cdata : '';
    case 'markdown':
        return desc.$cdata ? marked(desc!.$cdata) : '';
    case '':
        if (config.defaultRender === 'markdown') {
            return desc.$cdata ? marked(desc.$cdata) : '';
        }
        return desc.$cdata ? desc.$cdata : '';
    default:
        return desc.$cdata ? desc.$cdata : '';
    }
}

export function getDescriptionWithEnum(dest: string, enums?: Enum[] | Enum): string {
    const es = arrays(enums);
    if (es.length === 0) {
        return dest;
    }

    dest += '<ul>';
    for (const e of es) {
        const enumDesc = getEnumDescription(e);
        dest += '<li>' + e.$attr.value + ':' + enumDesc + '</li>';
    }
    dest += '</ul>';

    return dest;
}

function getEnumDescription(e: Enum): string {
    if (!e.$cdata) {
        return e.$attr.summary ? e.$attr.summary : '';
    }

    const t = e.$attr.textType ? e.$attr.textType : config.defaultRender;
    if (t === 'markdown') {
        return marked(e.$cdata);
    }
    return e.$cdata;
}
