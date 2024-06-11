import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  // const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { id, name });
      if (response.data.success) {
        history.push('/home');
      } else {
        setError('Invalid ID or incorrect name');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h1>Campus Management System</h1>
      <p className="quote">"Education is the passport to the future, for tomorrow belongs to those who prepare for it today." - Malcolm X</p>
      <div className="login-box">
        <h2>Login</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="ID Number"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
