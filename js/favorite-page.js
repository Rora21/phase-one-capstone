// js/favorites-page.js
import { getFavorites, removeFavorite } from './favorites.js';

export function loadFavorites() {
  const grid = document.getElementById('favorites-grid');
  const noFav = document.getElementById('no-favorites');
  const favorites = getFavorites();

  if (!favorites.length) {
    noFav.classList.remove('hidden');
    return;
  } else {
    noFav.classList.add('hidden');
  }

  grid.innerHTML = '';

  favorites.forEach(book => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow p-4 flex flex-col';
    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" class="h-48 w-full object-cover mb-4 rounded">
      <h3 class="font-semibold text-lg mb-1">${book.title}</h3>
      <p class="text-sm mb-2">${book.author}</p>
      <button class="mt-auto py-2 px-3 rounded bg-accent text-white">Remove Favorite</button>
    `;
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
      removeFavorite(book.key);
      loadFavorites
