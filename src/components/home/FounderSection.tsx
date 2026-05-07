import { FileText, Layers, Download, BookOpen, RefreshCw } from 'lucide-react'

const steps = [
  {
    icon: Layers,
    title: 'Exercices corrigés',
    description: 'Chaque module propose des exercices pratiques avec corrections pour valider votre compréhension.',
  },
  {
    icon: FileText,
    title: 'Projets guidés',
    description: 'Vous travaillez sur des projets réels, étape par étape, avec des consignes claires et un cadre structuré.',
  },
  {
    icon: Download,
    title: 'Supports pratiques',
    description: 'Des ressources téléchargeables : fiches mémo, templates, guides d\'application selon les modules.',
  },
  {
    icon: BookOpen,
    title: 'Ressources gratuites',
    description: 'Des contenus d\'introduction accessibles à tous pour découvrir les bases avant de s\'engager.',
  },
  {
    icon: RefreshCw,
    title: 'Amélioration continue',
    description: 'Les programmes sont régulièrement mis à jour pour rester alignés avec les pratiques actuelles du digital.',
  },
]

export default function FounderSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-navy-900 mb-4">
            Comment se passe une formation<br />
            <span className="text-brand-green">chez Sirius Academy ?</span>
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            Pas de cours magistraux. Chaque session est pensée pour que vous produisiez quelque chose — un exercice, un projet, une réalisation que vous pouvez montrer.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-brand-green/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-brand-green" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Étape {i + 1}</span>
                </div>
                <h3 className="font-bold text-navy-900 text-base">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>

        {/* Final phrase */}
        <div className="bg-navy-900 rounded-2xl px-8 py-7">
          <p className="text-white text-lg font-semibold leading-relaxed text-center">
            Vous ne venez pas seulement écouter un cours :{' '}
            <span className="text-brand-green">vous venez pratiquer, produire et progresser.</span>
          </p>
        </div>

      </div>
    </section>
  )
}
