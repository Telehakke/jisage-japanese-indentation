import { Plugin } from "obsidian";
import { formattedChildNodes } from "./models/formattedChildNodes";
import { getEditorLines } from "./models/getEditorLines";
import { removeChildAll } from "./models/removeChildAll";
import "./styles.css";

export default class JisagePlugin extends Plugin {
    async onload(): Promise<void> {
        // <p>要素の値をエディタの値で置き換えることで、
        // 閲覧モードにおいて字下げした状態で表示させる
        this.registerMarkdownPostProcessor((el, ctx) => {
            const p = el.querySelector("p");
            if (p == null) return;
            const editor = this.app.workspace.activeEditor?.editor;
            if (editor == null) return;
            const sectionInfo = ctx.getSectionInfo(el);
            if (sectionInfo == null) return;
            const { lineStart, lineEnd } = sectionInfo;

            const editorLines = getEditorLines(editor, lineStart, lineEnd);
            const childNodes = formattedChildNodes(p, editorLines);
            removeChildAll(p);
            childNodes.forEach((c) => p.appendChild(c));
        });
    }
}
