const filmToFilterMap = {
  watchlist: (films) => films.filter((film) => film.userDetails.isInWatchList).length,
  history: (films) => films.filter((film) => film.userDetails.isWatched).length,
  favourite: (films) => films.filter((film) => film.userDetails.isFavourite).length,
};


export const generateFilter = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);
