import React, { useState } from "react";

export const SignupView = ({ onSignedUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");         // State for email
  const [birthday, setBirthday] = useState("");   // State for birthday
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
    birthday: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    let hasErrors = false;
    const newErrors = { username: '', password: '', email: '', birthday: '' };

    // Validate username
    if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
      hasErrors = true;
    } else if (username.length > 20) {
      newErrors.username = 'Username must be at most 20 characters long';
      hasErrors = true;
    }

    // Validate password
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      hasErrors = true;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      hasErrors = true;
    }

    // Validate birthday
    if (!birthday) {
      newErrors.birthday = 'Birthday is required';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    const data = { username, password, email, birthday };

    fetch("https://movieapp-77c122f67522.herokuapp.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Signup response: ", data);
        if (data.user && data.token) {
          localStorage.setItem('token', data.token); 
          onSignedUp(data.user); 
        } else {
          alert("Signup failed");
        }
      })
      .catch(e => {
        console.error("Signup error:", e);
        alert("Something went wrong");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="3"
            maxLength="20"
            pattern="[a-zA-Z0-9_]+"
            title="Username must be 3-20 characters long and can only contain letters, numbers, and underscores"
            required
          />
        </label>
        {errors.username && <p className="error-message">{errors.username}</p>}
      </div>

      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            title="Password must be at least 6 characters long"
            required
          />
        </label>
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>

      <div>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      <div>
        <label>
          Birthday:
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </label>
        {errors.birthday && <p className="error-message">{errors.birthday}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
