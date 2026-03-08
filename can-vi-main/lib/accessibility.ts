/**
 * Accessibility utilities for WCAG 2.1 AA compliance
 */

export const a11y = {
  // Focus management
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent',
  
  // Reduced motion support
  reduceMotion: 'motion-reduce:animate-none',
  
  // Skip to main content link
  skipLink: 'sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-primary focus:text-white focus:rounded',
  
  // Visually hidden content for screen readers only
  srOnly: 'sr-only',
  
  // Touch target minimum size (44x44px recommended by WCAG)
  touchTarget: 'min-h-11 min-w-11',
  
  // Color contrast helpers
  highContrast: 'dark:text-white dark:bg-black text-black bg-white',
};

/**
 * Get ARIA label for interactive elements
 */
export function getAriaLabel(text: string, description?: string): string {
  return description ? `${text}, ${description}` : text;
}

/**
 * Check if element should have reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Generate accessible heading structure
 */
export function headingLevel(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const sizes = {
    1: 'text-4xl',
    2: 'text-3xl',
    3: 'text-2xl',
    4: 'text-xl',
    5: 'text-lg',
    6: 'text-base',
  };
  return sizes[level];
}
