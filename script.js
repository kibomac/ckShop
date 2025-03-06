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
