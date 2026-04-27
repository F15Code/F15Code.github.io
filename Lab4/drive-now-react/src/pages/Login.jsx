import { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
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
    await signInWithEmailAndPassword(auth, email, password);
    navigate('/');
  } catch (err) {
    console.error("Код помилки від Firebase:", err.code);

    switch (err.code) {
      case 'auth/invalid-credential':
        setError('Неправильний Email або пароль. Можливо, акаунт ще не створено.');
        break;
      case 'auth/user-not-found':
        setError('Користувача з таким Email не існує. Зареєструйтеся!');
        break;
      case 'auth/wrong-password':
        setError('Неправильний пароль.');
        break;
      case 'auth/invalid-email':
        setError('Некоректний формат пошти (приклад: name@mail.com).');
        break;
      case 'auth/too-many-requests':
        setError('Забагато спроб. Спробуйте через пару хвилин.');
        break;
      default:
        setError('Помилка (' + err.code + '). Спробуйте ще раз.');
    }
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