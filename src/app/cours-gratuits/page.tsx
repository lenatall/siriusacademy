'use client'

import { useState } from 'react'
import { Gift, Search, BookOpen, Star } from 'lucide-react'
import { coursgratuits } from '@/data/cours'
import CoursCard from '@/components/cours/CoursCard'
import CoursAccessForm from '@/components/cours/CoursAccessForm'
import type { FreeCourse } from '@/types'

export default function CoursGratuitsPage() {
  const [selectedCours, setSelectedCours] = useState<FreeCourse | null>(null)
  const [filter, setFilter] = useState('Toutes')

  const categories = ['Toutes', ...Array.from(new Set(coursgratuits.map((c) => c.category)))]

  const filtered =
    filter === 'Toutes' ? coursgratuits : coursgratuits.filter((c) => c.category === filter)

  const handleAccess = (slug: string) => {
    const cours = coursgratuits.find((c) => c.slug === slug)
    if (cours) setSelectedCours(cours)
  }

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <div className="container-custom text-center">
          <div className="w-16 h-16 bg-brand-yellow/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Gift className="w-8 h-8 text-brand-yellow" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Cours <span className="text-brand-yellow">gratuits</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-6">
            Commencez à apprendre dès maintenant avec nos cours 100% gratuits. Renseignez votre
            email pour y accéder instantanément — sans carte bancaire.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Star className="w-4 h-4 text-brand-yellow fill-current" />
              <span>{coursgratuits.length} cours disponibles</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <BookOpen className="w-4 h-4 text-brand-green" />
              <span>
                {coursgratuits.reduce((sum, c) => sum + c.lessonsCount, 0)} leçons vidéo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white py-10 border-b border-gray-100">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { step: '01', text: 'Choisissez un cours qui vous intéresse' },
              { step: '02', text: 'Renseignez votre nom et email' },
              { step: '03', text: 'Accédez instantanément au contenu' },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-navy-900 text-white text-sm font-black rounded-xl flex items-center justify-center shrink-0">
                  {item.step}
                </div>
                <span className="text-sm font-medium text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Courses */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === cat
                    ? 'bg-navy-900 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cours) => (
              <CoursCard key={cours.id} cours={cours} onAccess={handleAccess} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-10 text-center text-white">
            <h3 className="text-2xl font-black mb-3">
              Vous voulez aller plus loin ?
            </h3>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto text-sm">
              Nos cours gratuits sont un avant-goût. Découvrez nos formations certifiantes complètes
              pour acquérir toutes les compétences d&apos;un professionnel.
            </p>
            <a
              href="/formations"
              className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-amber-400 text-navy-900 font-bold px-7 py-3.5 rounded-xl transition-colors text-sm"
            >
              Voir les formations certifiantes
            </a>
          </div>
        </div>
      </section>

      {/* Access Form Modal */}
      {selectedCours && (
        <CoursAccessForm cours={selectedCours} onClose={() => setSelectedCours(null)} />
      )}
    </>
  )
}
