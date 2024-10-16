/**
 * 指定した文字列に、コールアウトのタイプが含まれているかどうか
 */
export const isMatchCalloutType = (src: string): boolean => {
    const result = src.match(/^ *> ?\[!.+?\]/);
    return result != null;
};

/**
 * 指定した文字列から、引用を示す記号を取得する
 */
export const matchQuoteSymbol = (src: string): RegExpMatchArray | null => {
    return src.match(/^((>| )*)?>/);
};

/**
 * 指定した文字列から、空白文字で始まる箇所を取得する
 */
export const matchWhitespace = (src: string): RegExpMatchArray | null => {
    return src.match(/^\s+/);
};
