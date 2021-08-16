import UserProfileView from './view/user-profile.js';
import MenuView from './view/menu.js';
import SortView from './view/sort.js';
import FilmBoardView from './view/film-board.js';
import MainFilmList from './view/main-film-list.js';
import FilmCardView from './view/film-card.js';
import ShowMoreButtonView from './view/show-more.js';
import ExtraFilmListView from './view/extra-film-list.js';
import {createFilmDetailsTemplate} from './view/film-details.js';
import FooterStatisticsView from './view/footer-statistics.js';

import {renderTemplate, RenderPosition, renderElement} from './utils.js';

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

renderElement(siteHeaderElement, new UserProfileView(userRating).getElement(), RenderPosition.BEFOREEND);

renderElement(siteMainElement, new MenuView(filters).getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);


const filmBoardComponent = new FilmBoardView();
renderElement(siteMainElement, filmBoardComponent.getElement(), RenderPosition.BEFOREEND);

const mainFilmsList = new MainFilmList();
renderElement(filmBoardComponent.getElement(), mainFilmsList.getElement(), RenderPosition.BEFOREEND);

const mainFilmsListContainer = mainFilmsList.getElement().querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, MAIN_FILM_LIST_COUNT_STEP); i++) {
  renderElement(mainFilmsListContainer, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

const showMoreButton = new ShowMoreButtonView();

if (films.length > MAIN_FILM_LIST_COUNT_STEP) {
  renderElement(mainFilmsList.getElement(), showMoreButton.getElement(), RenderPosition.BEFOREEND);
  let renderedFilmsCount = MAIN_FILM_LIST_COUNT_STEP;

  showMoreButton.getElement().addEventListener('click', (evt) => {
    evt.preventDefault;

    films.slice(renderedFilmsCount, renderedFilmsCount + MAIN_FILM_LIST_COUNT_STEP).forEach((film) => renderElement(mainFilmsListContainer, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));
    renderedFilmsCount +=MAIN_FILM_LIST_COUNT_STEP;

    if (renderedFilmsCount > films.length) {
      showMoreButton.getElement().remove();
    }
  });
}


for (let i = 0; i < EXTRA_FILM_LISTS_NUMBER; i++) {
  renderElement(filmBoardComponent.getElement(), new ExtraFilmListView().getElement(), RenderPosition.BEFOREEND);
}

const [topRatedFilmList, mostCommentedFilmList] = filmBoardComponent.getElement().querySelectorAll('.films-list--extra');

const topRatedFilmListTitle = topRatedFilmList.querySelector('.films-list__title');
topRatedFilmListTitle.textContent = 'Top rated';

const mostCommentedFilmListTitle = mostCommentedFilmList.querySelector('.films-list__title');
mostCommentedFilmListTitle.textContent = 'Most commented';

const topRatedFilmListContainer = topRatedFilmList.querySelector('.films-list__container');
const mostCommentedFilmListContainer = mostCommentedFilmList.querySelector('.films-list__container');


for (let i = 0; i < EXTRA_FILM_LIST_COUNT; i++) {
  renderElement(topRatedFilmListContainer, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

for (let i = 0; i < EXTRA_FILM_LIST_COUNT; i++) {
  renderElement(mostCommentedFilmListContainer, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

// const documentBody = document.querySelector('body');
// renderTemplate(documentBody, createFilmDetailsTemplate(films[0]));

const footer = document.querySelector('.footer');
renderElement(footer, new FooterStatisticsView(statistics).getElement(), RenderPosition.BEFOREEND);
