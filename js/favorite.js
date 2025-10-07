// js/favorites.js
export function saveFavorite(book) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.find(b => b.key === book.key)) {
    favorites.push(book);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

export function removeFavorite(bookKey) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(b => b.key !== bookKey);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}
