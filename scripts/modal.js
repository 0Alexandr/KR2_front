// Управление модальными окнами

function showProjectDetails(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    const modalTitle = document.getElementById('projectModalTitle');
    const modalBody = document.getElementById('projectModalBody');
    
    modalTitle.textContent = project.title;
    
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${project.image}" class="img-fluid rounded" alt="${project.title}">
            </div>
            <div class="col-md-6">
                <h6>Описание:</h6>
                <p>${project.description}</p>
                
                <h6>Технологии:</h6>
                <div class="mb-3">
                    ${project.technologies.map(tech => 
                        `<span class="badge bg-primary me-1">${tech}</span>`
                    ).join('')}
                </div>
                
                <h6>Особенности:</h6>
                <ul>
                    ${project.features.map(feature => 
                        `<li>${feature}</li>`
                    ).join('')}
                </ul>
                
                <div class="mt-4">
                    <a href="${project.liveUrl}" class="btn btn-primary me-2" target="_blank">
                        Посмотреть онлайн
                    </a>
                    <a href="${project.codeUrl}" class="btn btn-outline-secondary" target="_blank">
                        Исходный код
                    </a>
                </div>
            </div>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
}