document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    const heroPrev = document.querySelector('.hero-prev');
    const heroNext = document.querySelector('.hero-next');
    let currentHeroSlide = 0;
    let heroSlideInterval;
    
    function showHeroSlide(index) {
        // Hide all slides
        heroSlides.forEach(slide => {
            slide.classList.remove('active');
            // Remove animation classes to reset them
            slide.querySelector('.hero-content').classList.remove('animate-fade-in');
            const heading = slide.querySelector('h2');
            const paragraph = slide.querySelector('p');
            const buttons = slide.querySelector('.cta-buttons');
            
            if (heading) heading.classList.remove('animate-slide-up');
            if (paragraph) paragraph.classList.remove('animate-slide-up');
            if (buttons) buttons.classList.remove('animate-slide-up');
        });
        
        // Show current slide
        heroSlides[index].classList.add('active');
        
        // Add animation classes
        const activeContent = heroSlides[index].querySelector('.hero-content');
        activeContent.classList.add('animate-fade-in');
        
        const activeHeading = heroSlides[index].querySelector('h2');
        const activeParagraph = heroSlides[index].querySelector('p');
        const activeButtons = heroSlides[index].querySelector('.cta-buttons');
        
        if (activeHeading) activeHeading.classList.add('animate-slide-up');
        if (activeParagraph) activeParagraph.classList.add('animate-slide-up');
        if (activeButtons) activeButtons.classList.add('animate-slide-up');
        
        // Update dots
        heroDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    function nextHeroSlide() {
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
        showHeroSlide(currentHeroSlide);
    }
    
    function prevHeroSlide() {
        currentHeroSlide = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
        showHeroSlide(currentHeroSlide);
    }
    
    // Initialize hero slider if elements exist
    if (heroSlides.length > 0) {
        // Start automatic slideshow
        heroSlideInterval = setInterval(nextHeroSlide, 5000);
        
        // Add click events to dots
        heroDots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentHeroSlide = i;
                showHeroSlide(currentHeroSlide);
                // Reset interval when manually changing slides
                clearInterval(heroSlideInterval);
                heroSlideInterval = setInterval(nextHeroSlide, 5000);
            });
        });
        
        // Add click events to arrows
        if (heroPrev) {
            heroPrev.addEventListener('click', () => {
                prevHeroSlide();
                // Reset interval when manually changing slides
                clearInterval(heroSlideInterval);
                heroSlideInterval = setInterval(nextHeroSlide, 5000);
            });
        }
        
        if (heroNext) {
            heroNext.addEventListener('click', () => {
                nextHeroSlide();
                // Reset interval when manually changing slides
                clearInterval(heroSlideInterval);
                heroSlideInterval = setInterval(nextHeroSlide, 5000);
            });
        }
    }
    
    // FAQ Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                // Toggle active class on the question
                this.classList.toggle('active');
                
                // Toggle the icon between plus and minus
                const icon = this.querySelector('i');
                if (icon.classList.contains('fa-plus')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
                
                // Toggle the answer visibility
                const answer = this.nextElementSibling;
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }
    
    if (testimonialSlides.length > 0) {
        // Initialize slider
        showSlide(currentSlide);
        
        // Next button
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentSlide = (currentSlide + 1) % testimonialSlides.length;
                showSlide(currentSlide);
            });
        }
        
        // Previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
                showSlide(currentSlide);
            });
        }
    }
    
    // Enhanced Live Chat Widget
    const chatToggle = document.querySelector('.chat-toggle');
    
    if (chatToggle) {
        // Add enhanced click effect
        chatToggle.addEventListener('click', function() {
            // Add click animation
            this.classList.add('chat-toggle-clicked');
            
            // Remove the animation class after the animation completes
            setTimeout(() => {
                this.classList.remove('chat-toggle-clicked');
            }, 300);
            
            // Here you would typically toggle a chat interface
            alert('Live chat feature coming soon!');
        });
        
        // Add hover animation pause
        chatToggle.addEventListener('mouseenter', function() {
            const widget = document.querySelector('.live-chat-widget');
            if (widget) widget.style.animationPlayState = 'paused';
        });
        
        chatToggle.addEventListener('mouseleave', function() {
            const widget = document.querySelector('.live-chat-widget');
            if (widget) widget.style.animationPlayState = 'running';
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form validation for contact form
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields correctly.');
            }
        });
    }
    
    // Add responsive classes based on screen size
    function handleResponsive() {
        const width = window.innerWidth;
        const body = document.body;
        
        if (width < 768) {
            body.classList.add('mobile');
            body.classList.remove('tablet', 'desktop');
        } else if (width < 1024) {
            body.classList.add('tablet');
            body.classList.remove('mobile', 'desktop');
        } else {
            body.classList.add('desktop');
            body.classList.remove('mobile', 'tablet');
        }
    }
    
    // Initialize and listen for resize
    handleResponsive();
    window.addEventListener('resize', handleResponsive);
});