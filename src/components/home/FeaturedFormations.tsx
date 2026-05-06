import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getFeaturedFormations } from '@/data/formations'
import FormationCard from '@/components/formations/FormationCard'

export default function FeaturedFormations() {
  const formations = getFeaturedFormations()

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-navy-900/5 text-navy-900 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <span>Nos formations phares</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-navy-900 mb-3">
              Des formations pour{' '}
              <span className="text-brand-green">booster votre carrière</span>
            </h2>
            <p className="text-gray-500 text-base max-w-xl">
              Des programmes intensifs et pratiques, créés et animés par des professionnels
              reconnus dans leur domaine.
            </p>
          </div>
          <Link
            href="/formations"
            className="inline-flex items-center gap-2 text-brand-green font-semibold hover:gap-3 transition-all duration-200 mt-6 md:mt-0 shrink-0"
          >
            Toutes les formations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formations.map((formation) => (
            <FormationCard key={formation.id} formation={formation} />
          ))}
        </div>
      </div>
    </section>
  )
}
