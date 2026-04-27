import '../styles/FAQ.css';
import { useState } from 'react';

// Використовуємо деструктуризацію { faqData }, щоб дістати масив з об'єкта props
function FAQ({ faqData }) {
  // Потрібно оголосити стан тут, оскільки ми його використовуємо
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <main className="faq-page-main">
      <h2><i className="fa-regular fa-circle-question"></i> Питання та відповіді</h2>
      <div className="faq-container">
        {/* Перевіряємо, чи є дані і чи це масив */}
        {Array.isArray(faqData) && faqData.map((item, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
            <button 
              className="faq-question"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <span>{item.question}</span>
              <i className={`fa-solid ${activeIndex === index ? 'fa-minus' : 'fa-plus'}`}></i>
            </button>
            
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default FAQ;