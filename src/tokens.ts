// Design tokens for consistent styling across the application

export const colors = {
  // Primary colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  
  // Gray scale
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Dark theme colors
  dark: {
    50: '#f7fafc',
    100: '#e2e8f0',
    200: '#cbd5e0',
    300: '#a0aec0',
    400: '#718096',
    500: '#4a5568',
    600: '#2d3748',
    700: '#1a202c',
    800: '#1a1a1a',
    900: '#000000',
  },
  
  // Status colors
  success: {
    500: '#10b981',
    600: '#059669',
  },
  
  error: {
    500: '#ef4444',
    600: '#dc2626',
  },
  
  warning: {
    500: '#f59e0b',
    600: '#d97706',
  },
  
  // Brand colors
  github: '#1a202c',
  githubHover: '#2d3748',
  
  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    error: 'linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)',
  },
};

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
};

export const borderRadius = {
  none: '0',
  sm: '3px',
  default: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '50%',
};

export const fontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '2rem',    // 32px
  '4xl': '2.5rem',  // 40px
  '5xl': '3rem',    // 48px
  '6xl': '3.5rem',  // 56px
};

export const fontWeights = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  button: '0 4px 12px rgba(0, 0, 0, 0.15)',
  buttonHover: '0 2px 8px rgba(0, 0, 0, 0.15)',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const transitions = {
  fast: 'all 0.1s ease-in-out',
  default: 'all 0.2s ease-in-out',
  slow: 'all 0.3s ease-in-out',
};

export const zIndex = {
  dropdown: 50,
  overlay: 75,
  modal: 100,
  header: 100,
  tooltip: 200,
};

// Common layout values
export const layout = {
  maxWidth: '1280px',
  containerPadding: '2rem',
  containerPaddingMobile: '1rem',
  headerHeight: '64px',
};