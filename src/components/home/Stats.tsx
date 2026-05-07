import { Users, BookOpen, Star, Briefcase } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: 'Petits',
    label: 'groupes',
    description: 'accompagnement personnalisé',
    color: 'text-brand-green',
    bg: 'bg-emerald-50',
  },
  {
    icon: BookOpen,
    value: '4',
    label: 'Formations métiers',
    description: 'pratiques et régulièrement mises à jour',
    color: 'text-navy-800',
    bg: 'bg-slate-50',
  },
  {
    icon: Star,
    value: '5+',
    label: 'Ans d\'expérience',
    description: 'en marketing digital & accompagnement',
    color: 'text-brand-yellow',
    bg: 'bg-amber-50',
  },
  {
    icon: Briefcase,
    value: '100%',
    label: 'Projets concrets',
    description: 'portfolio à la fin de la formation',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
]

export default function Stats() {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center group">
                <div
                  className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div className={`text-3xl lg:text-4xl font-black ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="font-semibold text-navy-900 text-sm mb-0.5">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
