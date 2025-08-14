'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
    { href: '/conference', label: 'Conference' },
    { 
      href: 'https://maps.app.goo.gl/3tkVRuJ8KdmPUv2K7',
      label: 'Location',
      isExternal: true 
    },
    {
      href: 'https://www.knowafest.com/explore/events/2019/01/3101-techletics-2019-christ-college-engineering-technical-festival-irinjalakuda',
      label: 'Blog',
      isExternal: true
    }
  ]

  return (
    <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" prefetch={true}>
              <Image
                src="/logos/techletics-metal.svg"
                alt="Techletics Logo"
                width={150}
                height={40}
                className="h-8 w-auto drop-shadow-sm"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-600 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1 backdrop-blur-sm border border-transparent hover:border-white/30"
                >
                  {link.label}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                    pathname === link.href
                      ? 'text-white bg-gray-800/80 border-gray-700/50 shadow-lg'
                      : 'text-white hover:text-gray-600 hover:bg-white/20 border-transparent hover:border-white/30'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-800 hover:text-gray-600 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm border border-transparent hover:border-white/30 transition-all duration-300"
              aria-expanded={isMenuOpen}
              suppressHydrationWarning={true}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h- opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 sm:px-3 bg-white/5 backdrop-blur-lg border-t border-white/20">
          {navLinks.map((link) => (
            link.isExternal ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-lg text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-white/20 flex items-center gap-1 transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/30 mb-1"
              >
                {link.label}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 backdrop-blur-sm border mb-1 ${
                  pathname === link.href
                    ? 'text-white bg-gray-800/80 border-gray-700/50 shadow-lg'
                    : 'text-gray-800 hover:text-gray-600 hover:bg-white/20 border-transparent hover:border-white/30'
                }`}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
      </div>
    </nav>
  )
}