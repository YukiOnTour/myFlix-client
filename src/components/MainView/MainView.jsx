// MainView.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';
import MovieView from '../MovieView/MovieView';
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export default function MainView() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [username, setUsername] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${process.env.REACT_APP_API_URL}/movies`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          console.log('API response:', response.data);
          const fetchedMovies = Array.isArray(response.data) ? response.data : response.data.movies;
          setMovies(fetchedMovies);
        })
        .catch(error => console.error('Error fetching movies:', error));
    }
  }, [username]);

  const onMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const onBackClick = () => {
    setSelectedMovie(null);
  };

  const handleLogin = (user) => {
    setUsername(user.username);
  };

  const handleSignup = (user) => {
    setUsername(user.username);
    setIsSignup(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername("");
  };

  const handleSignupClick = () => {
    setIsSignup(true);
  };

  if (!username) {
    if (isSignup) {
      return <SignupView onSignedUp={handleSignup} />;
    }
    return (
      <div>
        <LoginView onLoggedIn={handleLogin} />
        <button onClick={handleSignupClick}>Sign Up</button>
      </div>
    );
  }

  return (
    <div className="main-view">
      <button onClick={handleLogout}>Logout</button>

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
