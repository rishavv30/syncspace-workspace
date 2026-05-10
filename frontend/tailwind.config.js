/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],

  darkMode: 'class',

  theme: {
    extend: {

      /* Fonts */
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },

      /* Colors */
      colors: {

        surface: {
          0: '#020617',
          1: '#0f172a',
          2: '#111827',
          3: '#1e293b',
          4: '#334155',
        },

        accent: {
          DEFAULT: '#22d3ee',
          hover: '#06b6d4',
          muted: '#22d3ee22',
        },

        border:
          'rgba(255,255,255,0.08)',

        success: '#10b981',

        warning: '#f59e0b',

        danger: '#ef4444',
      },

      /* Fonts Sizes */
      fontSize: {

        xs: [
          '0.75rem',
          {
            lineHeight: '1rem',
          },
        ],

        sm: [
          '0.875rem',
          {
            lineHeight: '1.25rem',
          },
        ],

        base: [
          '1rem',
          {
            lineHeight: '1.6rem',
          },
        ],

        lg: [
          '1.125rem',
          {
            lineHeight: '1.75rem',
          },
        ],

        xl: [
          '1.25rem',
          {
            lineHeight: '1.9rem',
          },
        ],
      },

      /* Shadows */
      boxShadow: {

        glow:
          '0 0 40px rgba(34,211,238,0.18)',

        card:
          '0 10px 35px rgba(0,0,0,0.35)',

        soft:
          '0 8px 24px rgba(0,0,0,0.18)',
      },

      /* Border Radius */
      borderRadius: {

        xl2: '1.25rem',

        xl3: '1.75rem',

        xl4: '2rem',
      },

      /* Backgrounds */
      backgroundImage: {

        'hero-gradient':
          'linear-gradient(135deg, rgba(34,211,238,0.18), rgba(59,130,246,0.18))',

        'glass-gradient':
          'linear-gradient(to bottom right, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',

        aurora:
          'radial-gradient(circle at top left, rgba(34,211,238,0.12), transparent 30%), radial-gradient(circle at bottom right, rgba(59,130,246,0.12), transparent 30%)',
      },

      /* Spacing */
      spacing: {

        18: '4.5rem',

        22: '5.5rem',

        26: '6.5rem',
      },

      /* Widths */
      maxWidth: {

        '8xl': '90rem',

        '9xl': '100rem',
      },

      /* Heights */
      minHeight: {

        screen75: '75vh',
      },

      /* Blur */
      backdropBlur: {

        xs: '2px',
      },

      /* Animation */
      animation: {

        'slide-up':
          'slideUp 0.45s ease-out',

        'fade-in':
          'fadeIn 0.35s ease-out',

        'scale-in':
          'scaleIn 0.3s ease-out',

        float:
          'float 5s ease-in-out infinite',

        glow:
          'glow 2.5s ease-in-out infinite alternate',

        pulseSoft:
          'pulseSoft 2s ease-in-out infinite',
      },

      /* Keyframes */
      keyframes: {

        slideUp: {

          '0%': {
            transform:
              'translateY(16px)',

            opacity: 0,
          },

          '100%': {
            transform:
              'translateY(0)',

            opacity: 1,
          },
        },

        fadeIn: {

          '0%': {
            opacity: 0,
          },

          '100%': {
            opacity: 1,
          },
        },

        scaleIn: {

          '0%': {
            transform:
              'scale(0.96)',

            opacity: 0,
          },

          '100%': {
            transform:
              'scale(1)',

            opacity: 1,
          },
        },

        float: {

          '0%, 100%': {
            transform:
              'translateY(0px)',
          },

          '50%': {
            transform:
              'translateY(-10px)',
          },
        },

        glow: {

          '0%': {
            boxShadow:
              '0 0 10px rgba(34,211,238,0.12)',
          },

          '100%': {
            boxShadow:
              '0 0 30px rgba(34,211,238,0.28)',
          },
        },

        pulseSoft: {

          '0%, 100%': {
            opacity: 1,
          },

          '50%': {
            opacity: 0.85,
          },
        },
      },

      /* Transition */
      transitionTimingFunction: {

        smooth:
          'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      /* Responsive Breakpoints */
      screens: {

        xs: '480px',

        sm: '640px',

        md: '768px',

        lg: '1024px',

        xl: '1280px',

        '2xl': '1536px',

        /* Extra Wide */
        '3xl': '1800px',
      },
    },
  },

  plugins: [],
}