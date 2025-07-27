// Cart Module - Maneja toda la funcionalidad del carrito de compras
export const CartModule = {
    cart: [],

    init() {
        this.loadFromStorage();
        this.updateDisplay();
        this.bindEvents();
    },

    loadFromStorage() {
        this.cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    },

    saveToStorage() {
        sessionStorage.setItem('cart', JSON.stringify(this.cart));
    },

    bindEvents() {
        // Event listeners para cerrar carrito
        document.addEventListener('click', (e) => {
            const cartModal = document.getElementById('cart-modal');
            if (cartModal && e.target === cartModal) {
                this.closeCart();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeCart();
            }
        });
    },

    addToCart(courseName, price, event) {
        const existingItem = this.cart.find(item => item.name === courseName);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                name: courseName,
                price: price,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateDisplay();
        
        // Show success message
        this.showNotification(`${courseName} añadido al carrito`, 'success');
        
        // Add visual feedback to the button
        const button = event ? event.target.closest('button') : null;
        if (button) {
            button.classList.add('bg-green-500');
            button.classList.remove('from-primary-600', 'to-primary-700');
            setTimeout(() => {
                button.classList.remove('bg-green-500');
                button.classList.add('from-primary-600', 'to-primary-700');
            }, 500);
        }
        
        // Show cart modal after a short delay
        setTimeout(() => {
            this.showCart();
        }, 800);
    },

    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.saveToStorage();
        this.updateDisplay();
        this.updateCartModal();
    },

    updateQuantity(index, change) {
        this.cart[index].quantity += change;
        
        if (this.cart[index].quantity <= 0) {
            this.removeFromCart(index);
        } else {
            this.saveToStorage();
            this.updateDisplay();
            this.updateCartModal();
        }
    },

    updateDisplay() {
        const cartCount = this.cart.reduce((total, item) => total + item.quantity, 0);
        
        // Update cart count in navigation (desktop and mobile)
        const cartIndicators = document.querySelectorAll('.cart-count');
        cartIndicators.forEach(indicator => {
            indicator.textContent = cartCount;
            indicator.classList.toggle('hidden', cartCount === 0);
            
            // Add animation when cart count changes
            if (cartCount > 0) {
                indicator.classList.add('animate-pulse');
                setTimeout(() => {
                    indicator.classList.remove('animate-pulse');
                }, 1000);
            }
        });
    },

    updateCartModal() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const emptyCart = document.getElementById('empty-cart');
        
        if (!cartItems || !cartTotal || !emptyCart) return;
        
        cartItems.innerHTML = '';
        
        if (this.cart.length === 0) {
            cartItems.classList.add('hidden');
            emptyCart.classList.remove('hidden');
            cartTotal.textContent = '€0';
            return;
        }
        
        cartItems.classList.remove('hidden');
        emptyCart.classList.add('hidden');
        
        let total = 0;
        
        this.cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow';
            itemElement.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="font-semibold text-gray-900 mb-1">${item.name}</div>
                        <div class="text-sm text-gray-600 mb-3">€${item.price} por curso</div>
                        
                        <div class="flex items-center space-x-3">
                            <button onclick="window.CartModule.updateQuantity(${index}, -1)" 
                                    class="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                                </svg>
                            </button>
                            <span class="font-semibold text-lg min-w-[2rem] text-center">${item.quantity}</span>
                            <button onclick="window.CartModule.updateQuantity(${index}, 1)" 
                                    class="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="text-right ml-4">
                        <div class="font-bold text-lg text-primary-600">€${itemTotal}</div>
                        <button onclick="window.CartModule.removeFromCart(${index})" 
                                class="text-red-500 hover:text-red-700 transition mt-2 text-sm">
                            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                            Eliminar
                        </button>
                    </div>
                </div>
            `;
            cartItems.appendChild(itemElement);
        });
        
        cartTotal.textContent = `€${total}`;
    },

    showCart() {
        const cartModal = document.getElementById('cart-modal');
        if (cartModal) {
            this.updateCartModal();
            cartModal.classList.remove('hidden');
        }
    },

    closeCart() {
        const cartModal = document.getElementById('cart-modal');
        if (cartModal) {
            cartModal.classList.add('hidden');
        }
    },

    async proceedToCheckout() {
        if (this.cart.length === 0) {
            this.showNotification('El carrito está vacío', 'error');
            return;
        }
        
        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: this.cart,
                    success_url: window.location.origin + '/success',
                    cancel_url: window.location.origin + '/cancel'
                })
            });
            
            const session = await response.json();
            
            if (session.url) {
                window.location.href = session.url;
            } else {
                throw new Error('No se pudo crear la sesión de pago');
            }
        } catch (error) {
            console.error('Error al procesar el pago:', error);
            this.showNotification('Error al procesar el pago. Inténtalo de nuevo.', 'error');
        }
    },

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification fixed top-20 right-4 z-50 p-6 rounded-xl shadow-2xl max-w-sm transform transition-all duration-500 translate-x-full border-l-4`;
        
        let bgColor, borderColor, icon;
        
        switch(type) {
            case 'success':
                bgColor = 'bg-green-50';
                borderColor = 'border-green-500';
                icon = `<svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>`;
                break;
            case 'error':
                bgColor = 'bg-red-50';
                borderColor = 'border-red-500';
                icon = `<svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>`;
                break;
            default:
                bgColor = 'bg-blue-50';
                borderColor = 'border-blue-500';
                icon = `<svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>`;
        }
        
        notification.className += ` ${bgColor} ${borderColor}`;
        notification.innerHTML = `
            <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                    ${icon}
                </div>
                <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">${message}</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 500);
        }, 4000);
    }
};

// Expose to global scope for HTML onclick handlers
window.CartModule = CartModule; 