/**
 * Image Loader - Handles progressive image loading and blur-up effects
 * Enhanced with localStorage caching, performance monitoring, and responsive loading
 */

document.addEventListener('DOMContentLoaded', function() {
    // Preload critical hero images
    preloadHeroImages();
    
    // Initialize blur-up effect for all images with the blur-up class
    initBlurUpImages();
    
    // Initialize performance monitoring
    initPerformanceMonitoring();
    
    // Initialize localStorage caching
    initImageCaching();
    
    // Initialize responsive loading
    initResponsiveLoading();
});

/**
 * Initialize blur-up effect for images
 */
function initBlurUpImages() {
    const blurUpImages = document.querySelectorAll('.blur-up');
    
    blurUpImages.forEach(img => {
        // If image is already loaded (from cache)
        if (img.complete) {
            img.classList.add('loaded');
            const lqip = img.closest('.progressive-image-container')?.querySelector('.lqip');
            if (lqip) lqip.classList.add('hidden');
        } else {
            // Add load event listener
            img.addEventListener('load', function() {
                img.classList.add('loaded');
                const lqip = img.closest('.progressive-image-container')?.querySelector('.lqip');
                if (lqip) lqip.classList.add('hidden');
            });
        }
    });
}

/**
 * Initialize performance monitoring
 */
function initPerformanceMonitoring() {
    if (window.performance && window.performance.getEntriesByType) {
        // Wait for all resources to load
        window.addEventListener('load', function() {
            setTimeout(function() {
                // Get all image resources
                const imageResources = window.performance.getEntriesByType('resource')
                    .filter(resource => resource.initiatorType === 'img');
                
                // Log image loading performance
                console.log('Image Loading Performance:', imageResources.map(resource => {
                    return {
                        name: resource.name.split('/').pop(),
                        duration: Math.round(resource.duration) + 'ms',
                        size: resource.transferSize ? (resource.transferSize / 1024).toFixed(2) + 'KB' : 'Cached'
                    };
                }));
                
                // Track total loading time for hero images
                const heroImages = imageResources.filter(resource => 
                    resource.name.includes('Dealer Network') || 
                    resource.name.includes('Global Shipping') || 
                    resource.name.includes('Premium Fleet'));
                
                if (heroImages.length > 0) {
                    const totalLoadTime = heroImages.reduce((total, img) => total + img.duration, 0);
                    const avgLoadTime = Math.round(totalLoadTime / heroImages.length);
                    console.log(`Hero images average load time: ${avgLoadTime}ms`);
                }
            }, 1000);
        });
    }
}

/**
 * Preload images for better performance
 * @param {string} src - Image source URL
 */
function preloadImage(src) {
    const img = new Image();
    img.src = src;
}

/**
 * Preload critical hero images
 */
function preloadHeroImages() {
    // Preload first slide image (visible on page load)
    preloadImage('images/Dealer Network Slide.jpg');
    
    // Preload other hero images with lower priority
    setTimeout(() => {
        preloadImage('images/Global Shipping Slide.png');
        preloadImage('images/Premium Fleet.jpg');
    }, 1000);
}

/**
 * Initialize localStorage caching for images
 */
function initImageCaching() {
    // Check if browser supports localStorage
    if (!window.localStorage) return;
    
    // List of hero images to cache
    const heroImages = [
        'images/Dealer Network Slide.jpg',
        'images/Global Shipping Slide.png',
        'images/Premium Fleet.jpg'
    ];
    
    // Cache version for invalidation
    const CACHE_VERSION = '1.0';
    const currentVersion = localStorage.getItem('image_cache_version');
    
    // Clear cache if version changed
    if (currentVersion !== CACHE_VERSION) {
        // Clear previous image cache entries
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('img_cache_')) {
                localStorage.removeItem(key);
            }
        });
        localStorage.setItem('image_cache_version', CACHE_VERSION);
    }
    
    // Process each hero image
    heroImages.forEach(imageSrc => {
        const cacheKey = 'img_cache_' + imageSrc.replace(/[^a-zA-Z0-9]/g, '_');
        
        // Check if image is already cached
        if (!localStorage.getItem(cacheKey)) {
            // Load image and cache it
            const img = new Image();
            img.crossOrigin = 'Anonymous'; // Enable CORS for canvas operations
            img.onload = function() {
                try {
                    // Create canvas to get image data
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    
                    // Store image data in localStorage (if not too large)
                    const dataURL = canvas.toDataURL('image/jpeg', 0.5); // Compress to save space
                    
                    // Only cache if size is reasonable (< 2MB)
                    if (dataURL.length < 2000000) {
                        localStorage.setItem(cacheKey, dataURL);
                        console.log(`Cached image: ${imageSrc}`);
                    }
                } catch (e) {
                    console.warn(`Failed to cache image ${imageSrc}:`, e);
                }
            };
            img.src = imageSrc;
        }
    });
    
    // Apply cached images if available
    document.querySelectorAll('.hero-bg').forEach(img => {
        const src = img.getAttribute('src');
        const cacheKey = 'img_cache_' + src.replace(/[^a-zA-Z0-9]/g, '_');
        const cachedImage = localStorage.getItem(cacheKey);
        
        if (cachedImage) {
            // Use cached version first, then load the real image
            img.src = cachedImage;
            console.log(`Using cached image for: ${src}`);
            
            // Still load the real image for freshness
            setTimeout(() => {
                const realImg = new Image();
                realImg.onload = function() {
                    img.src = src; // Replace with real image once loaded
                };
                realImg.src = src;
            }, 100);
        }
    });
}

/**
 * Initialize responsive loading for images
 */
function initResponsiveLoading() {
    // Get device pixel ratio for high-DPI displays
    const pixelRatio = window.devicePixelRatio || 1;
    
    // Get viewport width
    const viewportWidth = window.innerWidth;
    
    // Set appropriate image size based on viewport
    let imageSize;
    if (viewportWidth <= 768) {
        imageSize = 'small';
    } else if (viewportWidth <= 1200) {
        imageSize = 'medium';
    } else {
        imageSize = 'large';
    }
    
    // Add data attributes for responsive loading
    document.querySelectorAll('.hero-bg').forEach(img => {
        img.setAttribute('data-size', imageSize);
        img.setAttribute('data-pixel-ratio', pixelRatio);
    });
    
    // Add viewport change listener
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Update image sizes on viewport change
            const newViewportWidth = window.innerWidth;
            let newImageSize;
            
            if (newViewportWidth <= 768) {
                newImageSize = 'small';
            } else if (newViewportWidth <= 1200) {
                newImageSize = 'medium';
            } else {
                newImageSize = 'large';
            }
            
            // Only update if size changed
            if (newImageSize !== imageSize) {
                imageSize = newImageSize;
                document.querySelectorAll('.hero-bg').forEach(img => {
                    img.setAttribute('data-size', imageSize);
                });
            }
        }, 200);
    });
}