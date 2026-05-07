import Link from 'next/link'
import Image from 'next/image'
import { Clock, Users, BookOpen, Award, CalendarDays, Lock } from 'lucide-react'
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
    const start = new Date(formation.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
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

  return (
    <Link href={`/formations/${formation.slug}`} className="group block">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={formation.image}
            alt={formation.title}
            fill
            className={`object-cover transition-transform duration-500 ${isOpen ? 'group-hover:scale-105' : 'grayscale-[30%]'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Category */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${categoryColor[formation.category] ?? 'bg-gray-400'}`} />
            <Badge variant="navy" size="sm">{formation.category}</Badge>
          </div>

          {/* Discount */}
          {discount && isOpen && (
            <div className="absolute top-3 right-3 bg-brand-yellow text-navy-900 text-xs font-bold px-2 py-1 rounded-lg">
              -{discount}%
            </div>
          )}

          {/* Status badge — prominent */}
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
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant={levelVariant[formation.level] ?? 'navy'} size="sm">
              {formation.level}
            </Badge>
            {formation.schedule === 'weekend' && (
              <Badge variant="blue" size="sm">Week-end</Badge>
            )}
          </div>

          <h3 className="font-bold text-navy-900 text-lg leading-snug mb-2 group-hover:text-brand-green transition-colors">
            {formation.title}
          </h3>

          <p className="text-sm text-gray-500 leading-relaxed mb-3 flex-grow">
            {formation.shortDescription}
          </p>

          {/* Schedule info */}
          <div className="text-xs text-gray-500 mb-4 space-y-1">
            <ScheduleInfo formation={formation} />
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-green" />
              <span>{formation.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-brand-green" />
              <span>{formation.modules.length} modules</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-brand-green" />
              <span>Petits groupes</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            {isOpen ? (
              <div className="text-right w-full">
                {formation.originalPrice && (
                  <div className="text-xs text-gray-400 line-through">
                    {formation.originalPrice.toLocaleString('fr-FR')} FCFA
                  </div>
                )}
                <div className="text-lg font-bold text-navy-900">
                  {formation.price.toLocaleString('fr-FR')} FCFA
                </div>
              </div>
            ) : (
              <div className="w-full text-right">
                <span className="text-sm font-semibold text-brand-yellow bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                  Prochaine session bientôt
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
