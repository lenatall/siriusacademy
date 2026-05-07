import { Laptop, BookOpen, Award, TrendingUp, CheckSquare, Compass } from 'lucide-react'

const features = [
  {
    icon: Laptop,
    title: 'Formation orientée pratique',
    description: 'Chaque notion est suivie d\'un exercice ou d\'une application concrète. On apprend en faisant, pas en lisant.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: BookOpen,
    title: 'Projets concrets',
    description: 'Les apprenants travaillent sur des cas réalistes pour mieux comprendre le terrain et construire des réalisations présentables.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: CheckSquare,
    title: 'Ressources accessibles',
    description: 'Cours gratuits, supports PDF, vidéos ou contenus structurés selon les modules — disponibles à votre rythme.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Award,
    title: 'Attestation de réussite',
    description: 'Remise aux apprenants ayant suivi et validé leur parcours. Une preuve concrète de votre engagement.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: TrendingUp,
    title: 'Progression encadrée',
    description: 'Les parcours sont organisés étape par étape pour faciliter l\'apprentissage et éviter de se perdre.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Compass,
    title: 'Orientation métier',
    description: 'Aide à mieux comprendre les métiers du digital et choisir une spécialisation adaptée à votre profil.',
    color: 'bg-indigo-50 text-indigo-600',
  },
]

export default function Features() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-navy-900 mb-4">
            Une approche simple :<br />
            <span className="text-brand-green">apprendre, pratiquer, produire.</span>
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            Notre objectif n&apos;est pas de remplir des cours théoriques, mais d&apos;aider chaque apprenant à comprendre les outils, les appliquer et construire des réalisations concrètes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className={`w-11 h-11 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" />
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
