import { createElement, isEscapeKey } from './util.js';

const COMMENTS_COUNT = 5;

const bodyElement = document.querySelector('body');

const bigPictureElement = bodyElement.querySelector('.big-picture');
const bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPicturePriviewElement = bigPictureElement.querySelector('.big-picture__preview');

const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');

const onCloseButtonClick = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  bigPictureCancelElement.removeEventListener('click', onCloseButtonClick);
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  document.removeEventListener('keydown', onEscKeydown);
};

const renderComment = (comment) => {
  const commentElement = createElement('li', 'social__comment');
  const commentImgElement = createElement('img', 'social__picture');
  const commentTextElement = createElement('p', 'social__text');

  commentImgElement.src = comment.avatar;
  commentImgElement.alt = comment.name;
  commentTextElement.textContent = comment.message;

  commentElement.append(commentImgElement);
  commentElement.append(commentTextElement);
  socialCommentsElement.append(commentElement);
  return commentElement;
};

const renderComments = (comments) => {
  let currentIndex = 0;
  socialCommentsElement.innerHTML = '';
  commentsLoaderElement.classList.remove('hidden');

  const loadComments = () => {
    const lastIndex = Math.min(currentIndex + COMMENTS_COUNT, comments.length);
    for (let i = currentIndex; i < lastIndex; i++) {
      socialCommentsElement.append(renderComment(comments[i]));
    }

    currentIndex = lastIndex;
    socialCommentCountElement.textContent = `${currentIndex  } из ${  comments.length  } комментариев`;

    if (currentIndex === comments.length) {
      commentsLoaderElement.classList.add('hidden');
      commentsLoaderElement.removeEventListener('click', onLoaderClick);
    }
  };

  function onLoaderClick (evt) {
    evt.preventDefault();
    loadComments();
  }

  commentsLoaderElement.addEventListener('click', onLoaderClick);
  loadComments();
};

const renderBigPicture = ({url, likes, comments, description}) => {
  bigPicturePriviewElement.querySelector('.big-picture__img img').src = url;
  bigPicturePriviewElement.querySelector('.likes-count').textContent = likes;
  bigPicturePriviewElement.querySelector('.social__caption').textContent = description;

  bodyElement.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');

  renderComments(comments);

  document.addEventListener('keydown', onEscKeydown);
  bigPictureCancelElement.addEventListener('click', onCloseButtonClick);
};

export { renderBigPicture };
