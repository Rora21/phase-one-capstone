// // js/explore.js
// import { addFavorite } from './favorite.js';

// const API_URL = "https://openlibrary.org/search.json?q=romance"; // default category

// export async function loadBooks() {
//   const grid = document.getElementById("favorites-grid");
//   grid.innerHTML = `<p class="col-span-full text-center text-gray-600">⏳ Loading books...</p>`;

//   try {
//     const res = await fetch(API_URL);
//     const data = await res.json();

//     // Get top 12 results
//     const books = data.docs.slice(0, 12);

//     grid.innerHTML = "";

//     books.forEach(book => {
//       const title = book.title || "Untitled";
//       const author = book.author_name ? book.author_name[0] : "Unknown Author";
//       const cover = book.cover_i
//         ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
//         : "images/default-book.jpg"; // fallback image
//       const key = book.key;

//       const card = document.createElement("div");
//       card.className = "bg-white rounded-lg shadow p-4 flex flex-col";
//       card.innerHTML = `
//         <img src="${cover}" alt="${title}" class="h-56 w-full object-cover mb-4 rounded">
//         <h3 class="font-semibold text-lg mb-1">${title}</h3>
//         <p class="text-sm mb-3">${author}</p>
//         <button class="mt-auto py-2 px-3 rounded bg-[#c89b77] text-white hover:bg-[#3e3e3e] transition">❤️ Add to Favorites</button>
//       `;

//       const btn = card.querySelector("button");
//       btn.addEventListener("click", () => {
//         addFavorite({ key, title, author, cover });
//         btn.textContent = "✅ Added!";
//         btn.disabled = true;
//       });
      
//       grid.appendChild(card);
//     });
//   } catch (err) {
//     console.error("Error fetching books:", err);
//     grid.innerHTML = `<p class="col-span-full text-center text-red-600">⚠️ Failed to load books. Try again later.</p>`;
//   }
// }
