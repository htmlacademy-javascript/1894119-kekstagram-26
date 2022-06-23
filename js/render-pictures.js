const picturesContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderPicture = (pictures) => {
  const similarPicturesFragment = document.createDocumentFragment();

  pictures.forEach(({url, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    similarPicturesFragment.append(pictureElement);
  });

  picturesContainer.append(similarPicturesFragment);
};

export {renderPicture};
