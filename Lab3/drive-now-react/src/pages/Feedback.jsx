import { useState, useEffect } from 'react';

function Feedback() {
  const [reviews, setReviews] = useState([]);

  const [formData, setFormData] = useState({ name: '', email: '', comment: '', rating: 5 });
  const [error, setError] = useState(false);
  const [btnHoverColor, setBtnHoverColor] = useState('');

  useEffect(() => {

  
  fetch('/reviews.json') 
    .then((response) => {
      if (!response.ok) throw new Error("Помилка завантаження файлу");
      return response.json(); 
    })
    .then((data) => {
      setReviews(data);
    })
    .catch((error) => console.error("Ой! Щось пішло не так:", error));

}, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.comment.trim()) {
      setError(true);
      return;
    }

    const newReview = { id: Date.now(), ...formData };
    setReviews([newReview, ...reviews]);
    setFormData({ name: '', email: '', comment: '', rating: 5 });
    setError(false);
    setBtnHoverColor(''); // Скидаємо колір після відправки
  };

  const getButtonColor = () => {
    const isAllFilled = formData.name.trim() && formData.email.trim() && formData.comment.trim();
    const isAnyFilled = formData.name.trim() || formData.email.trim() || formData.comment.trim();

    if (isAllFilled) return '#10b981'; // Зелений
    if (isAnyFilled) return '#f59e0b'; // Помаранчевий
    return '#ef4444'; // Червоний
  };

  return (
    <main style={{ maxWidth: '800px', margin: '100px auto', padding: '0 20px' }}>
      <h2><i className="fas fa-comments"></i> Залишити відгук</h2>

      <div className="feedback-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ваше ім'я:</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => {
                setFormData({...formData, name: e.target.value});
                setError(false); // Прибираємо червону рамку/помилку при вводі
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

          <div id="error-message" style={{ display: error ? 'block' : 'none', color: '#dc3545', marginBottom: '15px', fontWeight: '600' }}>
            Будь ласка, заповніть всі поля!
          </div>

          {/* ОНОВЛЕНА КНОПКА З ЛОГІКОЮ КОЛЬОРУ */}
          <button 
            type="submit" 
            className="btn" 
            style={{ 
              width: '100%',
              backgroundColor: btnHoverColor || '', // Колір змінюється тільки при наведенні
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
        {reviews.map((rev) => (
          <div key={rev.id} className="comment-item">
            <div className="comment-header">
              <h4><i className="fas fa-user-circle"></i> {rev.name}</h4>
              <div className="stars-display">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`${i < rev.rating ? 'fa-solid' : 'fa-regular'} fa-star`}></i>
                ))}
              </div>
            </div>
            <span>{rev.email}</span>
            <p>"{rev.comment}"</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Feedback;