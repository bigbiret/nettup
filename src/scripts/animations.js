/**
 * Animation Module for Nettup
 * Handles all scroll-triggered animations with Intersection Observer
 */

class AnimationController {
  constructor() {
    this.observers = new Map();
    this.defaultOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };
  }

  /**
   * Initialize all animations
   */
  init() {
    this.initScrollAnimations();
    this.initPerformanceOptimizations();
  }

  /**
   * Set up scroll-triggered animations
   */
  initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length === 0) return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Skip animations for users who prefer reduced motion
      animateElements.forEach(element => {
        element.classList.add('animated');
      });
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animated class with a slight delay for smooth appearance
          requestAnimationFrame(() => {
            entry.target.classList.add('animated');
          });
          
          // Optional: Stop observing after animation
          // Uncomment if you want animations to run only once
          // observer.unobserve(entry.target);
        }
      });
    }, this.defaultOptions);
    
    animateElements.forEach(element => {
      observer.observe(element);
    });
    
    // Store observer for cleanup if needed
    this.observers.set('scroll', observer);
  }

  /**
   * Performance optimizations
   */
  initPerformanceOptimizations() {
    // Remove will-change after animations complete
    document.addEventListener('animationend', (e) => {
      if (e.target.classList.contains('why-choose-icon')) {
        // Remove will-change to free up memory
        e.target.style.willChange = 'auto';
        
        // Re-add it before the next animation cycle
        setTimeout(() => {
          e.target.style.willChange = 'transform, opacity';
        }, 100);
      }
    });
    
    // Pause animations when not visible
    let hidden, visibilityChange;
    
    if (typeof document.hidden !== "undefined") {
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }
    
    if (typeof document[hidden] !== "undefined") {
      document.addEventListener(visibilityChange, () => {
        const animations = document.querySelectorAll('.why-choose-icon');
        animations.forEach(element => {
          element.style.animationPlayState = document[hidden] ? 'paused' : 'running';
        });
      });
    }
  }

  /**
   * Clean up observers
   */
  destroy() {
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers.clear();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const animationController = new AnimationController();
    animationController.init();
  });
} else {
  // DOM is already loaded
  const animationController = new AnimationController();
  animationController.init();
}

// Export for use in other modules if needed
export default AnimationController;