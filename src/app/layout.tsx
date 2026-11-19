import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:"Big Bite : Crave It. Tap It. Get It.",
    template: "%s | BigBite",},
    description:
    "Discover delicious pizzas, explore local restaurants, and get your favourites delivered fresh to your doorstep with BigBite.",
   
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      {children}
      </body>
    </html>
  );
}
