import Link from 'next/link'
import { ArrowRight, Play, Star, Users, BookOpen, Award } from 'lucide-react'

export default function Hero() {
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

        {/* Floating stars */}
        {[
          { top: '15%', left: '8%', size: 'w-2 h-2', opacity: 'opacity-40', delay: '0s' },
          { top: '30%', right: '12%', size: 'w-1.5 h-1.5', opacity: 'opacity-30', delay: '1s' },
          { top: '60%', left: '5%', size: 'w-3 h-3', opacity: 'opacity-20', delay: '2s' },
          { top: '75%', right: '8%', size: 'w-2 h-2', opacity: 'opacity-40', delay: '0.5s' },
          { top: '20%', left: '40%', size: 'w-1 h-1', opacity: 'opacity-60', delay: '1.5s' },
        ].map((star, i) => (
          <div
            key={i}
            className={`absolute ${star.size} ${star.opacity} rounded-full bg-brand-yellow animate-float`}
            style={{
              top: star.top,
              left: (star as { left?: string }).left,
              right: (star as { right?: string }).right,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Top badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
              <Star className="w-4 h-4 text-brand-yellow fill-current" />
              <span className="font-medium">Académie digitale basée au Sénégal</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Construisez des
              <span className="block text-gradient-green">compétences digitales</span>
              visibles et concrètes
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
              Marketing digital, création de contenu, réseaux sociaux, design — des formations
              pratiques, en petits groupes, avec des projets concrets et un accompagnement personnalisé.
            </p>

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
                href="/cours-gratuits"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 backdrop-blur-sm text-base"
              >
                <Play className="w-5 h-5 fill-current text-brand-yellow" />
                Cours gratuits
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

          {/* Right — Floating Cards */}
          <div className="hidden lg:block relative">
            <div className="relative w-full h-[500px]">
              {/* Main card */}
              <div className="absolute top-10 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Développement Web Full-Stack</p>
                    <p className="text-slate-400 text-xs">4 mois · 12 modules</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-white font-black text-lg">1 200€</p>
                    <p className="text-slate-400 text-xs line-through">1 800€</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {['React & Next.js', 'Node.js & Express', 'Bases de données'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  href="/formations/developpement-web-full-stack"
                  className="mt-4 flex items-center justify-center gap-2 bg-brand-green text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-brand-green-dark transition-colors"
                >
                  Découvrir <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Stats cards */}
              <div className="absolute -bottom-6 left-4 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-brand-green" />
                </div>
                <div>
                  <p className="font-black text-navy-900 text-lg leading-none">Petits groupes</p>
                  <p className="text-xs text-gray-400">Suivi individualisé</p>
                </div>
              </div>

              <div className="absolute -bottom-6 right-4 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Star className="w-5 h-5 text-brand-yellow fill-current" />
                </div>
                <div>
                  <p className="font-black text-navy-900 text-lg leading-none">4.9/5</p>
                  <p className="text-xs text-gray-400">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
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
