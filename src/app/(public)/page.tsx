export const dynamic = 'force-dynamic'

import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import Features from '@/components/home/Features'
import FounderSection from '@/components/home/FounderSection'
import FeaturedFormations from '@/components/home/FeaturedFormations'
import Testimonials from '@/components/home/Testimonials'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <FounderSection />
      <FeaturedFormations />
      <Testimonials />

      {/* CTA Final */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-navy-900 mb-4">
            Prêt(e) à commencer votre parcours digital ?
          </h2>
          <p className="text-gray-500 text-base mb-10 max-w-xl mx-auto">
            Choisissez une formation, pratiquez sur des projets concrets et repartez avec des compétences utiles et une attestation de réussite.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/inscription"
              className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-base"
            >
              Demander une inscription
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/formations"
              className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-navy-900 text-navy-900 font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-base"
            >
              Voir les formations
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
