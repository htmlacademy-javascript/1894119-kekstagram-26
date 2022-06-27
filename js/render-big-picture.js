import { createElement } from './util.js';

const bigPicture = document.querySelector('.big-picture');

const closeBigPicture = bigPicture.querySelector('.big-picture__cancel');

const bigPicturePriview = bigPicture.querySelector('.big-picture__preview');

const getCloseBigPicture = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      bigPicture.classList.add('hidden');
    }
    document.querySelector('body').classList.remove('modal-open');
  });

  closeBigPicture.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  });
};

const createComments = (comments) => {
  comments.forEach(({avatar, message, name}) => {
    const commentsList = document.querySelector('.social__comments');
    const commentsItem = createElement('li', 'social__comment');
    const commentsItemImg = createElement('img', 'social__picture');
    const commentsItemText = createElement('p', 'social__text');

    commentsItemImg.src = avatar;
    commentsItemImg.alt = name;
    commentsItemText.textContent = message;

    commentsItem.append(commentsItemImg);
    commentsItem.append(commentsItemText);
    commentsList.append(commentsItem);
  });
};

const renderBigPicture = ({url, likes, comments, description}) => {
  bigPicturePriview.querySelector('.big-picture__img img').src = url;
  bigPicturePriview.querySelector('.likes-count').textContent = likes;
  bigPicturePriview.querySelector('.comments-count').textContent = comments.length;
  bigPicturePriview.querySelector('.social__caption').textContent = description;

  bigPicturePriview.querySelector('.social__comment-count').classList.add('hidden');
  bigPicturePriview.querySelector('.comments-loader').classList.add('hidden');

  document.querySelector('body').classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  getCloseBigPicture();
};

export { createComments, renderBigPicture };
