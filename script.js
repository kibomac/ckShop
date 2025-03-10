// Function to load the menu
function loadMenu() {
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
            addDarkModeToggle();
        });
}

// Function to load the footer
function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
}

// Function to add dark mode toggle functionality
function addDarkModeToggle() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        });
    }
}

// Function to handle contact form submission
function handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Handle form submission (e.g., send data to server or display a success message)
            alert(`Thank you, ${name}! Your message has been sent.`);
            contactForm.reset();
        });
    }
}

// Function to update cart display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    if (cartItems && cartTotal) {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(product => {
            const item = document.createElement('div');
            item.classList.add('cart-item');
            item.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h3>${product.name}</h3>
                    <p>£${product.price.toFixed(2)} x ${product.quantity}</p>
                </div>
            `;
            cartItems.appendChild(item);
            total += product.price * product.quantity;
        });
        cartTotal.textContent = total.toFixed(2);
        document.getElementById('cartCount').textContent = cart.length;
    }
}

// Function to initialize cart functionality
function initializeCart() {
    const cartButton = document.getElementById('cartButton');
    const cartSection = document.getElementById('cartSection');
    const checkoutButton = document.getElementById('checkoutButton');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const image = button.getAttribute('data-image');
            const product = { name, price, image, quantity: 1 };

            const existingProduct = cart.find(item => item.name === name);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        });
    });

    // Show cart section
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            cartSection.classList.toggle('visible');
        });
    }

    // Checkout functionality
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            alert('Checkout functionality is not implemented yet.');
        });
    }

    // Initialize cart count
    updateCart();
}

// Function to handle product detail page
function handleProductDetailPage() {
    if (window.location.pathname.endsWith('product.html')) {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const productName = urlParams.get('name');
        const productPrice = urlParams.get('price');
        const productImage = urlParams.get('image');
        const productDescription = urlParams.get('description');

        // Set product details
        document.getElementById('productName').textContent = productName;
        document.getElementById('productPrice').textContent = `£${productPrice}`;
        document.getElementById('productImage').src = productImage;
        document.getElementById('productDescription').textContent = productDescription;

        // Add to cart from product detail
        const productAddToCart = document.getElementById('productAddToCart');
        productAddToCart.addEventListener('click', () => {
            const product = { name: productName, price: parseFloat(productPrice), image: productImage, quantity: 1 };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push(product);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        });

        // Handle review form submission
        document.getElementById('reviewForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const reviewText = document.getElementById('reviewText').value;
            if (reviewText) {
                const review = document.createElement('p');
                review.textContent = reviewText;
                document.getElementById('reviews').appendChild(review);
                document.getElementById('reviewText').value = '';
            }
        });
    }
}

// Load the menu when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
    loadFooter();
    addDarkModeToggle();
    handleContactForm();
    initializeCart();
    handleProductDetailPage();
});
