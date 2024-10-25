import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../state/store';

function LoginPage() {
  const navigate = useNavigate();
  const login = store((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/'); // Redirect to the homepage or dashboard after login
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          autoComplete='true'
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          autoComplete='true'
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
