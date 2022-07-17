const chrome = {
  minValue: 0,
  maxValue: 1,
  step: 0.1,
};

const sepia = {
  minValue: 0,
  maxValue: 1,
  step: 0.1,
};

const marvin = {
  minValue: 0,
  maxValue: 100,
  step: 1,
};

const phobos = {
  minValue: 0,
  maxValue: 3,
  step: 0.1,
};

const heat = {
  minValue: 1,
  maxValue: 3,
  step: 0.1,
};

const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');

const sliderContainerElement = imgUploadOverlayElement.querySelector('.img-upload__effect-level');
const sliderElement = imgUploadOverlayElement.querySelector('.effect-level__slider');
const effectLevelValueElement = imgUploadOverlayElement.querySelector('.effect-level__value');

const imgUploadPreviewElement = imgUploadOverlayElement.querySelector('.img-upload__preview img');

const noEffectElement = imgUploadOverlayElement.querySelector('#effect-none');
const chromeEffectElement = imgUploadOverlayElement.querySelector('#effect-chrome');
const sepiaEffectElement = imgUploadOverlayElement.querySelector('#effect-sepia');
const marvinEffectElement = imgUploadOverlayElement.querySelector('#effect-marvin');
const phobosEffectElement = imgUploadOverlayElement.querySelector('#effect-phobos');
const heatEffectElement = imgUploadOverlayElement.querySelector('#effect-heat');

sliderContainerElement.classList.add('hidden');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
});

const updateSliderOptions = ({minValue, maxValue, step}) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue,
    },
    step: step,
    start: maxValue,
  });
};

const addChromeEffect = () => {
  imgUploadPreviewElement.classList.add('effects__preview--chrome');
  sliderContainerElement.classList.remove('hidden');

  updateSliderOptions(chrome);
};

const addSepiaEffect = () => {
  imgUploadPreviewElement.classList.add('effects__preview--sepia');
  sliderContainerElement.classList.remove('hidden');

  updateSliderOptions(sepia);
};

const addMarvinEffect = () => {
  imgUploadPreviewElement.classList.add('effects__preview--marvin');
  sliderContainerElement.classList.remove('hidden');

  updateSliderOptions(marvin);
};

const addPhobosEffect = () => {
  imgUploadPreviewElement.classList.add('effects__preview--phobos');
  sliderContainerElement.classList.remove('hidden');

  updateSliderOptions(phobos);
};

const addHeatEffect = () => {
  imgUploadPreviewElement.classList.add('effects__preview--heat');
  sliderContainerElement.classList.remove('hidden');

  updateSliderOptions(heat);
};

const removeEffects = () => {
  imgUploadPreviewElement.style.filter = '';
  imgUploadPreviewElement.classList = '';
  sliderContainerElement.classList.add('hidden');
};

sliderElement.noUiSlider.on('update', () => {
  const sliderValue = sliderElement.noUiSlider.get();

  if (chromeEffectElement.checked) {
    imgUploadPreviewElement.style.filter = `grayscale(${sliderValue})`;
  }

  if (sepiaEffectElement.checked) {
    imgUploadPreviewElement.style.filter = `sepia(${sliderValue})`;
  }

  if (marvinEffectElement.checked) {
    imgUploadPreviewElement.style.filter = `invert(${sliderValue}%)`;
  }

  if (phobosEffectElement.checked) {
    imgUploadPreviewElement.style.filter = `blur(${sliderValue}px)`;
  }

  if (heatEffectElement.checked) {
    imgUploadPreviewElement.style.filter = `brightness(${sliderValue})`;
  }

  effectLevelValueElement.value = sliderValue;
});

const addChangingEffectEventListeners = () => {
  noEffectElement.addEventListener('click', removeEffects);
  chromeEffectElement.addEventListener('click', addChromeEffect);
  sepiaEffectElement.addEventListener('click', addSepiaEffect);
  marvinEffectElement.addEventListener('click', addMarvinEffect);
  phobosEffectElement.addEventListener('click', addPhobosEffect);
  heatEffectElement.addEventListener('click', addHeatEffect);
};

const removeChangingEffectEventListener = () => {
  noEffectElement.removeEventListener('click', removeEffects);
  chromeEffectElement.removeEventListener('click', addChromeEffect);
  sepiaEffectElement.removeEventListener('click', addSepiaEffect);
  marvinEffectElement.removeEventListener('click', addMarvinEffect);
  phobosEffectElement.removeEventListener('click', addPhobosEffect);
  heatEffectElement.removeEventListener('click', addHeatEffect);
};

export { addChangingEffectEventListeners, removeChangingEffectEventListener };


