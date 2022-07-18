import { isEscapeKey } from './util.js';
import { removeEffects, addChangingEffectEventListeners, removeChangingEffectEventListener } from './slider.js';
import { addScalingEventListeners, removeScalingEventListeners } from './scale-photo.js';
import { pristine } from './form-validation.js';

const formElement = document.querySelector('.img-upload__form');
const imgUploadOverlayElement = formElement.querySelector('.img-upload__overlay');
const uploadFileElement = formElement.querySelector('#upload-file');
const uploadCancelElement = formElement.querySelector('.img-upload__cancel');
const textHashtagsElement = formElement.querySelector('.text__hashtags');
const textDescriptionElement = formElement.querySelector('.text__description');
const imgUploadPreviewElement = formElement.querySelector('.img-upload__preview img');

const closeModal = () => {
  imgUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileElement.value = '';

  document.removeEventListener('keydown', onEscKeydown);
  uploadCancelElement.removeEventListener('click', clearForm);
  uploadCancelElement.removeEventListener('click', closeModal);

  removeChangingEffectEventListener();
  removeScalingEventListeners();
  pristine.reset();
};

function clearForm () {
  uploadFileElement.value = '';
  textHashtagsElement.value = '';
  textDescriptionElement.value = '';
  imgUploadPreviewElement.style.transform = 'scale(1)';

  removeEffects();
  closeModal();
}

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
  uploadCancelElement.addEventListener('click', clearForm);
  uploadCancelElement.addEventListener('click', closeModal);

  addChangingEffectEventListeners();
  addScalingEventListeners();
};

uploadFileElement.addEventListener('change', openModal);

export { closeModal, clearForm };
