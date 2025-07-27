// Main JavaScript for Alfonso's GMAT Website - Modular Version
import { CartModule } from './modules/cart.js';
import { MobileMenuModule } from './modules/mobile-menu.js';
import { ContactModule } from './modules/contact.js';
import { AnimationModule } from './modules/animations.js';

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Alfonso GMAT Website...');
    
    // Initialize all modules
    CartModule.init();
    MobileMenuModule.init();
    ContactModule.init();
    AnimationModule.init();
    
    console.log('All modules initialized successfully');
});

// Global functions for HTML onclick handlers
window.addToCart = (courseName, price, event) => {
    CartModule.addToCart(courseName, price, event);
};

window.showCart = () => {
    CartModule.showCart();
};

window.closeCart = () => {
    CartModule.closeCart();
};

window.proceedToCheckout = () => {
    CartModule.proceedToCheckout();
}; 