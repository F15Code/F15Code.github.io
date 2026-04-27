import '../styles/CarCard.css';
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from '../firebase/config';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

function CarCard({ car }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const user = auth.currentUser;

  // 1. Перевірка статусу обраного при завантаженні
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user && car.id) {
        const favRef = doc(db, "favorites", `${user.uid}_${car.id}`);
        const docSnap = await getDoc(favRef);
        if (docSnap.exists()) {
          setIsFavorite(true);
        }
      }
    };
    checkFavoriteStatus();
  }, [user, car.id]);

  // 2. Універсальна перевірка авторизації (без алерту)
  const requireAuth = (e) => {
    if (!user) {
      e.preventDefault(); // Зупиняємо дію
      navigate('/login'); // Тихий редірект на вхід
      return false;
    }
    return true;
  };

  // 3. Логіка для кнопки серця
  const toggleFavorite = async (e) => {
    e.preventDefault();
    if (!requireAuth(e)) return;

    const favRef = doc(db, "favorites", `${user.uid}_${car.id}`);

    try {
      if (isFavorite) {
        await deleteDoc(favRef);
        setIsFavorite(false);
      } else {
        await setDoc(favRef, {
          userId: user.uid,
          carId: car.id,
          carTitle: car.title,
          carImg: car.img,
          carPrice: car.price
        });
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Firebase Error:", err);
    }
  };

  return (
    <div className="car-card">
      <div className="car-img-container">
        <img src={car.img} alt={car.title} className="car-img" />
        
        {/* Використовуємо твій клас .fav-heart */}
        <button 
          className={`fav-heart ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="car-info">
        <h3>{car.title}</h3>
        
        <p className="price">
          <strong>{car.price}$</strong> / доба
        </p>

        {/* Використовуємо твій клас .car-stats */}
        <div className="car-stats">
          <span><i className="fas fa-cog"></i> <strong>Трансмісія:</strong> {car.trans}</span>
          <span><i className="fas fa-check-circle"></i> <strong>Доступно:</strong> {car.count} од.</span>
        </div>
        
        {/* Використовуємо твій клас .btn-booking */}
        <Link 
          to={`/car/${car.id}`} 
          className={`btn-booking ${!car.isAvailable ? 'disabled' : ''}`}
          onClick={requireAuth}
        >
          {car.isAvailable ? 'Забронювати' : 'Зараз у прокаті'}
        </Link>
      </div>
    </div>
  );
}

export default CarCard;