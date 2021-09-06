import AbstractView from './abstract.js';
import {SortType} from '../utils/const.js';


const createSortTemplate = () => (
  `<ul class="sort">
     <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
     <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
     <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
   </ul>`);


export default class Sort extends AbstractView{
  constructor() {
    super();

    this._sortTypeCahgeHandler = this._sortTypeCahgeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _sortTypeCahgeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    this.getElement().querySelector('.sort__button--active').classList.remove('sort__button--active');
    evt.target.classList.add('sort__button--active');
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
