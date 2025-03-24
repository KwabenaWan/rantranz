document.addEventListener('DOMContentLoaded', function() {
    // Partner Logos Animation
    const partnerLogos = document.querySelectorAll('.partner-logo');
    
    function animatePartnersOnScroll() {
        partnerLogos.forEach((logo, index) => {
            const logoPosition = logo.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.1;
            
            if (logoPosition < screenPosition) {
                // Add staggered delay based on index
                setTimeout(() => {
                    logo.classList.add('animate-in');
                }, 100 * index);
            }
        });
    }
    
    // Initial check for logos in viewport
    animatePartnersOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animatePartnersOnScroll);
});