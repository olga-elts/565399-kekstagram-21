'use strict';

const {getShuffledArray, debounce} = window.util;
const {renderPhotos} = window.gallery;

const PHOTOS_NUMBER = 10;

const imgFilters = document.querySelector(`.img-filters`);

/**
 * Показывает фильтры изображений
 */
const showImgFilters = () => {
  imgFilters.classList.remove(`img-filters--inactive`);
};

/**
 * Возвращает новый или исходный массив данных (объектов фото) в зависимости от применяемого фильтра
 * @param {event} evt - событие
 * @param {array} photos - исходный массив данных (объектов фотографий)
 * @return {array} - новый или исходный массив данных (объектов фотографий)
 */
const getFilteredPhotos = (evt, photos) => {
  const filter = evt.target.id;
  switch (filter) {
    case `filter-discussed`:
      return photos.slice().sort((a, b) => {
        return b.comments.length - a.comments.length;
      });
    case `filter-random`:
      const randomPhotos = getShuffledArray(photos.slice());
      return randomPhotos.slice(0, PHOTOS_NUMBER);
    default:
      return photos;
  }
};

/**
 * Применяет класс active к кнопке - цели события при его наступлении
 * @param {event} evt - событие
 */
const setButtonsClassNames = (evt) => {
  const activeImgFilter = imgFilters.querySelector(`.img-filters__button--active`);
  if (evt.target !== activeImgFilter) {
    activeImgFilter.classList.remove(`img-filters__button--active`);
    evt.target.classList.add(`img-filters__button--active`);
  }
};

/**
 * Фильтрует фотографии и отрисовывает их
 * @param {event} evt - событие
 * @param {array} photos - исходный массив данных (объектов фотографий)
 */
const filterPhotos = debounce((evt, photos) => {
  setButtonsClassNames(evt);
  const filteredPhotos = getFilteredPhotos(evt, photos);
  renderPhotos(filteredPhotos);
});

window.filter = {
  showImgFilters,
  filterPhotos
};
