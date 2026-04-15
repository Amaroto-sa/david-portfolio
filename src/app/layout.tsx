import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    title: "David - Design Portfolio",
    description: "Web and Graphic Designer Portfolio — Showcasing premium UI/UX, brand identity, and web development work.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Add suppressHydrationWarning to body so next.js ignores the manual dark class addition
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} ${playfair.variable} font-sans bg-white dark:bg-black text-black dark:text-white transition-colors duration-500`} suppressHydrationWarning>
                <ThemeToggle />
                <PageTransition>
                    {children}
                </PageTransition>
            </body>
        </html>
    );
}
