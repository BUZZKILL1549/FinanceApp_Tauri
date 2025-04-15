import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

type Props = {
  onLogin: () => void;
};

function Login({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "Aushadh" && password === "password") {
      console.log('login');
      onLogin();
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="loginForm">
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
