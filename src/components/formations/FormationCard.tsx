import Link from 'next/link'
import Image from 'next/image'
import { Clock, Users, Star, BookOpen, Award } from 'lucide-react'
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

export default function FormationCard({ formation, variant = 'default' }: FormationCardProps) {
  const discount = formation.originalPrice
    ? Math.round(((formation.originalPrice - formation.price) / formation.originalPrice) * 100)
    : null

  return (
    <Link href={`/formations/${formation.slug}`} className="group block">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={formation.image}
            alt={formation.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${categoryColor[formation.category] ?? 'bg-gray-400'}`}
            />
            <Badge variant="navy" size="sm">
              {formation.category}
            </Badge>
          </div>
          {discount && (
            <div className="absolute top-3 right-3 bg-brand-yellow text-navy-900 text-xs font-bold px-2 py-1 rounded-lg">
              -{discount}%
            </div>
          )}
          {formation.certificate && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
              <Award className="w-3 h-3" />
              <span>Certificat</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant={levelVariant[formation.level] ?? 'navy'} size="sm">
              {formation.level}
            </Badge>
          </div>

          <h3 className="font-bold text-navy-900 text-lg leading-snug mb-2 group-hover:text-brand-green transition-colors">
            {formation.title}
          </h3>

          <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-grow">
            {formation.shortDescription}
          </p>

          {/* Stats */}
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
              <span>{formation.students.toLocaleString('fr-FR')} élèves</span>
            </div>
          </div>

          {/* Rating & Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(formation.rating)
                        ? 'text-brand-yellow fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-700">{formation.rating}</span>
              <span className="text-xs text-gray-400">({formation.reviewCount})</span>
            </div>
            <div className="text-right">
              {formation.originalPrice && (
                <div className="text-xs text-gray-400 line-through">
                  {formation.originalPrice.toLocaleString('fr-FR')} €
                </div>
              )}
              <div className="text-lg font-bold text-navy-900">
                {formation.price.toLocaleString('fr-FR')} €
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
