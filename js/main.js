const PHOTO_DESCRIPTIONS_COUNT = 25;
const USED_PHOTOS_ID = [];

const DESCRIPTIONS = [
  'No filters',
  'Жду ваших лайков и комментариев!',
  'Лень было придумывать описание',
  'Самый счастливый день в моей жизни',
  'А как бы вы назвали это фото?',
  'Открываю для себя новое'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Соня',
  'Олег',
  'Анна',
  'Кристина',
  'Максим',
  'Антон',
  'Лера',
  'Вика',
  'Анастасия',
  'Саша'
];

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

const createComment = () => ({
  id: getUniqueRandomNumbers(1, 200, USED_PHOTOS_ID),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createCommentList = () => {
  const COMMENT_COUNT = getRandomInteger(0, 5);
  const COMMENT_PHOTO = Array.from({length: COMMENT_COUNT}, createComment);
  return COMMENT_PHOTO;
};

const createPhotoDescription = () => ({
  id: getUniqueRandomNumbers(1, 25, USED_PHOTOS_ID),
  url: `photos/${getUniqueRandomNumbers(1, 25, USED_PHOTOS_ID)}`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: createCommentList()
});

export const photoDescriptions = Array.from({length: PHOTO_DESCRIPTIONS_COUNT}, createPhotoDescription);

checkMaxStringLength('Какая-то строка', 140);

