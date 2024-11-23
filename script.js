// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class for background
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.top = '-100px';  // Hide navbar
    } else {
        navbar.style.top = '0';  // Show navbar
    }
    lastScroll = currentScroll;
});

// Product Card Animations
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseout', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)';
    });
});

// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const emailInput = contactForm.querySelector('input[type="email"]');
const nameInput = contactForm.querySelector('input[type="text"]');
const messageInput = contactForm.querySelector('textarea');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}

function showFormMessage(message, isError = false) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${isError ? 'error' : 'success'}`;
    contactForm.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (nameInput.value.length < 2) {
        showFormMessage('Please enter a valid name', true);
        return;
    }
    
    if (!validateEmail(emailInput.value)) {
        showFormMessage('Please enter a valid email address', true);
        return;
    }
    
    if (messageInput.value.length < 10) {
        showFormMessage('Message must be at least 10 characters long', true);
        return;
    }
    
    // If validation passes, show success message
    showFormMessage('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Image Slider for Hero Section
let currentSlide = 0;
const slides = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // Add your image paths
const container1 = document.querySelector('.container1');

function changeBackground() {
    container1.style.backgroundImage = `url(${slides[currentSlide]})`;
    currentSlide = (currentSlide + 1) % slides.length;
}

setInterval(changeBackground, 5000); // Change background every 5 seconds

// Shopping Cart Functionality
let cartItems = [];

function addToCart(productId, productName, price) {
    cartItems.push({ id: productId, name: productName, price: price });
    updateCartCount();
    showCartNotification();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.length;
    }
}

function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Item added to cart!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Buy Now Button Click Handlers
const buyButtons = document.querySelectorAll('.product-btn');
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));
        const productId = button.dataset.productId;
        
        addToCart(productId, productName, productPrice);
    });
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('img').forEach(img => {
    img.setAttribute('loading', 'lazy');
});