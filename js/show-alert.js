import { isEscapeKey } from './util.js';

const ERROR_SHOW_TIME = 5000;

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorElement = errorTemplate.cloneNode(true);

const successElement = successTemplate.cloneNode(true);

const showErrorGetData = (message) => {
  const errorContainer = document.createElement('div');
  errorContainer.classList.add('error-container');

  errorContainer.textContent = message;

  document.body.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, ERROR_SHOW_TIME);
};

const onErrorEscapeKeydown = (evt) => {
  if (isEscapeKey) {
    evt.preventDefault();
    closeErrorPopup();
  }
};

const onSuccessEscapeKeydown = (evt) => {
  if (isEscapeKey) {
    evt.preventDefault();
    closeSuccessPopup();
  }
};

function closeErrorPopup () {
  document.removeEventListener('keydown', onErrorEscapeKeydown);
  document.body.removeChild(errorElement);
  document.removeEventListener('click', closeErrorPopup);
}

function closeSuccessPopup () {
  document.removeEventListener('keydown', onSuccessEscapeKeydown);
  document.body.removeChild(successElement);
  document.removeEventListener('click', closeSuccessPopup);
}

const onErrorPopupClick = (evt) => {
  if (evt.target === errorElement) {
    closeErrorPopup();
  }
};

const onSuccessPopupClick = (evt) => {
  if (evt.target === successElement) {
    closeSuccessPopup();
  }
};

const showErrorSubmit = () => {
  errorElement.style.zIndex = '100';
  document.body.appendChild(errorElement);

  const errorButtonElement = errorElement.querySelector('.error__button');

  document.addEventListener('keydown', onErrorEscapeKeydown);

  errorButtonElement.addEventListener('click', closeErrorPopup);

  document.addEventListener('click', onErrorPopupClick);
};

const showSuccessSubmit = () => {
  successElement.style.zIndex = '100';
  document.body.appendChild(successElement);

  const successButtonElement = successElement.querySelector('.success__button');

  document.addEventListener('keydown', onSuccessEscapeKeydown);

  successButtonElement.addEventListener('click', closeSuccessPopup);

  document.addEventListener('click', onSuccessPopupClick);
};

export { showErrorGetData, showErrorSubmit, showSuccessSubmit };
