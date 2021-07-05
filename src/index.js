import './sass/main.scss';
import ApiService from './js/apiService.js';
import cardTpl from './templates/imageCardTpl.hbs';
import openModal from './js/modal';
import { backToTop, trackScroll } from './js/btn-to-top';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { defaults, error } from '@pnotify/core';
defaults.mouseReset = false;
defaults.delay = 3000;

const refs = {
  searchForm: document.querySelector('#js-search-form'),
  searchBtn: document.querySelector('.submit-btn'),
  anchor: document.querySelector('.anchor'),
  gallery: document.querySelector('.gallery'),
  btnToTop: document.querySelector('.btn-to-top'),
};

const PicsApi = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', openModal);
refs.btnToTop.addEventListener('click', backToTop);
window.addEventListener('scroll', trackScroll);

function onSearch(e) {
  e.preventDefault();

  PicsApi.query = e.currentTarget.elements.query.value;

  if (PicsApi.query.trim() === '') {
    error({
      title: 'Oh no! Not found!',
      text: 'Try again.',
    });
    return;
  }

  PicsApi.resetPage();
  clearPicsContainer();
  fetchImages();
  e.currentTarget.elements.query.value = '';
}

function fetchImages() {
  PicsApi.fetchPics()
    .then(hits => {
      if (hits.length === 0) {
        error({
          title: 'Oh no! Not found!',
          text: 'Try again.',
        });
        return;
      }
      appendPicsMarkup(hits);
    })
    .catch(error => console.log(error));
}

function appendPicsMarkup(pics) {
  refs.gallery.insertAdjacentHTML('beforeend', cardTpl(pics));
}

function clearPicsContainer() {
  refs.gallery.innerHTML = '';
}

const observer = new IntersectionObserver(observerCallback, {
  threshold: 0,
});

observer.observe(refs.anchor);

function observerCallback([entry], observerRef) {
  if (entry.isIntersecting && PicsApi.query.trim() !== '') {
    fetchImages();
  }
}
