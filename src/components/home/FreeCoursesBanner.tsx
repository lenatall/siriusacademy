import Link from 'next/link'
import { Play, ArrowRight, BookOpen, Star } from 'lucide-react'

const previewCourses = [
  { title: 'Introduction au HTML & CSS', duration: '3h30', level: 'Débutant' },
  { title: 'Les bases du référencement SEO', duration: '2h15', level: 'Débutant' },
  { title: 'Figma pour débutants', duration: '4h00', level: 'Débutant' },
]

export default function FreeCoursesBanner() {
  return (
    <section className="py-24 bg-navy-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-navy-700/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-green/20 text-brand-green text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 fill-current" />
              <span>100% Gratuit</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Commencez à apprendre
              <span className="text-brand-yellow"> gratuitement</span> dès aujourd&apos;hui
            </h2>
            <p className="text-slate-300 text-base leading-relaxed mb-8">
              5 cours gratuits pour découvrir nos thématiques et nos formateurs. Accès immédiat
              après un simple formulaire — aucune carte bancaire requise.
            </p>
            <Link
              href="/cours-gratuits"
              className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-amber-400 text-navy-900 font-bold px-7 py-4 rounded-xl transition-all duration-200 shadow-yellow-lg hover:-translate-y-0.5 text-base"
            >
              Accéder aux cours gratuits
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Right — Course previews */}
          <div className="space-y-4">
            {previewCourses.map((course, index) => (
              <div
                key={course.title}
                className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all duration-200 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-brand-green/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand-green/30 transition-colors">
                  <Play className="w-5 h-5 text-brand-green fill-current" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{course.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-400">{course.duration}</span>
                    <span className="text-xs text-brand-green font-medium">{course.level}</span>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="text-xs font-bold text-brand-green bg-emerald-950/50 px-3 py-1 rounded-full border border-brand-green/30">
                    Gratuit
                  </span>
                </div>
              </div>
            ))}

            <Link
              href="/cours-gratuits"
              className="flex items-center justify-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors mt-2"
            >
              <BookOpen className="w-4 h-4" />
              Voir les 5 cours disponibles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
