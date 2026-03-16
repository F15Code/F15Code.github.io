document.addEventListener('DOMContentLoaded', function() {
    
    // Знаходимо всі потрібні елементи на сторінці
    const form = document.getElementById('feedbackForm');
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const commentInput = document.getElementById('userComment');
    const commentsSection = document.getElementById('comments-section');
    const errorMessage = document.getElementById('error-message');
    const submitBtn = document.getElementById('submitBtn');

    // ==========================================
    // Ефект наведення через JS + if-else
    // ==========================================
    submitBtn.addEventListener('mouseenter', function() {
        // Перевіряємо, чи всі поля заповнені
        if (nameInput.value !== '' && emailInput.value !== '' && commentInput.value !== '') {
            this.style.backgroundColor = '#10b981'; // Зелений колір (можна надсилати)
            this.style.transform = 'scale(1.05)';   // Трохи збільшуємо
        } else {
            this.style.backgroundColor = '#f59e0b'; // Помаранчевий (є пусті поля)
        }
    });

    submitBtn.addEventListener('mouseleave', function() {
        // Коли мишка йде з кнопки - повертаємо стандартний вигляд
        this.style.backgroundColor = '';
        this.style.transform = 'scale(1)';
    });

    // ==========================================
    // ЗАВДАННЯ 3.2 та 3.3: Валідація та додавання
    // ==========================================
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Зупиняємо перезавантаження сторінки

        // Отримуємо текст і забираємо зайві пробіли по краях
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const commentValue = commentInput.value.trim();

        // Завдання 3.2: if-else для перевірки даних на пустоту
        if (nameValue === '' || emailValue === '' || commentValue === '') {
            
            errorMessage.style.display = 'block'; // Показуємо текст помилки
            
            // Підсвічуємо пусті поля червоним
            if (nameValue === '') nameInput.style.borderColor = 'red';
            if (emailValue === '') emailInput.style.borderColor = 'red';
            if (commentValue === '') commentInput.style.borderColor = 'red';
            
        } else {
            // Якщо все заповнено правильно:
            errorMessage.style.display = 'none';
            nameInput.style.borderColor = '#ccc';
            emailInput.style.borderColor = '#ccc';
            commentInput.style.borderColor = '#ccc';

            // Завдання 3.3: Створюємо HTML для нового відгуку
            const newCommentHTML = `
                <div class="comment-item">
                    <h4><i class="fas fa-user-circle"></i> ${nameValue}</h4>
                    <span>${emailValue}</span>
                    <p>"${commentValue}"</p>
                </div>
            `;

            // Додаємо новий коментар В ПОЧАТОК списку
            commentsSection.insertAdjacentHTML('afterbegin', newCommentHTML);

            // ОБМЕЖЕННЯ: Залишаємо тільки 5 останніх відгуків
            if (commentsSection.children.length > 5) {
                commentsSection.lastElementChild.remove(); // Видаляємо найстаріший
            }

            // Очищаємо форму
            form.reset();
            
            // Повертаємо кнопці колір після кліку
            submitBtn.style.backgroundColor = '';
        }
    });

    // Скидаємо червоні рамки, як тільки користувач починає щось вводити
    const inputs = [nameInput, emailInput, commentInput];
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('input', function() {
            this.style.borderColor = '#ccc'; // Повертаємо сіру рамку
            errorMessage.style.display = 'none'; // Ховаємо помилку
        });
    }
});