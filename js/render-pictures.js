import { renderComments, renderBigPicture, loadComments } from './render-big-picture.js';

const COMMENTS_COUNT = 5;

const picturesContainerElement = document.querySelector('.pictures');

const bigPictureElement = document.querySelector('.big-picture');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderPictures = (pictures) => {
  const similarPicturesFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const {url, likes, comments} = picture;

    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      renderBigPicture(picture);
      document.querySelector('.social__comments').replaceChildren();
      if (comments.length > COMMENTS_COUNT) {
        document.querySelector('.shown-comments').textContent = COMMENTS_COUNT;
        renderComments(comments.slice(0, COMMENTS_COUNT));
        commentsLoaderElement.addEventListener('click', loadComments);
      }
      if (comments.length <= COMMENTS_COUNT) {
        renderComments(comments);
        document.querySelector('.shown-comments').textContent = comments.length;
        commentsLoaderElement.classList.add('hidden');
      }
    });

    similarPicturesFragment.append(pictureElement);
  });

  picturesContainerElement.append(similarPicturesFragment);
};

export { renderPictures };
