/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary:'#ff5c00',
  			secondary:'#964B00',
  			tertiary: '#e8ede4',
  			quarternary: '#acbec3',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		animation: {
  			'ping-reverse-slow': 'ping-reverse 2s cubic-bezier(0, 0, 0.2, 1) infinite',
			glow: 'glow 2s ease-in-out infinite',
			shine: 'shine 5s linear infinite',
  		},
  		keyframes: {
  			'ping-reverse': {
  				'0%': {
  					transform: 'scale(2)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'scale(1)',
  					opacity: '0'
  				}
  			},
			glow: {
          '0%, 100%': { boxShadow: '0 0 15px #38bdf8, 0 0 30px #0ea5e9, 0 0 45px #3b82f6' },
          '50%': { boxShadow: '0 0 25px #38bdf8, 0 0 50px #0ea5e9, 0 0 75px #3b82f6' },
        },
		shine: { 
        '0%': { 'background-position': '100%' }, 
        '100%': { 'background-position': '-100%' }, 
         	   },
		
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} 