export const theme = {
  colors: {
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
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
    background: {
      default: '#ffffff',
      paper: '#f9fafb',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      disabled: '#9ca3af',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    pill: 9999,
  },
  typography: {
    headingXL: {
      size: '2.5rem',
      weight: '700',
      lineHeight: '1.2',
    },
    headingL: {
      size: '2rem',
      weight: '600',
      lineHeight: '1.3',
    },
    headingM: {
      size: '1.5rem',
      weight: '600',
      lineHeight: '1.4',
    },
    headingS: {
      size: '1.25rem',
      weight: '600',
      lineHeight: '1.4',
    },
    body: {
      size: '1rem',
      weight: '400',
      lineHeight: '1.5',
    },
    caption: {
      size: '0.875rem',
      weight: '400',
      lineHeight: '1.5',
    },
  },
} as const;

export type Theme = typeof theme;
