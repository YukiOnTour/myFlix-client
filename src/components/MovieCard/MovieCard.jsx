import React from 'react';
import './MovieCard.scss';

export default function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
      <h3>{movie.title}</h3>
    </div>
  );
}
