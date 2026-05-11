import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
const API_URL = 'http://localhost:8000';
 
export default function LogIn() {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
 
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: pass
        }),
      });
 
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }
 
      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('auth', 'true');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to login');
    }
  };
 
  return (
    <form onSubmit={handleLogin} style={{ padding: '20px' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username" 
        value={username}
      />
      <br /><br />
      <input 
        type="password" 
        onChange={(e) => setPass(e.target.value)} 
        placeholder="Password" 
        value={pass}
      />
      <br /><br />
      <button type="submit">Login</button>
      <br /><br />
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
    </form>
  );
}