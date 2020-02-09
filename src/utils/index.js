export const debounce = (fn, ms) => {
  let timeout = 0;

  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn(...args);
    }, ms);
  };
};
