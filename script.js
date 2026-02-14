// Navigation & Mobile Menu
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.list-none li a');
const menuIcon = document.querySelector('#menu-toggle');

// Toggle Mobile Menu
if (menuToggle && mobileMenu) {
    menuToggle.onclick = () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        if (isOpen) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            menuToggle.src = './assets/images/Design/menu.svg';
        } else {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            menuToggle.src = './assets/images/Design/close.svg';
        }
    };
}

function closeMenu() {
    if (mobileMenu && menuToggle) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        menuToggle.src = './assets/images/Design/menu.svg';
    }
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

// Typing Animation for the name
const typingText = document.getElementById('typing-text');
const roles = "Senior Software Engineer";
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentRole = roles;

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

// 3D Earth Animation
function initEarth() {
    const container = document.getElementById('earth-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Cyber-Hologram Earth (Points System)
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
    const earthMaterial = new THREE.PointsMaterial({
        color: 0x00cea8,
        size: 0.02,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });
    const earthPoints = new THREE.Points(earthGeometry, earthMaterial);
    scene.add(earthPoints);

    // Inner Glow / Core
    const coreGeometry = new THREE.SphereGeometry(1.95, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
        color: 0x002d25,
        transparent: true,
        opacity: 0.4,
        side: THREE.BackSide
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // Atmospheric Glow
    const atmosGeometry = new THREE.SphereGeometry(2.1, 32, 32);
    const atmosMaterial = new THREE.MeshBasicMaterial({
        color: 0x00cea8,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosGeometry, atmosMaterial);
    scene.add(atmosphere);

    // Soft Orbiting Particles
    const particlesCount = 300;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.03,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Mouse Interaction Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        targetX = (e.clientX - rect.left - rect.width / 2) / rect.width;
        targetY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Smooth translation of camera/rotation based on mouse
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        // Base rotation
        earthPoints.rotation.y += 0.002;
        earthPoints.rotation.x = mouseY * 0.2;
        earthPoints.rotation.z = mouseX * 0.1;

        atmosphere.rotation.y = earthPoints.rotation.y;

        particles.rotation.y -= 0.001;
        particles.rotation.x += 0.0005;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

// Command Deck Tab Switching Logic
function switchDeckTab(category) {
    // Update Tabs
    const tabs = document.querySelectorAll('.deck-tab');
    tabs.forEach(tab => {
        if (tab.getAttribute('onclick').includes(`'${category}'`)) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Update Panels
    const panels = document.querySelectorAll('.deck-panel');
    panels.forEach(panel => {
        if (panel.id === `deck-panel-${category}`) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initEarth();

    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Change button state
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate sending (you could replace this with a real fetch call)
            setTimeout(() => {
                // Show success message
                formSuccess.classList.remove('hidden');

                // Reset button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;

                // Reset form
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                }, 5000);
            }, 1000);
        });
    }
});
