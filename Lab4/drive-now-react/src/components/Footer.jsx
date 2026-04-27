import '../styles/Footer.css';

import {Link} from 'react-router-dom';

function Footer(){
    return(
              <footer>
        <div className="footer-container">
          <div className="footer-section">
            <h4 className="footer-logo">DriveNow</h4>
            <p>Ваш надійний партнер у світі мобільності. Орендуйте комфорт, а не просто автомобіль.</p>

            <div className="social-block">
              <h4 className="footer-social-title">Стежити за нами</h4>
              <div className="social-icons">
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
                <a href="#"><i className="fab fa-telegram"></i></a>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4>Клієнтам</h4>
            <ul className="footer-links">
              <li><Link to="/cars"><i className="fas fa-angle-right"></i> Весь автопарк</Link></li>
              <li><a href="/#services"><i className="fas fa-angle-right"></i> Пакетні послуги</a></li>
              <li><a href="/#rental-terms"><i className="fas fa-angle-right"></i> Правила оренди</a></li>
              <li><Link to="/faq"><i className="fas fa-angle-right"></i> Питання та відповіді</Link></li>
              <li><Link to="/feedback"><i className="fas fa-angle-right"></i> Залишити відгук</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Контакти</h4>
            <ul className="footer-contacts">
              <li>
                <i className="fas fa-phone-alt"></i>
                <div>
                  <span>Гаряча лінія (24/7):</span>
                  <a href="tel:0800123456">0 800 123 456</a>
                </div>
              </li>
              <li>
                <i className="fas fa-headset"></i>
                <div>
                  <span>Техпідтримка:</span>
                  <a href="tel:+380441234567">+38 (044) 123-45-67</a>
                </div>
              </li>
              <li>
                <i className="fas fa-handshake"></i>
                <div>
                  <span>Відділ партнерства:</span>
                  <a href="tel:+380671234567">+38 (067) 123-45-67</a>
                </div>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <a href="mailto:support@drivenow.ua">support@drivenow.ua</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>© 2026 DriveNow Rental. Всі права захищені.</p>
            <div className="legal-links">
              <a href="#">Політика конфіденційності</a>
              <a href="#">Публічна оферта</a>
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer;