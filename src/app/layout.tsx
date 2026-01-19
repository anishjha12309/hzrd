import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/smooth-scroll";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/navbar";

import { ThemeProvider } from "@/components/theme-provider";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "HZRD | INDIA GLOBAL",
  description: "Limited Edition Streetwear. Made for the Bold.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${oswald.variable} ${inter.variable} antialiased bg-[#F4F4F0] text-black font-sans selection:bg-black selection:text-white overflow-x-hidden`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            forcedTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
          <SmoothScroll>
             <Navbar />
             {children}
             <Toaster richColors closeButton />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
