// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    const icon = mobileMenuBtn.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            navMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on Scroll
const fadeElems = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeElems.forEach(elem => {
    elem.style.opacity = 0;
    elem.style.transform = 'translateY(20px)';
    elem.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(elem);
});

// Facebook Pixel Event Tracking
document.querySelectorAll('a[href^="https://app.tecnofit.com.br"]').forEach(link => {
    link.addEventListener('click', function() {
        fbq('track', 'InitiateCheckout');
    });
});

// Carousel functionality
function setupCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    const isMobile = window.innerWidth <= 768; // Detect mobile device
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dot');
        let currentSlide = 0;
        let slideInterval;
        
        // Swipe variables for mobile
        let startX = 0;
        let endX = 0;
        let isDragging = false;
        const threshold = 50;
        
        // Add navigation arrows to the carousel
        const nav = document.createElement('div');
        nav.className = 'carousel-nav';
        
        const prevArrow = document.createElement('div');
        prevArrow.className = 'carousel-arrow prev';
        prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        const nextArrow = document.createElement('div');
        nextArrow.className = 'carousel-arrow next';
        nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        nav.appendChild(prevArrow);
        nav.appendChild(nextArrow);
        carousel.appendChild(nav);

        // Function to show a specific slide
        const showSlide = (index, direction = '') => {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active', 'swipe-left', 'swipe-right');
            });
            
            // Show the selected slide with animation if direction is specified
            slides[index].classList.add('active');
            if (direction === 'left') {
                slides[index].classList.add('swipe-left');
            } else if (direction === 'right') {
                slides[index].classList.add('swipe-right');
            }
            
            // Update active dot
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            
            currentSlide = index;
        };
        
        // Navigate to previous slide
        const prevSlide = () => {
            clearInterval(slideInterval);
            const newIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(newIndex, 'right'); // Animation from right
            startSlideshow();
        };
        
        // Navigate to next slide
        const nextSlide = () => {
            clearInterval(slideInterval);
            const newIndex = (currentSlide + 1) % slides.length;
            showSlide(newIndex, 'left'); // Animation from left
            startSlideshow();
        };

        // Set up automatic sliding
        const startSlideshow = () => {
            slideInterval = setInterval(() => {
                nextSlide();
            }, 5000); // Change slide every 5 seconds
        };

        // Initialize the slideshow
        startSlideshow();

        // Set up click events for arrows
        prevArrow.addEventListener('click', prevSlide);
        nextArrow.addEventListener('click', nextSlide);

        // Set up click event for dots
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(parseInt(dot.dataset.index));
                startSlideshow();
            });
        });

        // Only add touch events for mobile devices
        if (isMobile) {
            function handleTouchStart(e) {
                isDragging = true;
                startX = e.touches[0].clientX;
                clearInterval(slideInterval);
            }
            
            function handleTouchMove(e) {
                if (!isDragging) return;
                e.preventDefault();
            }
            
            function handleTouchEnd(e) {
                if (!isDragging) return;
                
                endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                
                // Check if the swipe was significant enough
                if (Math.abs(diff) > threshold) {
                    // Right to left swipe (next slide)
                    if (diff > 0) {
                        nextSlide();
                    } 
                    // Left to right swipe (previous slide)
                    else {
                        prevSlide();
                    }
                }
                
                isDragging = false;
                startSlideshow();
            }
            
            // Add touch event listeners for mobile
            carousel.addEventListener('touchstart', handleTouchStart, {passive: false});
            carousel.addEventListener('touchmove', handleTouchMove, {passive: false});
            carousel.addEventListener('touchend', handleTouchEnd);
        }
        
        // Pause slideshow on hover (desktop only)
        carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
        carousel.addEventListener('mouseleave', startSlideshow);
    });
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', setupCarousels);
