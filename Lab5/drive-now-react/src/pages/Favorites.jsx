import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';
import '../styles/Favorites.css';

function Favorites() {
  const [favCars, setFavCars] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchMyFavorites = async () => {

      if (!userId) { 
        setLoading(false); 
        return; 
      }

      try {
        const response = await fetch(`https://f15code-github-io.onrender.com/api/favorites?userId=${userId}`);
        
        if (!response.ok) throw new Error("Помилка завантаження обраного");

        const list = await response.json();
        
        const formattedList = list.map(item => ({
          ...item.car, 
          id: item.carId 
        }));

        setFavCars(formattedList);
      } catch (err) {
        console.error("Помилка API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyFavorites();
  }, [userId]);

  if (loading) return <div className="loading-container">Завантаження...</div>;

  return (
    <main className="favorites-page">
      <div className="favorites-header">
        <h2><i className="fas fa-heart"></i> Ваше обране</h2>
      </div>

      {userId && favCars.length > 0 ? (
        <div className="favorites-grid">
          {favCars.map(car => (
            // Тепер передаємо чистий об'єкт машини
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="empty-favorites">
          <p>{!userId ? "Будь ласка, увійдіть в систему" : "Ви ще не додали жодного авто"}</p>
          <Link to="/cars" className="go-catalog-link">Перейти до автопарку</Link>
        </div>
      )}
    </main>
  );
}

export default Favorites;