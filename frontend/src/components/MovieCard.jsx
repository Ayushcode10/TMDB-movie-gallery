import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      {/* Your existing card content */}
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
    </Link>
  );
}

export default MovieCard;
