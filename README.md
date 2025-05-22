# TMDB Movie Gallery

A sleek, responsive movie gallery web app that fetches data from The Movie Database (TMDB) API to display trending, popular, and top-rated movies with rich details.

---

## Features

- Browse trending, popular, and top-rated movies.
- Search movies by title.
- View detailed information for each movie including synopsis, release date, ratings, and genres.
- Responsive design for desktop and mobile.
- Smooth user experience with loading states and error handling.
- Environment variables support for API keys (secured with `.env` files).

---

## Screenshots

*(Add screenshots or GIFs showcasing the app UI here)*

---

## Technologies Used

- React (or your frontend framework)
- TMDB API for movie data
- CSS / SCSS for styling
- Axios / Fetch for API requests
- Git for version control

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- TMDB API key (sign up for free at [https://www.themoviedb.org/](https://www.themoviedb.org/))

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/tmdb-movie-gallery.git
cd tmdb-movie-gallery/frontend
```


2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the frontend directory with the following content:

```bash
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
```

4. Start the development server:
```bash
npm run dev
```
## Project Structure
```
tmdb-movie-gallery/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .gitignore
│   ├── package.json
│   └── README.md
├── backend/ (if any)
└── .env.example
```
