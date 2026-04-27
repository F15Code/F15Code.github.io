import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, auth } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import CarCard from '../components/CarCard';
import '../styles/Favorites.css';

function Favorites() {
  const [favCars, setFavCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchMyFavorites = async () => {
      if (!user) { setLoading(false); return; }
      try {
        const q = query(collection(db, "favorites"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const list = querySnapshot.docs.map(doc => ({
          id: doc.data().carId,
          title: doc.data().carTitle,
          img: doc.data().carImg,
          price: doc.data().carPrice,
          isAvailable: true,
          count: 1,
          trans: "Автомат"
        }));
        setFavCars(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyFavorites();
  }, [user]);

  if (loading) return <div className="loading-container">Завантаження...</div>;

  return (
    <main className="favorites-page">
      <div className="favorites-header">
        <h2><i className="fas fa-heart"></i> 
          Ваше обране
        </h2>
      </div>

      {user && favCars.length > 0 ? (
        <div className="favorites-grid">
          {favCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="empty-favorites">
          <p>{!user ? "Будь ласка, увійдіть в систему" : "Ви ще не додали жодного авто"}</p>
          <Link to="/cars" className="go-catalog-link">Перейти до автопарку</Link>
        </div>
      )}
    </main>
  );
}

export default Favorites;