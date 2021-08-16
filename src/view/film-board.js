import {createElement} from '../utils.js';

const createFilmBoardTemplate = () => (
  `<section class="films">

  </section>`
);


export default class FilmBoard {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmBoardTemplate();
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
