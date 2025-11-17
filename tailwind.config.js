/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        xxl: '32px',
        xxxl: '48px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        pill: '9999px',
      },
      fontSize: {
        'heading-xl': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-l': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-m': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-s': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};
