import {render, RenderPosition, remove} from '../utils/render.js';

import MenuView from '../view/menu.js';
import SortView from '../view/sort.js';
import FilmBoardView from '../view/film-board.js';
import MainFilmListView from '../view/main-film-list.js';
import FilmCardView from '../view/film-card.js';
import ShowMoreButtonView from '../view/show-more.js';
import ExtraFilmListView from '../view/extra-film-list.js';
import FilmDetailsView from '../view/film-details.js';

const MAIN_FILM_LIST_COUNT_STEP = 5;
const EXTRA_FILM_LISTS_NUMBER = 2;
const EXTRA_FILM_LIST_COUNT = 2;


export default class MainBoard {

  constructor(siteMainElement) {
    this._mainBoardContainer = siteMainElement;
    this._sort = new SortView();
    this._filmBoard = new FilmBoardView();
    this._mainFilmsList = new MainFilmListView();
    this._extraFilmList = new ExtraFilmListView();
    this._showMoreButton = new ShowMoreButtonView();

  }

  init(filters, films) {
    this._films = films.slice();
    this._filters = filters;

    this._renderMainBoard();
  }

  _renderMenu() {
    const menu = new MenuView(this._filters);
    render(this._mainBoardContainer, menu, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._mainBoardContainer, this._sort, RenderPosition.BEFOREEND);
  }

  _renderFilmDetailsPopup(film) {
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
  }

  _renderFilmCard(filmCardContainer, film) {
    const filmCard = new FilmCardView(film);
    filmCard.setCardElementClickHandler(() => this._renderFilmDetailsPopup(film));
    render(filmCardContainer, filmCard, RenderPosition.BEFOREEND);
  }

  _renderFilmBoard() {
    render(this._mainBoardContainer, this._filmBoard, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    render(this._mainFilmsList, this._showMoreButton, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    let renderedFilmsCount = MAIN_FILM_LIST_COUNT_STEP;

    this._films.slice(renderedFilmsCount, renderedFilmsCount + MAIN_FILM_LIST_COUNT_STEP).forEach((film) => this._renderFilmCard(this._mainFilmsListContainer, film));
    renderedFilmsCount += MAIN_FILM_LIST_COUNT_STEP;

    if (renderedFilmsCount > this._films.length) {
      remove(this._showMoreButton);
    }
  }

  _renderMainFilmsList() {
    render(this._filmBoard, this._mainFilmsList, RenderPosition.BEFOREEND);
    const mainFilmsListContainer = this._mainFilmsList.getElement().querySelector('.films-list__container');
    const mainFilmsListTitle = this._mainFilmsList.getElement().querySelector('.films-list__title');

    if (this._films.length === 0) {
      mainFilmsListTitle.innerHTML = 'There are no movies in our database';
      mainFilmsListTitle.classList.remove('visually-hidden');
    } else {
      mainFilmsListTitle.innerHTML = 'All movies. Upcoming';
      mainFilmsListTitle.classList.add('visually-hidden');
    }

    for (let i = 0; i < Math.min(this._films.length, MAIN_FILM_LIST_COUNT_STEP); i++) {
      this._renderFilmCard(mainFilmsListContainer, this._films[i]);
    }

    if (this._films.length > MAIN_FILM_LIST_COUNT_STEP) {
      this._renderShowMoreButton();
    }
  }


  _renderExtraFilmLists() {
    if (this._films.length !== 0) {
      for (let i = 0; i < EXTRA_FILM_LISTS_NUMBER; i++) {
        render(this._filmBoard, this._extraFilmList, RenderPosition.BEFOREEND);
      }
    }

    const topRatedFilms = this._films;
    const mostCommentedFilms = this._films;


    const [topRatedFilmList, mostCommentedFilmList] = this._filmBoard.getElement().querySelectorAll('.films-list--extra');

    const topRatedFilmListTitle = topRatedFilmList.querySelector('.films-list__title');
    topRatedFilmListTitle.textContent = 'Top rated';

    const mostCommentedFilmListTitle = mostCommentedFilmList.querySelector('.films-list__title');
    mostCommentedFilmListTitle.textContent = 'Most commented';

    const topRatedFilmListContainer = topRatedFilmList.querySelector('.films-list__container');
    const mostCommentedFilmListContainer = mostCommentedFilmList.querySelector('.films-list__container');


    for (let i = 0; i < EXTRA_FILM_LIST_COUNT; i++) {
      this._renderFilmCard(topRatedFilmListContainer, topRatedFilms[i]);
    }

    for (let i = 0; i < EXTRA_FILM_LIST_COUNT; i++) {
      this._renderFilmCard(mostCommentedFilmListContainer, mostCommentedFilms[i]);
    }
  }

  _renderMainBoard() {
    this._renderMenu();
    this._renderSort();
    this._renderFilmBoard();
    this._renderMainFilmsList();
    this._renderExtraFilmLists();
  }
}
