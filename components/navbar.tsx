'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
    { href: '/conference', label: 'Conference' },
    {
      href: 'https://maps.app.goo.gl/3tkVRuJ8KdmPUv2K7',
      label: 'Location',
      isExternal: true,
    },
    {
      href: 'https://www.knowafest.com/explore/events/2019/01/3101-techletics-2019-christ-college-engineering-technical-festival-irinjalakuda',
      label: 'Blog',
      isExternal: true,
    },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/20 bg-secondary shadow-lg backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Logo and brand */}
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" prefetch={true}>
              <Image
                src="/logos/logo.png"
                alt="Techletics Logo"
                width={150}
                height={40}
                className="h-20 w-auto drop-shadow-sm"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) =>
              link.isExternal ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20 hover:text-gray-600"
                >
                  {link.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-300 ${
                    pathname === link.href
                      ? 'border-gray-700/50 bg-gray-800/80 text-white shadow-lg'
                      : 'border-transparent text-white hover:border-white/30 hover:bg-white/20 hover:text-gray-600'
                  }`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-lg border border-transparent p-2 text-gray-800 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-expanded={isMenuOpen}
              suppressHydrationWarning={true}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? 'max-h- opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}
      >
        <div className="border-t border-white/20 bg-white/5 px-2 pb-3 pt-2 backdrop-blur-lg sm:px-3">
          {navLinks.map((link) =>
            link.isExternal ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-1 flex items-center gap-1 rounded-lg border border-transparent px-4 py-3 text-base font-medium text-gray-800 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20 hover:text-gray-600"
              >
                {link.label}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                className={`mb-1 block rounded-lg border px-4 py-3 text-base font-medium backdrop-blur-sm transition-all duration-300 ${
                  pathname === link.href
                    ? 'border-gray-700/50 bg-gray-800/80 text-white shadow-lg'
                    : 'border-transparent text-gray-800 hover:border-white/30 hover:bg-white/20 hover:text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </nav>
  );
}
