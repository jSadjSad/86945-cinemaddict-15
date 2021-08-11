import {formatDateDay} from '../utils.js';
import {formatDateTime} from '../utils.js';
import {formatDateFromNow} from '../utils.js';

const DAY_IN_MILLISECONDS = 86400000;

export const createFilmDetailsTemplate = (film) => {
  const {title, originalTitle, poster, director, writers, actors, releaseDate, runtime, country, genres, description, ageLimit, raiting, userDetails, comments} = film;

  const writersTerm = (writers.length > 1) ? 'Writers' : 'Writer';
  const writersContent = writers.join(', ');

  const actorsTerm = (actors.length > 1) ? 'Actors' : 'Actor';
  const actorsContent = actors.join(', ');

  const date = formatDateDay(releaseDate);

  const genresList = genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('  ');

  const {isInWatchList, isWatched, isFavorite} = userDetails;

  const watchListActiveStyle = (isInWatchList) ? 'film-details__control-button--active' : '';
  const watchedActiveStyle = (isWatched) ? 'film-details__control-button--active' : '';
  const isFavoriteActiveStyle = (isFavorite) ? 'film-details__control-button--active' : '';

  const createCommentsItem = (comment) => {
    const {text, emoji, date: commentDate, author} = comment;
    const commentDateFormatted = (new Date() - commentDate > (2 * DAY_IN_MILLISECONDS)) ? formatDateTime(commentDate) : formatDateFromNow(commentDate);

    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="${emoji}" width="55" height="55" alt="emoji-puke">
        </span>
        <div>
          <p class="film-details__comment-text">${text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${commentDateFormatted}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`);
  };

  const commentsList = comments.map((comment) => createCommentsItem(comment)).join(' ');

  const commentsNumber = comments.length;

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">

            <p class="film-details__age">${ageLimit}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${originalTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${raiting}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${writersTerm}</td>
                <td class="film-details__cell">${writersContent}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${actorsTerm}</td>
                <td class="film-details__cell">${actorsContent}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${date}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${runtime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">${genresList}</td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchListActiveStyle}" id="watchlist" name="watchlist" ${isInWatchList ? 'checked' : ''}>Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${watchedActiveStyle}" id="watched" name="watched" ${isWatched ? 'checked' : ''}>Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${isFavoriteActiveStyle}" id="favorite" name="favorite" ${isFavorite ? 'checked' : ''}>Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsNumber}</span></h3>

          <ul class="film-details__comments-list">
            ${commentsList}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              <img src="images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`);
};
