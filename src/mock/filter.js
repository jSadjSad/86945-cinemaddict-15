const filmToFilterMap = {
  watchlist: (films) => films.filter((film) => film.isInWatchList).length,
  history: (films) => films.filter((film) => film.isWatched).length,
  favourite: (films) => films.filter((film) => film.isFavourite).length,
};


export const generateFilter = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);
