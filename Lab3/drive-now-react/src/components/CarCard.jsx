import { Link } from "react-router-dom";

// КОМПОНЕНТ КАРТКИ АВТО
function CarCard({ car }) {
  const btnClass = car.isAvailable ? "btn" : "btn disabled";

  return (
    <div className="car-card">
      <img src={car.img} alt={car.title} className="car-img" />
      <div className="car-info">
        <h3>{car.title}</h3>
        <p className="price"><strong>Ціна:</strong> {car.price}$ / доба</p>
        
        {/* ВИПРАВЛЕНО ТУТ: className замість class */}
        <p><i className="fas fa-cog"></i> <strong>Трансмісія:</strong> {car.trans}</p>
        <p><i className="fas fa-check-circle"></i> <strong>Доступно:</strong> {car.count} од.</p>
        
        <Link to={`/car/${car.id}`} className={btnClass}>
          {car.isAvailable ? 'Забронювати' : 'Зараз у прокаті'}
        </Link>
      </div>
    </div>
  );
}

export default CarCard;