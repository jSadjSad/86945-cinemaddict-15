import dayjs from 'dayjs';

const getRandomInteger = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = (a = 1, b = 0, c = 1) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return (lower + Math.random() * (upper - lower + 1)).toFixed(c);
};

const getRandomBoolean = () => Math.random() < 0.5;

const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  return (minutes === 0) ? `${hours} h` : `${hours} h ${minutes} m`;
};


const getRandomDateInPast = (periodStart) => {
  const timeGap = getRandomInteger((dayjs() - periodStart), 0);
  return dayjs().subtract(timeGap, 'millisecond');
};

const formatDateYear = (date) => (
  dayjs(date).format('YYYY')
);

const formatDateDay = (date) => (
  dayjs(date).format('D MMMM YYYY')
);

export {getRandomInteger, getRandomBoolean, getTimeFromMins, getRandomFloat, getRandomDateInPast, formatDateYear, formatDateDay};
