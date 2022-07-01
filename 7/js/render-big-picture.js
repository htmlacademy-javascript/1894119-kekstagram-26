import { createElement, isEscapeKey } from './util.js';

const bodyElement = document.querySelector('body');

const bigPictureElement = bodyElement.querySelector('.big-picture');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPicturePriviewElement = bigPictureElement.querySelector('.big-picture__preview');

const commentsListElement = document.querySelector('.social__comments');

const onCloseButtonClick = () => {
  bigPictureElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  }
};

const renderComments = (comments) => {
  comments.forEach(({avatar, message, name}) => {
    const commentsItem = createElement('li', 'social__comment');
    const commentsItemImg = createElement('img', 'social__picture');
    const commentsItemText = createElement('p', 'social__text');

    commentsItemImg.src = avatar;
    commentsItemImg.alt = name;
    commentsItemText.textContent = message;

    commentsItem.append(commentsItemImg);
    commentsItem.append(commentsItemText);
    commentsListElement.append(commentsItem);
  });
};

const renderBigPicture = ({url, likes, comments, description}) => {
  bigPicturePriviewElement.querySelector('.big-picture__img img').src = url;
  bigPicturePriviewElement.querySelector('.likes-count').textContent = likes;
  bigPicturePriviewElement.querySelector('.comments-count').textContent = comments.length;
  bigPicturePriviewElement.querySelector('.social__caption').textContent = description;

  bigPicturePriviewElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPicturePriviewElement.querySelector('.comments-loader').classList.add('hidden');

  bodyElement.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');

  document.addEventListener('keydown', onEscKeydown);
  closeButtonElement.addEventListener('click', onCloseButtonClick);
};

export { renderComments, renderBigPicture };
