import {createElement} from '../utils.js';


const createFooterStatistics = (totalFilmCount) => (
  `<section class="footer__statistics">
    <p>${totalFilmCount} movies inside</p>
  </section>`);


export default class FooterStatistics {
  constructor(statistics) {
    this._statistics = statistics;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatistics(this._statistics);
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
