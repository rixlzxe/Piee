

(function() {
    'use strict';

    
    const toggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    function getStoredTheme() {
        try { return localStorage.getItem('perfect-slice-theme'); } catch (e) { return null; }
    }

    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
        }
    }

    function storeTheme(theme) {
        try { localStorage.setItem('perfect-slice-theme', theme); } catch (e) {}
    }

    function toggleTheme() {
        const current = html.hasAttribute('data-theme') ? 'dark' : 'light';
        const newTheme = current === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        storeTheme(newTheme);
    }

   
    const savedTheme = getStoredTheme() || getSystemTheme();
    applyTheme(savedTheme);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleTheme);
    }


    document.querySelectorAll('.nav a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

   
    const observerOptions = { threshold: 0.1 };

    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

   
    const menuCards = document.querySelectorAll('.sweet-items > div, .savory-items > div, .special-items > div, .drinks-items > div');
    menuCards.forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease ' + (index * 0.08) + 's, transform 0.5s ease ' + (index * 0.08) + 's';
        revealObserver.observe(card);
    });

   
    document.querySelectorAll('#about h1, #about p').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

})();