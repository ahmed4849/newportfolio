// Navigation & Mobile Menu
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.list-none li a');
const menuIcon = document.querySelector('#menu-toggle');

// Toggle Mobile Menu
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');

    // Toggle Icon (Simple swap logic if you have close icon, otherwise just assume toggle)
    if (mobileMenu.classList.contains('flex')) {
        menuIcon.src = "./assets/images/close.svg";
    } else {
        menuIcon.src = "./assets/images/menu.svg";
    }
});

function closeMenu() {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    menuIcon.src = "./assets/images/menu.svg";
}

// Scroll Effect for Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('bg-primary', 'bg-opacity-90', 'backdrop-blur-md');
        navbar.classList.remove('py-5', 'bg-transparent');
        navbar.classList.add('py-3');
    } else {
        navbar.classList.remove('bg-primary', 'bg-opacity-90', 'backdrop-blur-md', 'py-3');
        navbar.classList.add('py-5', 'bg-transparent');
    }
});

// Typing Animation
const typingText = document.getElementById('typing-text');
const roles = [".NET Developer", "Full Stack Developer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentRole = roles[roleIndex % roles.length];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex++;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', typeEffect);


// Intersection Observer for Fade-In Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

const fadeSections = document.querySelectorAll('.fade-in-section');
fadeSections.forEach(section => {
    observer.observe(section);
});


// Simple Tilt Effect
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -20; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});
