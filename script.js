// ===== Navigation Active Link Handling =====
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Mobile Menu Toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active link on scroll
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
    
    // ===== Skill Bar Animation on Scroll =====
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const skillBarObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('style').match(/width:\s*(\d+%)/)[1];
                skillBarObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        const originalWidth = bar.style.width;
        bar.style.width = '0%';
        bar.setAttribute('data-width', originalWidth);
        skillBarObserver.observe(bar);
    });
    
    // ===== Gallery Scroll Navigation =====
    const galleryScroll = document.getElementById('gallery-scroll');
    const certsScroll = document.getElementById('certsScroll');
    
    function setupDragScroll(element) {
        if (!element) return;
        
        let isDown = false;
        let startX;
        let scrollLeft;
        
        element.addEventListener('mousedown', (e) => {
            isDown = true;
            element.style.cursor = 'grabbing';
            startX = e.pageX - element.offsetLeft;
            scrollLeft = element.scrollLeft;
        });
        
        element.addEventListener('mouseleave', () => {
            isDown = false;
            element.style.cursor = 'grab';
        });
        
        element.addEventListener('mouseup', () => {
            isDown = false;
            element.style.cursor = 'grab';
        });
        
        element.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - element.offsetLeft;
            const walk = (x - startX) * 2;
            element.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Setup drag scroll for both gallery and certificates
    setupDragScroll(galleryScroll);
    setupDragScroll(certsScroll);
    
    // ===== Floating Badges Animation =====
    const floatingBadges = document.querySelectorAll('.floating-badge');
    
    floatingBadges.forEach((badge, index) => {
        // Add subtle floating animation
        setInterval(() => {
            const randomY = Math.sin(Date.now() / 1000 + index) * 5;
            badge.style.transform = `translateY(${randomY}px)`;
        }, 50);
    });
    
    // ===== Parallax Effect for Ambient Orbs =====
    const ambientOrbs = document.querySelectorAll('.ambient-orb');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        ambientOrbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            orb.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // ===== Card Hover Effects =====
    const cards = document.querySelectorAll('.card, .project-card, .cert-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===== Header Scroll Effect =====
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ===== Fade-in Animation on Scroll =====
    const fadeElements = document.querySelectorAll('.card, .project-card, .cert-card, .reason-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // ===== Button Click Effects =====
    const buttons = document.querySelectorAll('a[class*="btn-"]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ===== Profile Avatar Interaction =====
    const profileAvatar = document.querySelector('.profile-avatar img');
    
    if (profileAvatar) {
        profileAvatar.addEventListener('click', () => {
            profileAvatar.style.transform = 'rotate(360deg) scale(1.1)';
            profileAvatar.style.transition = 'transform 0.6s ease';
            
            setTimeout(() => {
                profileAvatar.style.transform = 'rotate(0deg) scale(1)';
            }, 600);
        });
    }
    
    // ===== Status Badge Animation =====
    const statusBadges = document.querySelectorAll('.status-badge, .status-pill');
    
    statusBadges.forEach(badge => {
        setInterval(() => {
            const dot = badge.querySelector('.status-dot, .pulse-dot');
            if (dot) {
                dot.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    dot.style.transform = 'scale(1)';
                }, 300);
            }
        }, 3000);
    });
    
    // ===== Scroll to Top on Logo Click =====
    const brandLogo = document.querySelector('.brand-text');
    
    if (brandLogo) {
        brandLogo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== Project Card Tilt Effect =====
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // ===== Lazy Loading Images =====
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Ensure image is visible
                if (!img.complete) {
                    img.onload = () => {
                        // Image loaded successfully
                    };
                }
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ===== Certificate Card Interaction =====
    const certCards = document.querySelectorAll('.cert-card');
    
    certCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add a subtle pulse effect
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // ===== Gallery Auto-scroll Hint =====
    function autoScrollHint(element) {
        if (!element) return;
        
        // Auto-scroll slightly to show more content
        setTimeout(() => {
            element.scrollTo({
                left: 100,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                element.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            }, 1000);
        }, 500);
    }
    
    autoScrollHint(galleryScroll);
    
    // Add auto-scroll hint for certificates when section comes into view
    if (certsScroll) {
        const certsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    autoScrollHint(certsScroll);
                    certsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        certsObserver.observe(certsScroll);
    }
    
    // ===== Social Links Hover Effect =====
    const socialLinks = document.querySelectorAll('.social-link, .footer-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.style.transform = 'rotate(15deg) scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
    
    // ===== Smooth Reveal for Hero Section =====
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent && heroVisual) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateY(30px)';
        
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroVisual.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
        
        setTimeout(() => {
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // ===== Console Easter Egg =====
    console.log('%c✨ Hey there, curious developer! ✨', 'font-size: 20px; color: #ddb8ff; font-weight: bold;');
    console.log('%cLooks like you\'re checking out the code. I like your style! 🦋', 'font-size: 14px; color: #ffafd3;');
    console.log('%cWant to collaborate? Let\'s chat: elena@vance.design', 'font-size: 12px; color: #d2bfe8;');
    
    // ===== Keyboard Navigation Enhancement =====
    document.addEventListener('keydown', (e) => {
        // Press 'T' to scroll to top
        if (e.key === 't' || e.key === 'T') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Press 'C' to scroll to contact
        if (e.key === 'c' || e.key === 'C') {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    // ===== Performance Optimization =====
    // Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debounce to scroll events
    const debouncedUpdateActiveLink = debounce(updateActiveLink, 100);
    window.removeEventListener('scroll', updateActiveLink);
    window.addEventListener('scroll', debouncedUpdateActiveLink);
    
    console.log('%c🌸 Portfolio loaded successfully! 🌸', 'font-size: 16px; color: #c084fc; font-weight: bold;');
});

// ===== Additional Utility Functions =====

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate-in');
        }
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Export functions for external use
window.portfolioUtils = {
    animateOnScroll,
    isInViewport,
    scrollToElement
};
