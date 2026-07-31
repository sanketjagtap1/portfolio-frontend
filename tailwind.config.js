/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // ---- New editorial dark system (semantic tokens) ----
        canvas: '#0a0a0b',      // page background (near-black)
        surface: '#141416',     // cards / elevated
        surface2: '#1c1c20',    // higher elevation / inputs
        ink: '#ededed',         // primary text
        muted: '#a1a1aa',       // secondary text
        faint: '#71717a',       // tertiary text
        line: '#26262a',        // borders
        accent: {
          DEFAULT: '#bef264',   // lime — bold technical accent
          soft: '#d9f99d',
          dim: '#84991f',
          ink: '#0a0a0b',       // text that sits on the accent fill
        },

        // ---- Legacy scales kept so admin/unedited views don't break ----
        primary: {
          50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
          500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a',
        },
        secondary: {
          50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24',
          500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f',
        },
        dark: {
          50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af',
          500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        shell: '1200px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out both',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(22px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
