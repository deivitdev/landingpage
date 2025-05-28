// Android-style Time Update for Status Bar - Shows real user time
function updateStatusBarTime() {
    const now = new Date();
    
    // Get hours and minutes
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    // Format based on user's locale
    let timeString;
    try {
        // Try to use Intl.DateTimeFormat for better locale handling
        timeString = new Intl.DateTimeFormat(navigator.language, {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        }).format(now);
    } catch (e) {
        // Fallback if Intl is not supported
        timeString = `${hours}:${minutes}`;
    }
    
    // Update the status bar time
    document.querySelector('.time').textContent = timeString;
}

// Update time immediately
updateStatusBarTime();

// Update time every second to make it truly real-time
setInterval(updateStatusBarTime, 1000);

// Smooth Scrolling Navigation
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 100, // Adjust for header
                behavior: 'smooth'
            });
            
            // Update active navigation link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Add animation to sections when scrolled into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.content-section').forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});

// Contact Form Handling with Android Toast Notification
const messageForm = document.querySelector('.message-form');
if (messageForm) {
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Create Android-style toast notification
        const toast = document.createElement('div');
        toast.classList.add('android-toast');
        toast.textContent = 'Message sent successfully!';
        document.body.appendChild(toast);
        
        // Show then hide the toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
        
        // Reset the form
        this.reset();
    });
}

// Add Material Design ripple effect to all buttons
const buttons = document.querySelectorAll('button, .action-btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Material Design elevation effect on cards
const cards = document.querySelectorAll('.app-item, .featured-card, .settings-group, .contact-method, .mini-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.classList.add('elevated');
    });
    
    card.addEventListener('mouseleave', function() {
        this.classList.remove('elevated');
    });
});

// Active section tracking on scroll
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('.content-section').forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const sectionId = section.getAttribute('id');
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});
