import { renderComments, renderBigPicture } from './render-big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');

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
      renderComments(comments);
    });

    similarPicturesFragment.append(pictureElement);
  });

  picturesContainerElement.append(similarPicturesFragment);
};

export { renderPictures };
