import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../Services/api";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState("All");

  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    18: "Drama",
    14: "Fantasy",
    27: "Horror",
    10749: "Romance",
    878: "Sci-Fi",
  };

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        setFilteredMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      filterByGenre(activeGenre, searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  const filterByGenre = (genre, baseMovies = movies) => {
    setActiveGenre(genre);
    if (genre === "All") {
      setFilteredMovies(baseMovies);
    } else {
      const filtered = baseMovies.filter((movie) =>
        movie.genre_ids?.includes(
          parseInt(Object.keys(genreMap).find((key) => genreMap[key] === genre))
        )
      );
      setFilteredMovies(filtered);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="home">
      {/* Header */}
      <div className="header">
        <h2>Welcome, {user?.email}</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Genre Filters */}
      <div className="genre-filter">
        {["All", ...Object.values(genreMap)].map((genre) => (
          <button
            key={genre}
            onClick={() => filterByGenre(genre)}
            className={`genre-button ${activeGenre === genre ? "active" : ""}`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Error or Loading */}
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {filteredMovies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
