import '../styles/Feedback.css';
import { useState } from 'react';
import { db } from '../firebase/config'; // Імпорт бази
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Функції для запису

function Feedback({ reviews }) { 
  const [formData, setFormData] = useState({ name: '', email: '', comment: '', rating: 5 });
  const [error, setError] = useState(false);
  const [btnHoverColor, setBtnHoverColor] = useState('');

  // ФУНКЦІЯ ВІДПРАВКИ В FIREBASE
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.comment.trim()) {
      setError(true);
      return;
    }

    try {
      // Записуємо новий документ у колекцію "reviews"
      await addDoc(collection(db, "reviews"), {
        name: formData.name,
        email: formData.email,
        comment: formData.comment,
        rating: formData.rating,
        createdAt: serverTimestamp() // Додаємо час створення для сортування
      });

      // Очищуємо форму після успішної відправки
      setFormData({ name: '', email: '', comment: '', rating: 5 });
      setError(false);
      setBtnHoverColor('');
      alert("Дякуємо! Ваш відгук збережено в базі.");
      
      window.location.reload(); 
    } catch (err) {
      console.error("Помилка при збереженні відгуку:", err);
      alert("Не вдалося відправити відгук. Спробуйте пізніше.");
    }
  };

  const getButtonColor = () => {
    const isAllFilled = formData.name.trim() && formData.email.trim() && formData.comment.trim();
    const isAnyFilled = formData.name.trim() || formData.email.trim() || formData.comment.trim();

    if (isAllFilled) return '#10b981'; // Зелений
    if (isAnyFilled) return '#f59e0b'; // Помаранчевий
    return '#ef4444'; // Червоний
  };

  const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.toDate(); // Метод Firebase для перетворення в JS Date
  return date.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

  return (
    <main style={{ maxWidth: '800px', margin: '100px auto', padding: '0 20px' }}>
      <h2><i className="fas fa-comments"></i> Залишити відгук</h2>

      <div className="feedback-form-container">
        <form onSubmit={handleSubmit}>
          {/* ... Поля форми залишаються такими ж, як у вас ... */}
          <div className="form-group">
            <label>Ваше ім'я:</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => {
                setFormData({...formData, name: e.target.value});
                setError(false);
              }}
              style={{ borderColor: error && !formData.name.trim() ? 'red' : '' }}
              placeholder="Наприклад, Іван"
            />
          </div>

          <div className="form-group">
            <label>Електронна пошта:</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => {
                setFormData({...formData, email: e.target.value});
                setError(false);
              }}
              style={{ borderColor: error && !formData.email.trim() ? 'red' : '' }}
              placeholder="ivan@example.com"
            />
          </div>

          <div className="form-group">
            <label>Оцінка:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <i 
                  key={star}
                  className={`${formData.rating >= star ? 'fa-solid' : 'fa-regular'} fa-star`}
                  onClick={() => setFormData({...formData, rating: star})}
                ></i>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Ваш коментар (до 500 символів):</label>
            <textarea 
              rows="4" 
              maxLength="500"
              value={formData.comment}
              onChange={(e) => {
                setFormData({...formData, comment: e.target.value});
                setError(false);
              }}
              style={{ borderColor: error && !formData.comment.trim() ? 'red' : '' }}
              placeholder="Поділіться своїми враженнями..."
            ></textarea>
          </div>

          {error && (
            <div style={{ color: '#dc3545', marginBottom: '15px', fontWeight: '600' }}>
              Будь ласка, заповніть всі поля!
            </div>
          )}

          <button 
            type="submit" 
            className="btn" 
            style={{ 
              width: '100%',
              backgroundColor: btnHoverColor || '', 
              transition: 'all 0.3s ease',
              transform: btnHoverColor ? 'scale(1.02)' : 'scale(1)'
            }}
            onMouseEnter={() => setBtnHoverColor(getButtonColor())}
            onMouseLeave={() => setBtnHoverColor('')}
          >
            Надіслати відгук
          </button>
        </form>
      </div>

      <h3 style={{ marginTop: '50px' }}>Останні відгуки</h3>

      <div id="comments-section">
        {reviews && reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev.id} className="comment-item">
              <div className="comment-header">
                <h4><i className="fas fa-user-circle"></i> {rev.name}</h4>
                
                {/* Блок з датою та зірочками */}
                <div className="comment-meta">
                  <span className="comment-date">{formatDate(rev.createdAt)}</span>
                  <div className="stars-display">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`${i < rev.rating ? 'fa-solid' : 'fa-regular'} fa-star`}></i>
                    ))}
                  </div>
                </div>
              </div>
              <p>"{rev.comment}"</p>
            </div>
          ))
        ) : (
          <p>Відгуків поки немає. Будьте першим!</p>
        )}
      </div>
    </main>
  );
}

export default Feedback;