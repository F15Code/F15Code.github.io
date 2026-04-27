import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. Імпортуємо базу даних та потрібні інструменти
import { db, auth } from './firebase/config'; 
import { collection, getDocs, query, orderBy  } from 'firebase/firestore'; 
import { onAuthStateChanged } from 'firebase/auth';

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

function App() {
  const [cars, setCars] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [faq, setFaq] = useState([]);
  const [reviews, setReviews] = useState([]);

useEffect(() => {
  const fetchAllData = async () => {
    try {
      setLoading(true);

      // 1. Завантаження машин
      const carsSnap = await getDocs(collection(db, "cars"));
      setCars(carsSnap.docs.map(doc => ({ ...doc.data(), fireId: doc.id })));

      // 2. Завантаження FAQ
      const faqSnap = await getDocs(collection(db, "faq"));
      setFaq(faqSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));

      // 3. Завантаження Відгуків ІЗ СОРТУВАННЯМ (найновіші зверху)
      const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
      const reviewsSnap = await getDocs(q); // Використовуємо наш запит q
      setReviews(reviewsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));

    } catch (error) {
      console.error("Помилка завантаження даних:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAllData();

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);
  return (
    <BrowserRouter>
      <Header user={user} />

      {/* Якщо дані ще вантажаться, показуємо просте повідомлення */}
      {loading ? (
        <div style={{ marginTop: '150px', textAlign: 'center', fontSize: '1.5rem' }}>
          Завантаження даних...
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home cars={cars} />} />
          <Route path="/cars" element={<Cars cars={cars} />} />
          <Route path="/faq" element={<FAQ faqData={faq} />} />
          <Route path="/feedback" element={<Feedback reviews={reviews}/>} />
          <Route path="/car/:id" element={<CarDetails cars={cars} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      )}

      <Footer />
    </BrowserRouter>
  );
}

export default App;