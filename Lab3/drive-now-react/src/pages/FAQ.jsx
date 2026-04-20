import { useState, useEffect } from 'react';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqData, setFaqData] = useState([]); 

  // Завантажуємо дані при завантаженні компонента
  useEffect(() => {
    fetch('/faq.json')
      .then(res => res.json())
      .then(data => setFaqData(data))
      .catch(err => console.error("Помилка завантаження FAQ:", err));
  }, []);

  return (
    <main className="faq-page-main">
      <h2><i className="fa-regular fa-circle-question"></i> Питання та відповіді</h2>
      <div className="faq-container">
        {faqData.map((item, index) => (
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