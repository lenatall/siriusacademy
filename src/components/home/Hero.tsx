import Link from 'next/link'
import { ArrowRight, Star, Users, BookOpen, Award, Zap, CheckCircle } from 'lucide-react'
import { store } from '@/lib/store'

export default function Hero() {
  const settings = store.settings.get()
  const heroFormation =
    store.formations.getBySlug(settings.heroFormationSlug) ??
    store.formations.getAll()[0]

  const heroPoints = heroFormation?.keyPoints?.slice(0, 3) ??
    heroFormation?.modules?.slice(0, 3).map((m) => m.title) ?? []

  return (
    <section className="relative min-h-screen bg-hero-gradient overflow-hidden flex items-center">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-navy-700/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-800/20 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating dots */}
        {[
          { top: '15%', left: '8%', size: 'w-2 h-2', opacity: 'opacity-40', delay: '0s' },
          { top: '30%', right: '12%', size: 'w-1.5 h-1.5', opacity: 'opacity-30', delay: '1s' },
          { top: '60%', left: '5%', size: 'w-3 h-3', opacity: 'opacity-20', delay: '2s' },
          { top: '75%', right: '8%', size: 'w-2 h-2', opacity: 'opacity-40', delay: '0.5s' },
          { top: '20%', left: '40%', size: 'w-1 h-1', opacity: 'opacity-60', delay: '1.5s' },
        ].map((dot, i) => (
          <div
            key={i}
            className={`absolute ${dot.size} ${dot.opacity} rounded-full bg-brand-yellow animate-float`}
            style={{
              top: dot.top,
              left: (dot as { left?: string }).left,
              right: (dot as { right?: string }).right,
              animationDelay: dot.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Founder credibility badge */}
            <div className="inline-flex items-center gap-2 bg-brand-yellow/20 border border-brand-yellow/30 text-brand-yellow text-xs font-semibold px-4 py-2 rounded-full mb-4 backdrop-blur-sm">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Fondée par Léna Badiane · Référente Digitale certifiée · Sonatel Academy</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Apprenez en faisant.
              <span className="block text-gradient-green">Pas en regardant.</span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed mb-6 max-w-lg">
              Des formations 100% pratiques en marketing digital, création de contenu, développement web et design —
              conçues pour construire de vraies compétences, un vrai portfolio, dès le premier jour.
            </p>

            {/* Learning by doing pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { icon: Zap, text: 'Learning by doing' },
                { icon: BookOpen, text: '100% pratique' },
                { icon: CheckCircle, text: 'Portfolio inclus' },
                { icon: Users, text: 'Petits groupes' },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <Icon className="w-3 h-3 text-brand-green" />
                  {text}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/formations"
                className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 shadow-green-lg hover:-translate-y-1 text-base"
              >
                Voir les formations
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 backdrop-blur-sm text-base"
              >
                Qui sommes-nous ?
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['10B981', 'F59E0B', '4c6ef5', '364fc7'].map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-navy-900"
                      style={{ backgroundColor: `#${color}` }}
                    />
                  ))}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Petits groupes</p>
                  <p className="text-xs text-slate-400">Accompagnement personnalisé</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-yellow" />
                <span className="text-sm text-slate-300">Attestation de réussite</span>
              </div>
            </div>
          </div>

          {/* Right — Dynamic formation card */}
          {heroFormation && (
            <div className="hidden lg:block relative">
              <div className="relative w-full h-[520px]">
                {/* Main formation card */}
                <div className="absolute top-0 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm leading-snug">{heroFormation.title}</p>
                        <p className="text-slate-400 text-xs mt-0.5">
                          {heroFormation.duration} · {heroFormation.modules.length} modules
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-white font-black text-base">
                        {heroFormation.price.toLocaleString('fr-FR')} FCFA
                      </p>
                      {heroFormation.originalPrice && (
                        <p className="text-slate-400 text-xs line-through">
                          {heroFormation.originalPrice.toLocaleString('fr-FR')} FCFA
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Key points */}
                  <div className="space-y-2 mb-4">
                    {heroPoints.map((point) => (
                      <div key={point} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2 mb-4">
                    {heroFormation.status === 'ouvert' ? (
                      <span className="inline-flex items-center gap-1.5 bg-brand-green/20 text-brand-green text-xs font-bold px-3 py-1 rounded-lg border border-brand-green/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                        Inscriptions ouvertes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-brand-yellow/20 text-brand-yellow text-xs font-bold px-3 py-1 rounded-lg border border-brand-yellow/30">
                        Bientôt disponible
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/formations/${heroFormation.slug}`}
                    className="flex items-center justify-center gap-2 bg-brand-green text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-brand-green-dark transition-colors"
                  >
                    Découvrir cette formation <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Bottom mini cards */}
                <div className="absolute bottom-0 left-4 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <p className="font-black text-navy-900 text-base leading-none">Petits groupes</p>
                    <p className="text-xs text-gray-400">Suivi individualisé</p>
                  </div>
                </div>

                <div className="absolute bottom-0 right-4 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-brand-yellow" />
                  </div>
                  <div>
                    <p className="font-black text-navy-900 text-base leading-none">100% Pratique</p>
                    <p className="text-xs text-gray-400">Zéro rembourrage théorique</p>
                  </div>
                </div>
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
