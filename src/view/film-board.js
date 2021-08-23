import AbstractView from '.view/abstract.js';


const createFilmBoardTemplate = () => (
  `<section class="films">

  </section>`
);


export default class FilmBoard extends AbstractView {

  getTemplate() {
    return createFilmBoardTemplate();
  }
}
