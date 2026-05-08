'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, MessageCircle } from 'lucide-react'
import SiteLogo from './SiteLogo'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/formations', label: 'Formations' },
  { href: '/blog', label: 'Blog' },
  { href: '/a-propos', label: 'À Propos' },
  { href: '/contact', label: 'Contact' },
]

interface HeaderProps {
  logoUrl?: string
  siteName?: string
  whatsappLink?: string
}

export default function Header({ logoUrl, siteName = 'Sirius Academy', whatsappLink = 'https://wa.me/221770000000' }: HeaderProps) {
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
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top accent border */}
      <div className="h-0.5 bg-gradient-to-r from-brand-green via-emerald-400 to-brand-yellow" />

      {/* Main nav bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled || !isHome
            ? 'bg-navy-900/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="group">
              <SiteLogo logoUrl={logoUrl} siteName={siteName} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? 'text-brand-yellow bg-white/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                    {/* Active underline accent */}
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-0.5 bg-brand-yellow rounded-full transition-transform duration-200 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                )
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              {/* WhatsApp link */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-green transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>

              {/* S'inscrire CTA */}
              <Link
                href="/inscription"
                className="bg-brand-yellow hover:bg-amber-400 text-navy-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-amber-400/30 hover:shadow-lg hover:-translate-y-0.5"
              >
                S&apos;inscrire
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-navy-900/98 border-t border-white/10 pt-3 pb-5 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors mx-2 ${
                      isActive
                        ? 'text-brand-yellow bg-white/10 border-l-2 border-brand-yellow'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {isActive && <span className="w-1 h-1 rounded-full bg-brand-yellow" />}
                    {link.label}
                  </Link>
                )
              })}

              {/* Mobile actions */}
              <div className="pt-4 px-4 border-t border-white/10 mt-2 space-y-3">
                {/* WhatsApp link in mobile */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full text-sm text-slate-400 hover:text-brand-green border border-white/10 hover:border-brand-green/30 py-2.5 rounded-xl transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  Écrire sur WhatsApp
                </a>

                {/* S'inscrire CTA */}
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
      </div>
    </header>
  )
}
