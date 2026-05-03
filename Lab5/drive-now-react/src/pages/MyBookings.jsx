import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MyBookings.css'; 

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Завантажуємо дані, тільки якщо користувач авторизований
    if (userId) {
      fetch(`https://f15code-github-io.onrender.com/api/my-bookings?userId=${userId}`)
        .then(res => {
          if (!res.ok) throw new Error("Помилка мережі");
          return res.json();
        })
        .then(data => {
          setBookings(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Помилка:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return <div className="loading-msg">Завантаження поїздок...</div>;
  }

  const today = new Date();

  return (
    <main className="bookings-page">
      <div className="bookings-header">
        <h2><i className="fa-solid fa-car-side"></i> Мої бронювання</h2>
      </div>

      {userId && bookings.length > 0 ? (
        <div className="bookings-container">
          {bookings.map((book) => {
            const isPast = new Date(book.endDate) < today;
            const carImg = book.car.img.startsWith('http') 
              ? book.car.img 
              : `http://localhost:5000${book.car.img}`;

            return (
              <div key={book.id} className={`booking-card-item ${isPast ? 'past' : 'active'}`}>
                <div className="booking-card-img">
                  <img src={carImg} alt={book.car.title} />
                  {isPast ? (
                    <span className="status-badge past">Завершено</span>
                  ) : (
                    <span className="status-badge active">Актуально</span>
                  )}
                </div>

                <div className="booking-card-info">
                  <div className="info-top">
                    <h3>{book.car.title}</h3>
                    <span className="booking-id">ID: #{book.id}</span>
                  </div>
                  
                  <div className="info-main">
                    <p><i className="fa-solid fa-location-dot"></i> {book.location}</p>
                    <p><i className="fa-solid fa-calendar-days"></i> {formatDate(book.startDate)} — {formatDate(book.endDate)}</p>
                  </div>

                  <div className="info-bottom">
                    <div className="total-pay">
                      <span>До сплати:</span>
                      <strong>{book.totalPrice}$</strong>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-bookings">
          <p>{!userId ? "Будь ласка, увійдіть в систему" : "Ви ще не забронювали жодного авто"}</p>
          <Link to="/cars" className="go-catalog-link">Перейти до автопарку</Link>
        </div>
      )}
    </main>
  );
}

export default MyBookings;