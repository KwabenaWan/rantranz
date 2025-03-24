document.addEventListener('DOMContentLoaded', function() {
    // Service Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show all cards if 'all' is selected, otherwise filter
                serviceCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.classList.contains(filter)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Quick Quote Estimator
    const estimatorForm = document.querySelector('.estimator-form');
    const estimateResult = document.querySelector('.estimate-result');
    
    if (estimatorForm) {
        estimatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const serviceType = document.getElementById('service-type').value;
            const quantity = parseInt(document.getElementById('quantity').value);
            
            // Simple calculation based on service type and quantity
            let basePrice = 0;
            switch(serviceType) {
                case 'dealer':
                    basePrice = 500;
                    break;
                case 'shipping':
                    basePrice = 300;
                    break;
                case 'rental':
                    basePrice = 50;
                    break;
                default:
                    basePrice = 100;
            }
            
            const totalEstimate = basePrice * quantity;
            
            // Display result
            if (estimateResult) {
                estimateResult.innerHTML = `<strong>Estimated Cost:</strong> $${totalEstimate}`;
                estimateResult.classList.add('active');
                
                // Scroll to result
                estimateResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
    
    // Service Comparison Table Highlighting
    const comparisonTable = document.querySelector('.comparison-table');
    
    if (comparisonTable) {
        const tableRows = comparisonTable.querySelectorAll('tbody tr');
        
        tableRows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f0f7ff';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
        });
    }
    
    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkScroll() {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.8) {
                item.classList.add('animate-slide-in');
            }
        });
    }
    
    // Initial check and add scroll event listener
    if (timelineItems.length > 0) {
        checkScroll();
        window.addEventListener('scroll', checkScroll);
    }
    
    // Animate metrics counters
    const metricValues = document.querySelectorAll('.metric-value');
    
    function animateCounter(counter, target) {
        let count = 0;
        const duration