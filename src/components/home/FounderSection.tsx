import Link from 'next/link'
import { ArrowRight, Award, Briefcase, GraduationCap, Zap } from 'lucide-react'

export default function FounderSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-navy-900/5 text-navy-900 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <span>La fondatrice</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-navy-900 mb-3">
            Léna Badiane
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            Professionnelle du digital, elle a fondé Sirius Academy pour transmettre ce qui marche vraiment sur le terrain.
          </p>
        </div>

        {/* Card centrale */}
        <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
            {/* Identity */}
            <div className="flex items-center gap-4 md:shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-brand-yellow flex items-center justify-center font-black text-navy-900 text-2xl shadow-lg shrink-0">
                LB
              </div>
              <div>
                <h3 className="text-xl font-black">Léna Badiane</h3>
                <p className="text-slate-400 text-sm">Fondatrice · Sirius Academy</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                  <span className="text-brand-green text-xs font-semibold">Active</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-20 bg-white/10 shrink-0" />

            {/* Quote */}
            <blockquote>
              <p className="text-slate-200 text-base leading-relaxed italic">
                "On apprend en faisant — pas en regardant des diaporamas. Chaque formation Sirius Academy se termine avec un projet concret que vous pouvez montrer."
              </p>
            </blockquote>
          </div>
        </div>

        {/* Credentials + CTA */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: GraduationCap, label: 'Licence Génie Logiciel & Réseaux', color: 'text-blue-500' },
            { icon: Award, label: 'Référente Digitale — Sonatel Academy', color: 'text-brand-green' },
            { icon: Briefcase, label: 'Head of Product — EDACY', color: 'text-amber-500' },
            { icon: Zap, label: 'Accompagnement entreprises · Digital', color: 'text-purple-500' },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <Icon className={`w-5 h-5 ${color} shrink-0 mt-0.5`} />
              <span className="text-sm text-gray-700 font-medium leading-snug">{label}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/a-propos"
            className="inline-flex items-center gap-2 text-brand-green font-semibold hover:gap-3 transition-all duration-200"
          >
            En savoir plus
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
