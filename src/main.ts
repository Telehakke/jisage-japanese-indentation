import { Plugin } from "obsidian";
import getEditorLines from "./models/getEditorLines";
import formattedHTML from "./models/formattedHTML";
import Dompurify from "dompurify";

export default class JisagePlugin extends Plugin {
    async onload(): Promise<void> {
        // <p>要素の値をエディタの値で置き換えることで、
        // 閲覧モードにおいて字下げした状態で表示させる
        this.registerMarkdownPostProcessor((el, ctx) => {
            const p = el.querySelector("p");
            if (p == null) return;

            const lineStart = ctx.getSectionInfo(el)?.lineStart;
            const lineEnd = ctx.getSectionInfo(el)?.lineEnd;
            if (lineStart == null) return;
            if (lineEnd == null) return;

            const editor = this.app.workspace.activeEditor?.editor;
            if (editor == null) return;

            const editorLines = getEditorLines(editor, lineStart, lineEnd);
            const newInnerHTML = formattedHTML(p.innerHTML, editorLines);
            const cleanHTML = Dompurify.sanitize(newInnerHTML);
            p.innerHTML = cleanHTML;
        });
    }
}
