import { matchWhitespace } from "./match";

/**
 * エディタの値で置き換えることで、
 * 字下げされた状態へと修正したChildNodeの配列を返す
 */
const formattedChildNodes = (
    p: HTMLParagraphElement,
    editorLines: string[]
): ChildNode[] => {
    const isLineBreakAtFirstCharacter = (text: string): boolean => {
        return text[0] === "\n";
    };

    let lineNumber = 0;
    const result: ChildNode[] = Array.from(p.childNodes) //
        .map((v) => {
            if (
                v.nodeName === "#text" &&
                isLineBreakAtFirstCharacter(v.textContent ?? "")
            ) {
                lineNumber += 1;
                const line = editorLines[lineNumber];
                const space = matchWhitespace(line)?.[0];
                if (space == null) {
                    return v;
                } else {
                    // vがテキストであり、かつ改行から始まるのであれば、
                    // その改行のあとにスペースを挿入する
                    const charArray = Array.from(v.textContent ?? "");
                    charArray.splice(1, 0, space);
                    const newValue = charArray.join("");
                    const clone = v.cloneNode() as ChildNode;
                    clone.textContent = newValue;
                    return clone;
                }
            }

            return v;
        });
    return result;
};

export default formattedChildNodes;
