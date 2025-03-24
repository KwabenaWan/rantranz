document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Statistics Counter Animation
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
                const duration = 2000; // Animation duration in milliseconds
                const startTime = Date.now();
                
                // Use requestAnimationFrame for smoother animation
                function updateCounter() {
                    const currentTime = Date.now();
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    
                    // Easing function for smoother counting
                    const easeOutQuad = progress * (2 - progress);
                    
                    // Calculate current count value
                    const currentCount = Math.floor(target * easeOutQuad);
                    
                    // Update counter display
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
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove hover effects
            this.classList.remove('stat-card-hover');
            
            const number = this.querySelector('.stat-number, .milestone-number');
            if (number) {
                number.classList.remove('number-highlight');
            }
        });
    });
});