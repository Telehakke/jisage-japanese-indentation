import { matchWhitespace } from "./match";

/**
 * 字下げされた状態になるようにエディタの値で置き換えた、新しいHTMLを返す
 */
const formattedHTML = (html: string, editorLines: string[]): string => {
    const isLineBreakAtFirstCharacter = (text: string): boolean => {
        return text[0] === "\n";
    };

    const regExpForAnyHTMLTag = /(<.+?>)/;
    let hasBrTag = false;
    let lineNumber = 0;

    const result: string[] = html //
        .split(regExpForAnyHTMLTag)
        .map((v) => {
            if (v === "<br>") {
                hasBrTag = true;
                return v;
            }

            // <br>に続く次の行の先頭が`\n`で始まりつつ、
            // その行に対応するエディタの行の先頭に全角スペースがあれば、
            // `\n`の直後に全角スペースを挿入する
            if (hasBrTag && isLineBreakAtFirstCharacter(v)) {
                lineNumber += 1;
                const line = editorLines[lineNumber];
                const space = matchWhitespace(line)?.[0];
                if (space == null) {
                    return v;
                } else {
                    const charArray = Array.from(v);
                    charArray.splice(1, 0, space);
                    const newValue = charArray.join("");
                    return newValue;
                }
            }

            hasBrTag = false;
            return v;
        });
    const newHTML = result.join("");
    return newHTML;
};

export default formattedHTML;
