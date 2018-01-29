export const SCROLL_WIDTH = () => {
  let documentWidth = parseInt(document.documentElement.clientWidth),
    windowsWidth = parseInt(window.innerWidth),
    scrollbarWidth = windowsWidth - documentWidth;
  return scrollbarWidth;
};
