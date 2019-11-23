// SPDX-License-Identifier: MIT

export interface ApiDoc {
    $attr: {
        version: string,
        lang?: string,
        logo?: string
    },
    title: string,
    description: string,
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
        },
        $text: string
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

interface Server {
    $attr: {
        name: string,
        url: string,
        deprecated?: string
    },
    $text: string
}

export interface Api {
    $attr: {
        version?: string,
        method: string,
        summary: string,
        deprecated?: string,
        id?: string
    },
    description?: string,
    path: Path,
    request: RequestBody[] | RequestBody,
    response: RequestBody[] | RequestBody,
    callback: Callback,
    tag: string[] | string,
    server: string[] | string,
    header: Param[] | Param
}

export interface RequestBody {
    $attr: {
        name: string,
        type: string,
        deprecated?: string,
        summary: string,
        array?: boolean,
        status?: number,
        mimetype?: string
    },
    description?: string,
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
        summary: string
    },
    description?: string,
    enum?: Enum[] | Enum,
    param?: Param[] | Param
}

export interface Example {
    $attr: {
        mimetype: string
    },
    $text: string
}

interface Enum {
    $attr: {
        value: string,
        deprecated?: string,
    }
    $text: string
}

export interface Callback {
    $attr: {
        method: string,
        summary: string,
        deprecated?: string,
    },
    description?: string,
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
