import { expect, test } from "vitest";
import { matchWhitespace } from "./match";

test("行頭の半角スペースを取得できるかどうか", () => {
    const text = " Line";
    const result = matchWhitespace(text)?.[0];
    expect(result).toBe(" ");
});

test("行頭の全角スペースを取得できるかどうか", () => {
    const text = "　Line";
    const result = matchWhitespace(text)?.[0];
    expect(result).toBe("　");
});

test("行頭の全角スペースの連続を取得できるかどうか", () => {
    const text = "　　Line";
    const result = matchWhitespace(text)?.[0];
    expect(result).toBe("　　");
});

test("空白文字で始まらない場合、undefinedを返すかどうか", () => {
    const text = "Line ";
    const result = matchWhitespace(text)?.[0];
    expect(result).toBeUndefined();
});
