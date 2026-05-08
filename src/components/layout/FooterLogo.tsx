'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Star } from 'lucide-react'

export default function FooterLogo() {
  const [logoUrl, setLogoUrl] = useState<string | undefined>()
  const [siteName, setSiteName] = useState('Sirius Academy')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((s) => {
        setLogoUrl(s.logoUrl || undefined)
        if (s.siteName) setSiteName(s.siteName)
      })
      .catch(() => {})
  }, [])

  return (
    <Link href="/" className="flex items-center gap-2.5 mb-5 group">
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt={siteName}
          className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
        />
      ) : (
        <>
          <div className="w-10 h-10 bg-gradient-to-br from-brand-yellow via-amber-400 to-orange-400 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <Star className="w-5 h-5 text-navy-900 fill-current" />
          </div>
          <div>
            <span className="text-white font-bold text-xl">{siteName.split(' ')[0]}</span>
            <span className="text-brand-yellow font-bold text-xl">
              {' '}{siteName.split(' ').slice(1).join(' ')}
            </span>
          </div>
        </>
      )}
    </Link>
  )
}
