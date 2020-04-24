//debounce take function as params
//apply will track all params
const debounce = (callback, delay = 1000) => {
  let timeoutId;
  return (...params) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback.apply(null, params);
    }, delay);
  };
};
