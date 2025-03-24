/* Enhanced Contact Page JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    initFormValidation();
    
    // Initialize interactive map
    initMap();
    
    // Initialize FAQ functionality
    initFAQ();
    
    // Initialize instant chat
    initInstantChat();
    
    // Initialize schedule visit modal
    initScheduleVisitModal();
});

// Form validation functionality
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    const nameInput = contactForm.querySelector('#name');
    const emailInput = contactForm.querySelector('#email');
    const phoneInput = contactForm.querySelector('#phone');
    const messageInput = contactForm.querySelector('#message');
    const serviceSelect = contactForm.querySelector('#service');
    
    // Add validation icons to form groups
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        // Add validation icons
        const validationIcons = document.createElement('div');
        validationIcons.className = 'validation-icons';
        validationIcons.innerHTML = `
            <i class="fas fa-check-circle validation-icon success-icon"></i>
            <i class="fas fa-exclamation-circle validation-icon error-icon"></i>
        `;
        
        // Add error message element
        const errorMessage = document.createElement('span');
        errorMessage.className = 'error-message';
        
        // Insert elements into the form group
        const input = group.querySelector('input, select, textarea');
        if (input) {
            group.appendChild(validationIcons);
            group.appendChild(errorMessage);
        }
    });
    
    // Real-time validation
    if (nameInput) {
        nameInput.addEventListener('input', () => {
            validateField(nameInput, nameInput.value.trim().length >= 3, 'Name must be at least 3 characters');
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
            validateField(emailInput, isValid, 'Please enter a valid email address');
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            const phoneValue = phoneInput.value.trim();
            // Only validate if there's a value (phone might be optional)
            if (phoneValue.length > 0) {
                const isValid = /^[\d\s\+\-\(\)]{10,15}$/.test(phoneValue);
                validateField(phoneInput, isValid, 'Please enter a valid phone number');
            } else {
                resetValidation(phoneInput);
            }
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('input', () => {
            validateField(messageInput, messageInput.value.trim().length >= 10, 'Message must be at least 10 characters');
        });
    }
    
    if (serviceSelect) {
        serviceSelect.addEventListener('change', () => {
            validateField(serviceSelect, serviceSelect.value !== '', 'Please select a service');
        });
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Validate all fields before submission
        if (nameInput && nameInput.value.trim().length < 3) {
            validateField(nameInput, false, 'Name must be at least 3 characters');
            isValid = false;
        }
        
        if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
            validateField(emailInput, false, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (messageInput && messageInput.value.trim().length < 10) {
            validateField(messageInput, false, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (serviceSelect && serviceSelect.value === '') {
            validateField(serviceSelect, false, 'Please select a service');
            isValid = false;
        }
        
        if (!isValid) {
            e.preventDefault();
            // Scroll to the first error
            const firstError = contactForm.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            // For demo purposes, prevent actual submission and show success message
            e.preventDefault();
            showFormSuccess();
        }
    });
}

// Validate a single form field
function validateField(field, isValid, errorMessage) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (isValid) {
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        if (errorElement) errorElement.textContent = '';
    } else {
        formGroup.classList.remove('success');
        formGroup.classList.add('error');
        if (errorElement) errorElement.textContent = errorMessage;
    }
}

// Reset validation state
function resetValidation(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error', 'success');
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) errorElement.textContent = '';
}

// Show form success message
function showFormSuccess() {
    const contactForm = document.querySelector('.contact-form');
    const formContainer = document.querySelector('.form-container');
    
    if (contactForm && formContainer) {
        // Hide the form
        contactForm.style.display = 'none';
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
            <button class="btn btn-primary send-another">Send Another Message</button>
        `;
        
        // Add success message to the form container
        formContainer.appendChild(successMessage);
        
        // Add event listener to the "Send Another Message" button
        const sendAnotherBtn = successMessage.querySelector('.send-another');
        if (sendAnotherBtn) {
            sendAnotherBtn.addEventListener('click', function() {
                // Remove success message
                successMessage.remove();
                
                // Reset and show the form
                contactForm.reset();
                contactForm.style.display = 'block';
                
                // Reset validation states
                const formGroups = contactForm.querySelectorAll('.form-group');
                formGroups.forEach(group => {
                    group.classList.remove('error', 'success');
                    const errorElement = group.querySelector('.error-message');
                    if (errorElement) errorElement.textContent = '';
                });
            });
        }
    }
}

// Initialize interactive map
function initMap() {
    const mapPlaceholder = document.querySelector('.map-placeholder');
    
    if (!mapPlaceholder) return;
    
    // For demonstration purposes, we'll just add a click event to the placeholder
    // In a real implementation, you would initialize a map library like Google Maps or Leaflet
    mapPlaceholder.addEventListener('click', function() {
        const mapContainer = document.querySelector('.map-container');
        
        if (mapContainer) {
            // Replace placeholder with a message about the map
            mapContainer.innerHTML = `
                <div class="map-loading">
                    <i class="fas fa-map-marked-alt"></i>
                    <p>Map would load here with the Google Maps or Leaflet API</p>
                    <p>Our Location: 123 Logistics Avenue, Chicago, IL</p>
                    <a href="https://maps.google.com/?q=Chicago,Illinois" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i> Open in Google Maps
                    </a>
                </div>
            `;
        }
    });
}

// Initialize FAQ functionality
function initFAQ() {
    const faqContainer = document.querySelector('.faq-container');
    
    if (!faqContainer) return;
    
    // Add FAQ search functionality
    const faqSection = document.querySelector('.faq-section .container');
    if (faqSection) {
        // Add search bar before the FAQ container
        const searchBar = document.createElement('div');
        searchBar.className = 'faq-search';
        searchBar.innerHTML = `
            <input type="text" placeholder="Search frequently asked questions..." id="faq-search-input">
            <button type="button"><i class="fas fa-search"></i></button>
        `;
        
        // Add category filters
        const categories = document.createElement('div');
        categories.className = 'faq-categories';
        categories.innerHTML = `
            <div class="faq-category active" data-category="all">All</div>
            <div class="faq-category" data-category="shipping">Shipping</div>
            <div class="faq-category" data-category="dealer">Dealer Services</div>
            <div class="faq-category" data-category="rental">Car Rentals</div>
            <div class="faq-category" data-category="other">Other</div>
        `;
        
        // Insert elements before the FAQ container
        faqSection.insertBefore(categories, faqContainer);
        faqSection.insertBefore(searchBar, categories);
        
        // Add data-category attributes to FAQ items
        const faqItems = faqContainer.querySelectorAll('.faq-item');
        const categories_data = ['shipping', 'dealer', 'other'];
        faqItems.forEach((item, index) => {
            // Assign categories for demo purposes
            item.setAttribute('data-category', categories_data[index % categories_data.length]);
        });
        
        // Add search functionality
        const searchInput = searchBar.querySelector('#faq-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                faqItems.forEach(item => {
                    const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                    const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                    
                    if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }
        
        // Add category filtering
        const categoryButtons = categories.querySelectorAll('.faq-category');
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active state
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                faqItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Enhanced accordion functionality
    const faqQuestions = faqContainer.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        // Add related questions section to each FAQ item
        const faqItem = question.closest('.faq-item');
        const relatedQuestions = document.createElement('div');
        relatedQuestions.className = 'related-questions';
        relatedQuestions.innerHTML = `
            <h4>Related Questions</h4>
            <ul>
                <li><a href="#">What payment methods do you accept?</a></li>
                <li><a href="#">How long does shipping typically take?</a></li>
                <li><a href="#">Do you offer insurance for shipments?</a></li>
            </ul>
        `;
        
        faqItem.appendChild(relatedQuestions);
        
        // Add click event for accordion
        question.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            // Close all other questions
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                const answer = q.nextElementSibling;
                answer.style.maxHeight = null;
                
                // Hide related questions
                const relatedSection = q.closest('.faq-item').querySelector('.related-questions');
                if (relatedSection) relatedSection.style.display = 'none';
            });
            
            // Toggle current question
            if (!isActive) {
                this.classList.add('active');
                const answer = this.nextElementSibling;
                answer.style.maxHeight = answer.scrollHeight + 'px';
                
                // Show related questions
                const relatedSection = this.closest('.faq-item').querySelector('.related-questions');
                if (relatedSection) {
                    relatedSection.style.display = 'block';
                    // Update max height to include related questions
                    setTimeout(() => {
                        answer.style.maxHeight = answer.scrollHeight + relatedSection.scrollHeight + 'px';
                    }, 10);
                }
            }
        });
    });
    
    // Add click events to related question links
    const relatedLinks = faqContainer.querySelectorAll('.related-questions a');
    relatedLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // For demo purposes, just show an alert
            alert('This would navigate to a detailed answer page for: ' + this.textContent);
        });
    });
}

// Initialize instant chat functionality
function initInstantChat() {
    const chatToggle = document.querySelector('.chat-toggle');
    const urgentChatBtn = document.querySelector('#urgent-chat-btn');
    
    if (!chatToggle) return;
    
    // Create chat widget container if it doesn't exist
    let chatWidgetContainer = document.querySelector('.chat-widget-container');
    
    if (!chatWidgetContainer) {
        chatWidgetContainer = document.createElement('div');
        chatWidgetContainer.className = 'chat-widget-container';
        chatWidgetContainer.innerHTML = `
            <div class="chat-widget-header">
                <h3><i class="fas fa-headset"></i> Live Support</h3>
                <button class="chat-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="chat-widget-body">
                <div class="chat-messages">
                    <div class="chat-message system">
                        <p>Welcome to Ran Tranz support! How can we help you today?</p>
                        <span class="message-time">Just now</span>
                    </div>
                </div>
                <div class="chat-input-container">
                    <input type="text" class="chat-input" placeholder="Type your message here...">
                    <button class="chat-send"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        `;
        
        document.body.appendChild(chatWidgetContainer);
        
        // Add event listeners for chat functionality
        const chatClose = chatWidgetContainer.querySelector('.chat-close');
        const chatInput = chatWidgetContainer.querySelector('.chat-input');
        const chatSend = chatWidgetContainer.querySelector('.chat-send');
        const chatMessages = chatWidgetContainer.querySelector('.chat-messages');
        
        // Close chat
        chatClose.addEventListener('click', function() {
            chatWidgetContainer.classList.remove('active');
        });
        
        // Send message
        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                // Add user message
                const userMessage = document.createElement('div');
                userMessage.className = 'chat-message user';
                userMessage.innerHTML = `
                    <p>${message}</p>
                    <span class="message-time">Just now</span>
                `;
                chatMessages.appendChild(userMessage);
                
                // Clear input
                chatInput.value = '';
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate response after a short delay
                setTimeout(() => {
                    const systemMessage = document.createElement('div');
                    systemMessage.className = 'chat-message system';
                    systemMessage.innerHTML = `
                        <p>Thank you for your message. One of our representatives will respond shortly. For immediate assistance, please call our emergency hotline at (123) 456-7899.</p>
                        <span class="message-time">Just now</span>
                    `;
                    chatMessages.appendChild(systemMessage);
                    
                    // Scroll to bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        }
        
        chatSend.addEventListener('click', sendMessage);
        
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Toggle chat widget
    chatToggle.addEventListener('click', function() {
        chatWidgetContainer.classList.toggle('active');
        
        // Focus input when opening
        if (chatWidgetContainer.classList.contains('active')) {
            const chatInput = chatWidgetContainer.querySelector('.chat-input');
            if (chatInput) chatInput.focus();
        }
    });
    
    // Urgent chat button
    if (urgentChatBtn) {
        urgentChatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            chatWidgetContainer.classList.add('active');
            
            // Add urgent message
            const chatMessages = chatWidgetContainer.querySelector('.chat-messages');
            const urgentMessage = document.createElement('div');
            urgentMessage.className = 'chat-message system';
            urgentMessage.innerHTML = `
                <p><strong>URGENT SUPPORT:</strong> You've requested urgent assistance. Our team will prioritize your inquiry. How can we help you today?</p>
                <span class="message-time">Just now</span>
            `;
            chatMessages.appendChild(urgentMessage);
            
            // Focus input
            const chatInput = chatWidgetContainer.querySelector('.chat-input');
            if (chatInput) chatInput.focus();
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    }
}

// Initialize schedule visit modal
function initScheduleVisitModal() {
    const scheduleVisitBtn = document.querySelector('#schedule-visit-btn');
    const scheduleVisitModal = document.querySelector('#schedule-visit-modal');
    
    if (!scheduleVisitBtn || !scheduleVisitModal) return;
    
    // Open modal
    scheduleVisitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        scheduleVisitModal.classList.add('active');
        
        // Set minimum date to today
        const dateInput = document.querySelector('#visit-date');
        if (dateInput) {
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0
            let dd = today.getDate();
            
            // Add leading zeros if needed
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            
            const todayString = yyyy + '-' + mm + '-' + dd;
            dateInput.setAttribute('min', todayString);
            dateInput.value = todayString;
        }
    });
    
    // Close modal
    const modalClose = scheduleVisitModal.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            scheduleVisitModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    scheduleVisitModal.addEventListener('click', function(e) {
        if (e.target === scheduleVisitModal) {
            scheduleVisitModal.classList.remove('active');
        }
    });
    
    // Form submission
    const scheduleForm = scheduleVisitModal.querySelector('#schedule-form');
    if (scheduleForm) {
        scheduleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form fields
            let isValid = true;
            const nameInput = scheduleForm.querySelector('#visit-name');
            const emailInput = scheduleForm.querySelector('#visit-email');
            const phoneInput = scheduleForm.querySelector('#visit-phone');
            const dateInput = scheduleForm.querySelector('#visit-date');
            const timeInput = scheduleForm.querySelector('#visit-time');
            
            if (nameInput && nameInput.value.trim().length < 3) {
                validateField(nameInput, false, 'Name must be at least 3 characters');
                isValid = false;
            }
            
            if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
                validateField(emailInput, false, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (phoneInput && phoneInput.value.trim().length > 0) {
                const isValidPhone = /^[\d\s\+\-\(\)]{10,15}$/.test(phoneInput.value.trim());
                validateField(phoneInput, isValidPhone, 'Please enter a valid phone number');
                if (!isValidPhone) isValid = false;
            }
            
            if (dateInput && !dateInput.value) {
                validateField(dateInput, false, 'Please select a date');
                isValid = false;
            }
            
            if (timeInput && timeInput.value === '') {
                validateField(timeInput, false, 'Please select a time');
                isValid = false;
            }
            
            if (!isValid) {
                // Scroll to the first error
                const firstError = scheduleForm.querySelector('.form-group.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }
            
            // Show success message
            scheduleForm.innerHTML = `
                <div class="form-success-message">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Visit Scheduled!</h3>
                    <p>Your visit has been scheduled successfully. We'll send a confirmation email with all the details.</p>
                    <p><strong>Date:</strong> ${dateInput.value}</p>
                    <p><strong>Time:</strong> ${timeInput.value}</p>
                    <button class="btn btn-primary close-modal-btn">Close</button>
                </div>
            `;
            
            // Add event listener to close button
            const closeBtn = scheduleForm.querySelector('.close-modal-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    scheduleVisitModal.classList.remove('active');
                });
            }
        });
    }
}