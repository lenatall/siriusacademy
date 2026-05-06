import { Clock, BookOpen, Play } from 'lucide-react'
import type { FreeCourse } from '@/types'
import Badge from '@/components/ui/Badge'
import Image from 'next/image'

interface CoursCardProps {
  cours: FreeCourse
  onAccess: (slug: string) => void
}

const levelVariant: Record<string, 'green' | 'blue' | 'yellow'> = {
  Débutant: 'green',
  Intermédiaire: 'blue',
  Avancé: 'yellow',
}

const categoryColor: Record<string, string> = {
  Développement: 'from-blue-500 to-blue-600',
  Marketing: 'from-emerald-500 to-emerald-600',
  Design: 'from-purple-500 to-purple-600',
  'Data & IA': 'from-amber-500 to-amber-600',
}

export default function CoursCard({ cours, onAccess }: CoursCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={cours.image}
          alt={cours.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge variant="green" size="sm">
            Gratuit
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3">
          <Badge variant={levelVariant[cours.level] ?? 'navy'} size="sm">
            {cours.level}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs font-semibold text-brand-green uppercase tracking-wider mb-2">
          {cours.category}
        </p>
        <h3 className="font-bold text-navy-900 text-base leading-snug mb-2">{cours.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-grow">{cours.description}</p>

        {/* Topics preview */}
        <div className="space-y-1.5 mb-4">
          {cours.topics.slice(0, 3).map((topic, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0" />
              <span>{topic}</span>
            </div>
          ))}
          {cours.topics.length > 3 && (
            <div className="text-xs text-gray-400 pl-3.5">
              +{cours.topics.length - 3} autres sujets...
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{cours.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{cours.lessonsCount} leçons</span>
          </div>
          <div className="text-gray-400">Par {cours.instructor}</div>
        </div>

        <button
          onClick={() => onAccess(cours.slug)}
          className="w-full flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-semibold py-3 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-navy-lg"
        >
          <Play className="w-4 h-4 fill-current" />
          Accéder gratuitement
        </button>
      </div>
    </div>
  )
}
