import { Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieCard.css";

function MovieCard({ movie }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent navigation when clicking favorite button
    e.stopPropagation();
    
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : "/placeholder-movie.jpg"
          }
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${isFavorite(movie.id) ? "active" : ""}`}
            onClick={handleFavoriteClick}
            title={isFavorite(movie.id) ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite(movie.id) ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
      
      <div className="movie-info">
        <Link to={`/movie/${movie.id}`} className="movie-title-link">
          <h3>{movie.title}</h3>
        </Link>
        <p className="movie-year">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
        </p>
        <p className="movie-rating">
          ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10
        </p>
      </div>
    </div>
  );
}

export default MovieCard;