// Чекаємо, поки весь HTML завантажиться
document.addEventListener('DOMContentLoaded', function() {
    
    //Знаходимо всі потрібні нам елементи на сторінці (Завдання 1)
    const pickupDateInput = document.getElementById('pickup-date');
    const returnDateInput = document.getElementById('return-date');
    const totalPriceDisplay = document.getElementById('total-price');
    const bookingForm = document.querySelector('.booking-form');
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const successMessage = document.getElementById('success-message');
    
    // Ціна за добу (поки що фіксована для Порше)
    const pricePerDay = 350;
    const today = new Date().toISOString().split('T')[0];
    pickupDateInput.value = today;
    returnDateInput.value = today;
    totalPriceDisplay.textContent = `${pricePerDay}$`;

    //Функція для розрахунку ціни
    function calculatePrice() {
        const pickupDate = new Date(pickupDateInput.value);
        const returnDate = new Date(returnDateInput.value);

        if (pickupDateInput.value && returnDateInput.value) {
            
            //Умовна логіка (if-else) для валідації
            if (returnDate <= pickupDate) {
                totalPriceDisplay.textContent = "Помилка дати";
                totalPriceDisplay.style.color = "red";
                submitBtn.disabled = true; // Вимикаємо кнопку
                submitBtn.classList.add('Disabled');
            } else {
                // Рахуємо різницю в часі
                const timeDifference = returnDate.getTime() - pickupDate.getTime();
                // Переводимо мілісекунди в дні
                const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
                
                // Рахуємо і виводимо тотал
                const total = daysDifference * pricePerDay;
                totalPriceDisplay.textContent = `${total}$`;
                totalPriceDisplay.style.color = "var(--dark-bg)";
                
                // Вмикаємо кнопку назад
                submitBtn.disabled = false;
                submitBtn.classList.remove('Disabled');
            }
        }
    }

    //Додаємо ОБРОБНИКИ ПОДІЙ. 
    // Коли користувач міняє дату, викликаємо функцію розрахунку
    pickupDateInput.addEventListener('change', calculatePrice);
    returnDateInput.addEventListener('change', calculatePrice);

    //Обробка кліку на кнопку "Забронювати" 
    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Зупиняємо стандартне перезавантаження сторінки

        // Перевіряємо, чи є дати (if-else)
        if (!pickupDateInput.value || !returnDateInput.value) {
            alert("Будь ласка, оберіть дати оренди!");
            return; // Зупиняємо виконання коду
        }

        // Додаємо клас для анімації та зміни кольору
        submitBtn.classList.add('btn-booked');
        submitBtn.textContent = "Заброньовано!";

        // Динамічно показуємо повідомлення
        successMessage.style.display = "block";

        setTimeout(() => {
            submitBtn.classList.remove('btn-booked');
            submitBtn.textContent = "Забронювати зараз";
        }, 1000);
    });
});