import './sass/main.scss';
import ApiService from './js/apiService.js';
import cardTpl from './templates/imageCardTpl.hbs';
// import Isotope from 'isotope-layout';
// import '@pnotify/core/dist/BrightTheme.css';
// import '@pnotify/core/dist/PNotify.css';
// import { defaults, info, success, error } from '@pnotify/core';
// defaults.mouseReset = false;
// defaults.delay = 3000;

// const elem = document.querySelector('.grid');
// const iso = new Isotope(elem, {
//   // options
//   itemSelector: '.grid-item',
//   layoutMode: 'masonry',
// });

const PicsApi = new ApiService();

const refs = {
  searchForm: document.querySelector('#js-search-form'),
  gallery: document.querySelector('.gallery'),
  anchor: document.querySelector('.anchor'),
};

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  PicsApi.query = e.currentTarget.elements.query.value;

  if (PicsApi.query.trim() === '') {
    return alert('Please Enter Search Query');
    // error({
    //   title: 'Oh no! Not found!',
    //   text: 'Try again.',
    // });
  }

  PicsApi.resetPage();
  clearPicsContainer();
  fetchImages();
}

function fetchImages() {
  PicsApi.fetchPics().then(pics => {
    appendPicsMarkup(pics);
  });
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

function observerCallback([entrie], observerRef) {
  if (!entrie.isIntersecting) return;

  fetchImages();
}
