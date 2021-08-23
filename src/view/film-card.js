import AbstractView from '.view/abstract.js';
import {formatDateYear} from '../utils.js';

const createFilmCardTemplate = (film) => {
  const {title, poster, releaseDate, runtime, genres, description, raiting, userDetails, comments} = film;
  const date = formatDateYear(releaseDate);
  const shortDescription = (description.length < 140) ? description : `${description.slice(0, 139)}…`;
  const genre = genres[0];
  const commentsNumber = `${comments.length} comments`;
  const {isInWatchList, isWatched, isFavorite} = userDetails;

  const watchListActiveStyle = (isInWatchList) ? ' film-card__controls-item--active' : '';
  const watchedActiveStyle = (isWatched) ? ' film-card__controls-item--active' : '';
  const isFavoriteActiveStyle = (isFavorite) ? 'film-card__controls-item--active' : '';


  return (
    `<article class="film-card">
    <h3 class="film-card__title">${title}e</h3>
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
      <button class="film-card__controls-item film-card__controls-item--favorite ${isFavoriteActiveStyle}" type="button">Mark as favorite</button>
    </div>
  </article>`);
};


export default class FilmCard extends AbstractView{
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

}
