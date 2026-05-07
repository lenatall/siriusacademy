'use client'

import { useEffect, useState } from 'react'
import { Star, Globe, MessageCircle, Share2, FileText, Home, Save, Check, AlertCircle, Loader2 } from 'lucide-react'

interface SiteSettings {
  heroFormationSlug: string
  siteName: string
  slogan: string
  country: string
  currency: string
  contactEmail: string
  whatsappNumber: string
  whatsappLink: string
  heroTitle: string
  heroSubtitle: string
  heroCta1: string
  heroCta2: string
  footerText: string
  socialFacebook?: string
  socialInstagram?: string
  socialLinkedin?: string
  socialTwitter?: string
  legalMentions?: string
  privacyPolicy?: string
}

interface Formation {
  slug: string
  title: string
  status: string
}

const defaultSettings: SiteSettings = {
  heroFormationSlug: '',
  siteName: 'Sirius Academy',
  slogan: 'Apprendre le digital en pratiquant.',
  country: "Sénégal — Afrique de l'Ouest",
  currency: 'FCFA',
  contactEmail: 'contact@siriusacademy.sn',
  whatsappNumber: '+221 77 000 00 00',
  whatsappLink: 'https://wa.me/221770000000',
  heroTitle: 'Apprendre le digital en pratiquant.',
  heroSubtitle: "Pour les étudiants, entrepreneurs et personnes en reconversion qui veulent maîtriser le digital.",
  heroCta1: 'Voir les formations',
  heroCta2: 'Notre approche',
  footerText: '© 2025 Sirius Academy — Tous droits réservés.',
  socialFacebook: '',
  socialInstagram: '',
  socialLinkedin: '',
  socialTwitter: '',
  legalMentions: '',
  privacyPolicy: '',
}

function Section({ icon: Icon, title, description, children }: {
  icon: React.ElementType
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
        <div className="w-9 h-9 bg-navy-50 rounded-xl flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-navy-700" />
        </div>
        <div>
          <h2 className="font-bold text-navy-900 text-sm">{title}</h2>
          {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
        </div>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}

const inputClass = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-colors"
const textareaClass = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-colors resize-none"

export default function ParametresPage() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/formations').then((r) => r.json()),
      fetch('/api/admin/settings').then((r) => r.json()),
    ]).then(([f, s]) => {
      setFormations(Array.isArray(f) ? f : [])
      setSettings({ ...defaultSettings, ...s })
      setLoading(false)
    })
  }, [])

  const set = (key: keyof SiteSettings, value: string) =>
    setSettings((s) => ({ ...s, [key]: value }))

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Paramètres du site</h1>
          <p className="text-gray-500 mt-1 text-sm">Configurez les éléments de Sirius Academy.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors disabled:opacity-60 shrink-0"
        >
          {saved ? (
            <><Check className="w-4 h-4" /> Sauvegardé !</>
          ) : saving ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Sauvegarde...</>
          ) : (
            <><Save className="w-4 h-4" /> Sauvegarder</>
          )}
        </button>
      </div>

      {/* Identité du site */}
      <Section icon={Globe} title="Identité du site" description="Nom, slogan, devise, contact principal.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nom du site">
            <input type="text" value={settings.siteName} onChange={(e) => set('siteName', e.target.value)} className={inputClass} placeholder="Sirius Academy" />
          </Field>
          <Field label="Slogan">
            <input type="text" value={settings.slogan} onChange={(e) => set('slogan', e.target.value)} className={inputClass} placeholder="Apprendre le digital en pratiquant." />
          </Field>
          <Field label="Pays / Région">
            <input type="text" value={settings.country} onChange={(e) => set('country', e.target.value)} className={inputClass} placeholder="Sénégal" />
          </Field>
          <Field label="Devise">
            <input type="text" value={settings.currency} onChange={(e) => set('currency', e.target.value)} className={inputClass} placeholder="FCFA" />
          </Field>
          <Field label="Email de contact">
            <input type="email" value={settings.contactEmail} onChange={(e) => set('contactEmail', e.target.value)} className={inputClass} placeholder="contact@siriusacademy.sn" />
          </Field>
        </div>
      </Section>

      {/* WhatsApp */}
      <Section icon={MessageCircle} title="WhatsApp" description="Numéro et lien WhatsApp pour les contacts et redirections.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Numéro WhatsApp (affiché)">
            <input type="text" value={settings.whatsappNumber} onChange={(e) => set('whatsappNumber', e.target.value)} className={inputClass} placeholder="+221 77 000 00 00" />
          </Field>
          <Field label="Lien WhatsApp" hint="Format : https://wa.me/221770000000">
            <input type="url" value={settings.whatsappLink} onChange={(e) => set('whatsappLink', e.target.value)} className={inputClass} placeholder="https://wa.me/221..." />
          </Field>
        </div>
      </Section>

      {/* Page d'accueil */}
      <Section icon={Home} title="Page d'accueil (Hero)" description="Textes et boutons de la section principale.">
        {/* Formation mise en avant */}
        <Field label="Formation mise en avant (Hero)" hint="La formation affichée dans la section principale de la page d'accueil.">
          <select
            value={settings.heroFormationSlug}
            onChange={(e) => set('heroFormationSlug', e.target.value)}
            className={inputClass}
          >
            <option value="">— Aucune sélection —</option>
            {formations.map((f) => (
              <option key={f.slug} value={f.slug}>
                {f.title} {f.status === 'ouvert' ? '✓ Ouvert' : f.status === 'bientot' ? '⏳ Bientôt' : '✎ Brouillon'}
              </option>
            ))}
          </select>
          {heroFormation && (
            <div className="mt-2 bg-navy-50 rounded-xl px-4 py-2.5 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full shrink-0 ${heroFormation.status === 'ouvert' ? 'bg-brand-green' : 'bg-amber-400'}`} />
              <p className="text-sm font-semibold text-navy-900">{heroFormation.title}</p>
            </div>
          )}
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Bouton principal (CTA 1)">
            <input type="text" value={settings.heroCta1} onChange={(e) => set('heroCta1', e.target.value)} className={inputClass} placeholder="Voir les formations" />
          </Field>
          <Field label="Bouton secondaire (CTA 2)">
            <input type="text" value={settings.heroCta2} onChange={(e) => set('heroCta2', e.target.value)} className={inputClass} placeholder="Notre approche" />
          </Field>
        </div>

        <Field label="Titre principal du Hero">
          <input type="text" value={settings.heroTitle} onChange={(e) => set('heroTitle', e.target.value)} className={inputClass} placeholder="Apprendre le digital en pratiquant." />
        </Field>

        <Field label="Sous-titre du Hero">
          <textarea rows={2} value={settings.heroSubtitle} onChange={(e) => set('heroSubtitle', e.target.value)} className={textareaClass} placeholder="Pour les étudiants, entrepreneurs..." />
        </Field>

        <div className="flex items-start gap-2 text-xs text-gray-400 bg-gray-50 rounded-xl px-4 py-3">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <p>Les modifications du Hero nécessitent un déploiement pour être visibles. La sélection de la formation est effective immédiatement.</p>
        </div>
      </Section>

      {/* Réseaux sociaux */}
      <Section icon={Share2} title="Réseaux sociaux" description="Liens vers vos profils officiels.">
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { key: 'socialFacebook' as keyof SiteSettings, label: 'Facebook', placeholder: 'https://facebook.com/siriusacademy' },
            { key: 'socialInstagram' as keyof SiteSettings, label: 'Instagram', placeholder: 'https://instagram.com/siriusacademy' },
            { key: 'socialLinkedin' as keyof SiteSettings, label: 'LinkedIn', placeholder: 'https://linkedin.com/company/siriusacademy' },
            { key: 'socialTwitter' as keyof SiteSettings, label: 'Twitter / X', placeholder: 'https://twitter.com/siriusacademy' },
          ].map(({ key, label, placeholder }) => (
            <Field key={key} label={label}>
              <input
                type="url"
                value={(settings[key] as string) || ''}
                onChange={(e) => set(key, e.target.value)}
                className={inputClass}
                placeholder={placeholder}
              />
            </Field>
          ))}
        </div>
      </Section>

      {/* Footer & Légal */}
      <Section icon={FileText} title="Footer & Légal" description="Texte du pied de page et contenus légaux.">
        <Field label="Texte du footer">
          <input type="text" value={settings.footerText} onChange={(e) => set('footerText', e.target.value)} className={inputClass} placeholder="© 2025 Sirius Academy..." />
        </Field>
        <Field label="Mentions légales" hint="Texte complet des mentions légales.">
          <textarea rows={6} value={settings.legalMentions || ''} onChange={(e) => set('legalMentions', e.target.value)} className={textareaClass} placeholder="Responsable de la publication : Léna Badiane..." />
        </Field>
        <Field label="Politique de confidentialité" hint="Texte complet de la politique de confidentialité.">
          <textarea rows={6} value={settings.privacyPolicy || ''} onChange={(e) => set('privacyPolicy', e.target.value)} className={textareaClass} placeholder="Nous collectons vos données pour traiter vos demandes..." />
        </Field>
      </Section>

      {/* Save button bottom */}
      <div className="flex justify-end pb-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-navy-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors disabled:opacity-60"
        >
          {saved ? (
            <><Check className="w-4 h-4" /> Tout est sauvegardé</>
          ) : saving ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Sauvegarde...</>
          ) : (
            <><Save className="w-4 h-4" /> Sauvegarder les paramètres</>
          )}
        </button>
      </div>
    </div>
  )
}
