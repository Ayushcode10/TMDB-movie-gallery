import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length === 0) {
    return (
      <div className="favorites">
        <div className="favorites-empty">
          <div className="empty-icon">🎬</div>
          <h2>No Favorite Movies Yet</h2>
          <p>Start adding movies to your favorites and they will appear here!</p>
          <p>Click the heart icon on any movie card to add it to your favorites.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h2>Your Favorite Movies ({favorites.length})</h2>
      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;