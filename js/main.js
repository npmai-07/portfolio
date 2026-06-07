document.addEventListener('DOMContentLoaded', () => {
    // Force light pastel theme by removing any stored/active dark theme settings
    localStorage.removeItem('theme');
    document.documentElement.removeAttribute('data-theme');

    // Create and append the mascot to the nav bar
    const nav = document.querySelector('nav');
    if (nav) {
        const mascot = document.createElement('div');
        mascot.className = 'nav-mascot';
        mascot.innerHTML = `
            <svg class="sparrow-svg" viewBox="0 0 64 64" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Tail feathers -->
                <path d="M12 36 C8 38, 4 36, 6 32 C8 28, 12 32, 12 36 Z" fill="#FF8A84" />
                <path d="M10 40 C6 41, 3 39, 5 36 C7 33, 10 36, 10 40 Z" fill="#FFB2AE" />
                <!-- Feet -->
                <path d="M30 46 L30 52 M28 52 L32 52" stroke="#FF8A84" stroke-width="3" stroke-linecap="round" />
                <path d="M38 46 L38 52 M36 52 L40 52" stroke="#FF8A84" stroke-width="3" stroke-linecap="round" />
                <!-- Main Body -->
                <circle cx="36" cy="32" r="18" fill="#FF8A84" />
                <circle cx="44" cy="26" r="10" fill="#FFB2AE" />
                <!-- Beak -->
                <path d="M52 24 L58 27 L52 30 Z" fill="#FFB84D" />
                <!-- Eye -->
                <circle cx="46" cy="24" r="2" fill="#2B1515" />
                <!-- Wing -->
                <path d="M26 34 C24 38, 28 42, 34 40 C40 38, 38 30, 26 34 Z" fill="#FFD4CF" />
            </svg>
        `;
        mascot.setAttribute('aria-hidden', 'true');
        nav.appendChild(mascot);
    }

    // Scroll reveal animation
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on initial load
    
    // Active navigation link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });

    // Banner Carousel
    const carousel = document.getElementById('bannerCarousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dotsContainer = document.getElementById('carouselDots');
        const prevBtn = carousel.querySelector('.carousel-btn-prev');
        const nextBtn = carousel.querySelector('.carousel-btn-next');
        let currentSlide = 0;
        let autoPlayTimer;
        const autoPlayDelay = 4000;

        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            resetAutoPlay();
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayTimer);
            autoPlayTimer = setInterval(nextSlide, autoPlayDelay);
        }

        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        // Pause on hover
        carousel.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
        carousel.addEventListener('mouseleave', () => {
            autoPlayTimer = setInterval(nextSlide, autoPlayDelay);
        });

        // Start auto-play
        autoPlayTimer = setInterval(nextSlide, autoPlayDelay);
    }
});
