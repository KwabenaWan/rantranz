document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Service Filtering
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
                
                // Animate filtering with fade effect
                serviceCards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        if (filter === 'all') {
                            card.style.display = 'block';
                        } else {
                            if (card.classList.contains(filter)) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        }
                        
                        setTimeout(() => {
                            if (card.style.display === 'block') {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }
                        }, 50);
                    }, 300);
                });
            });
        });
    }
    
    // Enhanced Quick Quote Estimator
    const estimatorForm = document.querySelector('.estimator-form');
    const estimateResult = document.querySelector('.estimate-result');
    
    if (estimatorForm) {
        estimatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const serviceType = document.getElementById('service-type').value;
            const quantity = parseInt(document.getElementById('quantity').value);
            const duration = document.getElementById('duration') ? parseInt(document.getElementById('duration').value) : 1;
            const distance = document.getElementById('distance') ? parseInt(document.getElementById('distance').value) : 0;
            
            // More detailed calculation based on service type and additional factors
            let basePrice = 0;
            let additionalFees = 0;
            let discountRate = 1.0;
            
            switch(serviceType) {
                case 'dealer':
                    basePrice = 500;
                    // Apply volume discount
                    if (quantity >= 5) discountRate = 0.9;
                    if (quantity >= 10) discountRate = 0.85;
                    break;
                case 'shipping':
                    basePrice = 300;
                    // Add distance fee
                    if (distance > 0) {
                        additionalFees = Math.min(distance * 0.5, 500); // Cap at $500
                    }
                    // Apply volume discount
                    if (quantity >= 3) discountRate = 0.95;
                    if (quantity >= 5) discountRate = 0.9;
                    break;
                case 'rental':
                    basePrice = 50;
                    // Apply duration discount
                    if (duration >= 7) discountRate = 0.9;
                    if (duration >= 30) discountRate = 0.8;
                    // Calculate based on duration
                    additionalFees = (duration - 1) * basePrice * discountRate;
                    break;
                default:
                    basePrice = 100;
            }
            
            const subtotal = (basePrice * quantity * discountRate) + additionalFees;
            const tax = subtotal * 0.08; // 8% tax
            const totalEstimate = subtotal + tax;
            
            // Display detailed result
            if (estimateResult) {
                estimateResult.innerHTML = `
                    <div class="estimate-breakdown">
                        <h4>Estimate Breakdown</h4>
                        <div class="estimate-row">
                            <span>Base Price:</span>
                            <span>$${basePrice.toFixed(2)}</span>
                        </div>
                        <div class="estimate-row">
                            <span>Quantity/Duration:</span>
                            <span>${serviceType === 'rental' ? duration + ' days' : quantity + ' units'}</span>
                        </div>
                        ${additionalFees > 0 ? `
                        <div class="estimate-row">
                            <span>Additional Fees:</span>
                            <span>$${additionalFees.toFixed(2)}</span>
                        </div>` : ''}
                        ${discountRate < 1.0 ? `
                        <div class="estimate-row">
                            <span>Discount Applied:</span>
                            <span>${((1 - discountRate) * 100).toFixed(0)}%</span>
                        </div>` : ''}
                        <div class="estimate-row">
                            <span>Subtotal:</span>
                            <span>$${subtotal.toFixed(2)}</span>
                        </div>
                        <div class="estimate-row">
                            <span>Estimated Tax:</span>
                            <span>$${tax.toFixed(2)}</span>
                        </div>
                        <div class="estimate-row total">
                            <span>Total Estimate:</span>
                            <span>$${totalEstimate.toFixed(2)}</span>
                        </div>
                    </div>
                    <p class="estimate-note">This is an estimate only. Final pricing may vary based on specific requirements.</p>
                    <button class="btn btn-primary request-quote">Request Detailed Quote</button>
                `;
                estimateResult.classList.add('active');
                
                // Add event listener to the request quote button
                const requestQuoteBtn = estimateResult.querySelector('.request-quote');
                if (requestQuoteBtn) {
                    requestQuoteBtn.addEventListener('click', function() {
                        window.location.href = 'contact.html?service=' + serviceType;
                    });
                }
                
                // Scroll to result with smooth animation
                estimateResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
    
    // Animated Metrics Counters
    const metricValues = document.querySelectorAll('.metric-value');
    let countersStarted = false;
    
    function startCounters() {
        if (countersStarted) return;
        
        metricValues.forEach(counter => {
            const target = parseFloat(counter.textContent.replace(/,/g, '').replace(/\+/g, ''));
            const suffix = counter.textContent.includes('+') ? '+' : '';
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            counter.textContent = '0' + suffix;
            
            const updateCounter = () => {
                count += increment;
                if (count < target) {
                    // Format with commas for thousands
                    counter.textContent = Math.floor(count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
                }
            };
            
            requestAnimationFrame(updateCounter);
        });
        
        countersStarted = true;
    }
    
    // Check if metrics section is in viewport and start counters
    function checkMetricsVisibility() {
        const metricsSection = document.querySelector('.metrics-section');
        if (!metricsSection) return;
        
        const rect = metricsSection.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0);
        
        if (isVisible) {
            startCounters();
            // Remove scroll listener once counters have started
            window.removeEventListener('scroll', checkMetricsVisibility);
        }
    }
    
    // Initial check and add scroll event listener for metrics
    if (metricValues.length > 0) {
        checkMetricsVisibility();
        window.addEventListener('scroll', checkMetricsVisibility);
    }
    
    // Enhanced Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimelineVisibility() {
        timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0);
            
            if (isVisible) {
                // Add delay based on index for cascade effect
                setTimeout(() => {
                    item.classList.add('animate-slide-in');
                }, index * 200);
            }
        });
    }
    
    // Initial check and add scroll event listener for timeline
    if (timelineItems.length > 0) {
        checkTimelineVisibility();
        window.addEventListener('scroll', checkTimelineVisibility);
    }
    
    // Enhanced Service Comparison Table
    const comparisonTable = document.querySelector('.comparison-table');
    
    if (comparisonTable) {
        const tableRows = comparisonTable.querySelectorAll('tbody tr');
        const tableColumns = comparisonTable.querySelectorAll('th');
        
        // Row highlighting
        tableRows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f0f7ff';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
        });
        
        // Column highlighting (except first column which contains feature names)
        if (tableColumns.length > 1) {
            for (let i = 1; i < tableColumns.length; i++) {
                tableColumns[i].addEventListener('mouseenter', function() {
                    const columnIndex = Array.from(this.parentNode.children).indexOf(this);
                    
                    // Highlight header
                    this.style.backgroundColor = 'var(--primary-color)';
                    this.style.color = 'white';
                    
                    // Highlight cells in this column
                    tableRows.forEach(row => {
                        const cell = row.children[columnIndex];
                        if (cell) {
                            cell.style.backgroundColor = '#f0f7ff';
                        }
                    });
                });
                
                tableColumns[i].addEventListener('mouseleave', function() {
                    const columnIndex = Array.from(this.parentNode.children).indexOf(this);
                    
                    // Reset header
                    this.style.backgroundColor = '';
                    this.style.color = '';
                    
                    // Reset cells in this column
                    tableRows.forEach(row => {
                        const cell = row.children[columnIndex];
                        if (cell) {
                            cell.style.backgroundColor = '';
                        }
                    });
                });
            }
        }
    }
    
    // Case Study Cards Animation
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    
    function checkCaseStudyVisibility() {
        caseStudyCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0);
            
            if (isVisible) {
                // Add delay based on index for cascade effect
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }
    
    // Set initial styles and add scroll event listener for case studies
    if (caseStudyCards.length > 0) {
        caseStudyCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        checkCaseStudyVisibility();
        window.addEventListener('scroll', checkCaseStudyVisibility);
    }
    
    // Infographic Items Animation
    const infographicItems = document.querySelectorAll('.infographic-item');
    
    function checkInfographicVisibility() {
        infographicItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0);
            
            if (isVisible) {
                // Add delay based on index for cascade effect
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }
    
    // Set initial styles and add scroll event listener for infographic items
    if (infographicItems.length > 0) {
        infographicItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        checkInfographicVisibility();
        window.addEventListener('scroll', checkInfographicVisibility);
    }
});