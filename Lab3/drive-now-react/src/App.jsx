import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import FAQ from './pages/FAQ'; // Переконайся, що назва файлу співпадає
import Feedback from './pages/Feedback';
import Header from './components/Header';
import Footer from './components/Footer';

function Bookings() { 
  return (
    <main style={{ marginTop: '100px', minHeight: '50vh', padding: '0 20px' }}>
      <h2>Сторінка бронювань</h2>
    </main>
  ); 
}

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('/cars.json')
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error("Помилка:", err));
  }, []);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home cars={cars} />} />
        <Route path="/cars" element={<Cars cars={cars} />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/car/:id" element={<CarDetails cars={cars} />} />
      </Routes> 

      <Footer />
    </BrowserRouter>
  );
}

export default App;