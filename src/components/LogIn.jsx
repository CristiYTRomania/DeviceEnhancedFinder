import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
export default function LogIn() {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
 
  const handleLogin = (e) => {
    e.preventDefault();
    if(username === 'Cristi56')
    {
        if (pass === '1234')
        {
            localStorage.setItem('auth', 'true');
            navigate('/');
        }
        else
        {
            alert('Wrong password');
        }
    }
    else
    {
        alert("Username doesn't exist");
    }
  };
 
  return (
    <form onSubmit={handleLogin} style={{ padding: '20px' }}>
      <h2>Login</h2>
      <input type="username" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <br /><br />
      <input type="password" onChange={(e) => setPass(e.target.value)} placeholder="Password" />
      <br /><br />
      <button type="submit">Login</button>
    </form>
  );
}