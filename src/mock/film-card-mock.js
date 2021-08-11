import {getRandomInteger} from '../utils.js';
import {getRandomBoolean} from '../utils.js';
import {getRandomFloat} from '../utils.js';
import {getTimeFromMins} from '../utils.js';
import {getRandomDateInPast} from '../utils.js';

const MIN_DESCRIPTION_LENGTH = 1;
const MAX_DESCRIPTION_LENGTH = 5;
const MIN_WRITERS_NUMBER = 1;
const MAX_WRITERS_NUMBER = 3;
const MIN_GENRES_NUMBER = 1;
const MAX_GENRES_NUMBER = 3;
const ACTORS_NUMBER = 3;
const FILM_MIN_DURARION = 20;
const FILM_MAX_DURARION = 300;
const WORLD_FIRST_FILM_RELEASE_DATE = new Date(1888, 1, 1);
const FILM_MIN_RAITING = 0;
const FILM_MAX_RAITING = 10;
const SITE_STARTED_DATE = new Date(2021, 1, 8);
const MIN_COMMENTS_NUMBER = 1;
const MAX_COMMENTS_NUMBER = 10;


const generateFilmTitle = () => {
  const filmTitles = ['Popeye the Sailor Meets Sindbad the Sailor', 'Sagebrush Trail', 'The Dance of Life', 'The Man with the Golden Arm', 'The Great Flamarion', 'Santa Claus Conquers the Martians', 'Made for Each Other'];

  return filmTitles[getRandomInteger(0, filmTitles.length - 1)];
};


const generateFilmPoster = () => {
  const filmPosters = ['./images/posters/popeye-meets-sinbad.png', './images/posters/sagebrush-trail.jpg', './images/posters/the-dance-of-life.jpg', './images/posters/the-man-with-the-golden-arm.jpg', './images/posters/the-great-flamarion.jpg', './images/posters/santa-claus-conquers-the-martians.jpg', './images/posters/made-for-each-other.png'];

  return filmPosters[getRandomInteger(0, filmPosters.length - 1)];
};


const generateDirector = () => {
  const directorsNames = ['Charlie Chaplin', 'Alfred Hitchcock', 'Walt Disney', 'Orson Welles', 'Ingmar Bergman', 'Federico Fellini', 'Stanley Kubrick', 'Clint Eastwood', 'Francis Ford Coppola', 'Martin Scorcese', 'Steven Spielberg', 'Peter Jackson'];

  const director = directorsNames[getRandomInteger(0, directorsNames.length - 1)];

  return director;
};


const generateWriters = () => {
  const writersNames = ['Billy Wilder', 'Ethan Coen and Joel Coen', 'Robert Towne', 'Quentin Tarantino', 'William Goldman', 'Charlie Kaufman', 'Woody Allen', 'Nora Ephron', 'Ernest Lehman', 'Paul Schrader', 'Oliver Stone', 'Aaron Sorkin'];

  const writers = [];
  for (let i = 0; i < getRandomInteger(MIN_WRITERS_NUMBER, MAX_WRITERS_NUMBER); i++) {
    writers.push(writersNames[getRandomInteger(0, writersNames.length - 1)]);
  }

  return writers;
};


const generateActors = () => {
  const actorsNames = ['Richard Burton', 'Michael Caine', 'Daniel Day-Lewis', 'Alec Guinness', 'Leonardo DiCaprio', 'Tom Cruise', 'Brigitte Bardot', 'Audrey Hepburn', 'Grace Kelly', 'Angelina Jolie', 'Marilyn Monroe', 'Ingrid Bergman'];

  const actors = [];
  for (let i = 0; i < ACTORS_NUMBER; i++) {
    actors.push(actorsNames[getRandomInteger(0, actorsNames.length - 1)]);
  }

  return actors;
};


const generateCountry = () => {
  const countries = ['Russia', 'USA', 'UN', 'France', 'Germany', 'Ukrane', 'China', 'Italy', 'Norway', 'Turkey', 'Spain', 'Mexico'];
  return countries[getRandomInteger(0, countries.length - 1)];
};


const generateGenres = () => {
  const genreTypes = ['Horror', 'Crime', 'Romantic Comedy', 'Drama', 'Fantasy', 'Animation', 'Historical', 'Science fiction', 'Action Adventure'];

  const genres = [];
  for (let i = 0; i < getRandomInteger(MIN_GENRES_NUMBER, MAX_GENRES_NUMBER); i++) {
    genres.push(genreTypes[getRandomInteger(0, genreTypes.length - 1)]);
  }

  return Array.from(new Set(genres));
};


const createDescription = () => {
  const descriptionPhrases = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.','Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];

  const phrases = [];
  for (let i = 0; i < getRandomInteger(MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH); i++) {
    phrases.push(descriptionPhrases[getRandomInteger(0, descriptionPhrases.length - 1)]);
  }

  return phrases.join(' ');
};


const createAgeLimit = () => {
  const ageLimits = ['0+', '6+', '12+', '18+'];
  return ageLimits[getRandomInteger(0, ageLimits.length - 1)];
};


const createComment = () => {
  const comments = [
    {commentText: 'Interesting setting and a good cast.',
      commentEmotion: 'smile'},
    {commentText: 'Booooooooooring.',
      commentEmotion: 'sleeping'},
    {commentText: 'Very very old. Meh.',
      commentEmotion: 'puke'},
    {commentText: 'Almost two hours? Seriously?',
      commentEmotion: 'angry'},
  ];

  const emojies = {
    smile: './images/emoji/smile.png',
    sleeping: './images/emoji/sleeping.png',
    puke: './images/emoji/puke.png',
    angry: './images/emoji/angry.png',
  };

  const commentAuthorNames = ['Fyodor','Kirill', 'Alexey', 'Pavel', 'Vladimir', 'Yury', 'Alexander'];
  const commentAuthorSurnams = ['Bondarchuk', 'Balabanov', 'Serebryannikov', 'Lungin', 'Uchitel', 'Bortko', 'Fedorchenko', 'Bykov', 'Sokurov'];

  const commentIndex = getRandomInteger(0, comments.length - 1);

  return {
    text: comments[commentIndex].commentText,
    emoji: emojies[comments[commentIndex].commentEmotion],
    date: getRandomDateInPast(SITE_STARTED_DATE),
    author: `${commentAuthorNames[getRandomInteger(0, commentAuthorNames.length - 1)]}  ${commentAuthorSurnams[getRandomInteger(0, commentAuthorSurnams.length - 1)]}`,
  };
};


const createComments = () => {
  const comments = [];
  for (let i = 0; i < getRandomInteger(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER); i++) {
    comments.push(createComment());
  }

  return comments;
};


export const generateFilm = () => (
  {
    title: generateFilmTitle(),
    originalTitle: generateFilmTitle(),
    poster: generateFilmPoster(),
    directors: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    releaseDate: getRandomDateInPast(WORLD_FIRST_FILM_RELEASE_DATE),
    runtime: getTimeFromMins(getRandomInteger(FILM_MIN_DURARION, FILM_MAX_DURARION)),
    country: generateCountry(),
    genres: generateGenres(),
    description: createDescription(),
    ageLimit: createAgeLimit(),
    raiting: getRandomFloat(FILM_MIN_RAITING, FILM_MAX_RAITING),
    userDetails:
    {
      isWatched: getRandomBoolean(),
      watchDate: getRandomDateInPast(this.releaseDate),
      isFavorite: getRandomBoolean(),
      isInWatchList: getRandomBoolean(),
    },
    comments: createComments(),
  }
);
