import { Laptop, Users, Award, Clock, Headphones, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Laptop,
    title: '100% en ligne & flexible',
    description:
      'Apprenez à votre rythme, depuis n\'importe où. Les cours sont accessibles 24h/24, 7j/7 à vie.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Users,
    title: 'Formateurs experts actifs',
    description:
      'Nos formateurs exercent leur métier au quotidien. Vous apprenez des pratiques réelles, pas théoriques.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Award,
    title: 'Certifications reconnues',
    description:
      'Obtenez un certificat valorisable sur LinkedIn et par les recruteurs à la fin de votre formation.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Headphones,
    title: 'Suivi personnalisé',
    description:
      'Sessions de Q&A hebdomadaires, retours individuels sur vos projets et accès à la communauté.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Clock,
    title: 'Projets concrets dès le début',
    description:
      'Chaque module est accompagné d\'exercices pratiques. Vous construisez votre portfolio pendant la formation.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: TrendingUp,
    title: 'Accompagnement à l\'emploi',
    description:
      'Conseils CV, préparation aux entretiens et mise en relation avec notre réseau de recruteurs partenaires.',
    color: 'bg-indigo-50 text-indigo-600',
  },
]

export default function Features() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <span>Pourquoi Sirius Academy</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-navy-900 mb-4">
            Une expérience d&apos;apprentissage
            <span className="text-brand-green"> unique</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Nous avons conçu chaque formation pour maximiser votre progression et votre employabilité.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100"
              >
                <div
                  className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-navy-900 text-base mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
