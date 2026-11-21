
"use client";

import Link from "next/link";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "../ui/shared/logo";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="w-full border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="font-medium hover:text-brand">
            Home
          </Link>

          <Link href="/menu" className="font-medium hover:text-brand">
            Menu
          </Link>
        </div>

        {/* Actions */}
        <div className="hidden items-center gap-4 md:flex">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-lg p-2 hover:bg-muted"
          >
            {theme === "light" ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} />
            )}
          </button>

          <Link href="/sign-in" className="font-medium hover:text-brand">
            Sign In
          </Link>

          <Link
            href="/sign-up"
            className="rounded-lg bg-brand px-5 py-2 text-white hover:bg-brand-dark"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="flex flex-col gap-4 border-t border-border px-4 py-4 md:hidden">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>

          <Link href="/menu" onClick={() => setIsMenuOpen(false)}>
            Menu
          </Link>

          <button onClick={toggleTheme} className="flex items-center gap-2">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            Toggle theme
          </button>

          <Link href="/sign-in">Sign In</Link>
          <Link href="/sign-up">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}
