import { renderPictures } from './render-pictures.js';
import { setUserFormSubmit } from './form-validation.js';
import { getData } from './api.js';
import { showErrorGetData } from './show-alert.js';
import { clearForm } from './open-close-modal.js';
import { initializeFilters } from './filter.js';

const PHOTOS_COUNT = 25;

getData((photos) => {
  renderPictures(photos.slice(0, PHOTOS_COUNT));
  initializeFilters(photos);
}, showErrorGetData);

setUserFormSubmit(clearForm);
