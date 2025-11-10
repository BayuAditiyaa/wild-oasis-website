"use client"; // Wajib untuk Client Component yang menggunakan state

import Link from "next/link";
import { useState } from "react";

// Ikon Hamburger
const Bars3Icon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

// Ikon Close (X)
const XMarkIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function Navigation({ session }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="z-10 text-xl">
      {/* Tombol Hamburger (Hanya muncul di Mobile) */}
      <button
        className="md:hidden relative z-50 p-2"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <XMarkIcon className="h-8 w-8 text-primary-100" />
        ) : (
          <Bars3Icon className="h-8 w-8 text-primary-100" />
        )}
      </button>

      {/* Menu Links */}
      <ul
        className={`
          // Base styles untuk Mobile (Overlay Full Screen)
          fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-primary-950 text-3xl transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"} // Animasi slide-in/out

          // Styles untuk Desktop (md ke atas)
          md:static md:flex md:flex-row md:gap-16 md:items-center md:bg-transparent md:text-xl md:translate-x-0
        `}
      >
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
            onClick={closeMenu} // Tutup menu saat link diklik
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
            onClick={closeMenu}
          >
            About
          </Link>
        </li>
        <li>
          {session?.user ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
              onClick={closeMenu}
            >
              <img
                src={session.user.image}
                className="h-8 rounded-full"
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
              onClick={closeMenu}
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}