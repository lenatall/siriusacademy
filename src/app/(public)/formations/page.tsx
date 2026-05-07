import type { Metadata } from 'next'
import { store } from '@/lib/store'
import FormationCard from '@/components/formations/FormationCard'
import { Filter } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Formations',
  description: 'Découvrez toutes nos formations digitales — pratiques, en ligne, avec des projets concrets et une attestation de réussite.',
}

const categories = ['Toutes', 'Développement', 'Marketing', 'Design', 'Data & IA']

export default function FormationsPage() {
  const formations = store.formations.getAll()

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Nos formations <span className="text-brand-yellow">digitales</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Des parcours en ligne orientés pratique, avec des exercices, des projets guidés et une attestation de réussite.
          </p>
        </div>
      </div>

      {/* Filters */}
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
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${cat === 'Toutes' ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <p className="text-gray-500 text-sm mb-8">
            <span className="font-bold text-navy-900">{formations.length}</span> formation{formations.length > 1 ? 's' : ''} disponible{formations.length > 1 ? 's' : ''}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formations.map((formation) => (
              <FormationCard key={formation.id} formation={formation} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
