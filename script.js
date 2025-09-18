// Check login status on page load
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('portfolioLoggedIn');
    if (isLoggedIn === 'true') {
        showPortfolio();
    } else {
        showLogin();
    }
});

// Login form handler
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const btnText = document.getElementById('btnText');
    const spinner = document.getElementById('loadingSpinner');
    
    // Show loading state
    btnText.style.display = 'none';
    spinner.style.display = 'block';
    
    // Simulate API call
    setTimeout(() => {
        if (username === 'admin' && password === 'cyber2024') {
            // Success
            localStorage.setItem('portfolioLoggedIn', 'true');
            showPortfolio();
        } else {
            // Failed
            errorMessage.classList.add('show');
            btnText.style.display = 'block';
            spinner.style.display = 'none';
            document.getElementById('password').value = '';
            
            // Hide error after 3 seconds
            setTimeout(() => {
                errorMessage.classList.remove('show');
            }, 3000);
        }
    }, 1000);
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Show portfolio
function showPortfolio() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('portfolioContent').style.display = 'block';
    initializePortfolio();
}

// Show login
function showLogin() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('portfolioContent').style.display = 'none';
}

// Logout
function logout() {
    localStorage.removeItem('portfolioLoggedIn');
    showLogin();
    document.getElementById('loginForm').reset();
    document.getElementById('errorMessage').classList.remove('show');
}

// Initialize portfolio features
function initializePortfolio() {
    // Animate goal cards on scroll
const goalCards = document.querySelectorAll('.goal-card');
const goalObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

goalCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    goalObserver.observe(card);
});

    // Smooth scrolling
    document.querySelectorAll('#portfolioContent a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Mobile menu toggle
    window.toggleMobileMenu = function() {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    };
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Animate elements on scroll
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
    
    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Typing effect for hero subtitle
    const subtitle = document.querySelector('.hero-subtitle span');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
}

// Form submit handler
document.getElementById('loginForm').addEventListener('submit', handleLogin);

// Close mobile menu when clicking outside
document.getElementById('mobileMenu').addEventListener('click', function(e) {
    if (e.target === this) {
        toggleMobileMenu();
    }
});