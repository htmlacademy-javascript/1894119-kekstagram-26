import { checkMaxStringLength } from './util.js';
import { sendData } from './api.js';
import { showErrorSubmit, showSuccessSubmit } from './show-alert.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;

const RE_HASHTAG = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;

const formElement = document.querySelector('.img-upload__form');
const textHashtagsElement = formElement.querySelector('.text__hashtags');
const textDescriptionElement = formElement.querySelector('.text__description');
const imgUploadSubmitElement = formElement.querySelector('.img-upload__submit');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
});

let validationHashtagsErrorMessage;

const getErrorMessage = () => validationHashtagsErrorMessage;

const validateHashtags = () => {
  const hashtags = textHashtagsElement.value.split(' ');

  if (textHashtagsElement.value === '') {
    return true;
  }

  if (textHashtagsElement.value.endsWith(' ')) {
    validationHashtagsErrorMessage = 'Хэштег не должен заканчиваться пробелом';
    return false;
  }

  if (!hashtags.every((hashtag) => hashtag.startsWith('#'))) {
    validationHashtagsErrorMessage = 'Хэштег должен начинаться с #';
    return false;
  }

  if (hashtags.some((hashtag) => hashtag === '#')) {
    validationHashtagsErrorMessage = 'Хэштег не может состоять только из #';
    return false;
  }

  if (hashtags.includes('')) {
    validationHashtagsErrorMessage = 'Только один пробел между хэштегами';
    return false;
  }

  if (hashtags.some((hashtag) => hashtag.length > MAX_HASHTAG_LENGTH)) {
    validationHashtagsErrorMessage = `Максимальная длина хэштега - ${MAX_HASHTAG_LENGTH} символов`;
    return false;
  }

  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    validationHashtagsErrorMessage = `Максимальное количество хэштегов - ${MAX_HASHTAGS_COUNT}`;
    return false;
  }

  return hashtags.every((hashtag, i) => {
    if (!RE_HASHTAG.test(hashtag)) {
      validationHashtagsErrorMessage = 'Хэштег содержит запрещенные символы';
      return false;
    }

    for (++i; i < hashtags.length; i++) {
      if (hashtag.toLowerCase() === hashtags[i].toLowerCase()) {
        validationHashtagsErrorMessage = 'Хэштеги не должны повторяться';
        return false;
      }
    }
    return true;
  });
};

const validateComments = () => {
  const comment = textDescriptionElement.value;
  if (comment.length === 0) {
    return true;
  }
  return checkMaxStringLength(comment, MAX_COMMENT_LENGTH);
};

const blockSubmitButton = () => {
  imgUploadSubmitElement.disabled = true;
  imgUploadSubmitElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  imgUploadSubmitElement.disabled = false;
  imgUploadSubmitElement.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    evt.preventDefault();

    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          showSuccessSubmit();
          unblockSubmitButton();
        },
        () => {
          showErrorSubmit();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

pristine.addValidator(textHashtagsElement, validateHashtags, getErrorMessage);

pristine.addValidator(textDescriptionElement, validateComments, `Не более ${MAX_COMMENT_LENGTH} символов`);

export { setUserFormSubmit, pristine };
