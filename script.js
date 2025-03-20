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
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dot');
        let currentSlide = 0;
        let slideInterval;

        // Function to show a specific slide
        const showSlide = (index) => {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Show the selected slide
            slides[index].classList.add('active');
            
            // Update active dot
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            
            currentSlide = index;
        };

        // Set up automatic sliding
        const startSlideshow = () => {
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }, 5000); // Change slide every 5 seconds
        };

        // Initialize the slideshow
        startSlideshow();

        // Set up click event for dots
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(parseInt(dot.dataset.index));
                startSlideshow();
            });
        });

        // Pause slideshow on hover
        carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
        carousel.addEventListener('mouseleave', startSlideshow);
    });
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', setupCarousels);
