// ===========================
// Form Handling
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit();
        });
    }
});

function handleFormSubmit() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Collect form data
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Create WhatsApp message
    const whatsappMessage = createWhatsAppMessage(data);
    
    // Send via WhatsApp
    const whatsappUrl = `https://wa.me/905349660548?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    showSuccessMessage();
    
    // Reset form
    form.reset();
}

function validateForm(data) {
    // Check if all fields are filled
    if (!data.name || !data.email || !data.phone || !data.subject || !data.message) {
        showErrorMessage('يرجى ملء جميع الحقول المطلوبة');
        return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showErrorMessage('يرجى إدخال بريد إلكتروني صحيح');
        return false;
    }
    
    // Validate phone
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(data.phone)) {
        showErrorMessage('يرجى إدخال رقم هاتف صحيح');
        return false;
    }
    
    return true;
}

function createWhatsAppMessage(data) {
    const subjectLabels = {
        'inquiry': 'استفسار عام',
        'wholesale': 'طلب جملة',
        'partnership': 'شراكة تجارية',
        'other': 'أخرى'
    };
    
    const message = `
*رسالة من صفحة الهبوط*

*الاسم:* ${data.name}
*البريد الإلكتروني:* ${data.email}
*رقم الهاتف:* ${data.phone}
*الموضوع:* ${subjectLabels[data.subject]}

*الرسالة:*
${data.message}
    `.trim();
    
    return message;
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'notification success';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>تم إرسال رسالتك بنجاح! سيتم التواصل معك قريباً.</span>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => message.remove(), 300);
    }, 4000);
}

function showErrorMessage(text) {
    const message = document.createElement('div');
    message.className = 'notification error';
    message.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${text}</span>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => message.remove(), 300);
    }, 4000);
}

// ===========================
// Smooth Scroll for Navigation
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===========================
// Navbar Active State
// ===========================

window.addEventListener('scroll', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Add Notification Styles Dynamically
// ===========================

const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        z-index: 10000;
        opacity: 0;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .notification.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .notification.success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .notification.success i {
        color: #28a745;
    }
    
    .notification.error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    
    .notification.error i {
        color: #dc3545;
    }
    
    .nav-links a.active {
        color: #1877f2;
        border-bottom: 3px solid #1877f2;
        padding-bottom: 8px;
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// ===========================
// Intersection Observer for Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.service-card, .testimonial-card, .gallery-item').forEach(card => {
    observer.observe(card);
});

// Add animation styles
const animationStyles = `
    .service-card,
    .testimonial-card,
    .gallery-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = animationStyles;
document.head.appendChild(animationStyleSheet);

// ===========================
// Mobile Menu Toggle (if needed)
// ===========================

function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Add mobile menu button if needed
    if (window.innerWidth <= 768) {
        // Mobile menu logic can be added here
    }
}

// Initialize mobile menu on load and resize
window.addEventListener('load', initMobileMenu);
window.addEventListener('resize', initMobileMenu);

// ===========================
// Lazy Loading for Images
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===========================
// Analytics and Tracking
// ===========================

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent;
        console.log(`Button clicked: ${buttonText}`);
    });
});

// Track form submissions
document.addEventListener('submit', function(e) {
    if (e.target.id === 'contactForm') {
        console.log('Contact form submitted');
    }
});

console.log('Mira Collection Landing Page - Script Loaded Successfully');
