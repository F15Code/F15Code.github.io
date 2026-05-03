import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import FAQ from './pages/FAQ'; 
import Feedback from './pages/Feedback';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import MyBookings from './pages/MyBookings';

function App() {
  const [cars, setCars] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [faq, setFaq] = useState([]);
  const [reviews, setReviews] = useState([]);

  const fetchAllData = async () => {
    try {
      // Використовуємо Promise.all для швидкого паралельного завантаження
      const [carsRes, faqRes, reviewsRes] = await Promise.all([
        fetch('http://localhost:5000/api/cars'),
        fetch('http://localhost:5000/api/faq'),
        fetch('http://localhost:5000/api/reviews')
      ]);

      const carsData = await carsRes.json();
      const faqData = await faqRes.json();
      const reviewsData = await reviewsRes.json();

      setCars(carsData);
      setFaq(faqData);
      setReviews(reviewsData);
    } catch (error) {
      console.error("Помилка завантаження даних з сервера:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();

    const savedUserId = localStorage.getItem('userId');
    const savedUserEmail = localStorage.getItem('userEmail');
    
    if (savedUserId) {
      setUser({ id: savedUserId, email: savedUserEmail });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <BrowserRouter>
      {/* Передаємо об'єкт користувача та функцію виходу в Header */}
      <Header user={user} onLogout={handleLogout} />

      {loading ? (
        <div style={{ marginTop: '150px', textAlign: 'center', fontSize: '1.5rem' }}>
          <i className="fas fa-spinner fa-spin"></i> Завантаження даних з бази Neon...
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home cars={cars} />} />
          <Route path="/cars" element={<Cars cars={cars} />} />
          <Route path="/faq" element={<FAQ faqData={faq} />} />
          <Route path="/feedback" element={<Feedback reviews={reviews} onReviewAdded={fetchAllData} />} />
          <Route path="/car/:id" element={<CarDetails cars={cars} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      )}

      <Footer />
    </BrowserRouter>
  );
}

export default App;