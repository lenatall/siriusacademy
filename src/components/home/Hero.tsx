import Link from 'next/link'
import { ArrowRight, Users, BookOpen, Award, Zap, CheckCircle, CreditCard, Wallet } from 'lucide-react'
import { store } from '@/lib/store'

export default function Hero() {
  const settings = store.settings.get()
  const heroFormation =
    store.formations.getBySlug(settings.heroFormationSlug) ??
    store.formations.getAll()[0]

  const heroPoints = (
    heroFormation?.keyPoints?.slice(0, 3) ??
    heroFormation?.modules?.slice(0, 3).map((m) => m.title) ??
    []
  )

  const nbTranches = heroFormation?.tranches?.length ?? 0
  const minTranche = nbTranches > 0
    ? Math.min(...heroFormation!.tranches!.map((t) => t.montant))
    : null

  return (
    <section className="relative min-h-screen bg-hero-gradient overflow-hidden flex items-center">
      {/* Fond décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-navy-700/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-800/20 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
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

          {/* Colonne gauche */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              {settings.heroTitle}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-6 max-w-lg">
              {settings.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { icon: Zap, text: 'Learning by doing' },
                { icon: BookOpen, text: '100% pratique' },
                { icon: CheckCircle, text: 'Portfolio inclus' },
                { icon: Users, text: 'Petits groupes' },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm"
                >
                  <Icon className="w-3 h-3 text-brand-green" />
                  {text}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/formations"
                className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 shadow-green-lg hover:-translate-y-1 text-base"
              >
                {settings.heroCta1}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 backdrop-blur-sm text-base"
              >
                {settings.heroCta2}
              </Link>
            </div>

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

          {/* Colonne droite — carte décision */}
          {heroFormation && (
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl">

                {/* Barre statut */}
                <div className={`px-5 py-2.5 flex items-center gap-2 ${
                  heroFormation.status === 'ouvert'
                    ? 'bg-brand-green/20 border-b border-brand-green/20'
                    : 'bg-brand-yellow/15 border-b border-brand-yellow/20'
                }`}>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${
                    heroFormation.status === 'ouvert' ? 'bg-brand-green animate-pulse' : 'bg-brand-yellow'
                  }`} />
                  <span className={`text-xs font-bold tracking-wide ${
                    heroFormation.status === 'ouvert' ? 'text-brand-green' : 'text-brand-yellow'
                  }`}>
                    {heroFormation.status === 'ouvert' ? 'Inscriptions ouvertes' : 'Bientôt disponible'}
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  {/* Titre + méta */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-brand-green rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm leading-snug">{heroFormation.title}</p>
                      <p className="text-slate-400 text-xs mt-0.5">
                        {heroFormation.duration} · {heroFormation.level}
                      </p>
                    </div>
                  </div>

                  {/* Bloc tarifaire simplifié */}
                  <div className="bg-navy-900/40 border border-white/10 rounded-xl p-4">
                    {heroFormation.paymentType === 'tranches' && nbTranches > 0 ? (
                      <div className="space-y-2">
                        {/* Prix d'accroche */}
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-semibold">À partir de</p>
                            <p className="text-white font-black text-2xl leading-none mt-0.5">
                              {minTranche!.toLocaleString('fr-FR')}
                              <span className="text-sm font-semibold text-slate-300 ml-1">FCFA</span>
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-1 bg-brand-yellow/20 text-brand-yellow text-[11px] font-bold px-2.5 py-1.5 rounded-lg border border-brand-yellow/30 shrink-0">
                            <CreditCard className="w-3 h-3" />
                            En tranches
                          </span>
                        </div>
                        {/* Total + nb tranches */}
                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                          <div>
                            <p className="text-slate-400 text-xs">Total formation</p>
                            <p className="text-white font-semibold text-sm">
                              {heroFormation.price.toLocaleString('fr-FR')} FCFA
                            </p>
                          </div>
                          <p className="text-slate-400 text-xs text-right">
                            Paiement en {nbTranches} tranche{nbTranches > 1 ? 's' : ''}
                          </p>
                        </div>
                        {heroFormation.originalPrice && (
                          <p className="text-slate-500 text-xs line-through">
                            Tarif normal : {heroFormation.originalPrice.toLocaleString('fr-FR')} FCFA
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-end justify-between gap-2">
                        <div>
                          <p className="text-slate-400 text-[10px] uppercase tracking-widest font-semibold">Prix</p>
                          <p className="text-white font-black text-2xl leading-none mt-0.5">
                            {heroFormation.price.toLocaleString('fr-FR')}
                            <span className="text-sm font-semibold text-slate-300 ml-1">FCFA</span>
                          </p>
                          {heroFormation.originalPrice && (
                            <p className="text-slate-500 text-xs line-through mt-0.5">
                              {heroFormation.originalPrice.toLocaleString('fr-FR')} FCFA
                            </p>
                          )}
                          <p className="text-slate-400 text-xs mt-1">Aucun paiement en ligne</p>
                        </div>
                        <span className="inline-flex items-center gap-1 bg-white/10 text-slate-300 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border border-white/20 shrink-0">
                          <Wallet className="w-3 h-3" />
                          Paiement unique
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Points clés */}
                  {heroPoints.length > 0 && (
                    <div className="space-y-1.5">
                      {heroPoints.map((point) => (
                        <div key={point} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{point}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Boutons CTA */}
                  <div className="flex flex-col gap-2 pt-1">
                    <Link
                      href={`/formations/${heroFormation.slug}`}
                      className="flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-bold py-3 rounded-xl transition-colors"
                    >
                      Découvrir cette formation <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/formations/${heroFormation.slug}#programme`}
                      className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-slate-200 text-sm font-semibold py-2.5 rounded-xl transition-colors"
                    >
                      Recevoir le programme
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mini-cards sous la carte */}
              <div className="flex gap-3 mt-3">
                <div className="flex-1 bg-white rounded-xl shadow-xl p-3.5 flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-brand-green" />
                  </div>
                  <div>
                    <p className="font-black text-navy-900 text-sm leading-none">Petits groupes</p>
                    <p className="text-xs text-gray-400">Suivi individualisé</p>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-xl shadow-xl p-3.5 flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-brand-yellow" />
                  </div>
                  <div>
                    <p className="font-black text-navy-900 text-sm leading-none">100% Pratique</p>
                    <p className="text-xs text-gray-400">Zéro théorie inutile</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Vague de bas de page */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 0C1200 40 960 60 720 50C480 40 240 10 0 0L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
