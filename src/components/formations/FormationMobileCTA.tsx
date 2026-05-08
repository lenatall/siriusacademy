'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Props {
  slug: string
  price: number
  firstTranche?: number
  isOpen: boolean
}

export default function FormationMobileCTA({ slug, price, firstTranche, isOpen }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const displayPrice = firstTranche ?? price

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 shadow-[0_-4px_20px_0_rgba(0,0,0,0.08)] px-4 py-3 transition-all duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center gap-3 max-w-lg mx-auto">
        <div className="flex-1 min-w-0">
          {firstTranche ? (
            <>
              <p className="text-xs text-gray-400 leading-none mb-0.5">À partir de</p>
              <p className="font-black text-navy-900 text-xl leading-none">
                {displayPrice.toLocaleString('fr-FR')} <span className="text-sm font-semibold text-gray-500">FCFA</span>
              </p>
            </>
          ) : (
            <>
              <p className="text-xs text-gray-400 leading-none mb-0.5">Tarif</p>
              <p className="font-black text-navy-900 text-xl leading-none">
                {displayPrice.toLocaleString('fr-FR')} <span className="text-sm font-semibold text-gray-500">FCFA</span>
              </p>
            </>
          )}
        </div>
        {isOpen ? (
          <Link
            href={`/inscription?formation=${slug}`}
            className="shrink-0 inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors shadow-lg shadow-brand-green/25"
          >
            S&apos;inscrire
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <span className="shrink-0 inline-flex items-center gap-2 bg-brand-yellow text-navy-900 font-bold px-4 py-3 rounded-xl text-sm">
            Bientôt disponible
          </span>
        )}
      </div>
    </div>
  )
}
