'use strict';

(function () {
  const {getshuffledArray} = window.util;
  const {renderPhotos} = window.gallery;

  const imgFilters = document.querySelector(`.img-filters`);
  const showImgFilters = function () {
    imgFilters.classList.remove(`img-filters--inactive`);
  };

  const RANDOM_PHOTOS_NUMBER = 10;

  const getFilteredPhotos = function (evt, photos) {
    const filter = evt.target.id;
    switch (filter) {
      case `filter-discussed`:
        const sortedPhotos = photos.slice().sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
        return sortedPhotos;
      case `filter-random`:
        const randomPhotos = getshuffledArray(photos.slice());
        return randomPhotos.slice(0, RANDOM_PHOTOS_NUMBER);
      default:
        return photos;
    }
  };

  const setButtonsClassNames = function (evt) {
    const activeImgFilter = imgFilters.querySelector(`.img-filters__button--active`);
    if (evt.target !== activeImgFilter) {
      activeImgFilter.classList.remove(`img-filters__button--active`);
      evt.target.classList.add(`img-filters__button--active`);
    }
  };

  const filterPhotos = function (evt, photos) {
    setButtonsClassNames(evt);
    const filteredPhotos = getFilteredPhotos(evt, photos);
    renderPhotos(filteredPhotos);
  };

  window.filter = {
    showImgFilters,
    filterPhotos
  };
})();
