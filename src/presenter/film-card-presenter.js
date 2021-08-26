import {render, RenderPosition, remove, replace} from '../utils/render.js';
import FilmCardView from '../view/film-card.js';


export default class FilmCard {
  constructor(filmCardContainer) {
    this._filmCardContainer = filmCardContainer;
    this._filmCard = null;
  }

  init(film, cardElementClickHanler) {
    this._film = film;
    this._cardElementClickHanler = cardElementClickHanler;

    const prevFilmCard = this._filmCard;

    this._filmCard = new FilmCardView(this._film = film);
    this._filmCard.setCardElementClickHandler(this._cardElementClickHanler);

    if (prevFilmCard === null) {
      render(this._filmCardContainer, this._filmCard, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmCardContainer.getElement().contains(prevFilmCard.getElement())) {
      replace(this._filmCard, prevFilmCard);
    }

    remove(prevFilmCard);
  }

  desroy() {
    remove(this._filmCard);
  }
}
