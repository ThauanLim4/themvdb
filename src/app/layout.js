import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
export const metadata = {
  title: "TheMovieDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-black text-preto_claro ${grotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
