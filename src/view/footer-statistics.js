import AbstractView from '.view/abstract.js';


const createFooterStatistics = (totalFilmCount) => (
  `<section class="footer__statistics">
    <p>${totalFilmCount} movies inside</p>
  </section>`);


export default class FooterStatistics extends AbstractView{
  constructor(statistics) {
    super();
    this._statistics = statistics;
  }

  getTemplate() {
    return createFooterStatistics(this._statistics);
  }
}
