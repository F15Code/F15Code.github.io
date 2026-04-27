import { useState } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css'; 

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Помилка при реєстрації. Перевірте дані.');
    }
  };

  return (
    <main className="auth-container">
      <h2>Реєстрація</h2>
      
      {error && <div className="error-message">{error}</div>}

      <form className="auth-form" onSubmit={handleRegister}>
        <input 
          type="email" 
          placeholder="Ваш Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Придумайте пароль (мін. 6 симв.)" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="btn">Створити акаунт</button>
      </form>

      <div className="auth-footer">
        Вже маєте акаунт? <Link to="/login">Увійти</Link>
      </div>
    </main>
  );
}

export default Register;