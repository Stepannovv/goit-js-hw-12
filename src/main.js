import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  renderGallery,
  clearGallery,
  hide,
  show,
  disable,
  enable,
} from './js/render-functions';
import { getPicturesByQuery } from './js/pixabay-apy';

let currentPage = 1;
let currentQuery = '';

const searchForm = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', handleSearch);

async function handleSearch(evt) {
  evt.preventDefault();
  gallery.innerHTML = '';
  const queryValue = evt.currentTarget.elements.query.value.trim();

  if (!queryValue) {
    iziToast.error({
      title: 'Error',
      message: '❌ Please enter a search query',
    });
    return;
  }

  loader.classList.remove('hidden');

  currentQuery = queryValue;
  currentPage = 1;
  clearGallery();
  // лодер активний
  hide(hiddenClass);

  try {
    const data = await getPicturesByQuery(queryValue, currentPage);
    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No Results',
        message: 'Sorry, there are no images matching your search query.',
      });
    } else {
      renderGallery(data.hits);
      if (data.totalHits > currentPage * 15) {
        // кнопка активна;
      }
    }
  } catch (error) {
    onFetchError(error);
  } finally {
    loader.classList.add('hidden');
    searchForm.reset();
  }
}

function onFetchError(error) {
  iziToast.error({
    title: 'Error',
    message: '❌ No pictures found',
  });
}

loadMoreBtn.addEventListener('click', loadMoreImages);
async function loadMoreImages() {
  currentPage += 1;
  // лодер видимий
  // кнопка неактивна

  try {
    const data = await getPicturesByQuery(currentQuery, currentPage);
    renderGallery(data.hits);

    if (currentPage * 15 >= data.totalHits) {
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      // кнопка активна
    }
    smoothScroll();
  } catch (error) {
    onFetchError(error);
  } finally {
    // лодер невидимий;
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
