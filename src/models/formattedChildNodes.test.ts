import { expect, test } from "vitest";
import formattedChildNodes from "./formattedChildNodes";

test("htmlの2行目が字下げされた、新しいHTMLが取得できるかどうか1", () => {
    const p = document.createElement("p");
    p.innerHTML = "　Line1<br>\nLine2";
    const editorLines = ["　Line1", "　Line2"];
    const childNodes = formattedChildNodes(p, editorLines);
    const newP = document.createElement("p");
    childNodes.forEach((v) => {
        newP.appendChild(v);
    });
    expect(newP.innerHTML).toBe("　Line1<br>\n　Line2");
});

test("htmlの2行目が字下げされた、新しいHTMLが取得できるかどうか2", () => {
    const p = document.createElement("p");
    p.innerHTML = "　Line<br>\n<strong>Bold</strong> text";
    const editorLines = ["　Line", "　**Bold** text"];
    const childNodes = formattedChildNodes(p, editorLines);
    const newP = document.createElement("p");
    childNodes.forEach((v) => {
        newP.appendChild(v);
    });
    expect(newP.innerHTML).toBe("　Line<br>\n　<strong>Bold</strong> text");
});
