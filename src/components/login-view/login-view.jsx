import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    let hasErrors = false;
    const newErrors = { username: '', password: '' };

    if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
      hasErrors = true;
    } else if (username.length > 20) {
      newErrors.username = 'Username must be at most 20 characters long';
      hasErrors = true;
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    const data = { username, password };

    try {
      const response = await fetch("https://movieapp-77c122f67522.herokuapp.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json(); // Parse error response as JSON
        setLoginError(errorData.error || 'Login failed');
        return;
      }

      const responseData = await response.json();
      if (responseData.token) {
        localStorage.setItem('token', responseData.token); // Store token in localStorage
        onLoggedIn({ username }); // Call the onLoggedIn callback with user info
      }
    } catch (e) {
      console.error("Login error:", e);
      setLoginError('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength="3"
          maxLength="20"
          required
        />
        {errors.username && <p className="error-message">{errors.username}</p>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="6"
          required
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>

      {loginError && <p className="error-message">{loginError}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};
