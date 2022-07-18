const STEP_VALUE = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;

const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');

const scaleControlSmallerElement = imgUploadOverlayElement.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = imgUploadOverlayElement.querySelector('.scale__control--bigger');
const scaleControlValueElement = imgUploadOverlayElement.querySelector('.scale__control--value');

const imgUploadPreviewElement = imgUploadOverlayElement.querySelector('.img-upload__preview img');

let value = MAX_VALUE;

scaleControlValueElement.value = `${value}%`;

const scale = () => {
  scaleControlValueElement.value = `${value}%`;
  imgUploadPreviewElement.style.transform = `scale(${value / 100})`;
};

const zoomOut = () => {
  if (value > MIN_VALUE) {
    value -= STEP_VALUE;
  }
  scale();
};

const zoomIn = () => {
  if (value < MAX_VALUE) {
    value += STEP_VALUE;
  }
  scale();
};

const addScalingEventListeners = () => {
  scaleControlSmallerElement.addEventListener('click', zoomOut);
  scaleControlBiggerElement.addEventListener('click', zoomIn);
};

const removeScalingEventListeners = () => {
  scaleControlSmallerElement.removeEventListener('click', zoomOut);
  scaleControlBiggerElement.removeEventListener('click', zoomIn);
};

export { addScalingEventListeners, removeScalingEventListeners };
