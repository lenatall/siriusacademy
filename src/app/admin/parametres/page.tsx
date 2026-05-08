'use client'

import { useEffect, useState } from 'react'
import {
  Star, Globe, MessageCircle, Share2, FileText, Home, Save, Check,
  Loader2, Image as ImageIcon, Phone, HelpCircle, Quote, BarChart2,
  Zap, List, Plus, Trash2, ChevronDown, ChevronUp,
} from 'lucide-react'
import type { FaqItem, TestimonialItem, StatItem, FeatureItem, ProcessStep } from '@/types'

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
  logoUrl?: string
  siteDescription?: string
  contactPhone?: string
  contactAddress?: string
  contactHours?: string
  faq?: FaqItem[]
  testimonials?: TestimonialItem[]
  stats?: StatItem[]
  features?: FeatureItem[]
  processSteps?: ProcessStep[]
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
  siteDescription: '',
  contactPhone: '',
  contactAddress: '',
  contactHours: '',
  faq: [],
  testimonials: [],
  stats: [],
  features: [],
  processSteps: [],
}

/* ── Shared UI helpers ─────────────────────────────────────── */
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

/* ── Array item wrapper ────────────────────────────────────── */
function ArrayItem({ index, onRemove, onUp, onDown, isFirst, isLast, children }: {
  index: number
  onRemove: () => void
  onUp: () => void
  onDown: () => void
  isFirst: boolean
  isLast: boolean
  children: React.ReactNode
}) {
  return (
    <div className="relative bg-gray-50 rounded-xl border border-gray-200 p-4">
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <button onClick={onUp} disabled={isFirst} className="p-1 text-gray-400 hover:text-navy-700 disabled:opacity-30 transition-colors">
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
        <button onClick={onDown} disabled={isLast} className="p-1 text-gray-400 hover:text-navy-700 disabled:opacity-30 transition-colors">
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <button onClick={onRemove} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
      <p className="text-xs font-bold text-gray-400 mb-3">#{index + 1}</p>
      {children}
    </div>
  )
}

function arrayMove<T>(arr: T[], from: number, to: number): T[] {
  const next = [...arr]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

/* ── Main page ─────────────────────────────────────────────── */
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

  /* ── Array helpers ── */
  function updateArr<T>(key: keyof SiteSettings, arr: T[]) {
    setSettings((s) => ({ ...s, [key]: arr }))
  }

  const stats = (settings.stats ?? []) as StatItem[]
  const features = (settings.features ?? []) as FeatureItem[]
  const testimonials = (settings.testimonials ?? []) as TestimonialItem[]
  const faq = (settings.faq ?? []) as FaqItem[]
  const processSteps = (settings.processSteps ?? []) as ProcessStep[]

  const SaveBtn = () => (
    <button
      onClick={handleSave}
      disabled={saving}
      className="inline-flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors disabled:opacity-60 shrink-0"
    >
      {saved ? <><Check className="w-4 h-4" /> Sauvegardé !</> :
       saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Sauvegarde...</> :
       <><Save className="w-4 h-4" /> Sauvegarder</>}
    </button>
  )

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
          <p className="text-gray-500 mt-1 text-sm">Gérez tous les contenus et configurations de Sirius Academy.</p>
        </div>
        <SaveBtn />
      </div>

      {/* ── 1. Identité ──────────────────────────────────────── */}
      <Section icon={Globe} title="Identité du site" description="Nom, slogan, logo, devise, contact principal.">
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
        <Field label="Description du site" hint="Texte affiché dans le footer sous le logo.">
          <textarea rows={3} value={settings.siteDescription || ''} onChange={(e) => set('siteDescription', e.target.value)} className={textareaClass} placeholder="Sirius Academy est une académie digitale basée au Sénégal..." />
        </Field>
      </Section>

      {/* ── 2. Logo ──────────────────────────────────────────── */}
      <Section icon={ImageIcon} title="Logo" description="URL de votre logo (hébergé en ligne).">
        <Field label="URL du logo" hint="Laissez vide pour utiliser le logo par défaut (étoile jaune).">
          <input type="url" value={settings.logoUrl || ''} onChange={(e) => set('logoUrl', e.target.value)} className={inputClass} placeholder="https://..." />
        </Field>
        {settings.logoUrl && (
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={settings.logoUrl} alt="Logo" className="h-12 w-auto object-contain rounded" />
            <p className="text-xs text-gray-500">Aperçu du logo</p>
          </div>
        )}
      </Section>

      {/* ── 3. Contact ───────────────────────────────────────── */}
      <Section icon={Phone} title="Informations de contact" description="Affichées sur la page Contact et dans le footer.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Téléphone (affiché)">
            <input type="text" value={settings.contactPhone || ''} onChange={(e) => set('contactPhone', e.target.value)} className={inputClass} placeholder="+221 77 000 00 00" />
          </Field>
          <Field label="Adresse / Localisation">
            <input type="text" value={settings.contactAddress || ''} onChange={(e) => set('contactAddress', e.target.value)} className={inputClass} placeholder="Dakar, Sénégal" />
          </Field>
        </div>
        <Field label="Horaires d'ouverture" hint="Séparés par · pour afficher sur deux lignes. Ex: Lun–Ven : 9h–18h · Sam : 10h–14h">
          <input type="text" value={settings.contactHours || ''} onChange={(e) => set('contactHours', e.target.value)} className={inputClass} placeholder="Lun–Ven : 9h–18h · Sam : 10h–14h" />
        </Field>
      </Section>

      {/* ── 4. WhatsApp ──────────────────────────────────────── */}
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

      {/* ── 5. Hero ──────────────────────────────────────────── */}
      <Section icon={Home} title="Page d'accueil — Hero" description="Textes et boutons de la section principale.">
        <Field label="Formation mise en avant" hint="La formation affichée dans la section hero.">
          <select value={settings.heroFormationSlug} onChange={(e) => set('heroFormationSlug', e.target.value)} className={inputClass}>
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
        <Field label="Titre principal">
          <input type="text" value={settings.heroTitle} onChange={(e) => set('heroTitle', e.target.value)} className={inputClass} placeholder="Apprendre le digital en pratiquant." />
        </Field>
        <Field label="Sous-titre">
          <textarea rows={2} value={settings.heroSubtitle} onChange={(e) => set('heroSubtitle', e.target.value)} className={textareaClass} placeholder="Pour les étudiants, entrepreneurs..." />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Bouton principal (CTA 1)">
            <input type="text" value={settings.heroCta1} onChange={(e) => set('heroCta1', e.target.value)} className={inputClass} placeholder="Voir les formations" />
          </Field>
          <Field label="Bouton secondaire (CTA 2)">
            <input type="text" value={settings.heroCta2} onChange={(e) => set('heroCta2', e.target.value)} className={inputClass} placeholder="Notre approche" />
          </Field>
        </div>
      </Section>

      {/* ── 6. Stats ─────────────────────────────────────────── */}
      <Section icon={BarChart2} title="Statistiques clés" description="Les 4 chiffres affichés dans la section sombre de la page d'accueil.">
        <div className="space-y-3">
          {stats.map((stat, i) => (
            <ArrayItem
              key={i}
              index={i}
              onRemove={() => updateArr('stats', stats.filter((_, j) => j !== i))}
              onUp={() => updateArr('stats', arrayMove(stats, i, i - 1))}
              onDown={() => updateArr('stats', arrayMove(stats, i, i + 1))}
              isFirst={i === 0}
              isLast={i === stats.length - 1}
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Valeur affichée">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => {
                      const updated = [...stats]; updated[i] = { ...stat, value: e.target.value }; updateArr('stats', updated)
                    }}
                    className={inputClass}
                    placeholder="4 Formations"
                  />
                </Field>
                <Field label="Label sous la valeur">
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => {
                      const updated = [...stats]; updated[i] = { ...stat, label: e.target.value }; updateArr('stats', updated)
                    }}
                    className={inputClass}
                    placeholder="métiers du digital"
                  />
                </Field>
              </div>
            </ArrayItem>
          ))}
          <button
            onClick={() => updateArr('stats', [...stats, { value: '', label: '' }])}
            className="flex items-center gap-2 text-sm text-brand-green font-semibold hover:text-brand-green-dark transition-colors"
          >
            <Plus className="w-4 h-4" /> Ajouter une statistique
          </button>
        </div>
      </Section>

      {/* ── 7. Features ──────────────────────────────────────── */}
      <Section icon={Zap} title='Pourquoi choisir Sirius Academy' description="Les cartes de la section « Notre méthode » de la page d'accueil.">
        <div className="space-y-3">
          {features.map((feat, i) => (
            <ArrayItem
              key={i}
              index={i}
              onRemove={() => updateArr('features', features.filter((_, j) => j !== i))}
              onUp={() => updateArr('features', arrayMove(features, i, i - 1))}
              onDown={() => updateArr('features', arrayMove(features, i, i + 1))}
              isFirst={i === 0}
              isLast={i === features.length - 1}
            >
              <Field label="Titre">
                <input
                  type="text"
                  value={feat.title}
                  onChange={(e) => {
                    const updated = [...features]; updated[i] = { ...feat, title: e.target.value }; updateArr('features', updated)
                  }}
                  className={inputClass}
                  placeholder="Formation orientée pratique"
                />
              </Field>
              <Field label="Description">
                <textarea
                  rows={2}
                  value={feat.description}
                  onChange={(e) => {
                    const updated = [...features]; updated[i] = { ...feat, description: e.target.value }; updateArr('features', updated)
                  }}
                  className={textareaClass}
                  placeholder="Chaque notion est suivie d'un exercice..."
                />
              </Field>
            </ArrayItem>
          ))}
          <button
            onClick={() => updateArr('features', [...features, { title: '', description: '' }])}
            className="flex items-center gap-2 text-sm text-brand-green font-semibold hover:text-brand-green-dark transition-colors"
          >
            <Plus className="w-4 h-4" /> Ajouter une carte
          </button>
        </div>
      </Section>

      {/* ── 8. Process steps ─────────────────────────────────── */}
      <Section icon={List} title="Comment se passe une formation" description="Les étapes numérotées affichées dans la section méthode.">
        <div className="space-y-3">
          {processSteps.map((step, i) => (
            <ArrayItem
              key={i}
              index={i}
              onRemove={() => updateArr('processSteps', processSteps.filter((_, j) => j !== i))}
              onUp={() => updateArr('processSteps', arrayMove(processSteps, i, i - 1))}
              onDown={() => updateArr('processSteps', arrayMove(processSteps, i, i + 1))}
              isFirst={i === 0}
              isLast={i === processSteps.length - 1}
            >
              <Field label="Titre de l'étape">
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => {
                    const updated = [...processSteps]; updated[i] = { ...step, title: e.target.value }; updateArr('processSteps', updated)
                  }}
                  className={inputClass}
                  placeholder="Exercices corrigés"
                />
              </Field>
              <Field label="Description">
                <textarea
                  rows={2}
                  value={step.description}
                  onChange={(e) => {
                    const updated = [...processSteps]; updated[i] = { ...step, description: e.target.value }; updateArr('processSteps', updated)
                  }}
                  className={textareaClass}
                  placeholder="Chaque module propose..."
                />
              </Field>
            </ArrayItem>
          ))}
          <button
            onClick={() => updateArr('processSteps', [...processSteps, { title: '', description: '' }])}
            className="flex items-center gap-2 text-sm text-brand-green font-semibold hover:text-brand-green-dark transition-colors"
          >
            <Plus className="w-4 h-4" /> Ajouter une étape
          </button>
        </div>
      </Section>

      {/* ── 9. Testimonials ──────────────────────────────────── */}
      <Section icon={Quote} title="Témoignages" description="Les témoignages affichés sur la page d'accueil.">
        <div className="space-y-3">
          {testimonials.map((t, i) => (
            <ArrayItem
              key={i}
              index={i}
              onRemove={() => updateArr('testimonials', testimonials.filter((_, j) => j !== i))}
              onUp={() => updateArr('testimonials', arrayMove(testimonials, i, i - 1))}
              onDown={() => updateArr('testimonials', arrayMove(testimonials, i, i + 1))}
              isFirst={i === 0}
              isLast={i === testimonials.length - 1}
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Prénom Nom">
                  <input
                    type="text"
                    value={t.name}
                    onChange={(e) => {
                      const updated = [...testimonials]; updated[i] = { ...t, name: e.target.value }; updateArr('testimonials', updated)
                    }}
                    className={inputClass}
                    placeholder="Fatou Diallo"
                  />
                </Field>
                <Field label="Rôle / Ville">
                  <input
                    type="text"
                    value={t.role}
                    onChange={(e) => {
                      const updated = [...testimonials]; updated[i] = { ...t, role: e.target.value }; updateArr('testimonials', updated)
                    }}
                    className={inputClass}
                    placeholder="Développeuse Frontend · Dakar"
                  />
                </Field>
                <Field label="Formation suivie">
                  <input
                    type="text"
                    value={t.formation}
                    onChange={(e) => {
                      const updated = [...testimonials]; updated[i] = { ...t, formation: e.target.value }; updateArr('testimonials', updated)
                    }}
                    className={inputClass}
                    placeholder="Développement Web Full-Stack"
                  />
                </Field>
                <Field label="URL avatar" hint="Laisser vide pour générer automatiquement.">
                  <input
                    type="url"
                    value={t.avatar}
                    onChange={(e) => {
                      const updated = [...testimonials]; updated[i] = { ...t, avatar: e.target.value }; updateArr('testimonials', updated)
                    }}
                    className={inputClass}
                    placeholder="https://..."
                  />
                </Field>
              </div>
              <Field label="Témoignage">
                <textarea
                  rows={3}
                  value={t.text}
                  onChange={(e) => {
                    const updated = [...testimonials]; updated[i] = { ...t, text: e.target.value }; updateArr('testimonials', updated)
                  }}
                  className={textareaClass}
                  placeholder="Grâce aux projets concrets, j'ai pu..."
                />
              </Field>
            </ArrayItem>
          ))}
          <button
            onClick={() => updateArr('testimonials', [...testimonials, { name: '', role: '', avatar: '', formation: '', text: '' }])}
            className="flex items-center gap-2 text-sm text-brand-green font-semibold hover:text-brand-green-dark transition-colors"
          >
            <Plus className="w-4 h-4" /> Ajouter un témoignage
          </button>
        </div>
      </Section>

      {/* ── 10. FAQ ──────────────────────────────────────────── */}
      <Section icon={HelpCircle} title="FAQ — Questions fréquentes" description="Affichées sur la page Contact.">
        <div className="space-y-3">
          {faq.map((item, i) => (
            <ArrayItem
              key={i}
              index={i}
              onRemove={() => updateArr('faq', faq.filter((_, j) => j !== i))}
              onUp={() => updateArr('faq', arrayMove(faq, i, i - 1))}
              onDown={() => updateArr('faq', arrayMove(faq, i, i + 1))}
              isFirst={i === 0}
              isLast={i === faq.length - 1}
            >
              <Field label="Question">
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => {
                    const updated = [...faq]; updated[i] = { ...item, question: e.target.value }; updateArr('faq', updated)
                  }}
                  className={inputClass}
                  placeholder="Y a-t-il des prérequis ?"
                />
              </Field>
              <Field label="Réponse">
                <textarea
                  rows={3}
                  value={item.answer}
                  onChange={(e) => {
                    const updated = [...faq]; updated[i] = { ...item, answer: e.target.value }; updateArr('faq', updated)
                  }}
                  className={textareaClass}
                  placeholder="Chaque formation a ses propres prérequis..."
                />
              </Field>
            </ArrayItem>
          ))}
          <button
            onClick={() => updateArr('faq', [...faq, { question: '', answer: '' }])}
            className="flex items-center gap-2 text-sm text-brand-green font-semibold hover:text-brand-green-dark transition-colors"
          >
            <Plus className="w-4 h-4" /> Ajouter une question
          </button>
        </div>
      </Section>

      {/* ── 11. Réseaux sociaux ───────────────────────────────── */}
      <Section icon={Share2} title="Réseaux sociaux" description="Liens vers vos profils officiels.">
        <div className="grid sm:grid-cols-2 gap-4">
          {([
            { key: 'socialFacebook', label: 'Facebook', placeholder: 'https://facebook.com/siriusacademy' },
            { key: 'socialInstagram', label: 'Instagram', placeholder: 'https://instagram.com/siriusacademy' },
            { key: 'socialLinkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/siriusacademy' },
            { key: 'socialTwitter', label: 'Twitter / X', placeholder: 'https://twitter.com/siriusacademy' },
          ] as Array<{ key: keyof SiteSettings; label: string; placeholder: string }>).map(({ key, label, placeholder }) => (
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

      {/* ── 12. Footer & Légal ───────────────────────────────── */}
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

      {/* Bottom save */}
      <div className="flex justify-end pb-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-navy-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors disabled:opacity-60"
        >
          {saved ? <><Check className="w-4 h-4" /> Tout est sauvegardé</> :
           saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Sauvegarde...</> :
           <><Save className="w-4 h-4" /> Sauvegarder les paramètres</>}
        </button>
      </div>
    </div>
  )
}
