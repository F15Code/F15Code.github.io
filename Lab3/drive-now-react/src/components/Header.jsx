import {Link} from 'react-router-dom';

function Header(){
    return(
        <header>
        <h1><Link to="/">DriveNow</Link></h1>
            <nav>
            <ul>
                <li><Link to="/cars">Автомобілі</Link></li>
                {/* Якірні посилання для Головної сторінки */}
                <li><a href="/#rental-terms">Умови прокату</a></li>
                <li><a href="/#services">Послуги</a></li>
                <li><Link to="/bookings">Мої бронювання</Link></li>
                <li><a href="/#about">Про нас</a></li>
                <li><Link to="/login" className="nav-auth">Увійти</Link></li>
            </ul>
            </nav>
        </header>
    )
}

export default Header;