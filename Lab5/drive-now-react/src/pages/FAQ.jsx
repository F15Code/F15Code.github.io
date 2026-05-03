import '../styles/FAQ.css';
import { useState } from 'react';

function FAQ({ faqData }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!faqData) {
    return (
      <main className="faq-page-main">
        <p style={{ textAlign: 'center', padding: '50px' }}>Завантаження питань...</p>
      </main>
    );
  }

  return (
    <main className="faq-page-main">
      <h2><i className="fa-regular fa-circle-question"></i> Питання та відповіді</h2>
      <div className="faq-container">
        {/* Додаємо перевірку на пустий масив */}
        {Array.isArray(faqData) && faqData.length > 0 ? (
          faqData.map((item, index) => (
            <div key={item.id || index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
              <button 
                className="faq-question"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                {/* Використовуємо опціональний чейнінг для безпеки */}
                <span>{item?.question}</span>
                <i className={`fa-solid ${activeIndex === index ? 'fa-minus' : 'fa-plus'}`}></i>
              </button>
              
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{item?.answer}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>Питань поки немає.</p>
        )}
      </div>
    </main>
  );
}

export default FAQ;