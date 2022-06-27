import { createPhotoList } from './data.js';
import { renderMiniatures } from './render-miniatures.js';

const similarPictures = createPhotoList();

renderMiniatures (similarPictures);

