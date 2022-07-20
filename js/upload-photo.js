const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const formElement = document.querySelector('.img-upload__form');
const imgUploadInputElement = formElement.querySelector('.img-upload__input');
const imgUploadPreviewElement = formElement.querySelector('.img-upload__preview img');

const uploadPhoto = () => {
  const file = imgUploadInputElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreviewElement.src = URL.createObjectURL(file);
  }
};

export { uploadPhoto };
