import '../styles/Feedback.css';
import { useState } from 'react';

function Feedback({ reviews, onReviewAdded }) { 
  const [formData, setFormData] = useState({ name: '', email: '', comment: '', rating: 5 });
  const [error, setError] = useState(false);
  const [btnHoverColor, setBtnHoverColor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.comment.trim()) {
      setError(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({ name: '', email: '', comment: '', rating: 5 });
        setError(false);
        alert("Дякуємо! Ваш відгук збережено.");
        
        // Викликаємо функцію оновлення списку (передамо її з App.js)
        if (onReviewAdded) onReviewAdded(); 
      }
    } catch (err) {
      console.error("Помилка:", err);
      alert("Не вдалося відправити відгук.");
    }
  };

  const getButtonColor = () => {
    const isAllFilled = formData.name.trim() && formData.email.trim() && formData.comment.trim();
    const isAnyFilled = formData.name.trim() || formData.email.trim() || formData.comment.trim();
    if (isAllFilled) return '#10b981'; 
    if (isAnyFilled) return '#f59e0b'; 
    return '#ef4444'; 
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
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
            <label>Ваш коментар:</label>
            <textarea 
              rows="4" 
              maxLength="500"
              value={formData.comment}
              onChange={(e) => {
                setFormData({...formData, comment: e.target.value});
                setError(false);
              }}
              style={{ borderColor: error && !formData.comment.trim() ? 'red' : '' }}
              placeholder="Поділіться враженнями..."
            ></textarea>
          </div>

          {error && <div style={{ color: '#dc3545', marginBottom: '15px' }}>Заповніть всі поля!</div>}

          <button 
            type="submit" 
            className="btn" 
            style={{ 
              width: '100%',
              backgroundColor: btnHoverColor || '', 
              color: '#fff'
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
                <h4>{rev.name}</h4>
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
          <p>Відгуків поки немає.</p>
        )}
      </div>
    </main>
  );
}

export default Feedback;