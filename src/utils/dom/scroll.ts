type ScrollElement = HTMLElement | Window;

// get nearest scroll element
// http://w3help.org/zh-cn/causes/SD9013
// http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
const overflowScrollReg = /scroll|auto/i;
export function getScroller(el: HTMLElement, root: ScrollElement = window) {
  let node = el;

  while (
    node &&
    node.tagName !== 'HTML' &&
    node.nodeType === 1 &&
    node !== root
  ) {
    const { overflowY } = window.getComputedStyle(node);

    if (overflowScrollReg.test(<string>overflowY)) {
      if (node.tagName !== 'BODY') {
        return node;
      }

      // see: https://github.com/youzan/vant/issues/3823
      const { overflowY: htmlOverflowY } = window.getComputedStyle(
        <Element>node.parentNode
      );

      if (overflowScrollReg.test(<string>htmlOverflowY)) {
        return node;
      }
    }
    node = <HTMLElement>node.parentNode;
  }

  return root;
}

export function getScrollTop(el: ScrollElement): number {
  return 'scrollTop' in el ? el.scrollTop : el.pageYOffset;
}

export function setScrollTop(el: ScrollElement, value: number) {
  if ('scrollTop' in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}

export function getRootScrollTop(): number {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

export function setRootScrollTop(value: number) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
}

// get distance from element top to page top
export function getElementTop(el: ScrollElement) {
  if (el === window) {
    return 0;
  }

  return (el as HTMLElement).getBoundingClientRect().top + getRootScrollTop();
}

export function getVisibleHeight(el: ScrollElement) {
  if (el === window) {
    return el.innerHeight;
  }

  return (el as HTMLElement).getBoundingClientRect().height;
}

export function getVisibleTop(el: ScrollElement) {
  if (el === window) {
    return 0;
  }
  return (el as HTMLElement).getBoundingClientRect().top;
}
