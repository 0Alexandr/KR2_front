// Валидация форм

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        initContactForm();
    }
});

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Валидация в реальном времени
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });
}

function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    let isValid = true;
    let errorMessage = '';
    
    // Очищаем предыдущие состояния
    field.classList.remove('is-invalid', 'is-valid');
    
    // Проверка обязательных полей
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'Это поле обязательно для заполнения';
    }
    
    // Проверка email
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Пожалуйста, введите корректный email';
        }
    }
    
    // Проверка минимальной длины для сообщения
    if (field.id === 'message' && field.value.trim().length < 10) {
        isValid = false;
        errorMessage = 'Сообщение должно содержать минимум 10 символов';
    }
    
    // Обновляем состояние поля
    if (isValid) {
        field.classList.add('is-valid');
    } else {
        field.classList.add('is-invalid');
        // Обновляем сообщение об ошибке
        const feedback = field.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = errorMessage;
        }
    }
    
    return isValid;
}

function submitForm() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Здесь обычно отправка данных на сервер
    // Для демонстрации просто показываем сообщение об успехе
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;
    
    // Имитация отправки
    setTimeout(() => {
        showAlert('Сообщение успешно отправлено!', 'success');
        form.reset();
        
        // Сбрасываем классы валидации
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.classList.remove('is-valid');
        });
        
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alertDiv, form);
    
    // Автоматическое скрытие через 5 секунд
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}