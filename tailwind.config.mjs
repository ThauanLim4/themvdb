/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			branco: 'var(--branco)',
  			branco_2: 'var(--branco-2)',
  			cinza: 'var(--cinza)',
  			preto_claro: 'var(--preto-claro)',
  			preto_escuro: 'var(--preto-escuro)',
  			laranja: 'var(--laranja)',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
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
  		gridTemplateColumns: {
  			'colunas1/0.5': '0.5fr 1fr',
  			'colunas0.7/1': '0.7fr 1fr'
  		},
  		gridTemplateRows: {
  			'linhas0.5': 'repeat(4, 0.5fr)',
  			'linhas0.5/1': '0.3fr 0.7fr ',
  			'linhas0.3/1/0.5/0.5': '0.3fr 0.5fr 0.5fr 0.5fr',
  			'template-infos': '0.2fr 0.5fr 1fr 0.2fr',
  			'template-infos-h-fixed': '20px 35px 60px 30px',
  			'template-infos-h-fixed-mobile': '15px 35px 50px 25px',
  			'template-infos-mob': '0.5fr 1fr 0.2fr'
  		},
  		height: {
  			'425': '425px',
			24: "24px"
  		},
		width: {
			24: '24px',
		},
  		maxHeight: {
  			'50': '50px',
  			'425': '425px',
  			'750': '750px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
