// ================================
// MineTech Solutions - Interactive Features
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // Initialize AOS Animations
    // ================================
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // ================================
    // Initialize Lightbox
    // ================================
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'showImageNumberLabel': false
    });
    
    // ================================
    // Mobile Navigation Toggle
    // ================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks) navLinks.classList.remove('active');
            const icon = menuToggle ? menuToggle.querySelector('i') : null;
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // ================================
    // Navbar Scroll Effect
    // ================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            if (navbar) navbar.classList.add('scrolled');
        } else {
            if (navbar) navbar.classList.remove('scrolled');
        }
    });
    
    // ================================
    // Smooth Scroll for Anchor Links
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ================================
    // Stats Counter Animation
    // ================================
    const counters = document.querySelectorAll('.counter');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;
        
        const statsSectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (statsSectionTop < windowHeight - 100) {
            statsAnimated = true;
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats();
    
    // ================================
    // Interactive Mining Map (Leaflet)
    // ================================
    const mapContainer = document.getElementById('minemap');
    
    if (mapContainer) {
        // Initialize map centered on Africa
        const map = L.map('minemap', {
            center: [-15, 20],
            zoom: 3,
            scrollWheelZoom: false
        });
        
        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        
        // Mining project locations
        const miningProjects = [
            {
                name: 'Kariba Gold Project',
                lat: -16.5,
                lng: 28.8,
                country: 'Zimbabwe',
                mineral: 'Gold'
            },
            {
                name: 'Copper Ridge Operation',
                lat: -13.5,
                lng: 28.3,
                country: 'Zambia',
                mineral: 'Copper'
            },
            {
                name: 'Lithium Valley Project',
                lat: -22.6,
                lng: 17.1,
                country: 'Namibia',
                mineral: 'Lithium'
            },
            {
                name: 'Kalahari Diamond Mine',
                lat: -24.7,
                lng: 25.4,
                country: 'Botswana',
                mineral: 'Diamond'
            },
            {
                name: 'Great Dyke Platinum',
                lat: -17.8,
                lng: 30.5,
                country: 'Zimbabwe',
                mineral: 'Platinum'
            },
            {
                name: 'Coal Fields Operation',
                lat: -26.0,
                lng: 29.0,
                country: 'South Africa',
                mineral: 'Coal'
            }
        ];
        
        // Custom icon for markers
        const miningIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background:#f5b041;width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 2px 10px rgba(0,0,0,0.3);"></div>',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        
        // Add markers for each project
        miningProjects.forEach(project => {
            const marker = L.marker([project.lat, project.lng], { icon: miningIcon }).addTo(map);
            
            const popupContent = `
                <div style="min-width:150px;">
                    <h4 style="margin:0 0 8px;color:#1e3a5f;">${project.name}</h4>
                    <p style="margin:0;font-size:13px;"><strong>Country:</strong> ${project.country}</p>
                    <p style="margin:5px 0 0;font-size:13px;"><strong>Mineral:</strong> ${project.mineral}</p>
                </div>
            `;
            
            marker.bindPopup(popupContent);
        });
    }
    
    // ================================
    // Contact Form Handling
    // ================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Validation
            if (!data.name || !data.email || !data.service || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you within 24-48 hours.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // ================================
    // Job Application Form Handling
    // ================================
    const applicationForm = document.getElementById('applicationForm');
    
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Validation
            if (!data.appName || !data.appEmail || !data.position) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.appEmail)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // File validation
            const resumeInput = document.getElementById('resume');
            if (resumeInput && resumeInput.files.length > 0) {
                const file = resumeInput.files[0];
                const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                const maxSize = 5 * 1024 * 1024; // 5MB
                
                if (!allowedTypes.includes(file.type)) {
                    alert('Please upload a PDF or Word document.');
                    return;
                }
                
                if (file.size > maxSize) {
                    alert('File size must be less than 5MB.');
                    return;
                }
            } else {
                alert('Please upload your resume.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your application! We will review your resume and contact you if we find a suitable position.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // ================================
    // Newsletter Form
    // ================================
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    });
    
    // ================================
    // Scroll Reveal Animation
    // ================================
    const revealElements = document.querySelectorAll('.service-card, .project-card, .team-member');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial styles
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    
    // ================================
    // Console Welcome Message
    // ================================
    console.log('%c Welcome to MineTech Solutions ', 'background: #1e3a5f; color: #f5b041; padding: 10px 20px; font-size: 16px; font-weight: bold;');
    console.log('%c Global Mining Excellence ', 'background: #f5b041; color: #1e3a5f; padding: 5px 10px; font-size: 12px;');
    
    // ================================
    // Careers Modal Functionality
    // ================================
    const modal = document.getElementById('applicationModal');
    const modalClose = document.querySelector('.modal-close');
    const applyButtons = document.querySelectorAll('.btn-apply');
    const positionInput = document.getElementById('position');
    
    // Open modal when clicking Apply Now button
    applyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const position = this.getAttribute('data-position');
            if (positionInput && modal) {
                positionInput.value = position;
                modal.classList.add('active');
            }
        });
    });
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    
});

// ================================
// Utility Functions
// ================================

function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
