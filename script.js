document.addEventListener('DOMContentLoaded', function() {
    const linkItems = document.querySelectorAll('.link-item');
    
    linkItems.forEach(link => {
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    linkItems.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        link.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(link);
    });
});

// Contact Form Functions
function showContactForm() {
    document.getElementById('contactModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideContactForm() {
    document.getElementById('contactModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        hideContactForm();
    }
}

// Handle form submission with fallback approach
function submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Let the form submit naturally to Formspree
    // Formspree will handle the redirect and show a thank you page
    return true;
}