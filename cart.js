// Cart state management
let cart = [];

// Initialize cart when the page loads
function initializeCart() {
    const savedCart = localStorage.getItem("cart");
    cart = savedCart ? JSON.parse(savedCart) : [];
    updateCartDisplay();
}

// Add item to cart
function addToCart(name, price) {
    const item = cart.find(i => i.name === name);
    
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: parseInt(price),
            quantity: 1
        });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
    
    // Show feedback to user
    const feedback = document.createElement('div');
    feedback.className = 'cart-feedback';
    feedback.textContent = `Added ${name} to cart`;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        animation: fadeOut 2s forwards;
    `;
    document.body.appendChild(feedback);
    setTimeout(() => feedback.remove(), 2000);
}

// Update cart display
function updateCartDisplay() {
    const cartTableBody = document.querySelector("#cart-items tbody");
    const totalElement = document.querySelector("h2");
    
    if (cartTableBody) {
        cartTableBody.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td>
                    <button class="quantity-btn minus" data-name="${item.name}">-</button>
                    ${item.quantity}
                    <button class="quantity-btn plus" data-name="${item.name}">+</button>
                </td>
                <td>₹${subtotal}</td>
                <td><button class="remove-btn" data-name="${item.name}">Remove</button></td>
            `;
            cartTableBody.appendChild(row);
        });
        
        if (totalElement) {
            totalElement.textContent = `Total Price: ₹${total}`;
        }
    }
}

// Remove item from cart
function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// Update item quantity
function updateQuantity(name, increment) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.quantity += increment;
        if (item.quantity <= 0) {
            removeItem(name);
        } else {
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        }
    }
}

// Event listener for add to cart buttons
document.addEventListener('DOMContentLoaded', () => {
    initializeCart();
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = button.getAttribute('data-price');
            addToCart(name, price);
        });
    });
    
    // Cart page event delegation
    const cartTable = document.querySelector('#cart-items');
    if (cartTable) {
        cartTable.addEventListener('click', (e) => {
            const name = e.target.getAttribute('data-name');
            
            if (e.target.classList.contains('minus')) {
                updateQuantity(name, -1);
            } else if (e.target.classList.contains('plus')) {
                updateQuantity(name, 1);
            } else if (e.target.classList.contains('remove-btn')) {
                removeItem(name);
            }
        });
    }
    
    // Place order button
    const placeOrderBtn = document.querySelector('.cta-button');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return false;
            }
            // Proceed to delivery address page
            window.location.href = 'delivery_address.html';
        });
    }
});