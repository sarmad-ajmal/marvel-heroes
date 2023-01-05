export const debounce = (func: any, wait: number, immediate?: boolean) => {
  var timeout: any;
  return function () {
    // @ts-ignore
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};
export const noop = () => {};
