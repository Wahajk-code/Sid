import type { Metadata } from "next";
import { Playfair_Display, Nunito } from "next/font/google";
import "./globals.css";
import HeartCursor from "@/components/HeartCursor";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Will You Be My Valentine? 💖",
  description: "A special question for a special person.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💖</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${nunito.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden bg-romantic-50 selection:bg-romantic-200 selection:text-romantic-900">
        <HeartCursor />
        {children}
      </body>
    </html>
  );
}
