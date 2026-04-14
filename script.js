// Theme Switcher
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('themeBtn');
    body.classList.toggle('light');
    btn.textContent = body.classList.contains('light') ? '🖤' : '🤍';
}

// Project Filtering
function filterProjects(category) {
    const sections = document.querySelectorAll('.projects-list section');
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    sections.forEach(section => {
        if (category === 'all' || section.dataset.category === category) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Heart Button
function toggleHeart() {
    const btn = document.querySelector('.heart-button');
    btn.classList.toggle('liked');
}