import { isEscapeKey } from './util.js';
import { addChangingEffectEventListeners, removeChangingEffectEventListener } from './slider.js';

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
  uploadCancelElement.removeEventListener('click', closeModal);

  removeChangingEffectEventListener();
};

const onEscKeydown = (evt) => {
  if( isEscapeKey(evt) ) {
    evt.preventDefault();
    if (textHashtagsElement !== document.activeElement && textDescriptionElement !== document.activeElement) {
      closeModal();
    }
  }
};

const openModal = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
  uploadCancelElement.addEventListener('click', closeModal);

  addChangingEffectEventListeners();
};

uploadFileElement.addEventListener('change', openModal);

export { closeModal };
