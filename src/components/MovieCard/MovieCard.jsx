import React from 'react';
import PropTypes from 'prop-types';
import './MovieCard.scss';

export default function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
      <img src={movie.poster} alt={movie.title} className="movie-card__poster" />
      <h3 className="movie-card__title">{movie.title}</h3>
      <p className="movie-card__genre">{movie.genres.join(', ')}</p>
      <p className="movie-card__plot">{movie.plot}</p>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    plot: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    // Add other relevant prop types if necessary
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
