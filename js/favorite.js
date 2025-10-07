// favorites.js
export function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

export function addFavorite(book) {
  const favorites = getFavorites();
  // avoid duplicates
  if (!favorites.some(fav => fav.key === book.key)) {
    favorites.push(book);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

export function removeFavorite(bookKey) {
  let favorites = getFavorites();
  favorites = favorites.filter(book => book.key !== bookKey);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
