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

const getUniqueRandomNumbers = (min, max, usedNumbers) => {
  let randomNumber = getRandomInteger(min, max);
  if (usedNumbers.length !== 0) {
    for(let i = 0; i < usedNumbers.length; i++) {
      if (usedNumbers.includes(randomNumber)) {
        randomNumber = getRandomInteger(min, max);
      }
    }
  }
  usedNumbers.push(randomNumber);
  return randomNumber;
};

export {getRandomInteger, checkMaxStringLength, getRandomArrayElement, getUniqueRandomNumbers};
