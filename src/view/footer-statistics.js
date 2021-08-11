export const createFooterStatistics = (statistics) => {
  const totalFilmCount = statistics;

  return (
    `<section class="footer__statistics">
      <p>${totalFilmCount} movies inside</p>
    </section>`);
};
