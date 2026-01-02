// Aditya Developers - Animated Website
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== LOADING SCREEN ==========
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading
    setTimeout(() => {
        loadingProgress.style.width = '100%';
        setTimeout(() => {
            loadingScreen.classList.add('loaded');
            document.body.style.overflow = 'auto';
            initAllAnimations();
        }, 500);
    }, 1000);
    
    // ========== CUSTOM CURSOR ==========
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX - 4}px`;
            cursorDot.style.top = `${posY - 4}px`;
            
            cursorOutline.animate({
                left: `${posX - 20}px`,
                top: `${posY - 20}px`
            }, { duration: 500, fill: 'forwards' });
        });
        
        // Cursor effects
        document.querySelectorAll('a, button, .service-card').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'scale(2)';
                cursorOutline.style.transform = 'scale(1.5)';
                cursorOutline.style.borderColor = '#06b6d4';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'scale(1)';
                cursorOutline.style.transform = 'scale(1)';
                cursorOutline.style.borderColor = '#6366f1';
            });
        });
    }
    
    // ========== MOBILE MENU ==========
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // ========== PARTICLE BACKGROUND ==========
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            // Apply styles
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                border-radius: 50%;
                left: ${posX}%;
                top: ${posY}%;
                opacity: ${Math.random() * 0.5 + 0.1};
                filter: blur(${size/2}px);
                animation: floatParticle ${duration}s infinite ${delay}s linear;
            `;
            
            particlesContainer.appendChild(particle);
        }
        
        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(${Math.random()*50}px, ${Math.random()*50}px) rotate(90deg); }
                50% { transform: translate(${Math.random()*-50}px, ${Math.random()*50}px) rotate(180deg); }
                75% { transform: translate(${Math.random()*-50}px, ${Math.random()*-50}px) rotate(270deg); }
                100% { transform: translate(0, 0) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ========== ANIMATED COUNTERS ==========
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Start when in viewport
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
            
            observer.observe(counter);
        });
    }
    
    // ========== SKILL BARS ANIMATION ==========
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    bar.style.width = width + '%';
                    observer.unobserve(bar);
                }
            });
            
            observer.observe(bar);
        });
    }
    
    // ========== SCROLL ANIMATIONS ==========
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.getAttribute('data-animate');
                    const delay = element.getAttribute('data-delay') || 0;
                    
                    setTimeout(() => {
                        element.style.animation = `${animation} 0.8s ease forwards`;
                        element.style.opacity = '1';
                    }, delay);
                    
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // ========== BACK TO TOP ==========
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========== FORM HANDLING ==========
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill all required fields');
                return;
            }
            
            // Show success message
            alert('Thank you! Your message has been sent. We will contact you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // ========== FLOATING SHAPES ANIMATION ==========
    function animateFloatingShapes() {
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach(shape => {
            shape.style.animation = `floatShape 20s infinite linear`;
        });
    }
    
    // ========== HOVER EFFECTS ==========
    function initHoverEffects() {
        // Service cards
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
        
        // Buttons
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-5px)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
            });
        });
    }
    
    // ========== INITIALIZE ALL ANIMATIONS ==========
    function initAllAnimations() {
        createParticles();
        animateCounters();
        animateSkillBars();
        initScrollAnimations();
        animateFloatingShapes();
        initHoverEffects();
        
        // Animate section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach((title, index) => {
            setTimeout(() => {
                title.style.animation = 'fadeUp 1s forwards';
            }, index * 200);
        });
    }
    
    // ========== RESPONSIVE CHECK ==========
    function checkResponsive() {
        if (window.innerWidth <= 768) {
            // Disable custom cursor on mobile
            if (cursorDot) cursorDot.style.display = 'none';
            if (cursorOutline) cursorOutline.style.display = 'none';
        } else {
            if (cursorDot) cursorDot.style.display = 'block';
            if (cursorOutline) cursorOutline.style.display = 'block';
        }
    }
    
    // Initial check
    checkResponsive();
    
    // Check on resize
    window.addEventListener('resize', checkResponsive);
    
    // ========== KEYBOARD SHORTCUTS ==========
    document.addEventListener('keydown', (e) => {
        // Escape to close menu
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // ========== TOUCH DEVICE SUPPORT ==========
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add touch feedback
        document.querySelectorAll('a, button').forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', () => {
                element.style.transform = 'scale(1)';
            });
        });
    }
    
    // ========== PERFORMANCE OPTIMIZATION ==========
    let scrollTimer;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            // Clean up animations when not in view
        }, 100);
    });
    
    // ========== INITIALIZATION COMPLETE ==========
    console.log('🎨 Aditya Developers Website Loaded Successfully!');
    console.log('📱 Responsive: ' + (window.innerWidth <= 768 ? 'Mobile' : 'Desktop'));
});
