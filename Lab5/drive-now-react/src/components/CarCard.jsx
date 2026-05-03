import '../styles/CarCard.css';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function CarCard({ car }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Отримуємо ID юзера з localStorage
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (userId && car.id) {
        try {
          const res = await fetch(`https://f15code-github-io.onrender.com/api/favorites?userId=${userId}&carId=${car.id}`);
          const data = await res.json();
          // Якщо сервер повернув запис, значить авто в обраному
          if (data && (Array.isArray(data) ? data.length > 0 : data.id)) {
            setIsFavorite(true);
          }
        } catch (err) {
          console.error("Помилка перевірки обраного:", err);
        }
      }
    };
    checkFavoriteStatus();
  }, [userId, car.id]);

  const requireAuth = (e) => {
    if (!userId) {
      e.preventDefault();
      navigate('/login');
      return false;
    }
    return true;
  };

  const toggleFavorite = async (e) => {
    e.preventDefault();
    if (!requireAuth(e)) return;

    try {
      if (isFavorite) {
        // Видалення
        await fetch(`https://f15code-github-io.onrender.com/api/favorites/${userId}/${car.id}`, { 
          method: 'DELETE' 
        });
        setIsFavorite(false);
      } else {
        // Додавання
        await fetch(`https://f15code-github-io.onrender.com/api/favorites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, carId: car.id })
        });
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  return (
    <div className="car-card">
      <div className="car-img-container">
        <img 
          src={car.img.startsWith('http') ? car.img : `https://f15code-github-io.onrender.com${car.img}`} 
          alt={car.title} 
          className="car-img" 
        />
        <button className={`fav-heart ${isFavorite ? 'active' : ''}`} onClick={toggleFavorite}>
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="car-info">
        <h3>{car.title}</h3>
        <p className="price"><strong>{car.price}$</strong> / доба</p>
        <div className="car-stats">
          <span><i className="fas fa-cog"></i> {car.trans}</span>
          <span><i className="fas fa-check-circle"></i> {car.count} од.</span>
        </div>
        <Link 
          to={`/car/${car.id}`} 
          className={`btn-booking ${car.count === 0 ? 'disabled' : ''}`} 
          onClick={requireAuth}
        >
          {car.count > 0 ? 'Забронювати' : 'Немає в наявності'}
        </Link>
      </div>
    </div>
  );
}

export default CarCard;