import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieCredits } from "../Services/api"; // We'll create these API functions
import "../css/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const movieData = await getMovieDetails(id);
        const creditsData = await getMovieCredits(id);
        setMovie(movieData);
        setCredits(creditsData);
      } catch (err) {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  if (!movie) return null;

  const { title, overview, genres, vote_average, poster_path, release_date } = movie;
  const cast = credits?.cast?.slice(0, 5) || [];

  return (
    <div className="movie-details">
      <div className="poster-section">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="movie-poster"
        />
      </div>

      <div className="details-section">
        <h1>{title} ({release_date?.slice(0,4)})</h1>
        <p><strong>Rating:</strong> {vote_average} / 10</p>
        <p><strong>Genres:</strong> {genres.map((g) => g.name).join(", ")}</p>
        <p><strong>Overview:</strong> {overview}</p>

        <h3>Top Cast</h3>
        <ul className="cast-list">
          {cast.map((actor) => (
            <li key={actor.cast_id}>
              <p>{actor.name} as {actor.character}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MovieDetails;
