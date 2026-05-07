import Link from 'next/link'
import { ArrowRight, CheckCircle, Globe, BookOpen, Award } from 'lucide-react'
import { store } from '@/lib/store'

export default function Hero() {
  const settings = store.settings.get()
  const heroFormation =
    store.formations.getBySlug(settings.heroFormationSlug) ??
    store.formations.getAll()[0]

  return (
    <section className="relative min-h-screen bg-hero-gradient overflow-hidden flex items-center">
      {/* Background deco */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-navy-700/30 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Apprendre le digital
              <span className="block text-gradient-green">en pratiquant.</span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-lg">
              Sirius Academy accompagne les étudiants, entrepreneurs et débutants dans l&apos;acquisition de compétences digitales concrètes à travers des formations en ligne, des exercices pratiques et des projets réalisables.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/formations"
                className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 shadow-green-lg hover:-translate-y-1 text-base"
              >
                Voir les formations
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/cours-gratuits"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 backdrop-blur-sm text-base"
              >
                Accéder aux cours gratuits
              </Link>
            </div>

            {/* 3 badges max */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Globe, text: '100% en ligne' },
                { icon: BookOpen, text: 'Projets pratiques' },
                { icon: Award, text: 'Attestation de réussite' },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-slate-300 text-sm px-4 py-2 rounded-full">
                  <Icon className="w-4 h-4 text-brand-green" />
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Right — formation card dynamique */}
          {heroFormation && (
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{heroFormation.category}</p>
                    <h3 className="text-white font-black text-lg leading-snug">{heroFormation.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">{heroFormation.duration} · {heroFormation.modules.length} modules</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-white font-black text-xl">{heroFormation.price.toLocaleString('fr-FR')} <span className="text-sm font-semibold">FCFA</span></p>
                    {heroFormation.originalPrice && (
                      <p className="text-slate-500 text-sm line-through">{heroFormation.originalPrice.toLocaleString('fr-FR')} FCFA</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  {(heroFormation.keyPoints?.slice(0, 3) ?? []).map((point) => (
                    <div key={point} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-5">
                  {heroFormation.status === 'ouvert' ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                      Inscriptions ouvertes
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-brand-yellow">Bientôt disponible</span>
                  )}
                </div>

                <Link
                  href={`/formations/${heroFormation.slug}`}
                  className="flex items-center justify-center gap-2 bg-brand-green text-white text-sm font-bold py-3 rounded-xl hover:bg-brand-green-dark transition-colors"
                >
                  Découvrir la formation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 0C1200 40 960 60 720 50C480 40 240 10 0 0L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
