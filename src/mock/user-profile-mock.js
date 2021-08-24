import {getRandomInteger} from '../utils/common.js';
const MIN_USER_RAITING = 0;
const MAX_USER_RAITING = 50;


export const generateUserRaiting = () => {
  const randomInteger = getRandomInteger(MIN_USER_RAITING, MAX_USER_RAITING);

  if(randomInteger === 0) {
    return '';
  } else if (randomInteger > 0 && randomInteger <= 10) {
    return 'Novice';
  } else if (randomInteger > 10 && randomInteger <= 20) {
    return 'Fan';
  } else if (randomInteger > 20) {
    return  'Movie Buff';
  }
};
