import Link from 'next/link'
import Image from 'next/image'
import { Clock, Users, Award, CalendarDays, Lock, ArrowRight } from 'lucide-react'
import type { Formation } from '@/types'
import Badge from '@/components/ui/Badge'

interface FormationCardProps {
  formation: Formation
  variant?: 'default' | 'featured'
}

const levelVariant: Record<string, 'green' | 'blue' | 'yellow' | 'navy'> = {
  Débutant: 'green',
  Intermédiaire: 'blue',
  Avancé: 'yellow',
  'Tous niveaux': 'navy',
}

const categoryColor: Record<string, string> = {
  Développement: 'bg-blue-500',
  Marketing: 'bg-emerald-500',
  Design: 'bg-purple-500',
  'Data & IA': 'bg-amber-500',
}

const categoryBorderTop: Record<string, string> = {
  Développement: 'border-t-blue-500',
  Marketing: 'border-t-emerald-500',
  Design: 'border-t-purple-500',
  'Data & IA': 'border-t-amber-500',
}

function ScheduleInfo({ formation }: { formation: Formation }) {
  if (formation.schedule === 'weekend' && formation.weekendDates?.length) {
    return (
      <div className="flex items-start gap-1.5">
        <CalendarDays className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
        <span>Week-ends · à partir du {formation.weekendDates[0]}</span>
      </div>
    )
  }
  if (formation.schedule === 'date-fixe' && formation.startDate) {
    const start = new Date(formation.startDate).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    return (
      <div className="flex items-start gap-1.5">
        <CalendarDays className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
        <span>Début le {start}</span>
      </div>
    )
  }
  return null
}

export default function FormationCard({ formation }: FormationCardProps) {
  const discount = formation.originalPrice
    ? Math.round(((formation.originalPrice - formation.price) / formation.originalPrice) * 100)
    : null

  const isOpen = formation.status === 'ouvert'
  const topBorderClass = categoryBorderTop[formation.category] ?? 'border-t-gray-300'

  return (
    <Link href={`/formations/${formation.slug}`} className="group block h-full">
      <div
        className={`bg-white rounded-2xl shadow-md border-t-[3px] ${topBorderClass} overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1`}
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={formation.image}
            alt={formation.title}
            fill
            className={`object-cover transition-transform duration-500 ${
              isOpen ? 'group-hover:scale-105' : 'grayscale-[40%] brightness-90'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Closed overlay */}
          {!isOpen && (
            <div className="absolute inset-0 bg-gray-900/30" />
          )}

          {/* Category badge — top left */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${categoryColor[formation.category] ?? 'bg-gray-400'}`}
            />
            <Badge variant="navy" size="sm">{formation.category}</Badge>
          </div>

          {/* Discount badge — top right */}
          {discount && isOpen && (
            <div className="absolute top-3 right-3 bg-brand-yellow text-navy-900 text-xs font-bold px-2 py-1 rounded-lg shadow">
              -{discount}%
            </div>
          )}

          {/* Status + certificate — bottom of image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            {isOpen ? (
              <span className="inline-flex items-center gap-1.5 bg-brand-green text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Inscriptions ouvertes
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-brand-yellow text-navy-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md">
                <Lock className="w-3 h-3" />
                Bientôt disponible
              </span>
            )}
            {formation.certificate && (
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
                <Award className="w-3 h-3" />
                Attestation
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Level + schedule badges */}
          <div className="flex items-center gap-2 mb-3">
            <Badge variant={levelVariant[formation.level] ?? 'navy'} size="sm">
              {formation.level}
            </Badge>
            {formation.schedule === 'weekend' && (
              <Badge variant="blue" size="sm">Week-end</Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-navy-900 text-lg leading-snug mb-1.5 group-hover:text-brand-green transition-colors">
            {formation.title}
          </h3>

          {/* Schedule info — right under title */}
          <div className="text-xs text-gray-400 mb-3">
            <ScheduleInfo formation={formation} />
          </div>

          {/* Short description */}
          <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-grow line-clamp-3">
            {formation.shortDescription}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-green" />
              <span>{formation.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-brand-green" />
              <span>Petits groupes</span>
            </div>
          </div>

          {/* Price section */}
          {isOpen ? (
            <div className="flex items-end justify-between">
              <div>
                {formation.originalPrice && (
                  <div className="text-xs text-gray-400 line-through mb-0.5">
                    {formation.originalPrice.toLocaleString('fr-FR')} FCFA
                  </div>
                )}
                {formation.paymentType === 'tranches' && formation.tranches?.length ? (
                  <>
                    <div className="text-lg font-bold text-navy-900 leading-tight">
                      À partir de {formation.tranches[0].montant.toLocaleString('fr-FR')} FCFA
                    </div>
                    <span className="inline-block mt-1 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      Paiement en {formation.tranches.length} tranches
                    </span>
                  </>
                ) : (
                  <>
                    <div className="text-lg font-bold text-navy-900 leading-tight">
                      {formation.price.toLocaleString('fr-FR')} FCFA
                    </div>
                    <span className="inline-block mt-1 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      Paiement unique
                    </span>
                  </>
                )}
              </div>

              {/* Hover-reveal CTA */}
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Voir la formation
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-brand-yellow bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                Prochaine session bientôt
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                En savoir plus
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
