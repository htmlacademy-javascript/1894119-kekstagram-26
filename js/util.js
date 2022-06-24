const getRandomInteger = (min, max) => {
  if (min >= 0 && max > 0 && min < max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else if (min === max) {
    return min;
  }
  return 'Функция может не гарантировать верный результат';
};

const checkMaxStringLength = (string, maxLength) => string.length <= maxLength;

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getUniqueRandomNumbers = (min, max, previousValues) => {
  let randomNumber = getRandomInteger(min, max);
  if (previousValues.length !== 0) {
    for(let i = 0; i < previousValues.length; i++) {
      if (previousValues.includes(randomNumber)) {
        randomNumber = getRandomInteger(min, max);
      }
    }
  }
  previousValues.push(randomNumber);
  return randomNumber;
};

const createElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

export {getRandomInteger, checkMaxStringLength, getRandomArrayElement, getUniqueRandomNumbers, createElement};
