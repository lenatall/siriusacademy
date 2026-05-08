import { Laptop, BookOpen, Award, TrendingUp, CheckSquare, Compass, Star, Zap, Target, Globe, Users, Lightbulb } from 'lucide-react'
import { store } from '@/lib/store'

const icons = [Laptop, BookOpen, CheckSquare, Award, TrendingUp, Compass, Star, Zap, Target, Globe, Users, Lightbulb]
const colors = [
  'bg-blue-50 text-blue-600',
  'bg-emerald-50 text-emerald-600',
  'bg-amber-50 text-amber-600',
  'bg-purple-50 text-purple-600',
  'bg-rose-50 text-rose-600',
  'bg-indigo-50 text-indigo-600',
  'bg-cyan-50 text-cyan-600',
  'bg-orange-50 text-orange-600',
  'bg-teal-50 text-teal-600',
  'bg-lime-50 text-lime-600',
  'bg-pink-50 text-pink-600',
  'bg-violet-50 text-violet-600',
]

export default function Features() {
  const settings = store.settings.get()
  const features = settings.features ?? []

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Notre méthode
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-navy-900 mb-4">
            Apprendre, pratiquer,{' '}
            <span className="bg-gradient-to-r from-brand-green to-emerald-400 bg-clip-text text-transparent">
              produire.
            </span>
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            Notre objectif n&apos;est pas de remplir des cours théoriques, mais d&apos;aider chaque
            apprenant à comprendre les outils, les appliquer et construire des réalisations
            concrètes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = icons[index % icons.length]
            const color = colors[index % colors.length]
            const num = String(index + 1).padStart(2, '0')
            return (
              <div
                key={index}
                className="relative overflow-hidden bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-green/30 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="absolute top-4 right-4 text-4xl font-black text-gray-100 select-none leading-none">
                  {num}
                </span>
                <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-navy-900 text-base mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
