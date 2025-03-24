document.addEventListener('DOMContentLoaded', function() {
    // Animate value cards on scroll
    const valueCards = document.querySelectorAll('.value-card');
    
    function animateValueCards() {
        valueCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.classList.add('animate-in');
            }
        });
    }
    
    // Initial check for cards in viewport
    animateValueCards();
    
    // Check on scroll
    window.addEventListener('scroll', animateValueCards);
    
    // Add interactive effects to value cards
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add hover class
            this.classList.add('value-card-hover');
            
            // Animate icon
            const icon = this.querySelector('.value-icon');
            if (icon) {
                icon.classList.add('icon-animate');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove hover class
            this.classList.remove('value-card-hover');
            
            // Reset icon animation
            const icon = this.querySelector('.value-icon');
            if (icon) {
                icon.classList.remove('icon-animate');
            }
        });
    });
    
    // Add interactive effects to leadership profiles
    const leadershipProfiles = document.querySelectorAll('.leadership-profile');
    
    leadershipProfiles.forEach(profile => {
        profile.addEventListener('mouseenter', function() {
            // Add hover class
            this.classList.add('profile-hover');
            
            // Animate social icons
            const socialIcons = this.querySelectorAll('.profile-social a');
            socialIcons.forEach((icon, index) => {
                setTimeout(() => {
                    icon.classList.add('social-icon-animate');
                }, index * 100);
            });
        });
        
        profile.addEventListener('mouseleave', function() {
            // Remove hover class
            this.classList.remove('profile-hover');
            
            // Reset social icons
            const socialIcons = this.querySelectorAll('.profile-social a');
            socialIcons.forEach(icon => {
                icon.classList.remove('social-icon-animate');
            });
        });
    });
    
    // Add animation to expandable sections in leadership profiles
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