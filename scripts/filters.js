// Фильтрация проектов

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('projects-grid')) {
        initProjectFilters();
    }
});

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filters .btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
}

function filterProjects(category) {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 50);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Данные проектов для модальных окон
const projects = [
    {
        id: 1,
        title: "Личный сайт",
        category: "html",
        technologies: ["HTML", "CSS"],
        image: "../images/project1.jpg",
        description: "Персональный веб-сайт с адаптивным дизайном",
        liveUrl: "#",
        codeUrl: "#",
        features: ["Адаптивный дизайн", "Семантическая верстка", "CSS анимации"]
    },
    {
        id: 2,
        title: "Todo-приложение",
        category: "js",
        technologies: ["JavaScript", "LocalStorage"],
        image: "../images/project2.jpg",
        description: "Приложение для управления задачами",
        liveUrl: "#",
        codeUrl: "#",
        features: ["Добавление/удаление задач", "Фильтрация", "LocalStorage"]
    },
    {
        id: 3,
        title: "Интернет-магазин",
        category: "react",
        technologies: ["React", "Redux", "API"],
        image: "../images/project3.jpg",
        description: "Полнофункциональный интернет-магазин",
        liveUrl: "#",
        codeUrl: "#",
        features: ["Корзина покупок", "Поиск товаров", "Пагинация"]
    },
    {
        id: 4,
        title: "Портфолио",
        category: "html",
        technologies: ["Bootstrap", "JavaScript"],
        image: "../images/project4.jpg",
        description: "Веб-портфолио с галереей проектов",
        liveUrl: "#",
        codeUrl: "#",
        features: ["Bootstrap 5", "Фильтрация проектов", "Модальные окна"]
    }
];

// Обработчики для кнопок "Подробнее"
document.addEventListener('DOMContentLoaded', function() {
    const detailButtons = document.querySelectorAll('.view-details');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-id'));
            showProjectDetails(projectId);
        });
    });
});