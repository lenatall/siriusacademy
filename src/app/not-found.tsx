import Link from 'next/link'
import { Star, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 bg-brand-yellow/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <Star className="w-10 h-10 text-brand-yellow fill-current" />
        </div>
        <div className="text-8xl font-black text-white/20 mb-4">404</div>
        <h1 className="text-3xl font-black text-white mb-4">Page introuvable</h1>
        <p className="text-slate-300 mb-8">
          Oops ! La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/formations"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Voir les formations
          </Link>
        </div>
      </div>
    </div>
  )
}
