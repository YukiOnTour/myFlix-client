import React, { useState } from 'react';
import MovieCard from '../MovieCard/MovieCard'; // Correct import for MovieCard
import MovieView from '../MovieView/MovieView'; // Correct import for MovieView

export default function MainView() {
  // Movie data in state
  const [movies, setMovies] = useState([
    { _id: '1', title: 'Inception', description: 'A mind-bending thriller', genre: 'Sci-Fi', director: 'Christopher Nolan', poster: 'inception.jpg' },
    { _id: '2', title: 'The Dark Knight', description: 'A heroic story of Batman', genre: 'Action', director: 'Christopher Nolan', poster: 'dark_knight.jpg' },
    { _id: '3', title: 'Interstellar', description: 'Exploring space and time', genre: 'Sci-Fi', director: 'Christopher Nolan', poster: 'interstellar.jpg' }
  ]);

  // State to track selected movie
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Handle movie click
  const onMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  // Handle back click
  const onBackClick = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="main-view">
      {selectedMovie ? (
        // Show MovieView when a movie is selected
        <MovieView movie={selectedMovie} onBackClick={onBackClick} />
      ) : (
        // Show list of MovieCard components when no movie is selected
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} onClick={() => onMovieClick(movie)} />
          ))}
        </div>
      )}
    </div>
  );
}
