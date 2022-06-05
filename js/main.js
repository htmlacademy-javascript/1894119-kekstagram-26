const getRandomInteger = (min, max) => {
  if (min >= 0 && max > 0 && min < max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else if (min === max) {
    return min;
  }
  return 'Функция может не гарантировать верный результат';
};

const checkMaxStringLength = (string, maxLength) => {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
};

getRandomInteger(1, 100);

checkMaxStringLength('Какая-то строка', 140);
