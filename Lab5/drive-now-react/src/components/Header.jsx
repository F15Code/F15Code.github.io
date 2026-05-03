import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header({ user, onLogout }) {
  const navigate = useNavigate();
  
  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
      alert("Ви вийшли з системи");
      navigate('/'); // Повертаємо користувача на головну
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
          <li><Link to="/feedback">Відгуки</Link></li>
        
          {/* Відображається лише для авторизованих користувачів */}
          {user && (
            <>
              <li>
                <Link to="/favorites">
                Моє обране
                </Link>
              </li>
              <li>
                <Link to="/my-bookings">
                  Мої бронювання
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="auth-section">
        {user ? (
          <div className="user-info">
            <span className="user-email">{user.email}</span>
            <button onClick={handleLogoutClick} className="btn-logout">
              <i className="fas fa-sign-out-alt"></i> Вийти
            </button>
          </div>
        ) : (
          <div className="guest-nav">
            <Link to="/login" className="nav-auth">Увійти</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;