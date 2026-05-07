import { FileText, Layers, Download, BookOpen, RefreshCw, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    icon: Layers,
    title: 'Exercices corrigés',
    description:
      'Chaque module propose des exercices pratiques avec corrections pour valider votre compréhension.',
  },
  {
    icon: FileText,
    title: 'Projets guidés',
    description:
      'Vous travaillez sur des projets réels, étape par étape, avec des consignes claires et un cadre structuré.',
  },
  {
    icon: Download,
    title: 'Supports pratiques',
    description:
      "Des ressources téléchargeables : fiches mémo, templates, guides d'application selon les modules.",
  },
  {
    icon: BookOpen,
    title: 'Ressources gratuites',
    description:
      "Des contenus d'introduction accessibles à tous pour découvrir les bases avant de s'engager.",
  },
  {
    icon: RefreshCw,
    title: 'Amélioration continue',
    description:
      'Les programmes sont régulièrement mis à jour pour rester alignés avec les pratiques actuelles du digital.',
  },
]

export default function FounderSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Notre méthode
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-navy-900 mb-4">
            Comment se passe une formation{' '}
            <span className="text-brand-green">chez Sirius Academy ?</span>
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            Pas de cours magistraux. Chaque session est pensée pour que vous produisiez quelque
            chose — un exercice, un projet, une réalisation que vous pouvez montrer.
          </p>
        </div>

        {/* Steps — desktop: 5 cols with connecting lines / mobile: vertical list */}
        <div className="relative mb-16">
          {/* Desktop layout */}
          <div className="hidden lg:flex items-start gap-0">
            {steps.map((step, i) => {
              const Icon = step.icon
              const num = String(i + 1).padStart(2, '0')
              const isLast = i === steps.length - 1
              return (
                <div key={step.title} className="flex-1 flex flex-col items-center text-center relative">
                  {/* Connecting dashed line (between circles) */}
                  {!isLast && (
                    <div
                      className="absolute top-6 left-1/2 w-full border-t-2 border-dashed border-brand-green/30"
                      style={{ left: '50%', width: '100%' }}
                    />
                  )}

                  {/* Circle */}
                  <div className="relative z-10 w-12 h-12 rounded-full border-2 border-brand-green bg-white flex items-center justify-center mb-4 shadow-sm">
                    <span className="text-navy-900 font-black text-xs">{num}</span>
                  </div>

                  {/* Icon badge */}
                  <div className="w-9 h-9 bg-brand-green/10 rounded-xl flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-brand-green" />
                  </div>

                  {/* Text */}
                  <h3 className="font-bold text-navy-900 text-sm mb-1 px-2">{step.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed px-2">{step.description}</p>
                </div>
              )
            })}
          </div>

          {/* Mobile layout — vertical list */}
          <div className="flex flex-col gap-0 lg:hidden">
            {steps.map((step, i) => {
              const Icon = step.icon
              const num = String(i + 1).padStart(2, '0')
              const isLast = i === steps.length - 1
              return (
                <div key={step.title} className="flex gap-4">
                  {/* Left: circle + vertical line */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border-2 border-brand-green bg-white flex items-center justify-center shrink-0 shadow-sm">
                      <span className="text-navy-900 font-black text-xs">{num}</span>
                    </div>
                    {!isLast && (
                      <div className="w-0.5 flex-1 border-l-2 border-dashed border-brand-green/30 my-1" />
                    )}
                  </div>

                  {/* Right: content */}
                  <div className="pb-8">
                    <div className="w-8 h-8 bg-brand-green/10 rounded-lg flex items-center justify-center mb-2">
                      <Icon className="w-4 h-4 text-brand-green" />
                    </div>
                    <h3 className="font-bold text-navy-900 text-base mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA box */}
        <div className="bg-navy-900 rounded-2xl px-8 py-8 border-l-4 border-brand-green flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <ArrowRight className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
            <p className="text-white text-lg font-semibold leading-relaxed">
              Vous ne venez pas seulement écouter un cours :{' '}
              <span className="text-brand-green">vous venez pratiquer, produire et progresser.</span>
            </p>
          </div>
          <Link
            href="/formations"
            className="shrink-0 inline-flex items-center gap-2 bg-brand-green text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-emerald-500 transition-colors duration-200 whitespace-nowrap"
          >
            Voir les formations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
