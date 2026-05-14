import { expect, test } from "vitest";
import { formattedChildNodes } from "../models/formattedChildNodes";
import { removeChildAll } from "../models/removeChildAll";

const parser = new DOMParser();

test("htmlの2行目が字下げされた、新しいHTMLが取得できるかどうか1", () => {
    const doc = parser.parseFromString(
        "<p>　Line1<br>\nLine2</p>",
        "text/html",
    );
    const p = doc.body.firstChild as HTMLParagraphElement;
    const editorLines = ["　Line1", "　Line2"];
    const childNodes = formattedChildNodes(p, editorLines);
    removeChildAll(p);
    childNodes.forEach((c) => p.appendChild(c));
    expect(p.innerHTML).toBe("　Line1<br>\n　Line2");
});

test("htmlの2行目が字下げされた、新しいHTMLが取得できるかどうか2", () => {
    const doc = parser.parseFromString(
        "<p>　Line<br>\n<strong>Bold</strong> text</p>",
        "text/html",
    );
    const p = doc.body.firstChild as HTMLParagraphElement;
    const editorLines = ["　Line", "　**Bold** text"];
    const childNodes = formattedChildNodes(p, editorLines);
    removeChildAll(p);
    childNodes.forEach((c) => p.appendChild(c));
    expect(p.innerHTML).toBe("　Line<br>\n　<strong>Bold</strong> text");
});
