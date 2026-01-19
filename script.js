
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = menuBtn.querySelector('svg path');
            if (mobileMenu.classList.contains('hidden')) {
                // Menu Icon
                icon.setAttribute('d', 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5');
            } else {
                // X Icon
                icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            }
        });
    }

    // --- Mobile Dropdown Toggle ---
    const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
    mobileDropdownBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const target = document.getElementById(targetId);
            if (target) {
                target.classList.toggle('hidden');
                btn.querySelector('svg').classList.toggle('rotate-180');
            }
        });
    });

    // --- Hero Slider (Homepage) ---
    const heroSlides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let currentHeroSlide = 0;

    if (heroSlides.length > 0) {
        const showHeroSlide = (index) => {
            heroSlides.forEach(s => s.classList.add('opacity-0'));
            heroSlides.forEach(s => s.classList.remove('opacity-100'));
            dots.forEach(d => {
                d.classList.remove('bg-masa-orange', 'w-10');
                d.classList.add('bg-white/50');
            });

            heroSlides[index].classList.remove('opacity-0');
            heroSlides[index].classList.add('opacity-100');
            dots[index].classList.remove('bg-white/50');
            dots[index].classList.add('bg-masa-orange', 'w-10');
            currentHeroSlide = index;
        };

        // Auto Advance
        setInterval(() => {
            const next = (currentHeroSlide + 1) % heroSlides.length;
            showHeroSlide(next);
        }, 7000);

        // Click handlers for dots
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => showHeroSlide(idx));
        });
    }

    // --- Testimonial Slider ---
    const testSlides = document.querySelectorAll('.testimonial-slide');
    const testDots = document.querySelectorAll('.test-dot');
    let currentTestSlide = 0;

    if (testSlides.length > 0) {
        const showTestSlide = (index) => {
            testSlides.forEach(s => s.classList.add('opacity-0', 'pointer-events-none'));
            testSlides.forEach(s => s.classList.remove('opacity-100', 'pointer-events-auto'));
            testDots.forEach(d => {
                d.classList.remove('bg-masa-orange', 'scale-125');
                d.classList.add('bg-gray-300');
            });

            testSlides[index].classList.remove('opacity-0', 'pointer-events-none');
            testSlides[index].classList.add('opacity-100', 'pointer-events-auto');
            testDots[index].classList.remove('bg-gray-300');
            testDots[index].classList.add('bg-masa-orange', 'scale-125');
            currentTestSlide = index;
        };

        document.getElementById('prev-test')?.addEventListener('click', () => {
            let next = currentTestSlide - 1;
            if (next < 0) next = testSlides.length - 1;
            showTestSlide(next);
        });

        document.getElementById('next-test')?.addEventListener('click', () => {
            let next = (currentTestSlide + 1) % testSlides.length;
            showTestSlide(next);
        });

        // Auto Advance Testimonials
        setInterval(() => {
            let next = (currentTestSlide + 1) % testSlides.length;
            showTestSlide(next);
        }, 7000);
        
        // Init first slide
        showTestSlide(0);
    }

    // --- Modal Logic ---
    window.openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    });
});
