import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';
import MovieView from '../MovieView/MovieView';

export default function MainView() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/movies`)
      .then(response => {
        console.log('API response:', response.data); // Log response data
        const fetchedMovies = Array.isArray(response.data) ? response.data : response.data.movies;
        setMovies(fetchedMovies);
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const onMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const onBackClick = () => {
    setSelectedMovie(null);
  };

  console.log('Movies state:', movies); // Log movies state to debug

  return (
    <div className="main-view">
      {selectedMovie ? (
        <MovieView movie={selectedMovie} onBackClick={onBackClick} />
      ) : (
        <div className="movie-list">
          {Array.isArray(movies) && movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} onClick={() => onMovieClick(movie)} />
            ))
          ) : (
            <p>No movies available.</p>
          )}
        </div>
      )}
    </div>
  );
}
