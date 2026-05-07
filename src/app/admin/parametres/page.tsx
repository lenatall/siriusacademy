'use client'

import { useEffect, useState } from 'react'
import { Settings, Globe, Star, Check, Save, AlertCircle } from 'lucide-react'

interface Formation {
  id: string
  slug: string
  title: string
  status: string
}

interface SiteSettings {
  heroFormationSlug: string
}

export default function ParametresPage() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [settings, setSettings] = useState<SiteSettings>({ heroFormationSlug: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/formations').then((r) => r.json()),
      fetch('/api/admin/settings').then((r) => r.json()),
    ]).then(([f, s]) => {
      setFormations(f)
      setSettings(s)
      setLoading(false)
    })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const heroFormation = formations.find((f) => f.slug === settings.heroFormationSlug)

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-navy-900">Paramètres</h1>
        <p className="text-gray-500 mt-1 text-sm">Configurez les éléments clés de votre site.</p>
      </div>

      {/* Hero formation */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 bg-navy-50 rounded-xl flex items-center justify-center">
            <Star className="w-4 h-4 text-navy-900" />
          </div>
          <div>
            <h2 className="font-bold text-navy-900 text-sm">Formation mise en avant</h2>
            <p className="text-xs text-gray-500">La formation affichée dans la section Hero de la page d&apos;accueil.</p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {loading ? (
            <div className="h-10 bg-gray-100 rounded-xl animate-pulse" />
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Sélectionner une formation
                </label>
                <select
                  value={settings.heroFormationSlug}
                  onChange={(e) => setSettings((s) => ({ ...s, heroFormationSlug: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-colors"
                >
                  <option value="">— Aucune sélection —</option>
                  {formations.map((f) => (
                    <option key={f.slug} value={f.slug}>
                      {f.title} {f.status === 'ouvert' ? '✓ Ouvert' : '⏳ Bientôt'}
                    </option>
                  ))}
                </select>
              </div>

              {heroFormation && (
                <div className="bg-navy-50 rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-green shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{heroFormation.title}</p>
                    <p className="text-xs text-gray-500">
                      Statut : {heroFormation.status === 'ouvert' ? 'Inscriptions ouvertes' : 'Bientôt disponible'}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2 text-xs text-gray-400 bg-gray-50 rounded-xl px-4 py-3">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <p>Le changement sera visible immédiatement sur la page d&apos;accueil après sauvegarde. Vous pouvez aussi changer la formation Hero directement depuis la liste des formations.</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Site info (read-only for now) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
            <Globe className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <h2 className="font-bold text-navy-900 text-sm">Informations du site</h2>
            <p className="text-xs text-gray-500">Données générales de Sirius Academy.</p>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nom du site</label>
              <input
                type="text"
                defaultValue="Sirius Academy"
                disabled
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Pays / Région</label>
              <input
                type="text"
                defaultValue="Sénégal — Afrique de l'Ouest"
                disabled
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email de contact</label>
              <input
                type="email"
                defaultValue="contact@siriusacademy.sn"
                disabled
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Devise</label>
              <input
                type="text"
                defaultValue="FCFA (XOF)"
                disabled
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400">Ces informations sont configurées dans le code source.</p>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="inline-flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors disabled:opacity-50"
        >
          {saved ? (
            <><Check className="w-4 h-4" /> Sauvegardé !</>
          ) : saving ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sauvegarde...</>
          ) : (
            <><Save className="w-4 h-4" /> Sauvegarder</>
          )}
        </button>
      </div>
    </div>
  )
}
