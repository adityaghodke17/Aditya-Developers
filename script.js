// Main JavaScript File - WhatsApp Form Integration

// DOM Elements
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const whatsappBtn = document.getElementById('whatsappBtn');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Menu Toggle
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Nav link active state
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

// WhatsApp Form Integration
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !email || !phone || !service || !message) {
            alert('Please fill all required fields!');
            return;
        }
        
        // Animation on button
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
        submitBtn.disabled = true;
        
        // Create WhatsApp message
        const whatsappMessage = `🚀 *NEW PROPERTY QUERY* 🚀%0A%0A` +
                               `*Name:* ${name}%0A` +
                               `*Email:* ${email}%0A` +
                               `*Phone:* ${phone}%0A` +
                               `*Service Required:* ${service}%0A` +
                               `*Property Requirements:*%0A${message}%0A%0A` +
                               `_Sent from Aditya Developers website_`;
        
        // WhatsApp URL
        const whatsappURL = `https://wa.me/916357308369?text=${whatsappMessage}`;
        
        // Simulate processing
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');
            
            // Show success message
            showSuccessMessage(name, phone, service);
            
            // Reset form after 2 seconds
            setTimeout(() => {
                contactForm.reset();
            }, 2000);
            
        }, 1000);
    });
}

// Show success message
function showSuccessMessage(name, phone, service) {
    const successHTML = `
        <div class="success-message">
            <div class="success-icon">
                <i class="fab fa-whatsapp"></i>
            </div>
            <h3>Message Ready!</h3>
            <p>Your query has been prepared for WhatsApp.</p>
            <div class="success-info">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Service:</strong> ${service}</p>
            </div>
            <p class="success-note">WhatsApp will open automatically. If it doesn't, please click the WhatsApp button.</p>
        </div>
    `;
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-overlay';
    successDiv.innerHTML = successHTML;
    
    // Add styles
    successDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s;
        padding: 20px;
    `;
    
    document.body.appendChild(successDiv);
    
    // Auto close after 5 seconds
    setTimeout(() => {
        successDiv.style.animation = 'fadeOut 0.3s';
        setTimeout(() => {
            if (successDiv.parentElement) {
                successDiv.remove();
            }
        }, 300);
    }, 5000);
    
    // Click to close
    successDiv.addEventListener('click', (e) => {
        if (e.target === successDiv) {
            successDiv.style.animation = 'fadeOut 0.3s';
            setTimeout(() => successDiv.remove(), 300);
        }
    });
}

// Copy phone number
document.querySelectorAll('.contact-item').forEach(item => {
    if (item.querySelector('h4')?.textContent.includes('Phone')) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const phoneNumber = this.querySelector('p').textContent.trim();
            navigator.clipboard.writeText(phoneNumber).then(() => {
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> <div><h4>Copied!</h4><p>Phone number copied</p></div>';
                this.style.background = 'linear-gradient(135deg, #4caf50, #2e7d32)';
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.background = '';
                }, 2000);
            });
        });
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .service-card').forEach(card => observer.observe(card));
    document.querySelectorAll('.progress-item').forEach(item => progressObserver.observe(item));
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.innerHTML = '&copy; 2016 Aditya Developers. All rights reserved.';
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

// Add CSS for success message
const successStyles = document.createElement('style');
successStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .success-message {
        background: white;
        border-radius: 20px;
        padding: 40px;
        text-align: center;
        max-width: 500px;
        width: 100%;
        animation: slideUp 0.4s;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    
    @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    .success-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #25D366, #128C7E);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 25px;
        color: white;
        font-size: 2.5rem;
    }
    
    .success-message h3 {
        color: #1a237e;
        margin-bottom: 15px;
        font-size: 1.8rem;
    }
    
    .success-message p {
        color: #666;
        margin-bottom: 20px;
        line-height: 1.6;
    }
    
    .success-info {
        background: #f9f9f9;
        padding: 20px;
        border-radius: 10px;
        margin: 25px 0;
        text-align: left;
    }
    
    .success-info p {
        margin: 10px 0;
        color: #333;
    }
    
    .success-note {
        font-size: 0.9rem;
        color: #666;
        font-style: italic;
    }
`;
document.head.appendChild(successStyles);
