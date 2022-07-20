const checkMaxStringLength = (string, maxLength) => string.length <= maxLength;

const createElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const debounce = (callback, timeoutDelay) =>{
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { checkMaxStringLength, createElement, isEscapeKey, debounce, shuffleArray };
