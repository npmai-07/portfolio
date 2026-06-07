document.addEventListener('DOMContentLoaded', () => {
    // Force light pastel theme by removing any stored/active dark theme settings
    localStorage.removeItem('theme');
    document.documentElement.removeAttribute('data-theme');

    // Create and append the mascot to the nav bar
    const nav = document.querySelector('nav');
    if (nav) {
        const mascot = document.createElement('div');
        mascot.className = 'nav-mascot';
        mascot.innerHTML = '🤖'; // Cute robot mascot walking along the navbar
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
