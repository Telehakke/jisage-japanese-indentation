import { expect, test } from "vitest";
import { isMatchCalloutType } from "./match";

test("コールアウトのタイプが含まれていると判定するかどうか1", () => {
    const text = ">[!NOTE] Title";
    const result = isMatchCalloutType(text);
    expect(result).toBeTruthy();
});

test("コールアウトのタイプが含まれていると判定するかどうか2", () => {
    const text = "> [!NOTE] Title";
    const result = isMatchCalloutType(text);
    expect(result).toBeTruthy();
});

test("コールアウトのタイプが含まれていると判定するかどうか3", () => {
    const text = " > [!NOTE] Title";
    const result = isMatchCalloutType(text);
    expect(result).toBeTruthy();
});

test("コールアウトの構文が正しくない場合に、falseを返すかどうか", () => {
    const text = ">  [!NOTE] > [!NOTE]";
    const result = isMatchCalloutType(text);
    expect(result).toBeFalsy();
});
