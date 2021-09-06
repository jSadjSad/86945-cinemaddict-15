import AbstractView from './abstract.js';
import {formatDateYear} from '../utils/common.js';

const createFilmCardTemplate = (film) => {
  const {title, poster, releaseDate, runtime, genres, description, raiting, comments, isInWatchList, isWatched, isFavourite} = film;
  const date = formatDateYear(releaseDate);
  const shortDescription = (description.length < 140) ? description : `${description.slice(0, 139)}…`;
  const genre = genres[0];
  const commentsNumber = `${comments.length} comments`;
  const watchListActiveStyle = (isInWatchList) ? ' film-card__controls-item--active' : '';
  const watchedActiveStyle = (isWatched) ? ' film-card__controls-item--active' : '';
  const isFavouriteActiveStyle = (isFavourite) ? 'film-card__controls-item--active' : '';


  return (
    `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${raiting}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${shortDescription}</p>
    <a class="film-card__comments">${commentsNumber}</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchListActiveStyle}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedActiveStyle}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${isFavouriteActiveStyle}" type="button">Mark as favorite</button>
    </div>
  </article>`);
};


export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._popupOpenElementClickHandler = this._popupOpenElementClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favouriteClickHandler = this._favouriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  //Создает ключ в объекте callback
  _popupOpenElementClickHandler(evt) {
    evt.preventDefault;
    this._callback.popupOpenElementClick();
  }

  _watchListClickHandler(evt) {
    evt.preventDefault;
    this._callback.watchListClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault;
    this._callback.watchedClick();
  }

  _favouriteClickHandler(evt) {
    evt.preventDefault;
    this._callback.favouriteClick();
  }

  //Сохраняет обработчик из параметра в объекте callback. Назначает обработчик DOM-елементу
  setPopupOpenElementClickHandler(callback) {
    this._callback.popupOpenElementClick = callback;

    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._popupOpenElementClickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._popupOpenElementClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._popupOpenElementClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchListClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._watchedClickHandler);
  }

  setFavouriteClickHandler(callback) {
    this._callback.favouriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favouriteClickHandler);
  }
}
