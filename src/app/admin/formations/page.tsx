'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Eye, Star, BookOpen, Lock, LayoutTemplate } from 'lucide-react'
import type { Formation } from '@/types'

export default function AdminFormationsPage() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [heroSlug, setHeroSlug] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [settingHero, setSettingHero] = useState<string | null>(null)

  const load = () => {
    Promise.all([
      fetch('/api/admin/formations').then((r) => r.json()),
      fetch('/api/admin/settings').then((r) => r.json()),
    ]).then(([data, settings]) => {
      setFormations(data)
      setHeroSlug(settings.heroFormationSlug ?? '')
      setLoading(false)
    })
  }

  useEffect(load, [])

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Supprimer la formation "${title}" ? Cette action est irréversible.`)) return
    setDeleting(slug)
    await fetch(`/api/admin/formations/${slug}`, { method: 'DELETE' })
    load()
    setDeleting(null)
  }

  const handleSetHero = async (slug: string) => {
    setSettingHero(slug)
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ heroFormationSlug: slug }),
    })
    setHeroSlug(slug)
    setSettingHero(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Formations payantes</h1>
          <p className="text-gray-500 mt-1">{formations.length} formation(s) au catalogue</p>
        </div>
        <Link
          href="/admin/formations/nouvelle"
          className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Nouvelle formation
        </Link>
      </div>

      {/* Hero info banner */}
      {heroSlug && (
        <div className="bg-brand-yellow/10 border border-brand-yellow/30 rounded-xl px-4 py-3 mb-6 flex items-center gap-2 text-sm text-amber-700">
          <LayoutTemplate className="w-4 h-4 shrink-0" />
          <span>
            Formation affichée dans le <strong>Hero de la page d&apos;accueil</strong> :{' '}
            <strong>{formations.find((f) => f.slug === heroSlug)?.title ?? heroSlug}</strong>
          </span>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-navy-900 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {formations.map((f) => (
            <div
              key={f.slug}
              className={`bg-white rounded-2xl border shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-colors ${
                heroSlug === f.slug ? 'border-brand-yellow bg-amber-50/30' : 'border-gray-100'
              }`}
            >
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-semibold text-brand-green bg-emerald-50 px-2 py-0.5 rounded-full">
                    {f.category}
                  </span>
                  <span className="text-xs text-gray-400">{f.level}</span>
                  {f.isFeatured && (
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Vedette
                    </span>
                  )}
                  {heroSlug === f.slug && (
                    <span className="text-xs font-semibold text-amber-700 bg-brand-yellow/20 px-2 py-0.5 rounded-full flex items-center gap-1 border border-brand-yellow/30">
                      <LayoutTemplate className="w-3 h-3" /> Hero
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-navy-900 truncate">{f.title}</h3>
                <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{f.modules.length} modules</span>
                  <span className="font-bold text-navy-900">{f.price.toLocaleString('fr-FR')} FCFA</span>
                  {f.status === 'ouvert' ? (
                    <span className="flex items-center gap-1 text-brand-green font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green" /> Ouvert
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-600 font-semibold">
                      <Lock className="w-3 h-3" /> Bientôt
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Set as hero */}
                <button
                  onClick={() => handleSetHero(f.slug)}
                  disabled={heroSlug === f.slug || settingHero === f.slug}
                  className={`p-2 rounded-lg transition-colors text-xs font-semibold flex items-center gap-1.5 px-3 ${
                    heroSlug === f.slug
                      ? 'bg-brand-yellow/20 text-amber-700 cursor-default'
                      : 'text-gray-400 hover:text-amber-600 hover:bg-amber-50'
                  }`}
                  title="Afficher dans le Hero de la page d'accueil"
                >
                  <LayoutTemplate className="w-3.5 h-3.5" />
                  {heroSlug === f.slug ? 'Hero actuel' : 'Mettre en Hero'}
                </button>

                <a
                  href={`/formations/${f.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-navy-900 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Voir sur le site"
                >
                  <Eye className="w-4 h-4" />
                </a>
                <Link
                  href={`/admin/formations/${f.slug}`}
                  className="p-2 text-gray-400 hover:text-brand-green hover:bg-emerald-50 rounded-lg transition-colors"
                  title="Modifier"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(f.slug, f.title)}
                  disabled={deleting === f.slug}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {formations.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Aucune formation pour l&apos;instant</p>
              <Link href="/admin/formations/nouvelle" className="text-sm text-brand-green font-semibold mt-2 inline-block">
                Créer la première formation →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
