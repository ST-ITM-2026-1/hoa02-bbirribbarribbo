// Theme Switcher
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('themeBtn');
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    btn.textContent = isLight ? '🖤' : '🤍';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
        document.getElementById('themeBtn').textContent = '🖤';
    }
});
// Heart Button
function toggleHeart() {
    const btn = document.querySelector('.heart-button');
    btn.classList.toggle('liked');
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

// GitHub API
async function loadGitHub() {
    const username = 'bbirribbarribbo';

    try {
        // Profile
        const profileRes = await fetch(`https://api.github.com/users/bbirribbarribbo`);
        const profile = await profileRes.json();

        document.getElementById('githubProfile').innerHTML = `
            <img src="${profile.avatar_url}" alt="GitHub Avatar" class="github-avatar">
            <div class="github-info">
                <h2>${profile.name || username}</h2>
                <p>${profile.bio || ''}</p>
                <div class="github-stats">
                    <span>📁 ${profile.public_repos} repos</span>
                    <span>👥 ${profile.followers} followers</span>
                    <span>👤 ${profile.following} following</span>
                </div>
                <a href="${profile.html_url}" target="_blank" class="github-link">View on GitHub</a>
            </div>
        `;

        // Repos
        const reposRes = await fetch(`https://api.github.com/users/bbirribbarribbo/repos?sort=updated`);
        const repos = await reposRes.json();

        document.getElementById('repoGrid').innerHTML = repos.map(repo => `
            <div class="repo-card">
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || 'No description'}</p>
                <div class="repo-stats">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                    ${repo.language ? `<span>💻 ${repo.language}</span>` : ''}
                </div>
            </div>
        `).join('');

    } catch (err) {
        document.getElementById('githubProfile').innerHTML = '<p>Failed to load profile.</p>';
        document.getElementById('repoGrid').innerHTML = '<p>Failed to load repositories.</p>';
    }
}

// GitHub Page Load
if (document.getElementById('githubProfile')) {
    loadGitHub();
}