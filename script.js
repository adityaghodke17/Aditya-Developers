// Main JavaScript File - All Mouse Effects Included

// DOM Elements
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const whatsappBtn = document.getElementById('whatsappBtn');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link');
const progressFills = document.querySelectorAll('.progress-fill');
const featureCards = document.querySelectorAll('.feature-card');
const serviceCards = document.querySelectorAll('.service-card');

// ============================================
// MOUSE EFFECTS START
// ============================================

class MouseEffects {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.cursorFollower = document.querySelector('.cursor-follower');
        this.mouseX = 0;
        this.mouseY = 0;
        this.posX = 0;
        this.posY = 0;
        this.init();
    }
    
    init() {
        if (!this.cursor || !this.cursorFollower || window.innerWidth <= 768) return;
        
        // Mouse move listener
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.updateCursor();
        });
        
        // Click effects
        document.addEventListener('click', (e) => {
            this.createClickEffect(e.clientX, e.clientY);
            this.createParticles(e.clientX, e.clientY, 8);
        });
        
        // Hover effects
        this.initHoverEffects();
        
        // Animation loop
        this.animate();
    }
    
    updateCursor() {
        // Smooth follow for cursor follower
        this.posX += (this.mouseX - this.posX) / 8;
        this.posY += (this.mouseY - this.posY) / 8;
        
        this.cursor.style.left = this.mouseX + 'px';
        this.cursor.style.top = this.mouseY + 'px';
        
        this.cursorFollower.style.left = this.posX + 'px';
        this.cursorFollower.style.top = this.posY + 'px';
    }
    
    createClickEffect(x, y) {
        // Ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Cursor click animation
        this.cursor.classList.add('click');
        setTimeout(() => this.cursor.classList.remove('click'), 300);
    }
    
    createParticles(x, y, count = 5) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = Math.random() * 20 + 5 + 'px';
            particle.style.height = particle.style.width;
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            // Random color from theme
            const colors = ['#1a237e', '#ff9800', '#4caf50', '#2196f3'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;
            particle.style.opacity = '0.5';
            
            document.body.appendChild(particle);
            
            // Random animation
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const duration = Math.random() * 1000 + 500;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 0.5 },
                { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });
            
            setTimeout(() => particle.remove(), duration);
        }
    }
    
    initHoverEffects() {
        const hoverElements = document.querySelectorAll(
            'a, button, .feature-card, .service-card, .stat-box, .tech-tag, .social-link, .btn, .nav-link'
        );
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.cursorFollower.classList.add('hover');
                
                // Create hover particles
                if (el.classList.contains('btn') || el.classList.contains('feature-card') || el.classList.contains('service-card')) {
                    const rect = el.getBoundingClientRect();
                    this.createParticles(rect.left + rect.width/2, rect.top + rect.height/2, 3);
                }
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.cursorFollower.classList.remove('hover');
            });
        });
    }
    
    animate() {
        // Continuous animation loop for cursor effects
        requestAnimationFrame(() => this.animate());
        
        // Add subtle pulse to cursor follower
        if (this.cursorFollower) {
            const scale = 1 + Math.sin(Date.now() * 0.002) * 0.1;
            this.cursorFollower.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }
    }
}

// ============================================
// MOUSE EFFECTS END
// ============================================

// Mobile Menu Toggle
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Nav link active state on scroll
function updateActiveNavLink() {
    const scrollPos = window.scrollY + 100;
    
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

// Back to Top Button
function updateBackToTop() {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// Scroll Animations
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

// Progress bar animation
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFill = entry.target.querySelector('.progress-fill');
            if (progressFill) {
                const width = progressFill.getAttribute('data-width');
                progressFill.style.width = '0%';
                
                setTimeout(() => {
                    progressFill.style.width = width + '%';
                }, 300);
            }
        }
    });
}, { threshold: 0.5 });

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
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
            
            // Create success message
            const successMessage = `
                ✅ Thank you ${name}!
                
                Property Service: ${service}
                
                We have received your property query.
                Our team will contact you at ${phone} within 24 hours.
                
                You will also receive a confirmation email at ${email}.
            `;
            
            // Show success modal
            showSuccessModal(successMessage);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// Success modal function
function showSuccessModal(message) {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <i class="fas fa-check-circle"></i>
                <h3>Query Submitted Successfully!</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            <div class="modal-footer">
                <button class="modal-ok">OK</button>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s;
    `;
    
    document.body.appendChild(modal);
    
    // Close buttons
    const closeBtn = modal.querySelector('.modal-close');
    const okBtn = modal.querySelector('.modal-ok');
    
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s';
        setTimeout(() => modal.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    okBtn.addEventListener('click', closeModal);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Copy phone number
document.querySelectorAll('.contact-item').forEach(item => {
    if (item.querySelector('h4')?.textContent.includes('Phone')) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const phoneNumber = this.querySelector('p').textContent.trim();
            navigator.clipboard.writeText(phoneNumber).then(() => {
                // Show copied message
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> <div><h4>Copied!</h4><p>Phone number copied to clipboard</p></div>';
                this.style.background = 'linear-gradient(135deg, #4caf50, #2e7d32)';
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.background = '';
                }, 2000);
            });
        });
    }
});

// Social media click handlers
document.querySelectorAll('.social-link').forEach(link => {
    if (link.href.includes('instagram') || link.href.includes('facebook')) {
        link.addEventListener('click', function(e) {
            if (!this.href.includes('adityadevelopersglobal')) {
                e.preventDefault();
                alert('This is a demo link. In production, this would open the social media page.');
            }
        });
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class
    document.body.classList.add('loaded');
    
    // Initialize mouse effects (only on desktop)
    if (window.innerWidth > 768) {
        new MouseEffects();
    }
    
    // Add welcome particles
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.width = '20px';
                particle.style.height = '20px';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.background = 'radial-gradient(circle, #1a237e, #ff9800)';
                particle.style.opacity = '0.3';
                
                document.body.appendChild(particle);
                
                particle.animate([
                    { transform: 'scale(0)', opacity: 0.3 },
                    { transform: 'scale(1)', opacity: 0 },
                    { transform: 'scale(0)', opacity: 0 }
                ], {
                    duration: 1500,
                    easing: 'ease-out'
                });
                
                setTimeout(() => particle.remove(), 1500);
            }, i * 100);
        }
    }, 500);
    
    // Observe elements for animation
    featureCards.forEach(card => observer.observe(card));
    serviceCards.forEach(card => observer.observe(card));
    document.querySelectorAll('.progress-item').forEach(item => progressObserver.observe(item));
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2016', currentYear);
    }
});

// Scroll events
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    updateBackToTop();
});

// Initialize
updateActiveNavLink();
updateBackToTop();

// Add CSS for modal
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .success-modal .modal-content {
        background: white;
        border-radius: 20px;
        width: 90%;
        max-width: 500px;
        animation: slideUp 0.4s;
    }
    
    @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    .success-modal .modal-header {
        background: linear-gradient(135deg, #4caf50, #2e7d32);
        color: white;
        padding: 25px;
        border-radius: 20px 20px 0 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .success-modal .modal-header i {
        font-size: 2.5rem;
    }
    
    .success-modal .modal-header h3 {
        margin: 0;
        font-size: 1.5rem;
    }
    
    .success-modal .modal-header button {
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }
    
    .success-modal .modal-body {
        padding: 30px;
        line-height: 1.8;
    }
    
    .success-modal .modal-footer {
        padding: 20px 30px;
        text-align: right;
        border-top: 1px solid #eee;
    }
    
    .success-modal .modal-footer button {
        background: var(--primary);
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 50px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .success-modal .modal-footer button:hover {
        background: var(--secondary);
        transform: translateY(-3px);
    }
`;
document.head.appendChild(modalStyles);
