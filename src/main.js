import {createUserProfileTemplate} from './view/user-profile.js';
import {createMenuTemplate} from './view/menu.js';
import {createFilmBoardTemplate} from './view/film-board.js';
import {createMainFilmListTemplate} from './view/main-film-list.js';
import {createFilmCard} from './view/film-card.js';
import {createShowMoreButton} from './view/show-more.js';
import {createExtraFilmListTemplate} from './view/extra-film-list.js';
import {createFilmDetailsTemplate} from './view/film-details.js';
import {createFooterStatistics} from './view/footer-statistics.js';


const MAIN_FILM_LIST_COUNT = 5;
const EXTRA_FILM_LISTS_COUNT = 2;
const EXTRA_FILM_LIST_COUNT = 2;

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');


render (siteHeaderElement, createUserProfileTemplate());
render(siteMainElement, createMenuTemplate());
render(siteMainElement, createFilmBoardTemplate());

const filmBoard = siteMainElement.querySelector('.films');
render(filmBoard, createMainFilmListTemplate());

const mainFilmsList = siteMainElement.querySelector('.films-list');
const mainFilmsListContainer = mainFilmsList.querySelector('.films-list__container');

for (let i = 0; i < MAIN_FILM_LIST_COUNT; i++) {
  render(mainFilmsListContainer, createFilmCard());
}

render(mainFilmsList, createShowMoreButton());


for (let i = 0; i < EXTRA_FILM_LISTS_COUNT; i++) {
  render(filmBoard, createExtraFilmListTemplate());
}

const [topRatedFilmList, mostCommentedFilmList] = filmBoard.querySelectorAll('.films-list--extra');

const topRatedFilmListTitle = topRatedFilmList.querySelector('.films-list__title');
topRatedFilmListTitle.textContent = 'Top rated';

const mostCommentedFilmListTitle = mostCommentedFilmList.querySelector('.films-list__title');
mostCommentedFilmListTitle.textContent = 'Most commented';

const topRatedFilmListContainer = topRatedFilmList.querySelector('.films-list__container');
const mostCommentedFilmListContainer = mostCommentedFilmList.querySelector('.films-list__container');


for (let i = 0; i < EXTRA_FILM_LIST_COUNT; i++) {
  render(topRatedFilmListContainer, createFilmCard());
}

for (let i = 0; i < EXTRA_FILM_LIST_COUNT; i++) {
  render(mostCommentedFilmListContainer, createFilmCard());
}

const documentBody = document.querySelector('body');
render(documentBody, createFilmDetailsTemplate());


const footer = document.querySelector('.footer');
render(footer, createFooterStatistics());
