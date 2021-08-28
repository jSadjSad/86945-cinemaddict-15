import {render, RenderPosition, remove, replace} from '../utils/render.js';
import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';


export default class FilmCard {
  constructor(filmCardContainer, changeData) {
    this._filmCardContainer = filmCardContainer;
    this._changeData = changeData;

    this._filmCard = null;

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
    if (prevFilmCard === null || prevFilmDetailsPopup === null) {
      render(this._filmCardContainer, this._filmCard, RenderPosition.BEFOREEND);
      return;
    }
    //Если экземпляр существует, заменяет на новый
    if (this._filmCardContainer.getElement().contains(prevFilmCard.getElement())) {
      replace(this._filmCard, prevFilmCard);
    }

    if (this._documentBody.getElement().contains(prevFilmDetailsPopup.getElement())) {
      replace(this._filmDetailsPopup, prevFilmDetailsPopup);
    }
    //и удаляет старый экземпляр
    remove(prevFilmCard);
  }


  //Удаляет карточку. Публичный метод
  desroy() {
    remove(this._filmCard);
  }


  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._filmDetailsPopup.getElement().remove();
      this._documentBody.classList.remove('hide-overflow');
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }

  _renderPopup() {
    render(this._documentBody, this._filmDetailsPopup, RenderPosition.BEFOREEND);
    this._documentBody.classList.add('hide-overflow');
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _removePopup() {
    this._documentBody.removeCild(this._filmDetailsPopup);
    this._documentBody.classList.remove('hide-overflow');
  }

  //Создает экземпляр попапа, отрисовывает его
  _handlePopupOpenElementClick() {
    if (this._documentBody.querySelector('.film-details')) {
      this._removePopup();
    }

    this._renderPopup();
    document.addEventListener('click', this._escKeyDownHandler);
    this._filmDetailsPopup.setPopupCloseButtonClickHandler(() => this.__removePopup());
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
