import {createUserProfileTemplate} from './view/user-profile.js';
import {createMenuTemplate} from './view/menu.js';
import {createFilmBoardTemplate} from './view/film-board.js';
import {createMainFilmListTemplate} from './view/main-film-list.js';
import {createFilmCard} from './view/film-card.js';
import {createShowMoreButton} from './view/show-more.js';
import {createExtraFilmListTemplate} from './view/extra-film-list.js';
import {createFilmDetailsTemplate} from './view/film-details.js';
import {createFooterStatistics} from './view/footer-statistics.js';

import {renderTemplate} from './utils.js';

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


renderTemplate (siteHeaderElement, createUserProfileTemplate(userRating));
renderTemplate(siteMainElement, createMenuTemplate(filters));
renderTemplate(siteMainElement, createFilmBoardTemplate());

const filmBoard = siteMainElement.querySelector('.films');
renderTemplate(filmBoard, createMainFilmListTemplate());

const mainFilmsList = siteMainElement.querySelector('.films-list');
const mainFilmsListContainer = mainFilmsList.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, MAIN_FILM_LIST_COUNT_STEP); i++) {
  renderTemplate(mainFilmsListContainer, createFilmCard(films[i]));
}

if (films.length > MAIN_FILM_LIST_COUNT_STEP) {
  renderTemplate(mainFilmsList, createShowMoreButton());
  let renderedFilmsCount = MAIN_FILM_LIST_COUNT_STEP;

  const loadMoreButton = mainFilmsList.querySelector('.films-list__show-more');
  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault;

    films.slice(renderedFilmsCount, renderedFilmsCount + MAIN_FILM_LIST_COUNT_STEP).forEach((film) => renderTemplate(mainFilmsListContainer, createFilmCard(film)));
    renderedFilmsCount +=MAIN_FILM_LIST_COUNT_STEP;

    if (renderedFilmsCount > films.length) {
      loadMoreButton.remove();
    }
  });
}


for (let i = 0; i < EXTRA_FILM_LISTS_NUMBER; i++) {
  renderTemplate(filmBoard, createExtraFilmListTemplate());
}

const [topRatedFilmList, mostCommentedFilmList] = filmBoard.querySelectorAll('.films-list--extra');

const topRatedFilmListTitle = topRatedFilmList.querySelector('.films-list__title');
topRatedFilmListTitle.textContent = 'Top rated';

const mostCommentedFilmListTitle = mostCommentedFilmList.querySelector('.films-list__title');
mostCommentedFilmListTitle.textContent = 'Most commented';

const topRatedFilmListContainer = topRatedFilmList.querySelector('.films-list__container');
const mostCommentedFilmListContainer = mostCommentedFilmList.querySelector('.films-list__container');


for (let i = 0; i < EXTRA_FILM_LIST_COUNT; i++) {
  renderTemplate(topRatedFilmListContainer, createFilmCard(films[i]));
}

for (let i = 0; i < EXTRA_FILM_LIST_COUNT; i++) {
  renderTemplate(mostCommentedFilmListContainer, createFilmCard(films[i]));
}

const documentBody = document.querySelector('body');
renderTemplate(documentBody, createFilmDetailsTemplate(films[0]));

const footer = document.querySelector('.footer');
renderTemplate(footer, createFooterStatistics(statistics));
