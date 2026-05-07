import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import Features from '@/components/home/Features'
import FounderSection from '@/components/home/FounderSection'
import FeaturedFormations from '@/components/home/FeaturedFormations'
import Testimonials from '@/components/home/Testimonials'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <FounderSection />
      <FeaturedFormations />
      <Testimonials />

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-green/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-yellow/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Prêt à lancer votre transformation ?
              </h2>
              <p className="text-slate-300 text-base mb-8 max-w-xl mx-auto">
                Rejoignez les apprenants qui ont déjà fait le choix de construire des compétences
                digitales concrètes et présentables avec Sirius Academy.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/inscription"
                  className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-amber-400 text-navy-900 font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-yellow-lg hover:-translate-y-0.5 text-base"
                >
                  S&apos;inscrire maintenant
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-base"
                >
                  <Mail className="w-5 h-5" />
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
