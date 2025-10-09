import { getFavorites, removeFavorite } from "./favorite.js";



const favoritesGrid = document.getElementById("favorites-grid");
const noFavorites = document.getElementById("no-favorites");

// 1️⃣ Get favorites from localStorage
  const favorites = getFavorites();

  // 2️⃣ Clear the grid
  favoritesGrid.innerHTML = "";

  // 3️⃣ If no favorites → show message
  if (favorites.length === 0) {
    noFavorites.classList.remove("hidden");
    return;
  } else {
    noFavorites.classList.add("hidden");
  }

  // 4️⃣ Display favorite books
  favorites.forEach((book) => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow p-4 flex flex-col";

    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" class="h-56 w-full object-cover mb-4 rounded">
      <h3 class="font-semibold text-lg mb-1">${book.title}</h3>
      <p class="text-sm mb-3">${book.author}</p>
      <button class="mt-auto py-2 px-3 rounded bg-red-200 hover:bg-red-300 transition">Remove</button>
    `;

    const removeBtn = card.querySelector("button");
    removeBtn.addEventListener("click", () => {
      removeFavorite(book.key);  // 🗑 remove from localStorage
      loadFavorites();           // 🔁 refresh the page
    }); 

    favoritesGrid.appendChild(card);
  });

