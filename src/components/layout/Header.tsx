'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Star, ChevronDown } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/formations', label: 'Formations' },
  { href: '/cours-gratuits', label: 'Cours Gratuits' },
  { href: '/blog', label: 'Blog' },
  { href: '/a-propos', label: 'À Propos' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const isHome = pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? 'bg-navy-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-yellow to-amber-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-yellow-lg transition-all duration-200">
              <Star className="w-5 h-5 text-navy-900 fill-current" />
            </div>
            <div className="leading-none">
              <span className="text-white font-bold text-xl">Sirius</span>
              <span className="text-brand-yellow font-bold text-xl"> Academy</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-brand-yellow bg-white/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/inscription"
              className="bg-brand-yellow hover:bg-amber-400 text-navy-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-yellow-lg hover:-translate-y-0.5"
            >
              S&apos;inscrire
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-navy-900/98 border-t border-white/10 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors mx-2 ${
                  pathname === link.href
                    ? 'text-brand-yellow bg-white/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 px-4 border-t border-white/10 mt-2">
              <Link
                href="/inscription"
                className="block text-center bg-brand-yellow hover:bg-amber-400 text-navy-900 font-bold px-5 py-3 rounded-xl text-sm transition-colors"
              >
                S&apos;inscrire maintenant
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
