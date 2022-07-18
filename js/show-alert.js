const ERROR_SHOW_TIME = 5000;

const showErrorGetData = (message) => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = '100';
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = '0';
  errorContainer.style.top = '0';
  errorContainer.style.right = '0';
  errorContainer.style.padding = '20px 5px';
  errorContainer.style.fontSize = '30px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'red';

  errorContainer.textContent = message;

  document.body.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, ERROR_SHOW_TIME);
};

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorElement = errorTemplate.cloneNode(true);

const successElement = successTemplate.cloneNode(true);


const onErrorEscapeKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeErrorPopup();
  }
};

const onSuccessEscapeKeydown = (evt) => {
  if (evt.key === 'Escape') {
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
