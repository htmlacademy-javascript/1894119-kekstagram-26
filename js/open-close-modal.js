import { isEscapeKey } from './util.js';
import { addChangingEffectEventListeners, removeChangingEffectEventListener } from './slider.js';
import { addScalingEventListeners, removeScalingEventListeners } from './scale-photo.js';

const formElement = document.querySelector('.img-upload__form');
const imgUploadOverlayElement = formElement.querySelector('.img-upload__overlay');
const uploadFileElement = formElement.querySelector('#upload-file');
const uploadCancelElement = formElement.querySelector('.img-upload__cancel');
const textHashtagsElement = formElement.querySelector('.text__hashtags');
const textDescriptionElement = formElement.querySelector('.text__description');

const closeModal = () => {
  imgUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileElement.value = '';

  document.removeEventListener('keydown', onEscKeydown);
  uploadCancelElement.removeEventListener('click', closeModal);

  removeChangingEffectEventListener();
  removeScalingEventListeners();
};

function onEscKeydown (evt) {
  if( isEscapeKey(evt) ) {
    evt.preventDefault();
    if (textHashtagsElement !== document.activeElement && textDescriptionElement !== document.activeElement) {
      closeModal();
    }
  }
}

const openModal = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
  uploadCancelElement.addEventListener('click', closeModal);

  addChangingEffectEventListeners();
  addScalingEventListeners();
};

uploadFileElement.addEventListener('change', openModal);

export { closeModal };
