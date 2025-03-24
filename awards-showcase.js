document.addEventListener('DOMContentLoaded', function() {
    // Animate award cards on scroll
    const awardCards = document.querySelectorAll('.award-card');
    
    function animateAwardCards() {
        awardCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                // Add staggered animation delay based on card index
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, index * 150);
            }
        });
    }
    
    // Initial check for cards in viewport
    animateAwardCards();
    
    // Check on scroll
    window.addEventListener('scroll', animateAwardCards);
    
    // Add interactive effects to award cards
    awardCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add hover class
            this.classList.add('award-card-hover');
            
            // Animate icon
            const icon = this.querySelector('.award-icon');
            if (icon) {
                icon.classList.add('icon-animate');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove hover class
            this.classList.remove('award-card-hover');
            
            // Reset icon animation
            const icon = this.querySelector('.award-icon');
            if (icon) {
                icon.classList.remove('icon-animate');
            }
        });
    });
    
    // Add filter functionality for awards
    const awardFilterButtons = document.querySelectorAll('.award-filter-btn');
    
    if (awardFilterButtons.length > 0) {
        awardFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                awardFilterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter award cards
                awardCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, 100);
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('animate-in');
                    }
                });
            });
        });
    }
});