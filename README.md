Book Explorer — Personal Library Web App

Book Explorer is a simple and interactive web application that allows users to explore, search, and save books using data retrieved from the Open Library API
.
The project is designed to demonstrate the integration of APIs, DOM manipulation, and local storage using JavaScript.

Features

Search Books: Find books by title, author, or keyword.

Explore Section: Displays a selection of books fetched from the Open Library API.

Favorites: Users can save and view their favorite books.

Local Storage: Favorites are stored in the browser for persistence.

Responsive Design: The layout adapts to various screen sizes.

Technologies Used

HTML5 – for structure

CSS3 (Tailwind CSS) – for styling and layout

JavaScript (ES6) – for functionality and interactivity

Open Library API – for book data

Folder Structure
book-explorer/
│
├── index.html            # Main page (Home and Explore) 
├── favorite.html         # Favorites page
│
├── js/
│   ├── main.js           # Handles exploring, searching, and adding favorites
│   └── favorites.js      # Manages displaying and removing favorites
│
├── css/
│   └── style.css         # Custom styling
│
└── images/
    └── default-book.jpg  # Default book cover

