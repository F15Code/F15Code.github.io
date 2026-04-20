import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';

//ГОЛОВНА СТОРІНКА 
function Home({cars}) { 

  const previewCars = cars.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h2>Орендуй емоції, а не просто авто</h2>
          <p>Преміальний автопарк для тих, хто цінує швидкість, комфорт та статус.</p>
          <a href="cars" className="btn hero-btn">Обрати автомобіль</a>
        </div>
      </section>

      <main>
        {/* Секція автопарку (Прев'ю) */}
        <section id="cars">
          <h2><i className="fas fa-car"></i> Наш автопарк</h2>
          
          <div className="cars-grid" id="cars-container">
            {/* Малюємо 3 картки */}
            {previewCars.map((car) => <CarCard key={car.id} car={car} />)}
          </div>
          
          {/* Кнопка переходу на сторінку всіх авто */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
             <Link to="/cars" className="btn" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
               Дивитись весь автопарк <i className="fas fa-arrow-right" style={{marginLeft: '10px'}}></i>
             </Link>
          </div>
        </section>

        {/* Умови прокату */}
        <section id="rental-terms">
          <h2><i className="fas fa-file-contract"></i> Умови прокату</h2>
          <div className="terms-grid">
            <div className="term-item">
              <i className="fas fa-id-card"></i>
              <h3>Документи</h3>
              <p>Паспорт (оригінал) та дійсне посвідчення водія категорії "В".</p>
            </div>
            <div className="term-item">
              <i className="fas fa-user-clock"></i>
              <h3>Вік та стаж</h3>
              <p>Вік від 21 року та стаж водіння не менше 2-х років.</p>
            </div>
            <div className="term-item">
              <i className="fas fa-wallet"></i>
              <h3>Застава</h3>
              <p>Наявність депозиту (застави), яка повертається після здачі авто.</p>
            </div>
            <div className="term-item">
              <i className="fas fa-gas-pump"></i>
              <h3>Паливо</h3>
              <p>Повернення автомобіля з таким самим рівнем палива, як при отриманні.</p>
            </div>
          </div>
        </section>

        {/* Послуги */}
        <section id="services">
          <h2>Додаткові послуги</h2>
          <div className="services-list">
            <div className="service-item">
              <div className="service-icon">
                <i className="fas fa-baby"></i>
              </div>
              <div className="service-content">
                <h3>Дитяче крісло</h3>
                <p>Подбайте про безпеку ваших дітей. Маємо крісла для будь-якого віку.</p>
                <span className="service-price">150 грн/доба</span>
              </div>
            </div>

            <div className="service-item">
              <div className="service-icon">
                <i className="fas fa-user-tie"></i>
              </div>
              <div className="service-content">
                <h3>Оренда з водієм</h3>
                <p>Бажаєте відпочити в дорозі? Наші професійні водії до ваших послуг.</p>
                <span className="service-price">від 500 грн/год</span>
              </div>
            </div>

            <div className="service-item">
              <div className="service-icon">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <div className="service-content">
                <h3>Доставка автомобіля</h3>
                <p>Ми привеземо обране авто в будь-яку точку міста або в аеропорт.</p>
                <span className="service-price">300 грн</span>
              </div>
            </div>
          </div>
        </section>

        {/* Про нас */}
        <section id="about">
          <h2><i className="fas fa-info-circle"></i> Про нашу компанію</h2>
          <div className="about-container">
            <div className="about-text">
              <p>Ми — лідери ринку оренди преміальних та економ-авто в Україні. Наша мета — ваш комфорт та безпека на дорозі.</p>
              <p><strong><i className="fas fa-phone"></i> Контакти:</strong> +380 99 123 45 67</p>
              <p><strong><i className="fas fa-map-marker-alt"></i> Адреса:</strong> м. Київ, вул. Центральна, 1</p>
            </div>

            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.664430209643!2d30.5212353768822!3d50.4473392873105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce50fd214681%3A0x73977759b1399778!2z0JzQsNC50LTQsNC9INCd0LXQt9Cw0LvQtdC20L3QvtGB0YLRlg!5e0!3m2!1suk!2sua!4v1710000000000!5m2!1suk!2sua"
                width="100%" height="250" style={{ border: 0, borderRadius: '12px' }} allowFullScreen=""
                loading="lazy"></iframe>
            </div>
          </div>
        </section>
      </main>
    </>
  ); 
}

export default Home;