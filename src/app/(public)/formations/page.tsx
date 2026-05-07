import type { Metadata } from 'next'
import { formations } from '@/data/formations'
import FormationCard from '@/components/formations/FormationCard'
import { Filter, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Formations',
  description:
    'Découvrez toutes nos formations digitales en développement web, marketing, design UX/UI et data science — pratiques, en petits groupes, avec des projets concrets.',
}

const categories = ['Toutes', 'Développement', 'Marketing', 'Design', 'Data & IA']
const levels = ['Tous niveaux', 'Débutant', 'Intermédiaire', 'Avancé']

export default function FormationsPage() {
  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <span>4 formations digitales disponibles</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Nos formations <span className="text-brand-yellow">digitales</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Des parcours intensifs et pratiques pour devenir opérationnel rapidement, animés par
            des experts actifs dans leur domaine.
          </p>
        </div>
      </div>

      {/* Filters bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 lg:top-20 z-40">
        <div className="container-custom py-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 shrink-0">
              <Filter className="w-4 h-4" />
              Filtrer :
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    cat === 'Toutes'
                      ? 'bg-navy-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              {levels.slice(1).map((level) => (
                <button
                  key={level}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors hidden sm:block"
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Formations grid */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-500 text-sm">
              <span className="font-bold text-navy-900">{formations.length}</span> formations
              disponibles
            </p>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green/30">
              <option>Les plus populaires</option>
              <option>Prix croissant</option>
              <option>Prix décroissant</option>
              <option>Les mieux notées</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formations.map((formation) => (
              <FormationCard key={formation.id} formation={formation} />
            ))}
          </div>

          {/* Empty promo card */}
          <div className="mt-6 bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-8 text-center text-white">
            <p className="text-brand-yellow font-semibold text-sm mb-2">Bientôt disponible</p>
            <h3 className="text-xl font-bold mb-2">Cybersécurité & DevSecOps</h3>
            <p className="text-slate-300 text-sm mb-4">
              La prochaine formation Sirius Academy arrive en septembre 2024. Inscrivez-vous à la
              liste d&apos;attente pour être notifié en premier.
            </p>
            <button className="bg-brand-yellow hover:bg-amber-400 text-navy-900 font-bold px-6 py-3 rounded-xl text-sm transition-colors">
              Rejoindre la liste d&apos;attente
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
