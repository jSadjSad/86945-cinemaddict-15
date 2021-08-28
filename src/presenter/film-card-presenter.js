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
    //Создает экземпляр карточки
    this._filmCard = new FilmCardView(this._film);
    //Назначает контекст обработчикам
    this._filmCard.setPopupOpenElementClickHandler(this.handlePopupOpenElementClick);
    this._filmCard.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCard.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCard.setFavouriteClickHandler(this._handleFavouriteClick);

    //Если экземпляр не существует, создает
    if (prevFilmCard === null) {
      render(this._filmCardContainer, this._filmCard, RenderPosition.BEFOREEND);
      return;
    }
    //Если экземпляр существует, заменяет на новый
    if (this._filmCardContainer.getElement().contains(prevFilmCard.getElement())) {
      replace(this._filmCard, prevFilmCard);
    }
    //и удаляет старый экземпляр
    remove(prevFilmCard);
  }


  //Удаляет карточку. Публичный метод
  desroy() {
    remove(this._filmCard);
  }


  //Создает экземпляр попапа, отрисовывает его
  _handlePopupOpenElementClick(film) {
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


  //Переключает значение userDetails.isInWatchList
  _handleWatchListClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isInWatchList: !this._film.userDetails.isInWatchList,
        },
      ),
    );
  }

  //Переключает значение userDetails.isWatched
  _handleWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.userDetails.isWatched,
        },
      ),
    );
  }


  //Переключает значение userDetails.isFavourite
  _handleFavouriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFavourite: !this._film.userDetails.isFavourite,
        },
      ),
    );
  }


}
