import { throttle } from 'throttle-debounce';
import refs from './refs';

let rootElement = document.documentElement;

function trackScroll() {
  if (rootElement.scrollTop - document.documentElement.clientHeight > 0) {
    refs.btnToTop.classList.remove('is-hidden');
  } else {
    refs.btnToTop.classList.add('is-hidden');
  }
}
function backToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

export { trackScroll, backToTop };
