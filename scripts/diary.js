// Функционал для страницы дневника

document.addEventListener('DOMContentLoaded', function() {
    initDiaryFunctionality();
});

function initDiaryFunctionality() {
    const addEntryBtn = document.getElementById('addEntryBtn');
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const addTaskForm = document.getElementById('addTaskForm');
    
    if (addEntryBtn && saveTaskBtn) {
        // Устанавливаем сегодняшнюю дату по умолчанию
        setDefaultDate();
        
        // Обработчик сохранения задачи
        saveTaskBtn.addEventListener('click', function() {
            saveNewTask();
        });
        
        // Обработчик отправки формы по Enter
        addTaskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveNewTask();
        });
    }
}

function setDefaultDate() {
    const dateInput = document.getElementById('taskDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }
}

function saveNewTask() {
    const taskDate = document.getElementById('taskDate').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskStatus = document.getElementById('taskStatus').value;
    
    if (!taskDate || !taskDescription) {
        showAlert('Пожалуйста, заполните все поля', 'danger');
        return;
    }
    
    // Форматируем дату
    const formattedDate = formatTaskDate(taskDate);
    
    // Создаем новую задачу
    const newTask = {
        date: formattedDate,
        description: taskDescription,
        status: taskStatus
    };
    
    // Добавляем задачу в список
    addTaskToList(newTask);
    
    // Закрываем модальное окно
    const modal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
    modal.hide();
    
    // Очищаем форму
    document.getElementById('addTaskForm').reset();
    setDefaultDate();
    
    // Показываем уведомление
    showAlert('Задача успешно добавлена!', 'success');
}

function formatTaskDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = getMonthName(date.getMonth());
    return `${day} ${month}`;
}

function getMonthName(monthIndex) {
    const months = [
        'янв', 'фев', 'мар', 'апр', 'май', 'июн',
        'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
    ];
    return months[monthIndex];
}

function addTaskToList(task) {
    const tasksList = document.getElementById('tasksList');
    if (!tasksList) return;
    
    const statusBadge = getStatusBadge(task.status);
    const statusClass = getStatusClass(task.status);
    
    const taskElement = document.createElement('div');
    taskElement.className = 'list-group-item';
    taskElement.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <span>${task.date} - ${task.description}</span>
            <span class="badge ${statusClass}">${statusBadge}</span>
        </div>
    `;
    
    // Добавляем новую задачу в начало списка
    tasksList.insertBefore(taskElement, tasksList.firstChild);
}

function getStatusBadge(status) {
    switch(status) {
        case 'completed':
            return 'Завершено';
        case 'in-progress':
            return 'В процессе';
        case 'planned':
            return 'Запланировано';
        default:
            return 'В процессе';
    }
}

function getStatusClass(status) {
    switch(status) {
        case 'completed':
            return 'bg-success';
        case 'in-progress':
            return 'bg-warning';
        case 'planned':
            return 'bg-secondary';
        default:
            return 'bg-warning';
    }
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.diary-section .container');
    container.insertBefore(alertDiv, container.firstChild);
    
    // Автоматическое скрытие через 5 секунд
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Функция для удаления задач (дополнительный функционал)
function setupTaskDeletion() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-task')) {
            const taskItem = e.target.closest('.list-group-item');
            if (taskItem && confirm('Вы уверены, что хотите удалить эту задачу?')) {
                taskItem.remove();
                showAlert('Задача удалена', 'info');
            }
        }
    });
}

// Инициализация удаления задач при загрузке
document.addEventListener('DOMContentLoaded', function() {
    setupTaskDeletion();
});