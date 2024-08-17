import React from 'react';
import PropTypes from 'prop-types';
import './MovieView.scss';

export default function MovieView({ movie, onBackClick }) {
  return (
    <div className="movie-view">
      <img src={movie.poster} alt={movie.title} className="movie-view__poster" />
      <h1 className="movie-view__title">{movie.title}</h1>
      <p className="movie-view__plot"><strong>Description:</strong> {movie.fullplot}</p>
      <p className="movie-view__info"><strong>Genre:</strong> {movie.genres.join(', ')}</p>
      <p className="movie-view__info"><strong>Director:</strong> {movie.directors.join(', ')}</p>
      <p className="movie-view__info"><strong>Cast:</strong> {movie.cast.join(', ')}</p>
      <p className="movie-view__info"><strong>Runtime:</strong> {movie.runtime} minutes</p>
      <p className="movie-view__info"><strong>Released:</strong> {new Date(movie.released).toLocaleDateString()}</p>
      <p className="movie-view__info"><strong>Rated:</strong> {movie.rated}</p>
      <p className="movie-view__info"><strong>IMDb Rating:</strong> {movie.imdb.rating} ({movie.imdb.votes} votes)</p>
      <button onClick={onBackClick} className="movie-view__back-button">Back</button>
    </div>
  );
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    fullplot: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    directors: PropTypes.arrayOf(PropTypes.string),
    cast: PropTypes.arrayOf(PropTypes.string),
    runtime: PropTypes.number,
    released: PropTypes.string,
    rated: PropTypes.string,
    imdb: PropTypes.shape({
      rating: PropTypes.number,
      votes: PropTypes.number,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
