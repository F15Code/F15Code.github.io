import { Link } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth'; 
import '../styles/Header.css';

function Header({ user }) {
  
  // Функція для виходу
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Ви вийшли з системи");
    } catch (err) {
      console.error("Помилка при виході:", err);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">DriveNow</Link>
      </div>
      
      <nav>
        <ul>
          <li><Link to="/">Головна</Link></li>
          <li><Link to="/cars">Автопарк</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
        
          {user && (
            <li><Link to="/favorites">Моє обране</Link></li>
          )}
        </ul>
      </nav>

      <div className="auth-section">
        {user ? (
          // Якщо користувач УВІЙШОВ
          <div className="user-info">
            <span className="user-email">{user.email}</span>
            <button onClick={handleLogout} className="btn-logout">Вийти</button>
          </div>
        ) : (
          // Якщо користувач ГІСТЬ
          <Link to="/login" className="nav-auth">Увійти</Link>
        )}
      </div>
    </header>
  );
}

export default Header;