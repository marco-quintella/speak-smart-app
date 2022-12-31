const initialWeek = 1672437753000; // 01/01/2023

export function currentWeekNumber () {
  const init = new Date(initialWeek);
  const now = new Date();
  const diff = now.getTime() - init.getTime();
  const week = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  return week;
}