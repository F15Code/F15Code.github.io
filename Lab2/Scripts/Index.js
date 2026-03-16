const carsContainer = document.getElementById('cars-container');
//Наша міні-база даних (Масив об'єктів)
const carsData = [
    { id: 'tesla', title: 'Tesla Model 3', price: 150, trans: 'Автомат', count: 3, img: 'images/TeslaModel3.avif', isAvailable: true },
    { id: 'golf', title: 'VW Golf R', price: 200, trans: 'Механіка', count: 2, img: 'images/VW Golf R.avif', isAvailable: true },
    { id: 'camry', title: 'Toyota Camry', price: 120, trans: 'Автомат', count: 5, img: 'images/Toyota Camry.avif', isAvailable: true },
    { id: 'porsche', title: 'Porsche 911 GT3 RS', price: 1500, trans: 'Автомат', count: 1, img: 'images/porsche-911-gt3-rs.jpg', isAvailable: true },
    { id: 'ram', title: 'Ram 1500', price: 500, trans: 'Автомат', count: 4, img: 'images/FordRam.jfif', isAvailable: true },
    // А ось ця машина зайнята:
    { id: 'porscheturbo', title: 'Porsche 911 turbo S', price: 200000, trans: 'Електро', count: 0, img: 'images/mat.jpg', isAvailable: false },
    { id: 'tuktuk', title: 'Тук-тук', price: 'Безкоштовно', trans: 'Можливо є', count: 2, img: 'images/tuktuk.jfif', isAvailable: true }
];

let carsHTML = ''; 
let i = 0; // Лічильник для циклу

// 2. Використовуємо цикл while
while (i < carsData.length) {
    const car = carsData[i];
    
    //Умовна логіка if-else
    // Визначаємо, як виглядатиме кнопка і картка залежно від доступності
    let btnClass = '';
    let btnText = '';
    let opacityStyle = '';

    if (car.isAvailable === true) {
        // Якщо авто доступне
        btnClass = 'btn';
        btnText = 'Забронювати';
        opacityStyle = ''; // Звичайний вигляд
    } else {
        // Якщо авто НЕ доступне
        btnClass = 'btn disabled';
        btnText = 'Зараз у прокаті';
        opacityStyle = 'opacity: 0.5; filter: grayscale(50%);';
    }

    // Формуємо HTML для кожної картки, підставляючи дані з масиву
    let priceText = typeof car.price === 'number' ? `${car.price} дол/доба` : car.price;

    carsHTML += `
        <article class="car-card" style="${opacityStyle}">
            <img src="${car.img}" alt="${car.title}" class="car-img">
            <div class="car-info">
                <h3>${car.title}</h3>
                <p><i class="fas fa-tag"></i> <strong>Ціна:</strong> ${priceText}</p>
                <p><i class="fas fa-cog"></i> <strong>Трансмісія:</strong> ${car.trans}</p>
                <p><i class="fas fa-check-circle"></i> <strong>Доступно:</strong> ${car.count} од.</p>
                <p class="details-link"><a href="details.html">Більше характеристик <i class="fas fa-arrow-right"></i></a></p>
                <a href="details.html" class="${btnClass}">${btnText}</a>
            </div>
        </article>
    `;
    i++; // Збільшуємо лічильник, щоб цикл не став нескінченним
}

//Вставляємо весь згенерований код на сторінку
carsContainer.innerHTML = carsHTML;