import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
const API_URL = 'http://localhost:8000';
 
export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
 
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
 
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
 
    if (password.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }
 
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });
 
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }
 
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to register');
    }
  };
 
  return (
    <form onSubmit={handleRegister} style={{ padding: '20px' }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Sign up successful! Redirecting to login...</p>}
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username" 
        value={username}
      />
      <br /><br />
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        value={password}
      />
      <br /><br />
      <input 
        type="password" 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        placeholder="Confirm Password" 
        value={confirmPassword}
      />
      <br /><br />
      <button type="submit">Sign Up</button>
      <br /><br />
      <p>Already have an account? <a href="/login">Login</a></p>
    </form>
  );
}