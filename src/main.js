import UserProfileView from './view/user-profile.js';
import FooterStatisticsView from './view/footer-statistics.js';
import MainBoardPresenter from './presenter/main-board.js';

import {RenderPosition, render} from './utils/render.js';

import {generateFilm} from './mock/film-card-mock.js';
import {generateFilter} from './mock/filter.js';
import {generateStatistics} from './mock/statistics.js';
import {generateUserRaiting} from './mock/user-profile-mock.js';


const MAIN_FILM_LIST_COUNT = 0;


const films = new Array(MAIN_FILM_LIST_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const statistics = generateStatistics(films);
const userRating = generateUserRaiting();


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const userProfile = new UserProfileView(userRating);
render(siteHeaderElement, userProfile, RenderPosition.BEFOREEND);

const footer = document.querySelector('.footer');
render(footer, new FooterStatisticsView(statistics).getElement(), RenderPosition.BEFOREEND);

const mainBoardPresenter = new MainBoardPresenter(siteMainElement);

mainBoardPresenter.init(filters, films);
