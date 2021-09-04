import {render, RenderPosition, remove, replace} from '../utils/render.js';
import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import {isEscape} from '../utils/common.js';
import {Mode} from '../utils/const.js';


export default class FilmCard {
  constructor(filmCardContainer, changeData, changeMode) {
    this._filmCardContainer = filmCardContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCard = null;
    this._filmDetailsPopup = null;

    this._mode = Mode.DEFAULT;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handlePopupOpenElementClick = this._handlePopupOpenElementClick.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavouriteClick = this._handleFavouriteClick.bind(this);
  }

  init(film) {
    this._film = film;

    //Сохраняет предыдущую карточку
    const prevFilmCard = this._filmCard;
    const prevFilmDetailsPopup = this._filmDetailsPopup;

    //Создает экземпляр карточки
    this._filmCard = new FilmCardView(this._film);
    this._filmDetailsPopup = new FilmDetailsView(this._film);
    this._documentBody = document.querySelector('body');

    //Назначает контекст обработчикам
    this._filmCard.setPopupOpenElementClickHandler(this._handlePopupOpenElementClick);
    this._filmCard.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCard.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCard.setFavouriteClickHandler(this._handleFavouriteClick);
    this._filmDetailsPopup.setPopupCloseButtonClickHandler(this._removePopup);
    this._filmDetailsPopup.setWatchListClickHandler(this._handleWatchListClick);
    this._filmDetailsPopup.setWatchedClickHandler(this._handleWatchedClick);
    this._filmDetailsPopup.setFavouriteClickHandler(this._handleFavouriteClick);

    //Если экземпляр не существует, создает
    if (prevFilmCard === null) {
      render(this._filmCardContainer, this._filmCard, RenderPosition.BEFOREEND);
      return;
    }
    //Если экземпляр существует, заменяет на новый
    if (this._filmCardContainer.contains(prevFilmCard.getElement())) {
      replace(this._filmCard, prevFilmCard);
    }

    if (this._documentBody.contains(prevFilmDetailsPopup.getElement())) {
      replace(this._filmDetailsPopup, prevFilmDetailsPopup);
    }
    //Удаляет старные экземпляры
    remove(prevFilmCard);
    remove(prevFilmDetailsPopup);
  }

  //Удаляет карточку. Публичный метод
  desroy() {
    remove(this._filmCard);
    remove(this._filmDetailsPopup);
  }

  _resetView() {
    if(this._mode !== Mode.DEFAULT) {
      this._removePopup();
    }
  }

  //Удаляет попап
  _removePopup() {
    document.body.removeChild(document.body.querySelector('.film-details'));
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  //Обработчик нажатия на Esc
  _escKeyDownHandler(evt) {
    if (isEscape(evt)) {
      this._removePopup();
    }
  }

  //Отрисовывает попап
  _renderPopup() {
    render(document.body, this._filmDetailsPopup, RenderPosition.BEFOREEND);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode;
    this._mode = Mode.POPUP;
  }

  //Обработчик клика на постере, названии и комментариях
  _handlePopupOpenElementClick() {
    if (document.body.querySelector('.film-details')) {
      this._removePopup();
    }

    this._renderPopup();
    document.addEventListener('click', this._escKeyDownHandler);
    this._filmDetailsPopup.setPopupCloseButtonClickHandler(() => this._removePopup());
  }

  //Переключает значение isInWatchList
  _handleWatchListClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isInWatchList: !this._film.isInWatchList,
        },
      ),
    );
  }

  //Переключает значениеisWatched
  _handleWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }

  //Переключает значение isFavourite
  _handleFavouriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFavourite: !this._film.isFavourite,
        },
      ),
    );
  }
}
