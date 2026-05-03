import '../styles/CarDetails.css';

import { useState } from 'react';
import { useParams } from 'react-router-dom';


function CarDetails({cars}) {
  const { id } = useParams();
  const car = cars.find((c) => Number(c.id) === Number(id));
  const userId = localStorage.getItem('userId');

  // ...
  if (cars.length === 0) return <p>Завантаження...</p>;
  if (!car) return <h2 style={{ padding: '100px', textAlign: 'center' }}>Автомобіль не знайдено!</h2>;

  // Стейт для дат
  const today = new Date().toISOString().split('T')[0];
  const [pickupDate, setPickupDate] = useState(today);
  const [returnDate, setReturnDate] = useState(today);

  // Стейт для локації (об'єкт, щоб мати і назву, і ціну)
  const [location, setLocation] = useState({ name: 'Офіс (вул. Центральна, 1)', price: 0 });

  const [isBooked, setIsBooked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Масив доступних локацій
  const deliveryLocations = [
    { name: 'Офіс (вул. Центральна, 1)', price: 0 },
    { name: 'Аеропорт "Бориспіль"', price: 25 },
    { name: 'Аеропорт "Київ" (Жуляни)', price: 20 },
    { name: 'Залізничний вокзал', price: 15 },
    { name: 'Адресна доставка (Центр)', price: 10 },
    { name: 'Адресна доставка (Лівий берег)', price: 25 },
  ];

  if (!car) {
    return <h2 style={{ padding: '100px', textAlign: 'center' }}>Автомобіль не знайдено!</h2>;
  }

  // ЛОГІКА РОЗРАХУНКУ
  const pricePerDay = car.price;
  const d1 = new Date(pickupDate);
  const d2 = new Date(returnDate);
  
  let daysDiff = 0;
  let rentalTotal = 0;
  let finalPrice = 0;
  let isError = false;

  if (pickupDate && returnDate) {
    if (d2 <= d1) {
      isError = true;
    } else {
      const timeDiff = d2.getTime() - d1.getTime();
      daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      rentalTotal = daysDiff * pricePerDay;
      finalPrice = rentalTotal + location.price; // Додаємо ціну доставки
    }
  }


const handleSubmit = async (e) => {
  e.preventDefault();
  
  const storageUserId = localStorage.getItem('userId');

  if (!storageUserId) {
    alert("Будь ласка, увійдіть в акаунт, щоб забронювати авто!");
    return;
  }

  const bookingData = {
    carId: Number(car.id),
    userId: Number(storageUserId), 
    startDate: new Date(pickupDate).toISOString(),
    endDate: new Date(returnDate).toISOString(),
    totalPrice: Number(finalPrice),
    location: location.name
  };

  console.log("Надсилаю дані на сервер:", bookingData); // ПЕРЕВІРКА В КОНСОЛІ

  try {
    const response = await fetch('https://f15code-github-io.onrender.com/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });

    const result = await response.json();

    if (response.ok) {
      setIsBooked(true);
      setShowSuccess(true);
      setTimeout(() => {
        setIsBooked(false);
        setShowSuccess(false);
      }, 3000);
    } else {
      console.error("Сервер відхилив бронювання:", result.error);
      alert("Помилка сервера: " + result.error);
    }
  } catch (err) {
    console.error("Критична помилка мережі:", err);
  }
};
  return (
    <>
        <section 
          className="car-hero" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(15, 17, 21, 0.4), rgba(15, 17, 21, 0.9)), 
            url(${car.img.startsWith('http') ? car.img : `https://f15code-github-io.onrender.com${car.img}`})`,
          }}
        >
        <div className="car-hero-content">
          <span className="car-category">{car.category}</span>
          <h2>{car.title}</h2>
          <div className="quick-specs">
            <span><i className="fa-solid fa-cog"></i> {car.trans}</span>
            <span><i className="fa-solid fa-check-circle"></i> {car.count} в наявності</span>
            <span><i className="fa-solid fa-tag"></i> {car.price}$ / доба</span>
          </div>
        </div>
      </section>

      <main className="details-layout">
        <div className="car-info-section">
          <h3>Про автомобіль</h3>
          <p>Орендуйте {car.title} за вигідною ціною. Це авто категорії "{car.category}", яке ідеально підійде для ваших цілей. Ми гарантуємо технічну справність та повний бак при отриманні.</p>

          <h3>Комплектація</h3>
          <ul className="features-list">
            <li><i className="fa-solid fa-check"></i> Повне страхування (KASKO)</li>
            <li><i className="fa-solid fa-check"></i> Чистий салон після хімчистки</li>
            <li><i className="fa-solid fa-check"></i> Підтримка 24/7</li>
            <li><i className="fa-solid fa-check"></i> Apple CarPlay / Android Auto</li>
          </ul>
        </div>

        <aside className="booking-sidebar">
          <div className="booking-card">
            <div className="price-header">
              <span className="price-amount">{car.price}$</span>
              <span className="price-period">/ доба</span>
            </div>

            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-group">
                <label><i className="fa-regular fa-calendar"></i> Дата отримання:</label>
                <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label><i className="fa-regular fa-calendar-check"></i> Дата повернення:</label>
                <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required />
              </div>

              <div className="form-group">
                <label><i className="fa-solid fa-location-dot"></i> Місце подачі:</label>
                <select 
                  className="location-select"
                  value={location.name} 
                  onChange={(e) => {
                    const selected = deliveryLocations.find(l => l.name === e.target.value);
                    setLocation(selected);
                  }}
                >
                  {deliveryLocations.map((loc, index) => (
                    <option key={index} value={loc.name}>
                      {loc.name} {loc.price > 0 ? `(+$${loc.price})` : '(Безкоштовно)'}
                    </option>
                  ))}
                </select>
              </div>

              {/* ДЕТАЛІЗАЦІЯ ЦІНИ */}
              {!isError && daysDiff > 0 && (
                <div className="price-breakdown">
                  <div className="breakdown-item">
                    <span>Оренда ({daysDiff} дн.)</span>
                    <span>${rentalTotal}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Доставка</span>
                    <span>${location.price}</span>
                  </div>
                </div>
              )}

              <div className="price-total">
                <span>Разом:</span>
                <span className={isError ? "price-error" : ""}>
                  {isError ? "Помилка дати" : `${finalPrice}$`}
                </span>
              </div>

              <button 
                type="submit" 
                className={`btn btn-full ${isBooked ? 'btn-booked' : ''} ${isError ? 'disabled' : ''}`}
                disabled={isError || !car.isAvailable}
              >
                {car.isAvailable ? (isBooked ? "Заброньовано!" : "Забронювати зараз") : "Немає в наявності"}
              </button>
            </form>

            {showSuccess && (
              <div className="success-notification">
                <i className="fa-solid fa-circle-check"></i> 
                <div>
                  <strong>Успіх!</strong>
                  <p>Ваша заявка прийнята.</p>
                </div>
              </div>
            )}
          </div>
        </aside>
      </main>
    </>
  );
}

export default CarDetails;