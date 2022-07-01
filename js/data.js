import { getRandomInteger, getRandomArrayElement, getUniqueRandomNumbers } from './util.js';

const MIN_PHOTO_INDEX = 1;
const PHOTOS_COUNT = 25;
const MIN_COMMENTS_NUMBER = 0;
const MAX_COMMENTS_NUMBER = 15;
const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 200;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_INDEX = 1;
const MAX_AVATAR_INDEX = 6;

const USED_PHOTOS_ID = [];
const USED_PHOTOS_URL = [];
const USED_COMMENTS_ID = [];

const DESCRIPTIONS = [
  'No filters',
  'Жду ваших лайков и комментариев!',
  'Лень было придумывать описание',
  'Самый счастливый день в моей жизни',
  'А как бы вы назвали это фото?',
  'Открываю для себя новое',
  'Это просто чудо!',
  'Enjoy the moment',
  'Тестим новую камеру',
  'Если верить в чудо, то все желания сбудутся!',
  'Залипаю на это фото'
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

const createComment = () => ({
  id: getUniqueRandomNumbers(MIN_COMMENT_ID, MAX_COMMENT_ID, USED_COMMENTS_ID),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_INDEX, MAX_AVATAR_INDEX)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createCommentsList = () => {
  const commentsCount = getRandomInteger(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER);
  const commentsList = Array.from({length: commentsCount}, createComment);
  return commentsList;
};

const createPhoto = () => ({
  id: getUniqueRandomNumbers(MIN_PHOTO_INDEX, PHOTOS_COUNT, USED_PHOTOS_ID),
  url: `photos/${getUniqueRandomNumbers(MIN_PHOTO_INDEX, PHOTOS_COUNT, USED_PHOTOS_URL)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createCommentsList()
});

const createPhotoList = () => Array.from({length: PHOTOS_COUNT}, createPhoto);

export { createPhoto, createPhotoList };
