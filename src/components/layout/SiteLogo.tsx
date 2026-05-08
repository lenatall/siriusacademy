import { Star } from 'lucide-react'

interface SiteLogoProps {
  logoUrl?: string
  siteName?: string
  className?: string
}

export default function SiteLogo({ logoUrl, siteName = 'Sirius Academy', className = '' }: SiteLogoProps) {
  if (logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt={siteName}
        className={`h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-200 ${className}`}
      />
    )
  }

  const [first, ...rest] = siteName.split(' ')

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="w-10 h-10 bg-gradient-to-br from-brand-yellow via-amber-400 to-orange-400 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-amber-400/40 group-hover:scale-105 transition-all duration-200 shrink-0">
        <Star className="w-5 h-5 text-navy-900 fill-current" />
      </div>
      <div className="leading-none">
        <span className="text-white font-bold text-xl">{first}</span>
        {rest.length > 0 && (
          <span className="text-brand-yellow font-bold text-xl"> {rest.join(' ')}</span>
        )}
      </div>
    </div>
  )
}
