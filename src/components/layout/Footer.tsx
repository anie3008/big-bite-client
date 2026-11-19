
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {
    FaFacebook,
  FaInstagramSquare,
  FaYoutube,
  
} from "react-icons/fa"
import { Logo } from "../ui/shared/logo";

export default function Footer() {
  return (
    <footer className="bg-[#2B2022] text-[#F8E9E5]">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
              <Logo />

            <p className="mt-4 max-w-xs text-sm leading-6 text-[#BFA9A7]">
              Delicious pizzas, made with love and delivered fresh
              to your doorstep. Your next favourite bite is just
              a few clicks away!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>

            <ul className="space-y-3 text-sm text-[#BFA9A7]">
              <li>
                <Link href="/" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-white">Menu</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white">Sign In</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white">Sign Up</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold">Contact Us</h3>

            <ul className="space-y-4 text-sm text-[#BFA9A7]">
              <li className="flex items-center gap-3">
                <Mail size={18} />
                <a href="mailto:hello@bigbite.com" className="hover:text-white">
                  hello@bigbite.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={18} />
                <a href="tel:+8801234567890" className="hover:text-white">
                  +880 1234-567890
                </a>
              </li>

              <li className="flex items-center gap-3">
                <MapPin size={18} />
                <span>Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 font-semibold">Follow Us</h3>

            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="hover:text-brand">
                <FaFacebook size={21} />
              </a>

              <a href="#" aria-label="Instagram" className="hover:text-brand">
                <FaInstagramSquare size={21} />
              </a>

              <a href="#" aria-label="X" className="hover:text-brand">
                <span className="text-xl font-semibold">𝕏</span>
              </a>

              <a href="#" aria-label="YouTube" className="hover:text-brand">
                <FaYoutube size={21} />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-[#574144] pt-6 text-center text-sm text-[#BFA9A7]">
          © {new Date().getFullYear()} BigBite. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
