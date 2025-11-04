/**
 * Animation Configuration
 * Centralized configuration for all animations
 */

export const animationConfig = {
  // Intersection Observer settings
  scrollTrigger: {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  },
  
  // Animation durations
  durations: {
    lightning: 3000,
    lock: 4000,
    chart: 2500,
    book: 3000
  },
  
  // Animation delays
  delays: {
    lightning: 500,
    lock: 1000,
    chart: {
      bar1: 200,
      bar2: 400,
      bar3: 600
    },
    book: 1500
  },
  
  // Easing functions
  easing: {
    default: 'ease-out',
    smooth: 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  
  // Performance settings
  performance: {
    enableGPU: true,
    pauseWhenHidden: true,
    respectReducedMotion: true,
    unobserveAfterAnimation: false
  },
  
  // Breakpoints for responsive animations
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1440
  }
};

export default animationConfig;