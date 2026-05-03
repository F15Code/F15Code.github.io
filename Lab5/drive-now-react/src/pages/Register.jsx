import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css'; 

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Зберігаємо ID юзера в локальне сховище, щоб "пам'ятати" його
        localStorage.setItem('userId', data.id);
        navigate('/');
        window.location.reload(); // Щоб оновити стан App
      } else {
        setError(data.error || 'Помилка реєстрації');
      }
    } catch (err) {
      setError('Сервер не відповідає');
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-card">
        <h2>Реєстрація</h2>
        {error && <div className="error-message">{error}</div>}
        <form className="auth-form" onSubmit={handleRegister}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn">Створити акаунт</button>
        </form>
        <div className="auth-footer">
          Вже маєте акаунт? <Link to="/login">Увійти</Link>
        </div>
      </div>
    </main>
  );
}

export default Register;