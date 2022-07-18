const checkMaxStringLength = (string, maxLength) => string.length <= maxLength;

const createElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { checkMaxStringLength, createElement, isEscapeKey };
