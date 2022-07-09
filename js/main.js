import { createPhotoList } from './data.js';
import { renderPictures } from './render-pictures.js';
import './form-validation.js';

const photos = createPhotoList();

renderPictures(photos);

