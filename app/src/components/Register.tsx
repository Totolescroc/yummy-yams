import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/users/register', {
        username,
        password
      });
      if (response.status === 201) {
        setMessage('Registration successful!');
        setUsername('');
        setPassword('');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log('Axios error response:', error.response);
        if (error.response) {
          console.log('Status:', error.response.status);
          console.log('Data:', error.response.data);
          if (error.response.status === 409) {
            setMessage('User already exists');
          } else {
            setMessage('Registration failed. Please try again.');
          }
        } else {
          setMessage('Registration failed. Please try again.');
        }
      } else {
        console.error('Unexpected error:', error);
        setMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
