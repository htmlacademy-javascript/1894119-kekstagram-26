import { shuffleArray, debounce } from './util.js';
import { renderPictures } from './render-pictures.js';

const RERENDER_DELAY = 500;
const RANDOM_PHOTOS_COUNT = 10;

const imgFiltersElement = document.querySelector('.img-filters');
const imgFiltersButtons = imgFiltersElement.querySelectorAll('.img-filters__button');
const filterDefaultButton = imgFiltersElement.querySelector('#filter-default');
const filterRandomButton = imgFiltersElement.querySelector('#filter-random');
const filterDiscussedButton = imgFiltersElement.querySelector('#filter-discussed');

const toggleActiveFilter = (evt) => {
  const filterButtonElements = imgFiltersElement.querySelectorAll('.img-filters__button');

  filterButtonElements.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  evt.target.classList.add('img-filters__button--active');
};

const clearPhotos = () => {
  const photoList = document.querySelectorAll('.picture');
  photoList.forEach((picture) => {
    picture.remove();
  });
};

const onFilterDefaultButtonClick = (photos) => photos;

const onFilterRandomButtonClick = (photos) => {
  const slicedPhotos = photos.slice();
  const randomPhotos = shuffleArray(slicedPhotos).slice(0, RANDOM_PHOTOS_COUNT);

  return randomPhotos;
};

const onFilterDiscussedButtonClick = (photos) => {
  const sortedPhotos = photos.slice().sort((photoA, photoB) => photoB.comments.length - photoA.comments.length);

  return sortedPhotos;
};

const updatePhotos = (photos) => {
  clearPhotos();
  renderPictures(photos);
};

const debouncePhotos = debounce(updatePhotos, RERENDER_DELAY);

const initializeFilters = (photos) => {
  imgFiltersElement.classList.remove('img-filters--inactive');

  imgFiltersButtons.forEach((button) => {
    button.addEventListener('click', toggleActiveFilter);
  });

  filterDefaultButton.addEventListener('click', () => {
    debouncePhotos(onFilterDefaultButtonClick(photos));
  });

  filterRandomButton.addEventListener('click', () => {
    debouncePhotos(onFilterRandomButtonClick(photos));
  });

  filterDiscussedButton.addEventListener('click', () => {
    debouncePhotos(onFilterDiscussedButtonClick(photos));
  });
};

export { initializeFilters };
