import { createComments, renderBigPicture } from './render-big-picture.js';

const picturesContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderMiniatures = (miniatures) => {
  const similarPicturesFragment = document.createDocumentFragment();

  miniatures.forEach((miniature) => {
    const {url, likes, comments} = miniature;

    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      renderBigPicture(miniature);
      document.querySelector('.social__comments').replaceChildren();
      createComments(comments);
    });

    similarPicturesFragment.append(pictureElement);
  });

  picturesContainer.append(similarPicturesFragment);
};

export { renderMiniatures };
