import {render, RenderPosition, remove} from '../utils/render.js';
import {updateItem} from '../utils/common.js';

import MenuView from '../view/menu.js';
import SortView from '../view/sort.js';
import FilmBoardView from '../view/film-board.js';
import MainFilmListView from '../view/main-film-list.js';
import ShowMoreButtonView from '../view/show-more.js';
import ExtraFilmListView from '../view/extra-film-list.js';
import FilmCardPresenter from './film-card-presenter.js';

const MAIN_FILM_LIST_COUNT_STEP = 5;
const EXTRA_FILM_LISTS_NUMBER = 2;
const EXTRA_FILM_LIST_COUNT = 2;


export default class MainBoard {

  constructor(siteMainElement) {
    this._mainBoardContainer = siteMainElement;
    this._renderedFilmsCount = MAIN_FILM_LIST_COUNT_STEP;
    this._sort = new SortView();
    this._filmBoard = new FilmBoardView();
    this._mainFilmsList = new MainFilmListView();
    this._showMoreButton = new ShowMoreButtonView();

    this._filmCardPresenter = new Map();
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(filters, films) {
    this._films = films.slice();
    this._filters = filters;

    this._renderMainBoard();
  }

  //Закрывает попапы
  _handleModeChange() {
    this._filmCardPresenter.forEach((presenter) => presenter.resetView());
  }

  //Заменяет карточку после изменения
  _handleFilmCardChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._filmCardPresenter.get(updatedFilm.id).init(updatedFilm);
  }

  //Отрисовывает меню
  _renderMenu() {
    const menu = new MenuView(this._filters);
    render(this._mainBoardContainer, menu, RenderPosition.AFTERBEGIN);
  }

  //Отрисовывает сортировку
  _renderSort() {
    if (this._films.length !== 0) {
      render(this._mainBoardContainer, this._sort, RenderPosition.BEFOREEND);
    }
  }


  //Отрисовывает board
  _renderFilmBoard() {
    render(this._mainBoardContainer, this._filmBoard, RenderPosition.BEFOREEND);
  }

  //Отрисовывает карточку
  _renderFilmCard(filmCardContainer, film) {
    const filmCardPresenter = new FilmCardPresenter(filmCardContainer, this._handleFilmCardChange, this._handleModeChange);
    filmCardPresenter.init(film);
    this._filmCardPresenter.set(film.id, filmCardPresenter);
  }

  //Отрисовывает список карточек
  _renderFilmList(films, from, to, filmCardContainer) {
    films.slice(from, to).forEach((film) => this._renderFilmCard(filmCardContainer, film));
  }

  //Очищает список карточек
  _clearFilmList() {
    this._filmCardPresenterList.forEach((presenter) => presenter.destroy());
    this._filmCardPresenterList.clear;
    this._renderedFilmsCount = MAIN_FILM_LIST_COUNT_STEP;
    remove(this._showMoreButton);
  }

  //Отрисовывает кнопку допоказа
  _renderShowMoreButton() {
    render(this._mainFilmsList, this._showMoreButton, RenderPosition.BEFOREEND);
    this._showMoreButton.setClickHandler(this._handleShowMoreButtonClick);
  }

  //Отрисовывает главный список
  _renderMainFilmList() {
    render(this._filmBoard, this._mainFilmsList, RenderPosition.BEFOREEND);
    const mainFilmsListContainer = this._mainFilmsList.getElement().querySelector('.films-list__container');
    const mainFilmsListTitle = this._mainFilmsList.getElement().querySelector('.films-list__title');

    if (this._films.length !== 0) {
      mainFilmsListTitle.innerHTML = 'All movies. Upcoming';
      mainFilmsListTitle.classList.add('visually-hidden');
    } else {
      mainFilmsListTitle.innerHTML = 'There are no movies in our database';
      mainFilmsListTitle.classList.remove('visually-hidden');
    }

    if (this._films.length !== 0) {
      this._renderFilmList(this._films, 0, Math.min(this._films.length, MAIN_FILM_LIST_COUNT_STEP), mainFilmsListContainer);
    }

    if (this._films.length > MAIN_FILM_LIST_COUNT_STEP) {
      this._renderShowMoreButton();
    }
  }

  //Работа кнопки Показать еще
  _handleShowMoreButtonClick() {
    const mainFilmsListContainer = this._mainFilmsList.getElement().querySelector('.films-list__container');

    this._renderFilmList(this._films, this._renderedFilmsCount, (this._renderedFilmsCount + MAIN_FILM_LIST_COUNT_STEP), mainFilmsListContainer);

    this._renderedFilmsCount += MAIN_FILM_LIST_COUNT_STEP;

    if (this._renderedFilmsCount > this._films.length) {
      remove(this._showMoreButton);
    }
  }

  //Отрисовывает дополнительные списки
  _renderExtraFilmLists() {
    if (this._films.length !== 0) {

      for (let i = 0; i < EXTRA_FILM_LISTS_NUMBER; i++) {
        const extraFilmList = new ExtraFilmListView();
        render(this._filmBoard, extraFilmList, RenderPosition.BEFOREEND);
      }

      const topRatedFilms = this._films;
      const mostCommentedFilms = this._films;

      const [topRatedFilmList, mostCommentedFilmList] = this._filmBoard.getElement().querySelectorAll('.films-list--extra');

      const topRatedFilmListTitle = topRatedFilmList.querySelector('.films-list__title');
      topRatedFilmListTitle.textContent = 'Top Rated';
      const topRatedFilmListContainer = topRatedFilmList.querySelector('.films-list__container');
      this._renderFilmList(topRatedFilms, 0, EXTRA_FILM_LIST_COUNT, topRatedFilmListContainer);

      const mostCommentedFilmListTitle = mostCommentedFilmList.querySelector('.films-list__title');
      mostCommentedFilmListTitle.textContent = 'Most Commented';
      const mostCommentedFilmListContainer = mostCommentedFilmList.querySelector('.films-list__container');
      this._renderFilmList(mostCommentedFilms, 0, EXTRA_FILM_LIST_COUNT, mostCommentedFilmListContainer);
    }
  }

  _renderMainBoard() {
    this._renderMenu();
    this._renderSort();
    this._renderFilmBoard();
    this._renderMainFilmList();
    this._renderExtraFilmLists();
  }
}
