// Mobile Menu Module - Maneja la funcionalidad del menú móvil
export const MobileMenuModule = {
    init() {
        this.setupEventListeners();
        this.setupSmoothScrolling();
    },

    setupEventListeners() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        console.log('Mobile menu elements:', { mobileMenuButton, mobileMenu });
        
        if (mobileMenuButton && mobileMenu) {
            // Add click event listener
            mobileMenuButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Mobile menu button clicked');
                
                this.toggleMenu(mobileMenu);
            });
            
            // Also add touch event for better mobile support
            mobileMenuButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                console.log('Mobile menu button touched');
                
                this.toggleMenu(mobileMenu);
            });
            
            console.log('Mobile menu event listeners added successfully');
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                    if (!mobileMenu.classList.contains('hidden')) {
                        this.closeMenu(mobileMenu);
                        console.log('Mobile menu closed (click outside)');
                    }
                }
            });
            
            // Close mobile menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                    this.closeMenu(mobileMenu);
                    console.log('Mobile menu closed (escape key)');
                }
            });
            
        } else {
            console.error('Mobile menu elements not found:', { mobileMenuButton, mobileMenu });
        }
    },

    toggleMenu(mobileMenu) {
        if (mobileMenu.classList.contains('hidden')) {
            this.openMenu(mobileMenu);
        } else {
            this.closeMenu(mobileMenu);
        }
    },

    openMenu(mobileMenu) {
        mobileMenu.classList.remove('hidden');
        console.log('Mobile menu shown');
    },

    closeMenu(mobileMenu) {
        mobileMenu.classList.add('hidden');
        console.log('Mobile menu hidden');
    },

    setupSmoothScrolling() {
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        this.closeMenu(mobileMenu);
                    }
                }
            });
        });
    }
}; 