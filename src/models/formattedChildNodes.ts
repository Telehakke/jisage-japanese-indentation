import { matchWhitespace } from "./match";

/**
 * 字下げされた状態に修正したChildNodeの配列を返す
 */
export const formattedChildNodes = (
    p: HTMLParagraphElement, // 字下げが取り除かれているので修正が必要
    editorLines: readonly string[], // p要素に該当する箇所のテキストデータ
): ChildNode[] => {
    // 1行目は正しく字下げされているので2行目以降を取り出す
    const lines = editorLines.slice(1);

    return Array.from(p.childNodes).map((c) => {
        const text = c.textContent;
        if (text == null) return c;

        // 2行目以降のテキストが該当するブロック
        if (isTextNode(c) && startWithNewLine(text)) {
            const line = lines.shift();
            if (line == null) return c;

            const space = matchWhitespace(line)?.[0];
            if (space == null) return c;

            // この行が字下げされている場合に実行される処理
            const charArray = Array.from(text);
            // 修正箇所。1文字目（改行コード）の直後に取り除かれたスペースを挿入する
            charArray.splice(1, 0, space);
            const clone = c.cloneNode() as ChildNode;
            clone.textContent = charArray.join("");
            return clone;
        }
        return c;
    });
};

const isTextNode = (node: ChildNode): boolean => {
    return node.nodeName === "#text";
};

const startWithNewLine = (text: string): boolean => {
    return text.startsWith("\n");
};
