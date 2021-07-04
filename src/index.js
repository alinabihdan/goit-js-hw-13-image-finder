import './sass/main.scss';
import ApiService from './js/apiService.js';
import cardTpl from './templates/imageCardTpl.hbs';
// import '@pnotify/core/dist/BrightTheme.css';
// import '@pnotify/core/dist/PNotify.css';
// import { defaults, info, success, error } from '@pnotify/core';
// defaults.mouseReset = false;
// defaults.delay = 3000;

const PicsApi = new ApiService();

const refs = {
  searchForm: document.querySelector('#js-search-form'),
  gallery: document.querySelector('.gallery'),
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
