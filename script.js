// DOM Elements
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const whatsappBtn = document.getElementById('whatsappBtn');
const progressFills = document.querySelectorAll('.progress-fill');
const featureCards = document.querySelectorAll('.feature-card');
const serviceCards = document.querySelectorAll('.service-card');
const statBoxes = document.querySelectorAll('.stat-box');

// Animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe feature and service cards
featureCards.forEach(card => {
    observer.observe(card);
});

serviceCards.forEach(card => {
    observer.observe(card);
});

// Progress bar animation
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFill = entry.target.querySelector('.progress-fill');
            const width = progressFill.getAttribute('data-width');
            progressFill.style.width = '0%';
            
            setTimeout(() => {
                progressFill.style.width = width + '%';
            }, 300);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-item').forEach(item => {
    progressObserver.observe(item);
});

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Animation on button
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Success animation
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)';
            
            // Form animation
            contactForm.style.transform = 'scale(0.98)';
            setTimeout(() => {
                contactForm.style.transform = 'scale(1)';
            }, 200);
            
            // Create confirmation message
            const confirmation = `
                ✅ Thank you ${name}!
                We have received your property query.
                We'll contact you at ${phone} within 24 hours.
            `;
            
            // Show alert
            alert(confirmation);
            
            // Reset form after 2 seconds
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = 'linear-gradient(135deg, #1a237e 0%, #283593 100%)';
            }, 2000);
        }, 1500);
    });
}

// Mobile menu toggle
let lastScrollTop = 0;
const floatingBtn = document.querySelector('.floating-whatsapp');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide floating button on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        floatingBtn.style.transform = 'translateY(100px)';
        floatingBtn.style.opacity = '0.5';
    } else {
        floatingBtn.style.transform = 'translateY(0)';
        floatingBtn.style.opacity = '1';
    }
    
    lastScrollTop = scrollTop;
});

// Touch feedback for mobile
const interactiveElements = document.querySelectorAll('.btn, .feature-card, .service-card, .stat-box, .tech-tag, .social-link');

interactiveElements.forEach(element => {
    element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
        this.style.transition = 'transform 0.1s ease';
    });
    
    element.addEventListener('touchend', function() {
        this.style.transform = '';
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)';
    });
});

// Initialize animations on page load
window.addEventListener('DOMContentLoaded', () => {
    // Animate header elements
    const headerElements = document.querySelectorAll('.main-header h1, .main-header p, .stats-container');
    headerElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add click animation to stat boxes
    statBoxes.forEach(box => {
        box.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Get the stat number
            const statNumber = this.querySelector('.stat-number').textContent;
            const statLabel = this.querySelector('.stat-label').textContent;
            
            // Show tooltip
            const tooltip = document.createElement('div');
            tooltip.style.cssText = `
                position: absolute;
                background: var(--primary);
                color: white;
                padding: 8px 15px;
                border-radius: 10px;
                font-size: 0.9rem;
                z-index: 1000;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                pointer-events: none;
            `;
            tooltip.textContent = `${statNumber} ${statLabel}`;
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - 40) + 'px';
            tooltip.style.left = (rect.left + rect.width/2 - 50) + 'px';
            
            document.body.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.remove();
            }, 1000);
        });
    });
    
    // Add bounce animation to floating button on hover
    whatsappBtn.addEventListener('mouseenter', () => {
        whatsappBtn.style.animation = 'bounce 0.5s ease';
    });
    
    whatsappBtn.addEventListener('animationend', () => {
        whatsappBtn.style.animation = 'pulse 2s infinite';
    });
    
    // Initialize progress bars
    progressFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        fill.style.width = '0%';
        
        // Animate after a delay
        setTimeout(() => {
            fill.style.width = width + '%';
        }, 500);
    });
});

// Parallax effect for header
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.main-header');
    if (header && scrolled < 500) {
        header.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    // Remove pre-loader if exists
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Add loaded class to body
    document.body.classList.add('loaded');
});

// Copy phone number on click
document.querySelectorAll('.contact-item').forEach(item => {
    if (item.querySelector('h4')?.textContent === 'Phone Numbers') {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const phoneNumber = this.querySelector('p').textContent.trim();
            navigator.clipboard.writeText(phoneNumber).then(() => {
                // Show copied message
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> <div><h4>Copied!</h4><p>Phone number copied to clipboard</p></div>';
                this.style.background = 'linear-gradient(135deg, #4caf50, #2e7d32)';
                this.style.color = 'white';
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.background = '';
                    this.style.color = '';
                }, 2000);
            });
        });
    }
});

// Social media links with animation
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Animation
        this.style.transform = 'scale(0.8) rotate(360deg)';
        this.style.background = 'var(--secondary)';
        
        setTimeout(() => {
            this.style.transform = '';
            this.style.background = '';
            
            // Get platform
            const platform = this.querySelector('i').className.includes('instagram') ? 'Instagram' :
                           this.querySelector('i').className.includes('facebook') ? 'Facebook' :
                           this.querySelector('i').className.includes('twitter') ? 'Twitter' : 'YouTube';
            
            alert(`Redirecting to our ${platform} page... (Link would open in real implementation)`);
        }, 300);
    });
});

// Add year dynamically to footer
const currentYear = new Date().getFullYear();
const yearSpan = document.querySelector('footer p:nth-child(2)');
if (yearSpan) {
    yearSpan.innerHTML = yearSpan.innerHTML.replace('2023', currentYear);
}

// Add smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
