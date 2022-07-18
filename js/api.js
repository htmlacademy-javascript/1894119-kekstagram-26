const SERVER_ADDRESS = 'https://26.javascript.pages.academy/kekstagram';

const GET_DATA_ALERT_MESSAGE = 'Не удалось загрузить фотографии. Обновите страницу';

const getData = (onSuccess, onError) => {
  fetch(`${SERVER_ADDRESS}/data`)
    .then((response) => response.json())
    .then((photos) => onSuccess(photos))
    .catch(() => onError(GET_DATA_ALERT_MESSAGE));
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    SERVER_ADDRESS,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onError('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export { getData, sendData };
