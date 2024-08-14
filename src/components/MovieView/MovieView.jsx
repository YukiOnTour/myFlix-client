import React from 'react';
import './MovieView.scss';

export default function MovieView({ movie, onBackClick }) {
  return (
    <div className="movie-view">
      <img src={movie.poster} alt={movie.title} />
      <h1>{movie.title}</h1>
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
}
