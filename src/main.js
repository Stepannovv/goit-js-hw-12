import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more');
const loader = document.getElementById('loader');

let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.target.elements.query.value.trim();

  if (query === '') {
    iziToast.error({ title: 'Error', message: 'Please enter a search query.' });
    return;
  }

  page = 1;
  clearGallery();
  loadMoreBtn.classList.add('is-hidden');
  loader.classList.remove('is-hidden');

  try {
    const data = await fetchImages(query, page, perPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderGallery(data.hits);
      if (data.hits.length < totalHits) {
        loadMoreBtn.classList.remove('is-hidden');
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
    });
  } finally {
    loader.classList.add('is-hidden');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  loader.classList.remove('is-hidden');
  loadMoreBtn.classList.add('is-hidden');

  try {
    const data = await fetchImages(query, page, perPage);
    renderGallery(data.hits);

    const totalLoadedImages = page * perPage;
    if (totalLoadedImages >= totalHits) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadMoreBtn.classList.remove('is-hidden');
    }

    // window.scrollBy(0, window.innerHeight);

    const galleryItem = document.querySelector('.gallery-item');
    const cardHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 4, behavior: 'smooth' });
    console.log(cardHeight);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
    });
  } finally {
    loader.classList.add('is-hidden');
  }
});
