import { isEscapeKey, checkMaxStringLength } from './util.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;

const RE_HASHTAG = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;

const formElement = document.querySelector('.img-upload__form');
const uploadFileElement = formElement.querySelector('#upload-file');
const imgUploadOverlayElement = formElement.querySelector('.img-upload__overlay');
const uploadCancelElement = formElement.querySelector('.img-upload__cancel');
const textHashtagsElement = formElement.querySelector('.text__hashtags');
const textDescriptionElement = formElement.querySelector('.text__description');

const pristine = new Pristine(formElement, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const onEscKeydown = (evt) => {
  if( isEscapeKey(evt) ) {
    evt.preventDefault();
    imgUploadOverlayElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const onUploadCancelElementClick = () => {
  imgUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onUploadFileElementClick = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
  uploadCancelElement.addEventListener('click', onUploadCancelElementClick);
};

const checksUniqueHashtags = (hashtags) => !(hashtags.some((hashtag) => hashtags.indexOf(hashtag) !== hashtags.lastIndexOf(hashtag)));

const validateHashtag = (hashtag) => RE_HASHTAG.test(hashtag);

const validateHashtags = () => {
  const hashtags = textHashtagsElement.value.toLowerCase().trim().split(' ');

  if (textHashtagsElement.value.length === 0) {
    return true;
  }
  return hashtags.every(validateHashtag)
    && hashtags.length <= MAX_HASHTAGS_COUNT
    && checksUniqueHashtags(hashtags);
};

const comment = textDescriptionElement.value;

const validateComments = () => checkMaxStringLength(comment, MAX_COMMENT_LENGTH);

pristine.addValidator(textHashtagsElement, validateHashtags, 'Хэш-тэг не валидный');

pristine.addValidator(textDescriptionElement, validateComments, 'Не более 140 символов');

textHashtagsElement.addEventListener('focusin', () => {
  document.removeEventListener('keydown', onEscKeydown);
});

textDescriptionElement.addEventListener('focusin', () => {
  document.removeEventListener('keydown', onEscKeydown);
});

textHashtagsElement.addEventListener('focusout', () => {
  document.addEventListener('keydown', onEscKeydown);
});

textDescriptionElement.addEventListener('focusout', () => {
  document.addEventListener('keydown', onEscKeydown);
});

uploadFileElement.addEventListener('change', onUploadFileElementClick);

formElement.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
