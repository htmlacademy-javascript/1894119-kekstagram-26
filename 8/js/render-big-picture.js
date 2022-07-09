import { createElement, isEscapeKey } from './util.js';

const COMMENTS_COUNT = 5;

const bodyElement = document.querySelector('body');

const bigPictureElement = bodyElement.querySelector('.big-picture');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPicturePriviewElement = bigPictureElement.querySelector('.big-picture__preview');

const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');

const onCloseButtonClick = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const renderComment = (comment) => {
  const commentsItem = createElement('li', 'social__comment');
  const commentsItemImg = createElement('img', 'social__picture');
  const commentsItemText = createElement('p', 'social__text');

  commentsItemImg.src = comment.avatar;
  commentsItemImg.alt = comment.name;
  commentsItemText.textContent = comment.message;

  commentsItem.append(commentsItemImg);
  commentsItem.append(commentsItemText);
  commentsListElement.append(commentsItem);
  return commentsItem;
};

const renderComments = (comments) => {
  let currentIndex = 0;
  commentsListElement.innerHTML = '';
  commentsLoaderElement.classList.remove('hidden');

  const loadComments = () => {
    const lastIndex = Math.min(currentIndex + COMMENTS_COUNT, comments.length);
    for (let i = currentIndex; i < lastIndex; i++) {
      commentsListElement.append(renderComment(comments[i]));
    }

    currentIndex = lastIndex;
    commentCountElement.textContent = `${currentIndex  } из ${  comments.length  } комментариев`;

    if (currentIndex === comments.length) {
      commentsLoaderElement.classList.add('hidden');
      commentsLoaderElement.removeEventListener('click', onLoaderClick);
    }
  };

  commentsLoaderElement.addEventListener('click', onLoaderClick);
  loadComments();

  function onLoaderClick (evt) {
    evt.preventDefault();
    loadComments();
  }
};

const renderBigPicture = ({url, likes, comments, description}) => {
  bigPicturePriviewElement.querySelector('.big-picture__img img').src = url;
  bigPicturePriviewElement.querySelector('.likes-count').textContent = likes;
  bigPicturePriviewElement.querySelector('.social__caption').textContent = description;

  bodyElement.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');

  renderComments(comments);

  document.addEventListener('keydown', onEscKeydown);
  closeButtonElement.addEventListener('click', onCloseButtonClick);
};

export { renderComments, renderBigPicture };
