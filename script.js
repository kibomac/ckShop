// Function to load the menu
function loadMenu() {
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
            addDarkModeToggle();
        });
}

// Function to add dark mode toggle functionality
function addDarkModeToggle() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.querySelector('header').classList.toggle('dark-mode');
        document.querySelectorAll('.product-card').forEach(card => card.classList.toggle('dark-mode'));
        document.querySelector('footer').classList.toggle('dark-mode');
        
        // Toggle the icon
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = '🌞';
        } else {
            darkModeToggle.textContent = '🌙';
        }
    });
}

// Load the menu when the page loads
document.addEventListener('DOMContentLoaded', loadMenu);

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const cartButton = document.getElementById('cartButton');
    const cartSection = document.getElementById('cartSection');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutButton = document.getElementById('checkoutButton');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    let cart = [];

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

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

            updateCart();
        });
    });

    // Update cart display
    function updateCart() {
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

    // Show cart section
    cartButton.addEventListener('click', () => {
        cartSection.classList.toggle('visible');
    });

    // Checkout functionality
    checkoutButton.addEventListener('click', () => {
        alert('Checkout functionality is not implemented yet.');
    });
});

// Product Detail Page Script
if (window.location.pathname.endsWith('product.html')) {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');
    const productPrice = urlParams.get('price');
    const productImage = urlParams.get('image');
    const productDescription = urlParams.get('description');

    // Set product details
    document.getElementById('productName').textContent = productName;
    document.getElementById('productPrice').textContent = productPrice;
    document.getElementById('productImage').src = productImage;
    document.getElementById('productDescription').textContent = productDescription;

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
