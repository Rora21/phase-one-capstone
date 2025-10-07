// js/main.js
import { fetchBooks } from './fetchBooks.js';
import { saveFavorite, removeFavorite, getFavorites } from './favorites.js';

export function initHome() {
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  const grid = document.getElementById('books-grid');
  const feedback = document.getElementById('feedback');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    feedback.textContent = 'Loading...';
    grid.innerHTML = '';

    const books = await fetchBooks(query);

    if (!books.length) {
      feedback.textContent = 'No results found.';
      return;
    }
    feedback.textContent = '';

    const favorites = getFavorites();

    books.forEach(book => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-lg shadow p-4 flex flex-col';
      card.innerHTML = `
        <img src="${book.cover}" alt="${book.title}" class="h-48 w-full object-cover mb-4 rounded">
        <h3 class="font-semibold text-lg mb-1">${book.title}</h3>
        <p class="text-sm mb-2">${book.author}</p>
        <button class="mt-auto py-2 px-3 rounded ${favorites.find(b => b.key === book.key) ? 'bg-accent text-white' : 'bg-darkText text-white'}">
          ${favorites.find(b => b.key === book.key) ? 'Remove Favorite' : 'Add Favorite'}
        </button>
      `;

      const btn = card.querySelector('button');
      btn.addEventListener('click', () => {
        if (favorites.find(b => b.key === book.key)) {
          removeFavorite(book.key);
          btn.textContent = 'Add Favorite';
          btn.className = 'mt-auto py-2 px-3 rounded bg-darkText text-white';
        } else {
          saveFavorite(book);
          btn.textContent = 'Remove Favorite';
          btn.className = 'mt-auto py-2 px-3 rounded bg-accent text-white';
        }
      });

      grid.appendChild(card);
    });
  });
}
