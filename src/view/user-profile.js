import AbstractView from './abstract.js';


const createUserProfileTemplate = (userRating) => (
  `<section class="header__profile profile">
      <p class="profile__rating">${userRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
);


export default class UserProfile extends AbstractView {
  constructor(userRating) {
    super();
    this._userRating = userRating;
  }

  getTemplate() {
    return createUserProfileTemplate(this._userRating);
  }
}
