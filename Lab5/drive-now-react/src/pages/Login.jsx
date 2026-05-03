import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // УСПІХ: Зберігаємо дані про сесію в браузері
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userEmail', data.email);
        
        navigate('/');
        window.location.reload(); // Оновлюємо стан App.js, щоб з'явився профіль
      } else {
        // ПОМИЛКИ: Виводимо те, що повернув сервер
        setError(data.error || 'Неправильний логін або пароль');
      }
    } catch (err) {
      console.error("Помилка підключення до сервера:", err);
      setError('Сервер не відповідає. Спробуйте пізніше.');
    }
  };

  return (
    <main className="auth-container">
      <h2>Вхід</h2>

      {error && <div className="error-message">{error}</div>}

      <form className="auth-form" onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Пароль" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="btn">Увійти</button>
      </form>

      <div className="auth-footer">
        Немає акаунту? <Link to="/register">Зареєструватися</Link>
      </div>
    </main>
  );
}

export default Login;