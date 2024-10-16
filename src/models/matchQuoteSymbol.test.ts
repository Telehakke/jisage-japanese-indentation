import { expect, test } from "vitest";
import { matchQuoteSymbol } from "./match";

test("引用を示す記号を取得できるかどうか", () => {
    const text = "> Quote";
    const result = matchQuoteSymbol(text)?.[0];
    expect(result).toBe(">");
});

test("ネストした引用を示す記号を取得できるかどうか1", () => {
    const text = ">> Quote";
    const result = matchQuoteSymbol(text)?.[0];
    expect(result).toBe(">>");
});

test("ネストした引用を示す記号を取得できるかどうか2", () => {
    const text = "> > Quote";
    const result = matchQuoteSymbol(text)?.[0];
    expect(result).toBe("> >");
});

test("引用の構文が正しくない場合に、マッチしないかどうか", () => {
    const text = "-> Quote > Quote";
    const result = matchQuoteSymbol(text)?.[0];
    expect(result).toBeUndefined();
});
