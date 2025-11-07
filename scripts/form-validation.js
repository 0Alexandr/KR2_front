// === Валидация формы с поддержкой доступности ===
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let isValid = true;

        // Проверяем все поля формы
        const fields = form.querySelectorAll("input[required], textarea[required]");

        fields.forEach((field) => {
            const errorElement = document.getElementById(`${field.id}Error`);

            // Убираем предыдущие ошибки
            field.classList.remove("is-invalid");
            field.removeAttribute("aria-invalid");

            // Проверка на пустое значение
            if (!field.value.trim()) {
                field.classList.add("is-invalid");
                field.setAttribute("aria-invalid", "true");

                if (errorElement) {
                    errorElement.style.display = "block";
                }

                isValid = false;
                return;
            }

            // Проверка email
            if (field.type === "email" && !validateEmail(field.value)) {
                field.classList.add("is-invalid");
                field.setAttribute("aria-invalid", "true");

                if (errorElement) {
                    errorElement.textContent = "Пожалуйста, введите корректный email.";
                    errorElement.style.display = "block";
                }

                isValid = false;
                return;
            }

            // Если ошибок нет
            if (errorElement) {
                errorElement.style.display = "none";
            }
        });

        if (isValid) {
            showSuccessMessage(form);
            form.reset();
        }
    });
});

// === Проверка email по регулярному выражению ===
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// === Показ уведомления об успешной отправке ===
function showSuccessMessage(form) {
    const alert = document.createElement("div");
    alert.className = "alert alert-success mt-3";
    alert.setAttribute("role", "alert");
    alert.textContent = "Сообщение успешно отправлено! Спасибо за обращение.";

    // Удаляем старое сообщение, если было
    const oldAlert = form.querySelector(".alert-success");
    if (oldAlert) oldAlert.remove();

    form.appendChild(alert);

    // Убираем сообщение через 5 секунд
    setTimeout(() => alert.remove(), 5000);
}
