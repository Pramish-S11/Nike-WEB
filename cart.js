class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.init();
    }

    init() {
        this.renderCart();
        this.updateTotals();
        this.setupEventListeners();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        this.updateStorage();
        this.renderCart();
        this.updateTotals();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateStorage();
        this.renderCart();
        this.updateTotals();
    }

    updateQuantity(productId, change) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity < 1) {
                this.removeItem(productId);
            } else {
                this.updateStorage();
                this.renderCart();
                this.updateTotals();
            }
        }
    }

    renderCart() {
        const cartContainer = document.getElementById('cartItems');
        if (!cartContainer) return;

        cartContainer.innerHTML = '';

        if (this.items.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart fa-3x"></i>
                    <p>Your cart is empty</p>
                    <a href="index.html" class="continue-shopping">Continue Shopping</a>
                </div>
            `;
            return;
        }

        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <span class="item-name">${item.name}</span>
                    <div class="item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartContainer.appendChild(itemElement);
        });
    }

    updateTotals() {
        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 100 ? 0 : 10;
        const tax = subtotal * 0.1;
        const total = subtotal + shipping + tax;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    updateStorage() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quantity-btn.plus')) {
                const id = e.target.closest('.quantity-btn').dataset.id;
                this.updateQuantity(id, 1);
            }
            if (e.target.closest('.quantity-btn.minus')) {
                const id = e.target.closest('.quantity-btn').dataset.id;
                this.updateQuantity(id, -1);
            }
            if (e.target.closest('.remove-item')) {
                const id = e.target.closest('.remove-item').dataset.id;
                this.removeItem(id);
            }
        });

        document.getElementById('checkoutBtn')?.addEventListener('click', () => {
            // Implement checkout functionality
            alert('Proceeding to checkout...');
        });
    }
}

// Initialize cart
const cart = new ShoppingCart();