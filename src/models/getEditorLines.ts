import { Editor } from "obsidian";
import { isMatchCalloutType, matchQuoteSymbol } from "./match";

/**
 * エディタを対象に、指定した範囲の行を配列で返す
 */
const getEditorLines = (
    editor: Editor,
    lineStart: number,
    lineEnd: number
): string[] => {
    const editorLines: string[] = [];
    for (let i = lineStart; i <= lineEnd; i++) {
        const line = editor.getLine(i);
        if (line == null) continue;

        // コールアウトのタイトルが書かれている行は配列に含めない
        if (isMatchCalloutType(line)) continue;

        // コールアウトや注釈の記号`>`を取り除いてから、配列に追加する
        const result = matchQuoteSymbol(line)?.[0];
        if (result != null) {
            const charArray = Array.from(line);
            charArray.splice(0, result.length);
            const newLine = charArray.join("");
            editorLines.push(newLine);
            continue;
        }

        editorLines.push(line);
    }
    return editorLines;
};

export default getEditorLines;
