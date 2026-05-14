/**
 * 渡された要素の子要素をすべて削除する
 */
export const removeChildAll = (el: HTMLElement): void => {
    while (el.firstChild != null) {
        el.removeChild(el.firstChild);
    }
};
