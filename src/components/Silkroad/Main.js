import React, { useState } from 'react';
import styled from 'styled-components';

function Login({ className }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    console.log('Logging in with', username, password);
  }

  return (
    <div className={className}>
      <div className="login-wrapper">
        <div className="login-container">
          <img
            className="logo"
            src="https://www.russellwebster.com/wp-content/uploads/2015/06/silk_road-fi.jpg"
            alt="Logo"
          />
          <div className="form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default styled(Login)`
  height: 100vh;
  width: 100%;
  background: #f5f5f5;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 75vh;
    width: 100%;
    padding: 10px; /* space on very small screens */
    box-sizing: border-box;
    overflow-y: auto; /* allows scrolling on small screens */
  }

  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    padding: 30px 40px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    max-height: 90vh;
    overflow: auto; /* scroll inside container if needed */
    box-sizing: border-box;
  }

  .logo {
    width: 100%;
    max-width: 250px;
    height: auto;
    margin-bottom: 30px;
    object-fit: contain;
  }

  .form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  input {
    padding: 12px 15px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border-color: #4285f4;
  }

  button {
    padding: 12px 15px;
    background: #4285f4;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }

  button:hover {
    background: #3367d6;
  }

  /* Responsive adjustments */
  @media (max-width: 480px) {
    .login-container {
      padding: 20px;
    }

    .logo {
      max-width: 180px;
      margin-bottom: 20px;
    }

    input,
    button {
      font-size: 14px;
      padding: 10px 12px;
    }
  }
`;
