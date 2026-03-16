document.addEventListener('DOMContentLoaded', function() {
    
    //Створюємо масив об'єктів (наша база даних FAQ)
    const faqData = [
        {
            question: "Які документи потрібні для оренди?",
            answer: "Для оренди автомобіля вам знадобиться паспорт, дійсне водійське посвідчення (стаж від 2 років) та іменна банківська картка для блокування депозиту."
        },
        {
            question: "Чи можу я виїжджати за кордон?",
            answer: "Виїзд за кордон можливий лише за попереднім узгодженням і при оформленні розширеної страховки. Будь ласка, попередьте менеджера під час бронювання."
        },
        {
            question: "Що робити у випадку ДТП?",
            answer: "Негайно увімкніть аварійну сигналізацію, викличте поліцію (112) та зв'яжіться з нашим цілодобовим кол-центром. Ні в якому разі не залишайте місце пригоди."
        },
        {
            question: "Чи є обмеження пробігу?",
            answer: "Стандартний ліміт - 400 км на добу. Перевищення оплачується додатково згідно з тарифами обраного автомобіля (зазвичай від 10 до 50 доларів за 50 кілометр)."
        }
    ];

    const faqContainer = document.getElementById('faq-container');
    let generatedHTML = '';

    //Цикл for для динамічного відображення списку елементів
    for (let i = 0; i < faqData.length; i++) {
        // Додаємо згенерований HTML-код для кожного питання у змінну
        generatedHTML += `
            <div class="faq-item">
                <button class="faq-question">
                    ${faqData[i].question} <i class="fa-solid fa-plus"></i>
                </button>
                <div class="faq-answer">
                    <p>${faqData[i].answer}</p>
                </div>
            </div>
        `;
    }

    // Вставляємо готовий код у порожній контейнер на сторінці
    faqContainer.innerHTML = generatedHTML;


    //Вибираємо всі згенеровані кнопки
    const faqQuestions = document.querySelectorAll('.faq-question');

    //Цикл for для додавання обробників подій
    for (let j = 0; j < faqQuestions.length; j++) {
        
        faqQuestions[j].addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            const parentItem = this.closest('.faq-item');

            //Логіка if-else
            if (answer.style.display === 'block') {
                // Якщо вже відкрито - ховаємо
                answer.style.display = 'none';
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
                this.style.color = ''; 
                parentItem.classList.remove('active');
            } else {
                // Скиждаємо стилі і ховаємо всі інші відкриті відповіді
                document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
                document.querySelectorAll('.faq-question i').forEach(ic => {
                    ic.classList.remove('fa-minus');
                    ic.classList.add('fa-plus');
                });
                document.querySelectorAll('.faq-question').forEach(btn => btn.style.color = '');

                // Показуємо ту, на яку клікнули
                answer.style.display = 'block';
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
                this.style.color = 'var(--primary-color)'; 
                parentItem.classList.add('active');
            }
        });
    }
});