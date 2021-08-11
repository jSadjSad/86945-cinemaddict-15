const filmToFilterMap = {
  Watchlist: (films) => films.filter((film) => film.userDetails.isInWatchList).length,
  History: (films) => films.filter((film) => film.userDetails.isWatched).length,
  Favourite: (films) => films.filter((film) => film.userDetails.isFavourite).length,
};

export const generateFilter = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);
