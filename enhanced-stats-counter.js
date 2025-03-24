document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Statistics Counter Animation with advanced effects
    const statNumbers = document.querySelectorAll('.stat-number, .milestone-number');
    let counted = false;
    
    function animateCounters() {
        if (counted) return;
        
        const countersSection = document.querySelector('.stats-section, .milestones-section');
        if (!countersSection) return;
        
        const sectionPosition = countersSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (sectionPosition < screenPosition) {
            statNumbers.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2500; // Animation duration in milliseconds
                const startTime = Date.now();
                
                // Use requestAnimationFrame for smoother animation
                function updateCounter() {
                    const currentTime = Date.now();
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    
                    // Easing function for smoother counting (easeOutExpo)
                    const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    
                    // Calculate current count value
                    const currentCount = Math.floor(target * easeOutExpo);
                    
                    // Update counter display with thousands separator
                    counter.innerText = currentCount.toLocaleString();
                    
                    // Continue animation if not complete
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString();
                        
                        // Add highlight effect when counter reaches target
                        counter.classList.add('counter-highlight');
                        setTimeout(() => {
                            counter.classList.remove('counter-highlight');
                        }, 500);
                    }
                }
                
                // Start the animation
                updateCounter();
            });
            
            // Add staggered animation to stat cards
            const statCards = document.querySelectorAll('.stat-card, .milestone-card');
            statCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, index * 150);
            });
            
            counted = true;
        }
    }
    
    // Check for counters on scroll
    window.addEventListener('scroll', animateCounters);
    
    // Initial check
    animateCounters();
    
    // Reset counters when they scroll out of view
    function resetCountersOnScroll() {
        const countersSection = document.querySelector('.stats-section, .milestones-section');
        if (!countersSection) return;
        
        const sectionPosition = countersSection.getBoundingClientRect().top;
        
        // If section is out of view (scrolled past it completely)
        if (sectionPosition > window.innerHeight) {
            counted = false;
            
            // Reset counter displays
            statNumbers.forEach(counter => {
                counter.innerText = '0';
                counter.classList.remove('counter-highlight');
            });
            
            // Reset stat card animations
            const statCards = document.querySelectorAll('.stat-card, .milestone-card');
            statCards.forEach(card => {
                card.classList.remove('animate-in');
            });
        }
    }
    
    // Check for counters on scroll to reset them when out of view
    window.addEventListener('scroll', resetCountersOnScroll);
    
    // Add hover effects to stat cards
    const statCards = document.querySelectorAll('.stat-card, .milestone-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Pulse animation on hover
            this.classList.add('stat-card-hover');
            
            // Highlight the number
            const number = this.querySelector('.stat-number, .milestone-number');
            if (number) {
                number.classList.add('number-highlight');
            }
            
            // Scale up the icon
            const icon = this.querySelector('.stat-icon, .milestone-icon');
            if (icon) {
                icon.classList.add('icon-highlight');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove hover effects
            this.classList.remove('stat-card-hover');
            
            const number = this.querySelector('.stat-number, .milestone-number');
            if (number) {
                number.classList.remove('number-highlight');
            }
            
            const icon = this.querySelector('.stat-icon, .milestone-icon');
            if (icon) {
                icon.classList.remove('icon-highlight');
            }
        });
    });
    
    // Add interactive effects to team member profiles
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            // Add hover class
            this.classList.add('team-member-hover');
            
            // Animate social icons
            const socialIcons = this.querySelectorAll('.team-member-social a');
            socialIcons.forEach((icon, index) => {
                setTimeout(() => {
                    icon.classList.add('social-icon-animate');
                }, index * 100);
            });
        });
        
        member.addEventListener('mouseleave', function() {
            // Remove hover class
            this.classList.remove('team-member-hover');
            
            // Reset social icons
            const socialIcons = this.querySelectorAll('.team-member-social a');
            socialIcons.forEach(icon => {
                icon.classList.remove('social-icon-animate');
            });
        });
    });
    
    // Add animation to expandable sections
    const expandableHeaders = document.querySelectorAll('.expandable-header');
    
    expandableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class
            this.classList.toggle('active');
            
            // Get the content element
            const content = this.nextElementSibling;
            
            // Toggle content visibility
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
            
            // Rotate the icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = this.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
    });
});