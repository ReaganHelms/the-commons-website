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
    const subjectField = form.querySelector('#subject');
    
    // Prepend "[The Commons Website] " to the subject if it doesn't already have it
    if (subjectField && subjectField.value) {
        if (!subjectField.value.startsWith('[The Commons Website]')) {
            subjectField.value = '[The Commons Website] ' + subjectField.value;
        }
    }
    
    // Track contact form submission
    if (window.goatcounter) {
        window.goatcounter.count({
            path: 'contact-form-submit',
            title: 'Contact Form Submitted',
            event: true
        });
    }
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Let the form submit naturally to Formspree
    // Formspree will handle the redirect and show a thank you page
    return true;
}

// Card Functions
function showCard(cardId) {
    const modal = document.getElementById(cardId + '-card');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Track card views
    if (window.goatcounter) {
        window.goatcounter.count({
            path: 'card-view-' + cardId,
            title: 'Card View: ' + cardId,
            event: true
        });
    }
}

function hideCard(cardId) {
    const modal = document.getElementById(cardId + '-card');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close card when clicking outside of it
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.card-modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Toggle venue pricing information
function toggleVenuePricing() {
    const pricingDiv = document.getElementById('venue-pricing');
    const weddingDiv = document.getElementById('wedding-pricing');
    
    // Hide wedding pricing if it's showing
    weddingDiv.style.display = 'none';
    
    // Toggle venue pricing
    if (pricingDiv.style.display === 'none') {
        pricingDiv.style.display = 'block';
        
        // Track venue pricing view
        if (window.goatcounter) {
            window.goatcounter.count({
                path: 'venue-pricing-view',
                title: 'Venue Pricing Information Viewed',
                event: true
            });
        }
    } else {
        pricingDiv.style.display = 'none';
    }
}

// Toggle wedding pricing information
function toggleWeddingPricing() {
    const pricingDiv = document.getElementById('venue-pricing');
    const weddingDiv = document.getElementById('wedding-pricing');
    
    // Hide venue pricing if it's showing
    pricingDiv.style.display = 'none';
    
    // Toggle wedding pricing
    if (weddingDiv.style.display === 'none') {
        weddingDiv.style.display = 'block';
        
        // Track wedding pricing view
        if (window.goatcounter) {
            window.goatcounter.count({
                path: 'wedding-pricing-view',
                title: 'Wedding Pricing Information Viewed',
                event: true
            });
        }
    } else {
        weddingDiv.style.display = 'none';
    }
}

// Track venue contact button clicks
function trackVenueContact(contactType) {
    if (window.goatcounter) {
        window.goatcounter.count({
            path: contactType,
            title: 'Venue Contact Button Clicked: ' + contactType,
            event: true
        });
    }
}