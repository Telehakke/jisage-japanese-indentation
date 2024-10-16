import { expect, test } from "vitest";
import getEditorLines from "./getEditorLines";
import {
    Editor,
    EditorChange,
    EditorCommandName,
    EditorPosition,
    EditorRange,
    EditorSelection,
    EditorSelectionOrCaret,
    EditorTransaction,
} from "obsidian";

class MockEditor implements Editor {
    private lines: string[] = [];

    constructor(lines: string[]) {
        this.lines = lines;
    }

    getLine = (line: number): string => {
        return this.lines[line];
    };

    getDoc(): this {
        throw new Error("Method not implemented.");
    }
    refresh(): void {
        throw new Error("Method not implemented.");
    }
    getValue(): string {
        throw new Error("Method not implemented.");
    }
    setValue(_content: string): void {
        throw new Error("Method not implemented.");
    }
    setLine(_n: number, _text: string): void {
        throw new Error("Method not implemented.");
    }
    lineCount(): number {
        throw new Error("Method not implemented.");
    }
    lastLine(): number {
        throw new Error("Method not implemented.");
    }
    getSelection(): string {
        throw new Error("Method not implemented.");
    }
    somethingSelected(): boolean {
        throw new Error("Method not implemented.");
    }
    getRange(_from: EditorPosition, _to: EditorPosition): string {
        throw new Error("Method not implemented.");
    }
    replaceSelection(_replacement: string, _origin?: string): void {
        throw new Error("Method not implemented.");
    }
    replaceRange(
        _replacement: string,
        _from: EditorPosition,
        _to?: EditorPosition,
        _origin?: string
    ): void {
        throw new Error("Method not implemented.");
    }
    getCursor(_string?: "from" | "to" | "head" | "anchor"): EditorPosition {
        throw new Error("Method not implemented.");
    }
    listSelections(): EditorSelection[] {
        throw new Error("Method not implemented.");
    }
    setCursor(_pos: EditorPosition | number, _ch?: number): void {
        throw new Error("Method not implemented.");
    }
    setSelection(_anchor: EditorPosition, _head?: EditorPosition): void {
        throw new Error("Method not implemented.");
    }
    setSelections(_ranges: EditorSelectionOrCaret[], _main?: number): void {
        throw new Error("Method not implemented.");
    }
    focus(): void {
        throw new Error("Method not implemented.");
    }
    blur(): void {
        throw new Error("Method not implemented.");
    }
    hasFocus(): boolean {
        throw new Error("Method not implemented.");
    }
    getScrollInfo(): { top: number; left: number } {
        throw new Error("Method not implemented.");
    }
    scrollTo(_x?: number | null, _y?: number | null): void {
        throw new Error("Method not implemented.");
    }
    scrollIntoView(_range: EditorRange, _center?: boolean): void {
        throw new Error("Method not implemented.");
    }
    undo(): void {
        throw new Error("Method not implemented.");
    }
    redo(): void {
        throw new Error("Method not implemented.");
    }
    exec(_command: EditorCommandName): void {
        throw new Error("Method not implemented.");
    }
    transaction(_tx: EditorTransaction, _origin?: string): void {
        throw new Error("Method not implemented.");
    }
    wordAt(_pos: EditorPosition): EditorRange | null {
        throw new Error("Method not implemented.");
    }
    posToOffset(_pos: EditorPosition): number {
        throw new Error("Method not implemented.");
    }
    offsetToPos(_offset: number): EditorPosition {
        throw new Error("Method not implemented.");
    }
    processLines<T>(
        _read: (line: number, lineText: string) => T | null,
        _write: (
            line: number,
            lineText: string,
            value: T | null
        ) => EditorChange | void,
        _ignoreEmpty?: boolean
    ): void {
        throw new Error("Method not implemented.");
    }
}

test("通常の文章が取得の対象になる場合", () => {
    const src = ["Line1", "Line2"];
    const result = getEditorLines(new MockEditor(src), 0, src.length - 1);
    expect(result).toEqual(["Line1", "Line2"]);
});

test("コールアウトが取得の対象になる場合", () => {
    const src = ["> [!NOTE] Title", "> Contents1", "> Contents2"];
    const result = getEditorLines(new MockEditor(src), 0, src.length - 1);
    expect(result).toEqual([" Contents1", " Contents2"]);
});
