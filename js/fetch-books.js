// js/fetchBooks.js
export async function fetchBooks(query) {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    // Map to simple book objects
    return data.docs.slice(0, 20).map(book => ({
      title: book.title,
      author: book.author_name ? book.author_name[0] : 'Unknown',
      cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'images/book-placeholder.png',
      key: book.key
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}
