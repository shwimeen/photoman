document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. МОБИЛЬНОЕ МЕНЮ (БУРГЕР) ---
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие события
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
        });
    }

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
        });
    });

    // --- 2. ИСПРАВЛЕНИЕ ПРОБЛЕМЫ С AOS ---
    // Принудительно обновляем AOS после загрузки страницы
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh(); // Обновляем позиции элементов
            console.log('AOS обновлен');
        }, 100);
    }

    // --- 3. ФИЛЬТРАЦИЯ ПОРТФОЛИО ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gridItems = document.querySelectorAll('.grid-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            gridItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // Обновляем AOS после фильтрации
            if (typeof AOS !== 'undefined') {
                setTimeout(() => AOS.refresh(), 100);
            }
        });
    });

    // --- 4. ЛАЙТБОКС ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img && lightboxImg) {
                lightboxImg.src = img.src;
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- 5. ЭФФЕКТЫ ШАПКИ ПРИ СКРОЛЛЕ ---
    const nav = document.querySelector('.navbar');
    
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // --- 6. ДОПОЛНИТЕЛЬНО: Принудительно показываем бургер если нужно ---
    function checkBurgerVisibility() {
        if (window.innerWidth <= 768) {
            if (burger) burger.style.display = 'flex';
        } else {
            if (burger) burger.style.display = 'none';
        }
    }
    
    checkBurgerVisibility();
    window.addEventListener('resize', checkBurgerVisibility);

});