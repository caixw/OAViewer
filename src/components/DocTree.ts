// SPDX-License-Identifier: MIT

import { Type } from '@/config/types';
import VueI18n from 'vue-i18n';

/**
 * 用于表示文档树结构
 *
 * 该类型被 DocTree.vue 使用。
 *
 * TODO: 将 DocTree.ts 与 DocTree.vue 合并为一个文件？
 */
export class DocTree {
    // 用于锚点上的 ID 链接
    // id 中不能包含诸如 . 等特殊字符。
    id: string;

    // 表示该段文档的标题的翻译 ID
    title: string;

    // 该段文档的内容的翻译 ID
    content: string;

    // contentType 与当前文档关联的类型描述信息
    // i18nPrefix 表示该类型描述信息中涉及到翻译内容时的 ID 前缀。
    contentType?: Type;
    i18nPrefix?: string;

    // 子文档内容
    items?: DocTree[];

    constructor(id: string, title: string, content: string) {
        this.id = id;
        this.title = title;
        this.content = content;
    }

    // 获取翻译后的标题内容
    titleText(i18n: VueI18n): string {
        if (this.contentType !== undefined) {
            return this.contentType.name;
        }
        return i18n.t(this.title).toString();
    }

    // 获取翻译后的文档内容
    contentText(i18n: VueI18n): string {
        return i18n.t(this.content).toString();
    }

    // 添加一个子项
    add(id: string, title: string, content: string): void {
        const tree = new DocTree(id, title, content);

        this.addTree(tree);
    }

    // 添加子项，并将 Type 转换成文档内容附加在子项后面。
    //
    // i18nPrefix 表示类型内容的翻译 I，同时也作为 Type 其它项翻译 ID 的前缀。
    addType(id: string, i18nPrefix: string, type: Type): void {
        const tree = new DocTree(id, '', i18nPrefix);
        tree.contentType = type;
        tree.i18nPrefix = i18nPrefix;

        this.addTree(tree);
    }

    addTree(tree: DocTree): void {
        if (this.items === undefined) {
            this.items = [];
        }

        tree.id = this.id + '_' + tree.id;
        this.items.push(tree);
    }

     // 清除子项
    clear(): void {
        if (this.items !== undefined) {
            this.items.length = 0;
        }
    }
}
