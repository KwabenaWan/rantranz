document.addEventListener('DOMContentLoaded', function() {
    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateTimelineOnScroll() {
        timelineItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (itemPosition < screenPosition) {
                item.classList.add('animate-in');
            }
        });
    }
    
    // Initial check for items in viewport
    animateTimelineOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateTimelineOnScroll);
    
    // Timeline Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter timeline items
            timelineItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, 100);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('animate-in');
                }
            });
        });
    });
    
    // Expandable Content
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active class on button
            this.classList.toggle('active');
            
            // Get expanded content
            const expandedContent = this.nextElementSibling;
            
            // Toggle active class on expanded content
            expandedContent.classList.toggle('active');
        });
    });
    
    // Statistics Counter Animation
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
                const count = +counter.innerText;
                const increment = target / 100;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(() => animateCounters(), 20);
                } else {
                    counter.innerText = target;
                }
            });
            
            counted = true;
        }
    }
    
    // Check for counters on scroll
    window.addEventListener('scroll', animateCounters);
    
    // Expandable Sections
    const expandableHeaders = document.querySelectorAll('.expandable-header');
    
    expandableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on the header
            this.classList.toggle('active');
            
            // Toggle the icon rotation
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = this.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
            
            // Toggle the content visibility
            const content = this.nextElementSibling;
            if (content) {
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            }
        });
    });
    
    // Scroll Animation for Elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function animateElementsOnScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                const animation = element.getAttribute('data-animation') || 'fade-in';
                element.classList.add('animate-' + animation);
            }
        });
    }
    
    // Initial check for elements in viewport
    animateElementsOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateElementsOnScroll);
    
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
            });
        }
    }
    
    // Check for counters on scroll to reset them when out of view
    window.addEventListener('scroll', resetCountersOnScroll);
    
    // Parallax Effect
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    function updateParallax() {
        parallaxSections.forEach(section => {
            const scrollPosition = window.pageYOffset;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Check if section is in viewport
            if (scrollPosition + window.innerHeight > sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                
                // Calculate parallax offset
                const yOffset = (scrollPosition - sectionTop) * 0.5;
                
                // Apply parallax effect
                section.style.backgroundPositionY = `calc(50% + ${yOffset}px)`;
            }
        });
    }
    
    // Update parallax on scroll
    window.addEventListener('scroll', updateParallax);
    
    // Initial parallax update
    updateParallax();