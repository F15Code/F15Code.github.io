import '../styles/Cars.css';

import { useState } from 'react';
import CarCard from '../components/CarCard';

function Cars({ cars }) {
  const [filter, setFilter] = useState('Усі');
  const categories = ['Усі', 'Спорт', 'Седан', 'Електро', 'Позашляховик'];

  // Prisma повертає дані, тому переконуємось, що cars — це масив
  const filteredCars = Array.isArray(cars) && filter === 'Усі' 
    ? cars 
    : cars.filter(car => car.category === filter);

  return (
    <main style={{ padding: '40px 20px', minHeight: '80vh' }}>
      <section id="cars">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Наш автопарк</h2>
        
        <div className="filter-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`btn ${filter === cat ? '' : 'btn-outline'}`}
              style={{ 
                padding: '10px 25px', 
                backgroundColor: filter === cat ? '#e63946' : '#fff',
                color: filter === cat ? '#fff' : '#1a1a11',
                border: '1px solid #e63946',
                cursor: 'pointer',
                borderRadius: '5px'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="cars-grid">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => <CarCard key={car.id} car={car} />)
          ) : (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Завантаження або авто не знайдено...</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Cars;