/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        branco: "var(--branco)",
        branco_2: "var(--branco-2)",
        cinza: "var(--cinza)",
        preto_claro: "var(--preto-claro)",
        preto_escuro: "var(--preto-escuro)",
        laranja: "var(--laranja)",
      },
      gridTemplateColumns: {
        "colunas1/0.5": "0.5fr 1fr",
      },
      gridTemplateRows: {
        "linhas0.5": "repeat(4, 0.5fr)",
        "linhas0.5/1": "0.3fr 0.7fr ",
        "linhas0.3/1/0.5/0.5": "0.3fr 0.5fr 0.5fr 0.5fr",
        "template-infos": "0.2fr 0.5fr 1fr 0.2fr",
        "template-infos-h-fixed": "20px 35px 60px 30px",
        "template-infos-h-fixed-mobile": "15px 35px 50px 25px",
        "template-infos-mob": "0.5fr 1fr 0.2fr",
      },
      height: {
        425: "425px",
      },
      maxHeight: {
        50: "50px",
        425: "425px",
      },
    },
  },
  plugins: [],
};
