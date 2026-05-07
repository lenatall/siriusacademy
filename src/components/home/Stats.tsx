import { Users, BookOpen, Star, Briefcase } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: 'Petits groupes',
    label: 'accompagnement personnalisé',
    iconColor: 'text-brand-green',
    iconBg: 'bg-brand-green/20',
    numberColor: 'text-brand-green',
  },
  {
    icon: BookOpen,
    value: '4 Formations',
    label: 'métiers du digital',
    iconColor: 'text-brand-yellow',
    iconBg: 'bg-brand-yellow/20',
    numberColor: 'text-brand-yellow',
  },
  {
    icon: Star,
    value: '5+ ans',
    label: "d'expérience terrain",
    iconColor: 'text-brand-green',
    iconBg: 'bg-brand-green/20',
    numberColor: 'text-brand-green',
  },
  {
    icon: Briefcase,
    value: '100%',
    label: 'projets concrets & portfolio',
    iconColor: 'text-brand-yellow',
    iconBg: 'bg-brand-yellow/20',
    numberColor: 'text-brand-yellow',
  },
]

export default function Stats() {
  return (
    <section className="relative bg-navy-900 py-20 overflow-hidden">
      {/* Thin green divider at the top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-green" />

      {/* Subtle radial gradient overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.value} className="flex flex-col items-center text-center group">
                {/* Icon badge */}
                <div
                  className={`w-10 h-10 ${stat.iconBg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>

                {/* Large value */}
                <div className={`text-4xl lg:text-5xl font-black ${stat.numberColor} mb-2 leading-none`}>
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-slate-400 text-sm leading-snug max-w-[140px]">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
