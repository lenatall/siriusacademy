'use client'

import { useState, useEffect } from 'react'

const links = [
  { id: 'overview', label: "Vue d'ensemble" },
  { id: 'programme', label: 'Programme' },
  { id: 'formateur', label: 'Formateur' },
  { id: 'tarifs', label: 'Tarifs' },
]

export default function FormationNav() {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState('overview')

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 480)
      const ids = ['tarifs', 'formateur', 'programme', 'overview']
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 130) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-0 overflow-x-auto">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`shrink-0 px-5 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                active === link.id
                  ? 'border-brand-green text-brand-green'
                  : 'border-transparent text-gray-500 hover:text-navy-900 hover:border-gray-200'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
