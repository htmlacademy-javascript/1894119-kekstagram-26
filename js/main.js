import { createPhotoList } from './data.js';
import { renderPictures } from './render-miniatures.js';
import './form-validation.js';

const photos = createPhotoList();

renderPictures(photos);

