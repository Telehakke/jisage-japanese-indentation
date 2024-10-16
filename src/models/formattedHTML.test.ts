import { expect, test } from "vitest";
import formattedHTML from "./formattedHTML";

test("htmlの2行目が字下げされた、新しいHTMLが取得できるかどうか", () => {
    const html = "　Line1<br>\nLine2";
    const editorLines = ["　Line1", "　Line2"];
    const result = formattedHTML(html, editorLines);
    expect(result).toBe("　Line1<br>\n　Line2");
});
