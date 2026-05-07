import Link from 'next/link'
import { ArrowRight, CheckCircle, Award, Briefcase, GraduationCap, Zap } from 'lucide-react'

const credentials = [
  {
    icon: GraduationCap,
    label: 'Licence Génie Logiciel & Réseaux',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
  },
  {
    icon: Award,
    label: 'Référente Digitale certifiée — Sonatel Academy',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
  {
    icon: Briefcase,
    label: 'Head of Product — EDACY',
    color: 'bg-amber-50 text-amber-700 border-amber-100',
  },
  {
    icon: Zap,
    label: 'Accompagnement d\'entreprises en transformation digitale',
    color: 'bg-purple-50 text-purple-600 border-purple-100',
  },
]

const expertise = [
  'Marketing digital & stratégie de contenu',
  'Gestion des réseaux sociaux & community management',
  'Publicité Meta Ads & Google Ads',
  'Transformation digitale des entreprises',
  'Développement produit & UX',
  'Formation et accompagnement de terrain',
]

export default function FounderSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-navy-900/5 text-navy-900 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <span>Votre formatrice</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-navy-900 mb-3">
            Apprenez auprès de{' '}
            <span className="text-brand-green">quelqu'un qui pratique</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Sirius Academy est fondée et animée par une professionnelle du digital — pas un agrégateur de cours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Identity card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-green/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-yellow/10 rounded-full blur-2xl" />

              <div className="relative z-10">
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-brand-yellow flex items-center justify-center font-black text-navy-900 text-2xl shrink-0 shadow-lg">
                    LB
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">Léna Badiane</h3>
                    <p className="text-slate-300 text-sm">Fondatrice & Formatrice principale</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                      <span className="text-brand-green text-xs font-semibold">Disponible pour vos formations</span>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="border-l-2 border-brand-green pl-4 mb-6">
                  <p className="text-slate-200 text-base leading-relaxed italic">
                    "J'ai construit Sirius Academy parce que j'ai vu trop de formations théoriques qui ne préparent pas à la réalité du terrain. Ici, on apprend en faisant — et on repart avec un portfolio concret."
                  </p>
                </blockquote>

                {/* Credentials */}
                <div className="space-y-2">
                  {credentials.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <Icon className="w-4 h-4 text-brand-green shrink-0" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — Expertise */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-black text-navy-900 mb-2">
                Une formation dispensée par quelqu'un qui fait
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Léna Badiane accompagne des entreprises dans leur transformation digitale au quotidien.
                Ce qu'elle enseigne, elle le pratique. Ses formations sont construites à partir de
                situations réelles, d'outils actuels et de méthodes qui fonctionnent sur le terrain — pas dans les manuels.
              </p>
            </div>

            {/* Expertise list */}
            <div className="grid sm:grid-cols-2 gap-3">
              {expertise.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            {/* Method highlight */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-brand-green/10 rounded-xl flex items-center justify-center">
                  <Zap className="w-4 h-4 text-brand-green" />
                </div>
                <h4 className="font-bold text-navy-900 text-sm">La méthode Learning by Doing</h4>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                Chaque session, vous créez, vous publiez, vous analysez. Pas de diaporamas passifs —
                des projets réels que vous pouvez montrer dès la fin de la formation.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Projets réels', 'Outils professionnels', 'Feedback terrain', 'Portfolio final'].map((tag) => (
                  <span key={tag} className="text-xs bg-brand-green/10 text-brand-green font-semibold px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/a-propos"
              className="inline-flex items-center gap-2 text-brand-green font-semibold hover:gap-3 transition-all duration-200"
            >
              En savoir plus sur Sirius Academy
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
