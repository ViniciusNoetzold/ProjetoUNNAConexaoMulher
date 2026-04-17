/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ── Shadcn CSS-variable tokens ─────────────────── */
        background:           'var(--background)',
        foreground:           'var(--foreground)',
        border:               'var(--border)',
        input:                'var(--input)',
        ring:                 'var(--ring)',
        muted:                'var(--muted)',
        'muted-foreground':   'var(--muted-foreground)',
        accent:               'var(--accent)',
        'accent-foreground':  'var(--accent-foreground)',
        destructive:          'var(--destructive)',
        'destructive-foreground': '#ffffff',
        card:                 'var(--card)',
        'card-foreground':    'var(--card-foreground)',
        popover:              'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',

        /* ── Brand: primary maps to CSS var overridden below ─ */
        'primary-foreground': '#ffffff',

        /* ── Design System brand tokens ─────────────────── */
        surface:                  '#fff8f7',
        'surface-bright':         '#fff8f7',
        'surface-container-low':  '#fff0f1',
        'surface-container':      '#ffe9eb',
        'surface-container-high': '#ffe1e4',
        'surface-container-highest': '#ffd9de',
        'surface-container-lowest':  '#ffffff',
        'surface-variant':        '#ffd9de',
        'surface-dim':            '#ffced4',
        'on-background':          '#3e0215',
        'on-surface':             '#3e0215',
        'on-surface-variant':     '#594043',
        primary:                  '#8d0032',
        'on-primary':             '#ffffff',
        'primary-container':      '#b21b47',
        secondary:                '#9a3f5c',
        'secondary-container':    '#fd8fae',
        'on-secondary-container': '#782442',
        'inverse-surface':        '#5a1829',
        'inverse-primary':        '#ffb2bc',
        outline:                  '#8d7073',
        'outline-variant':        '#e1bec1',
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg:      '0.25rem',
        xl:      '0.5rem',
        full:    '9999px',
      },
      fontFamily: {
        headline: ['Noto Serif', 'serif'],
        body:     ['Newsreader', 'serif'],
        label:    ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
