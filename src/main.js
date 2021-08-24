import UserProfileView from './view/user-profile.js';
import MenuView from './view/menu.js';
import SortView from './view/sort.js';
import FilmBoardView from './view/film-board.js';
import MainFilmList from './view/main-film-list.js';
import FilmCardView from './view/film-card.js';
import ShowMoreButtonView from './view/show-more.js';
import ExtraFilmListView from './view/extra-film-list.js';
import FilmDetailsView from './view/film-details.js';
import FooterStatisticsView from './view/footer-statistics.js';

import {RenderPosition, render} from './utils/render.js';

import {generateFilm} from './mock/film-card-mock.js';
import {generateFilter} from './mock/filter.js';
import {generateStatistics} from './mock/statistics.js';
import {generateUserRaiting} from './mock/user-profile-mock.js';


const MAIN_FILM_LIST_COUNT = 22;
const MAIN_FILM_LIST_COUNT_STEP = 5;
const EXTRA_FILM_LISTS_NUMBER = 2;
const EXTRA_FILM_LIST_COUNT = 2;


const films = new Array(MAIN_FILM_LIST_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const statistics = generateStatistics(films);
const userRating = generateUserRaiting();


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const userProfile = new UserProfileView(userRating);
const menu = new MenuView(filters);
const sort = new SortView();

render(siteHeaderElement, userProfile, RenderPosition.BEFOREEND);
render(siteMainElement, menu, RenderPosition.AFTERBEGIN);
render(siteMainElement, sort, RenderPosition.BEFOREEND);


const filmBoard = new FilmBoardView();
render(siteMainElement, filmBoard, RenderPosition.BEFOREEND);

const mainFilmsList = new MainFilmList();
render(filmBoard, mainFilmsList, RenderPosition.BEFOREEND);

const mainFilmsListContainer = mainFilmsList.getElement().querySelector('.films-list__container');
const mainFilmsListTitle = mainFilmsList.getElement().querySelector('.films-list__title');

if (films.length === 0) {
  mainFilmsListTitle.innerHTML = 'There are no movies in our database';
  mainFilmsListTitle.classList.remove('visually-hidden');
} else {
  mainFilmsListTitle.innerHTML = 'All movies. Upcoming';
  mainFilmsListTitle.classList.add('visually-hidden');
}


const openFilmDetailsPopup = (film) => {
  const documentBody = document.querySelector('body');
  const filmDetailsPopup = new FilmDetailsView(film);
  filmDetailsPopup.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
    filmDetailsPopup.getElement().remove();
    documentBody.classList.remove('hide-overflow');
  });

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      filmDetailsPopup.getElement().remove();
      documentBody.classList.remove('hide-overflow');
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  render(documentBody, filmDetailsPopup, RenderPosition.BEFOREEND);
  documentBody.classList.add('hide-overflow');
  document.addEventListener('keydown', onEscKeyDown);
};


const renderFilmCard = (filmCardContainer, film) => {
  const filmCard = new FilmCardView(film);

  filmCard.setCardElementClickHandler(() => openFilmDetailsPopup(film));

  render(filmCardContainer, filmCard, RenderPosition.BEFOREEND);
};


for (let i = 0; i < Math.min(films.length, MAIN_FILM_LIST_COUNT_STEP); i++) {
  renderFilmCard(mainFilmsListContainer, films[i]);
}


const showMoreButton = new ShowMoreButtonView();

if (films.length > MAIN_FILM_LIST_COUNT_STEP) {
  render(mainFilmsList, showMoreButton, RenderPosition.BEFOREEND);

  let renderedFilmsCount = MAIN_FILM_LIST_COUNT_STEP;

  showMoreButton.setClickHandler(() => {
    films.slice(renderedFilmsCount, renderedFilmsCount + MAIN_FILM_LIST_COUNT_STEP).forEach((film) => renderFilmCard(mainFilmsListContainer, film));
    renderedFilmsCount +=MAIN_FILM_LIST_COUNT_STEP;

    if (renderedFilmsCount > films.length) {
      showMoreButton.remove();
    }
  });
}


for (let i = 0; i < EXTRA_FILM_LISTS_NUMBER; i++) {
  const extraFilmList = new ExtraFilmListView();
  render(filmBoard, extraFilmList, RenderPosition.BEFOREEND);
}

const [topRatedFilmList, mostCommentedFilmList] = filmBoard.getElement().querySelectorAll('.films-list--extra');

const topRatedFilmListTitle = topRatedFilmList.querySelector('.films-list__title');
topRatedFilmListTitle.textContent = 'Top rated';

const mostCommentedFilmListTitle = mostCommentedFilmList.querySelector('.films-list__title');
mostCommentedFilmListTitle.textContent = 'Most commented';

const topRatedFilmListContainer = topRatedFilmList.querySelector('.films-list__container');
const mostCommentedFilmListContainer = mostCommentedFilmList.querySelector('.films-list__container');


for (let i = 0; i < EXTRA_FILM_LIST_COUNT; i++) {
  renderFilmCard(topRatedFilmListContainer, films[i]);
}

for (let i = 0; i < EXTRA_FILM_LIST_COUNT; i++) {
  renderFilmCard(mostCommentedFilmListContainer, films[i]);
}


const footer = document.querySelector('.footer');
render(footer, new FooterStatisticsView(statistics).getElement(), RenderPosition.BEFOREEND);
