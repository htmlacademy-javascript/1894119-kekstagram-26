import { isEscapeKey } from './util.js';

const ERROR_SHOW_TIME = 5000;

const errorTemplateElement = document.querySelector('#error')
  .content
  .querySelector('.error');

const errorElement = errorTemplateElement.cloneNode(true);

const errorButtonElement = errorElement.querySelector('.error__button');

const successTemplateElement = document.querySelector('#success')
  .content
  .querySelector('.success');

const successElement = successTemplateElement.cloneNode(true);

const successButtonElement = successElement.querySelector('.success__button');

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
  document.removeEventListener('click', closeErrorPopup);
  document.body.removeChild(errorElement);
}

function closeSuccessPopup () {
  document.removeEventListener('keydown', onSuccessEscapeKeydown);
  document.removeEventListener('click', closeSuccessPopup);
  document.body.removeChild(successElement);
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

  document.addEventListener('keydown', onErrorEscapeKeydown);
  document.addEventListener('click', onErrorPopupClick);
  errorButtonElement.addEventListener('click', closeErrorPopup);
};

const showSuccessSubmit = () => {
  successElement.style.zIndex = '100';
  document.body.appendChild(successElement);

  document.addEventListener('keydown', onSuccessEscapeKeydown);
  document.addEventListener('click', onSuccessPopupClick);
  successButtonElement.addEventListener('click', closeSuccessPopup);
};

export { showErrorGetData, showErrorSubmit, showSuccessSubmit };
