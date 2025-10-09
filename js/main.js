// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  const exploreBtn = document.getElementById('exploreBtn');
  const exploreSection = document.getElementById('explore-section');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const booksGrid = document.getElementById('booksGrid');
  const noResults = document.getElementById('noResults');

  // 🌼 Show Explore Section when button clicked
  exploreBtn.addEventListener('click', () => {
    exploreSection.classList.remove('hidden');
    exploreSection.scrollIntoView({ behavior: 'smooth' });
    fetchBooks(); // load default books
  });

  // 📚 Fetch books from Open Library
  async function fetchBooks(query = "fiction") {
    booksGrid.innerHTML = "<p class='col-span-full text-center'>Loading...</p>";
    noResults.classList.add('hidden');

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`;
    const res = await fetch(url);
    const data = await res.json();

    booksGrid.innerHTML = "";

    if (!data.docs || data.docs.length === 0) {
      noResults.classList.remove('hidden');
      return;
    }

    data.docs.forEach(book => {
      const coverId = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : 'images/default-book.jpg';

      const bookData = {
        key: book.key,
        title: book.title,
        author: book.author_name ? book.author_name[0] : "Unknown Author",
        cover: coverId
      };

      const card = document.createElement('div');
      card.className = "bg-white rounded-lg shadow p-4 flex flex-col";
      card.innerHTML = `
        <img src="${bookData.cover}" alt="${bookData.title}" class="h-48 w-full object-cover mb-4 rounded">
        <h3 class="font-semibold text-lg mb-1">${bookData.title}</h3>
        <p class="text-sm mb-2">${bookData.author}</p>
        <button class="mt-auto py-2 px-3 rounded bg-green-100 hover:bg-green-200 transition">Add to Favorites</button>
      `;

      const favBtn = card.querySelector('button');
      favBtn.addEventListener('click', () => {
        addToFavorites(bookData);
        favBtn.textContent = "Added ❤️";
        favBtn.disabled = true;
      });

      booksGrid.appendChild(card);
    });
  }

  // 💾 Save book to favorites in localStorage
  function addToFavorites(book) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // check if already added
    if (!favorites.find(fav => fav.key === book.key)) {
      favorites.push(book);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  // 🔍 Search functionality
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) fetchBooks(query);
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) fetchBooks(query);
    }
  });
});
// ❤️ Show favorites when button clicked
const viewFavoritesBtn = document.getElementById('viewFavorites');
const favoritesSection = document.getElementById('favorites-section');
const favoritesGrid = document.getElementById('favoritesGrid');
const noFavorites = document.getElementById('noFavorites');

viewFavoritesBtn.addEventListener('click', () => {
  exploreSection.classList.add('hidden');
  favoritesSection.classList.remove('hidden');
  loadFavorites();
  favoritesSection.scrollIntoView({ behavior: 'smooth' });
});

// 🧡 Load favorites from localStorage
function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  favoritesGrid.innerHTML = '';

  if (favorites.length === 0) {
    noFavorites.classList.remove('hidden');
    return;
  } else {
    noFavorites.classList.add('hidden');
  }

  favorites.forEach(book => {
    const card = document.createElement('div');
    card.className = "bg-white rounded-lg shadow p-4 flex flex-col";
    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" class="h-48 w-full object-cover mb-4 rounded">
      <h3 class="font-semibold text-lg mb-1">${book.title}</h3>
      <p class="text-sm mb-2">${book.author}</p>
      <button class="mt-auto py-2 px-3 rounded bg-red-200 hover:bg-red-300 transition">Remove</button>
    `;
    const removeBtn = card.querySelector('button');
    removeBtn.addEventListener('click', () => removeFavorite(book.key));
    favoritesGrid.appendChild(card);
  });
}

// 🗑 Remove a book from favorites
function removeFavorite(bookKey) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(fav => fav.key !== bookKey);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  loadFavorites(); // refresh favorites view
}
// Redirect to favorites page
// const viewFavButton = document.getElementById("view-favorites");

// if (viewFavButton) {
//   viewFavButton.addEventListener("click", () => {
//     window.location.href = "favorite.html";
//   });
// }

