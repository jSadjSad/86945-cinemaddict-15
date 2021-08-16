import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);


dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'Today',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
});


const renderTemplate = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template, place);
};


const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};


const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};


const renderElement = (container, element, place) => {
  switch(place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};


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
  return dayjs().subtract(timeGap, 'millisecond').toDate();
};

const formatDateYear = (date) => (
  dayjs(date).format('YYYY')
);

const formatDateDay = (date) => (
  dayjs(date).format('D MMMM YYYY')
);

const formatDateTime = (date) => (
  dayjs(date).format('YYYY/MM/DD HH:mm:ss')
);

const formatDateFromNow = (date) => (
  dayjs(date).fromNow(true)
);


export {getRandomInteger, getRandomBoolean, getTimeFromMins, getRandomFloat, getRandomDateInPast, formatDateYear, formatDateDay, formatDateTime, formatDateFromNow, renderTemplate, createElement, RenderPosition, renderElement};
