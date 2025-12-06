'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
    <nav className="fixed top-0 z-50 w-full border-b border-white/20 bg-[linear-gradient(to_bottom,_#323232_0%,_#353535_10%,_#40403F_50%,_#494948_85%,_#4D4D4C_100%)] shadow-lg backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center gap-3">
            <Link href="/" prefetch={true} className="flex items-center gap-3">
              <Image
                src="/logos/techletics-logo.svg"
                alt="Techletics Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
                priority
              />
              <span className="font-orbitron text-2xl font-bold tracking-wider text-[#c9a55c]">
                TECH<span className="text-gray-300">LETICS</span>&apos;25
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center md-lg:flex">
            <div className="relative inline-block">
              {/* Gold Border Layer */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-full origin-center scale-x-[1.005] scale-y-[1.04] bg-[#c79a42] [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]"
              ></div>

              {/* Actual Slanted Nav Box */}
              <motion.div
                layout
                className="relative z-10 flex items-center justify-between space-x-4 bg-quarternary font-orbitron [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]"
              >
                {/* Links */}
                <div className="flex">
                  {navLinks.map((link) =>
                    link.isExternal ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="duration-10 hidden items-center justify-center gap-1 rounded-lg px-4 py-2 text-sm text-white backdrop-blur-sm transition-all hover:scale-110 hover:font-bold lg-xl:flex"
                      >
                        {link.label.toUpperCase()}
                      </a>
                    ) : (
                      <div
                        key={link.href}
                        className="group relative flex h-10 items-center justify-center rounded-lg"
                      >
                        <Link
                          href={link.href}
                          prefetch={true}
                          className={`duration-10 z-20 flex items-center justify-center rounded-lg px-4 py-2 text-sm backdrop-blur-sm transition-all hover:scale-110 hover:font-bold ${
                            pathname === link.href
                              ? 'scale-105 font-bold text-secondary'
                              : 'text-white'
                          }`}
                        >
                          {link.label.toUpperCase()}
                        </Link>
                      </div>
                    ),
                  )}
                </div>

                {/* CONTACT button */}
                <div className="flex h-10 cursor-pointer items-center justify-center bg-secondary px-5 py-2 text-sm uppercase tracking-widest">
                  <span>CONTACT</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center max-extr-xs:hidden md-lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-lg p-2 text-secondary backdrop-blur-sm transition-all duration-300 hover:bg-secondary hover:text-quarternary focus:outline-none focus:ring-2 focus:ring-gray-400/30"
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

      {/* Mobile Menu */}
      <div
        className={`transition-all duration-300 ease-in-out md-lg:hidden ${
          isMenuOpen
            ? 'max-h-screen opacity-100'
            : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <div className="border-t border-white/20 bg-white/5 px-2 pb-3 pt-2 backdrop-blur-lg sm:px-3">
          {navLinks.map((link) =>
            link.isExternal ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mb-1 flex items-center gap-1 rounded-lg bg-quarternary px-4 py-3 font-orbitron text-base backdrop-blur-sm transition-all duration-300 hover:bg-secondary hover:font-bold hover:text-quarternary ${pathname == link.href ? 'font-bold text-secondary' : 'text-white'}`}
              >
                {link.label.toUpperCase()}
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
                className={`mb-1 flex items-center gap-1 rounded-lg bg-quarternary px-4 py-3 font-orbitron text-base backdrop-blur-sm transition-all duration-300 hover:bg-secondary hover:font-bold hover:text-quarternary ${pathname == link.href ? 'font-bold text-secondary' : 'text-white'}`}
              >
                {link.label.toUpperCase()}
              </Link>
            ),
          )}
        </div>
      </div>
    </nav>
  );
}
