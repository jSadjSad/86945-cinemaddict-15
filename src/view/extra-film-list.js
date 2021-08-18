import {createElement} from '../utils.js';


const createExtraFilmListTemplate = () => (
  `<section class="films-list films-list--extra">
  <h2 class="films-list__title"> </h2>

  <div class="films-list__container">

  </div>
  </section>`
);


export default class ExtraFilmList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createExtraFilmListTemplate();
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
