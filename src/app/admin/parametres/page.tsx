'use client'

import { useEffect, useState } from 'react'
import {
  Globe, Phone, Home, FileText, Quote, HelpCircle, Share2, BookOpen,
  Save, Check, Loader2, Plus, Trash2, ChevronUp, ChevronDown, Search,
  Eye, EyeOff, Image as ImageIcon, Bell, MessageSquare, X,
} from 'lucide-react'
import type { FaqItem, TestimonialItem, StatItem, FeatureItem, ProcessStep } from '@/types'

/* ── Types ─────────────────────────────────────────────────── */
interface SiteSettings {
  heroFormationSlug: string; siteName: string; slogan: string; country: string
  currency: string; contactEmail: string; whatsappNumber: string; whatsappLink: string
  heroTitle: string; heroSubtitle: string; heroCta1: string; heroCta2: string
  footerText: string; socialFacebook?: string; socialInstagram?: string
  socialLinkedin?: string; socialTwitter?: string; socialTiktok?: string
  socialYoutube?: string; legalMentions?: string; privacyPolicy?: string
  logoUrl?: string; siteDescription?: string; contactPhone?: string
  contactAddress?: string; contactHours?: string; faq?: FaqItem[]
  testimonials?: TestimonialItem[]; stats?: StatItem[]; features?: FeatureItem[]
  processSteps?: ProcessStep[]; showTestimonials?: boolean; notificationEmail?: string
  formConfirmationContact?: string; formConfirmationInscription?: string
  formConfirmationPdf?: string; formLegalText?: string
}

interface Formation { slug: string; title: string; status: string }

const defaultSettings: SiteSettings = {
  heroFormationSlug: '', siteName: 'Sirius Academy', slogan: 'Apprendre le digital en pratiquant.',
  country: "Sénégal — Afrique de l'Ouest", currency: 'FCFA',
  contactEmail: 'contact@siriusacademy.sn', whatsappNumber: '+221 77 000 00 00',
  whatsappLink: 'https://wa.me/221770000000', heroTitle: 'Apprendre le digital en pratiquant.',
  heroSubtitle: "Pour les étudiants, entrepreneurs et personnes en reconversion qui veulent maîtriser le digital.",
  heroCta1: 'Voir les formations', heroCta2: 'Notre approche',
  footerText: '© 2025 Sirius Academy — Tous droits réservés.',
  siteDescription: '', contactPhone: '', contactAddress: '', contactHours: '',
  faq: [], testimonials: [], stats: [], features: [], processSteps: [],
  showTestimonials: true, notificationEmail: '',
  formConfirmationContact: 'Merci pour votre message ! Nous vous répondrons dans les 48h.',
  formConfirmationInscription: "Votre demande d'inscription a bien été reçue. Notre équipe vous contactera sous 48h.",
  formConfirmationPdf: 'Le programme a été envoyé à votre adresse email.',
  formLegalText: 'En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour traiter votre demande.',
}

/* ── Tabs ───────────────────────────────────────────────────── */
const TABS = [
  { id: 'identite',     label: 'Identité',       icon: Globe,         keywords: ['logo', 'nom', 'slogan', 'devise', 'pays', 'description', 'site'] },
  { id: 'contact',      label: 'Coordonnées',     icon: Phone,         keywords: ['email', 'téléphone', 'whatsapp', 'adresse', 'horaires', 'contact'] },
  { id: 'accueil',      label: "Page d'accueil",  icon: Home,          keywords: ['hero', 'titre', 'formation', 'statistiques', 'pourquoi', 'étapes', 'cta'] },
  { id: 'formulaires',  label: 'Formulaires',     icon: MessageSquare, keywords: ['formulaire', 'notification', 'confirmation', 'légal', 'inscription', 'email'] },
  { id: 'temoignages',  label: 'Témoignages',     icon: Quote,         keywords: ['témoignage', 'avis', 'client', 'avatar'] },
  { id: 'faq',          label: 'FAQ',             icon: HelpCircle,    keywords: ['faq', 'question', 'réponse', 'fréquent'] },
  { id: 'reseaux',      label: 'Réseaux sociaux', icon: Share2,        keywords: ['facebook', 'instagram', 'linkedin', 'twitter', 'tiktok', 'youtube', 'réseau'] },
  { id: 'footer',       label: 'Footer & légal',  icon: BookOpen,      keywords: ['footer', 'mentions légales', 'confidentialité', 'pied de page', 'cgv'] },
] as const

type TabId = typeof TABS[number]['id']

/* ── UI helpers ─────────────────────────────────────────────── */
const inputClass = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-colors"
const textareaClass = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-colors resize-none"

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="font-bold text-navy-900 text-sm">{title}</h3>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
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

function ArrayItem({ index, onRemove, onUp, onDown, isFirst, isLast, visible, onToggleVisible, children }: {
  index: number; onRemove: () => void; onUp: () => void; onDown: () => void
  isFirst: boolean; isLast: boolean; visible?: boolean; onToggleVisible?: () => void
  children: React.ReactNode
}) {
  return (
    <div className={`relative rounded-xl border p-4 ${visible === false ? 'bg-gray-50/50 border-gray-100 opacity-60' : 'bg-gray-50 border-gray-200'}`}>
      <div className="absolute top-2 right-2 flex items-center gap-1">
        {onToggleVisible && (
          <button onClick={onToggleVisible} title={visible === false ? 'Afficher' : 'Masquer'}
            className={`p-1 rounded transition-colors ${visible === false ? 'text-gray-300 hover:text-brand-green' : 'text-brand-green hover:text-gray-400'}`}>
            {visible === false ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        )}
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
      <p className="text-xs font-bold text-gray-400 mb-3">#{index + 1}{visible === false ? ' · masqué' : ''}</p>
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

/* ── Main page ──────────────────────────────────────────────── */
export default function ParametresPage() {
  const [activeTab, setActiveTab] = useState<TabId>('identite')
  const [formations, setFormations] = useState<Formation[]>([])
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

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

  const set = (key: keyof SiteSettings, value: unknown) =>
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

  function updateArr<T>(key: keyof SiteSettings, arr: T[]) {
    setSettings((s) => ({ ...s, [key]: arr }))
  }

  const stats = (settings.stats ?? []) as StatItem[]
  const features = (settings.features ?? []) as FeatureItem[]
  const testimonials = (settings.testimonials ?? []) as TestimonialItem[]
  const faq = (settings.faq ?? []) as FaqItem[]
  const processSteps = (settings.processSteps ?? []) as ProcessStep[]

  /* Search: find matching tabs */
  const searchLower = search.toLowerCase().trim()
  const matchingTabs = searchLower
    ? TABS.filter((t) => t.keywords.some((k) => k.includes(searchLower)) || t.label.toLowerCase().includes(searchLower))
    : []

  const SaveBtn = ({ label = 'Sauvegarder' }: { label?: string }) => (
    <button
      onClick={handleSave}
      disabled={saving}
      className="inline-flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors disabled:opacity-60"
    >
      {saved ? <><Check className="w-4 h-4" /> Sauvegardé !</> :
       saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Sauvegarde...</> :
       <><Save className="w-4 h-4" /> {label}</>}
    </button>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    )
  }

  const heroFormation = formations.find((f) => f.slug === settings.heroFormationSlug)

  return (
    <div className="space-y-5">

      {/* ── Page header ──────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Paramètres du site</h1>
          <p className="text-gray-500 mt-1 text-sm">Gérez les contenus et configurations de Sirius Academy.</p>
        </div>
        <SaveBtn />
      </div>

      {/* ── Search + Tab bar ─────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {/* Search */}
        <div className="px-4 pt-4 pb-3 border-b border-gray-50">
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un paramètre..."
              className="w-full pl-9 pr-8 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {/* Search suggestions */}
          {searchLower && (
            <div className="mt-2 flex flex-wrap gap-2">
              {matchingTabs.length === 0 ? (
                <p className="text-xs text-gray-400">Aucun onglet trouvé pour &ldquo;{search}&rdquo;</p>
              ) : (
                <>
                  <p className="text-xs text-gray-500 w-full">Aller vers :</p>
                  {matchingTabs.map((t) => {
                    const Icon = t.icon
                    return (
                      <button
                        key={t.id}
                        onClick={() => { setActiveTab(t.id); setSearch('') }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 bg-navy-50 hover:bg-navy-100 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Icon className="w-3 h-3" />
                        {t.label}
                      </button>
                    )
                  })}
                </>
              )}
            </div>
          )}
        </div>

        {/* Tab navigation */}
        <div className="flex overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all shrink-0 ${
                  isActive
                    ? 'border-navy-900 text-navy-900 bg-navy-50/50'
                    : 'border-transparent text-gray-500 hover:text-navy-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Tab content ──────────────────────────────────────── */}
      <div className="max-w-3xl space-y-5">

        {/* ══ 1. IDENTITÉ ═══════════════════════════════════ */}
        {activeTab === 'identite' && <>
          <Section title="Logo du site" description="Ce logo est utilisé partout : header, footer, interface admin.">
            <Field label="URL du logo" hint="Hébergez votre logo sur Imgur, Cloudinary ou votre serveur, puis collez l'URL ici.">
              <input type="url" value={settings.logoUrl || ''} onChange={(e) => set('logoUrl', e.target.value)}
                className={inputClass} placeholder="https://exemple.com/logo.png" />
            </Field>
            {/* Live preview */}
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <div className="bg-navy-900 px-4 py-3 flex items-center gap-3">
                <p className="text-xs text-slate-400 shrink-0">Aperçu header :</p>
                {settings.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={settings.logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-brand-yellow rounded-lg flex items-center justify-center">
                      <span className="text-navy-900 text-xs font-black">S</span>
                    </div>
                    <span className="text-white font-bold text-sm">{settings.siteName || 'Sirius Academy'}</span>
                  </div>
                )}
              </div>
              <div className="bg-navy-950 px-4 py-3 flex items-center gap-3">
                <p className="text-xs text-slate-400 shrink-0">Aperçu footer :</p>
                {settings.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={settings.logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-brand-yellow rounded-lg flex items-center justify-center">
                      <span className="text-navy-900 text-xs font-black">S</span>
                    </div>
                    <span className="text-white font-bold text-sm">{settings.siteName || 'Sirius Academy'}</span>
                  </div>
                )}
              </div>
            </div>
            {settings.logoUrl && (
              <button onClick={() => set('logoUrl', '')} className="text-xs text-red-500 hover:text-red-700 transition-colors flex items-center gap-1">
                <Trash2 className="w-3 h-3" /> Supprimer le logo (utiliser le logo par défaut)
              </button>
            )}
          </Section>

          <Section title="Informations générales" description="Nom, slogan et description de votre académie.">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nom du site">
                <input type="text" value={settings.siteName} onChange={(e) => set('siteName', e.target.value)}
                  className={inputClass} placeholder="Sirius Academy" />
              </Field>
              <Field label="Slogan">
                <input type="text" value={settings.slogan} onChange={(e) => set('slogan', e.target.value)}
                  className={inputClass} placeholder="Apprendre le digital en pratiquant." />
              </Field>
              <Field label="Pays / Région">
                <input type="text" value={settings.country} onChange={(e) => set('country', e.target.value)}
                  className={inputClass} placeholder="Sénégal" />
              </Field>
              <Field label="Devise">
                <input type="text" value={settings.currency} onChange={(e) => set('currency', e.target.value)}
                  className={inputClass} placeholder="FCFA" />
              </Field>
            </div>
            <Field label="Description courte" hint="Affichée dans le footer sous le logo et pour le référencement.">
              <textarea rows={3} value={settings.siteDescription || ''} onChange={(e) => set('siteDescription', e.target.value)}
                className={textareaClass} placeholder="Sirius Academy est une académie digitale basée au Sénégal..." />
            </Field>
          </Section>

          <div className="flex justify-end"><SaveBtn label="Sauvegarder l'identité" /></div>
        </>}

        {/* ══ 2. COORDONNÉES ════════════════════════════════ */}
        {activeTab === 'contact' && <>
          <Section title="Informations de contact" description="Affichées sur la page Contact et dans le footer.">
            <Field label="Email de contact principal">
              <input type="email" value={settings.contactEmail} onChange={(e) => set('contactEmail', e.target.value)}
                className={inputClass} placeholder="contact@siriusacademy.sn" />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Téléphone affiché">
                <input type="text" value={settings.contactPhone || ''} onChange={(e) => set('contactPhone', e.target.value)}
                  className={inputClass} placeholder="+221 77 000 00 00" />
              </Field>
              <Field label="Adresse / Localisation">
                <input type="text" value={settings.contactAddress || ''} onChange={(e) => set('contactAddress', e.target.value)}
                  className={inputClass} placeholder="Dakar, Sénégal" />
              </Field>
            </div>
            <Field label="Horaires d'ouverture" hint="Exemple : Lun–Ven : 9h–18h · Sam : 10h–14h">
              <input type="text" value={settings.contactHours || ''} onChange={(e) => set('contactHours', e.target.value)}
                className={inputClass} placeholder="Lun–Ven : 9h–18h · Sam : 10h–14h" />
            </Field>
          </Section>

          <Section title="WhatsApp" description="Numéro et lien pour les redirections WhatsApp sur tout le site.">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Numéro WhatsApp (affiché)">
                <input type="text" value={settings.whatsappNumber} onChange={(e) => set('whatsappNumber', e.target.value)}
                  className={inputClass} placeholder="+221 77 000 00 00" />
              </Field>
              <Field label="Lien WhatsApp" hint="Format : https://wa.me/221770000000 (sans espaces ni +)">
                <input type="url" value={settings.whatsappLink} onChange={(e) => set('whatsappLink', e.target.value)}
                  className={inputClass} placeholder="https://wa.me/221770000000" />
              </Field>
            </div>
            {settings.whatsappLink && (
              <a href={settings.whatsappLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-brand-green font-semibold hover:underline">
                Tester le lien WhatsApp →
              </a>
            )}
          </Section>

          <div className="flex justify-end"><SaveBtn label="Sauvegarder les coordonnées" /></div>
        </>}

        {/* ══ 3. PAGE D'ACCUEIL ═════════════════════════════ */}
        {activeTab === 'accueil' && <>
          <Section title="Section Hero" description="Le grand bandeau d'entrée de la page d'accueil.">
            <Field label="Formation mise en avant" hint="Affichée dans le héro avec un bouton d'inscription direct.">
              <select value={settings.heroFormationSlug} onChange={(e) => set('heroFormationSlug', e.target.value)} className={inputClass}>
                <option value="">— Aucune sélection —</option>
                {formations.map((f) => (
                  <option key={f.slug} value={f.slug}>
                    {f.title} {f.status === 'ouvert' ? '✓' : f.status === 'bientot' ? '⏳' : '✎'}
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
              <input type="text" value={settings.heroTitle} onChange={(e) => set('heroTitle', e.target.value)}
                className={inputClass} placeholder="Apprendre le digital en pratiquant." />
            </Field>
            <Field label="Sous-titre">
              <textarea rows={2} value={settings.heroSubtitle} onChange={(e) => set('heroSubtitle', e.target.value)}
                className={textareaClass} placeholder="Pour les étudiants, entrepreneurs..." />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Bouton principal">
                <input type="text" value={settings.heroCta1} onChange={(e) => set('heroCta1', e.target.value)}
                  className={inputClass} placeholder="Voir les formations" />
              </Field>
              <Field label="Bouton secondaire">
                <input type="text" value={settings.heroCta2} onChange={(e) => set('heroCta2', e.target.value)}
                  className={inputClass} placeholder="Notre approche" />
              </Field>
            </div>
          </Section>

          <Section title="Statistiques clés" description="Les 4 chiffres mis en avant sur la page d'accueil.">
            <div className="space-y-3">
              {stats.map((stat, i) => (
                <ArrayItem key={i} index={i}
                  onRemove={() => updateArr('stats', stats.filter((_, j) => j !== i))}
                  onUp={() => updateArr('stats', arrayMove(stats, i, i - 1))}
                  onDown={() => updateArr('stats', arrayMove(stats, i, i + 1))}
                  isFirst={i === 0} isLast={i === stats.length - 1}
                >
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field label="Valeur">
                      <input type="text" value={stat.value}
                        onChange={(e) => { const u = [...stats]; u[i] = { ...stat, value: e.target.value }; updateArr('stats', u) }}
                        className={inputClass} placeholder="4 Formations" />
                    </Field>
                    <Field label="Label">
                      <input type="text" value={stat.label}
                        onChange={(e) => { const u = [...stats]; u[i] = { ...stat, label: e.target.value }; updateArr('stats', u) }}
                        className={inputClass} placeholder="métiers du digital" />
                    </Field>
                  </div>
                </ArrayItem>
              ))}
              <button onClick={() => updateArr('stats', [...stats, { value: '', label: '' }])}
                className="flex items-center gap-2 text-sm text-brand-green font-semibold hover:opacity-80 transition-opacity">
                <Plus className="w-4 h-4" /> Ajouter une statistique
              </button>
            </div>
          </Section>

          <Section title='Pourquoi choisir Sirius Academy' description="Les cartes de la section « Notre méthode ».">
            <div className="space-y-3">
              {features.map((feat, i) => (
                <ArrayItem key={i} index={i}
                  onRemove={() => updateArr('features', features.filter((_, j) => j !== i))}
                  onUp={() => updateArr('features', arrayMove(features, i, i - 1))}
                  onDown={() => updateArr('features', arrayMove(features, i, i + 1))}
                  isFirst={i === 0} isLast={i === features.length - 1}
                >
                  <Field label="Titre">
                    <input type="text" value={feat.title}
                      onChange={(e) => { const u = [...features]; u[i] = { ...feat, title: e.target.value }; updateArr('features', u) }}
                      className={inputClass} placeholder="Formation orientée pratique" />
                  </Field>
                  <Field label="Description">
                    <textarea rows={2} value={feat.description}
                      onChange={(e) => { const u = [...features]; u[i] = { ...feat, description: e.target.value }; updateArr('features', u) }}
                      className={textareaClass} placeholder="Chaque notion est suivie..." />
                  </Field>
                </ArrayItem>
              ))}
              <button onClick={() => updateArr('features', [...features, { title: '', description: '' }])}
                className="flex items-center gap-2 text-sm text-brand-green font-semibold hover:opacity-80 transition-opacity">
                <Plus className="w-4 h-4" /> Ajouter une carte
              </button>
            </div>
          </Section>

          <Section title="Comment se passe une formation" description="Les étapes numérotées de la section méthode.">
            <div className="space-y-3">
              {processSteps.map((step, i) => (
                <ArrayItem key={i} index={i}
                  onRemove={() => updateArr('processSteps', processSteps.filter((_, j) => j !== i))}
                  onUp={() => updateArr('processSteps', arrayMove(processSteps, i, i - 1))}
                  onDown={() => updateArr('processSteps', arrayMove(processSteps, i, i + 1))}
                  isFirst={i === 0} isLast={i === processSteps.length - 1}
                >
                  <Field label="Titre de l'étape">
                    <input type="text" value={step.title}
                      onChange={(e) => { const u = [...processSteps]; u[i] = { ...step, title: e.target.value }; updateArr('processSteps', u) }}
                      className={inputClass} placeholder="Exercices corrigés" />
                  </Field>
                  <Field label="Description">
                    <textarea rows={2} value={step.description}
                      onChange={(e) => { const u = [...processSteps]; u[i] = { ...step, description: e.target.value }; updateArr('processSteps', u) }}
                      className={textareaClass} placeholder="Chaque module propose..." />
                  </Field>
                </ArrayItem>
              ))}
              <button onClick={() => updateArr('processSteps', [...processSteps, { title: '', description: '' }])}
                className="flex items-center gap-2 text-sm text-brand-green font-semibold hover:opacity-80 transition-opacity">
                <Plus className="w-4 h-4" /> Ajouter une étape
              </button>
            </div>
          </Section>

          <div className="flex justify-end"><SaveBtn label="Sauvegarder la page d'accueil" /></div>
        </>}

        {/* ══ 4. FORMULAIRES ════════════════════════════════ */}
        {activeTab === 'formulaires' && <>
          <Section title="Notifications administrateur" description="Soyez alerté à chaque nouvelle soumission de formulaire.">
            <Field label="Email de notification admin" hint="Laissez vide pour désactiver les notifications par email.">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-gray-400 shrink-0" />
                <input type="email" value={settings.notificationEmail || ''} onChange={(e) => set('notificationEmail', e.target.value)}
                  className={inputClass} placeholder="admin@siriusacademy.sn" />
              </div>
            </Field>
            {settings.notificationEmail && (
              <div className="flex items-center gap-2 bg-brand-green/5 border border-brand-green/20 rounded-xl px-4 py-3">
                <Check className="w-4 h-4 text-brand-green shrink-0" />
                <p className="text-xs text-gray-600">Les notifications seront envoyées à <strong>{settings.notificationEmail}</strong></p>
              </div>
            )}
          </Section>

          <Section title="Messages de confirmation" description="Textes affichés à l'utilisateur après soumission d'un formulaire.">
            <Field label="Après une demande d'inscription">
              <textarea rows={2} value={settings.formConfirmationInscription || ''} onChange={(e) => set('formConfirmationInscription', e.target.value)}
                className={textareaClass} placeholder="Votre demande a bien été reçue..." />
            </Field>
            <Field label="Après un message de contact">
              <textarea rows={2} value={settings.formConfirmationContact || ''} onChange={(e) => set('formConfirmationContact', e.target.value)}
                className={textareaClass} placeholder="Merci pour votre message..." />
            </Field>
            <Field label="Après un téléchargement de programme PDF">
              <textarea rows={2} value={settings.formConfirmationPdf || ''} onChange={(e) => set('formConfirmationPdf', e.target.value)}
                className={textareaClass} placeholder="Le programme a été envoyé à votre adresse email..." />
            </Field>
          </Section>

          <Section title="Texte légal des formulaires" description="Affiché sous chaque formulaire (RGPD / consentement).">
            <Field label="Texte légal" hint="Ce texte apparaît sous le bouton d'envoi de chaque formulaire.">
              <textarea rows={3} value={settings.formLegalText || ''} onChange={(e) => set('formLegalText', e.target.value)}
                className={textareaClass} placeholder="En soumettant ce formulaire, vous acceptez que vos données soient utilisées..." />
            </Field>
          </Section>

          <div className="flex justify-end"><SaveBtn label="Sauvegarder les formulaires" /></div>
        </>}

        {/* ══ 5. TÉMOIGNAGES ════════════════════════════════ */}
        {activeTab === 'temoignages' && <>
          <Section title="Affichage des témoignages">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-navy-900">Afficher la section témoignages</p>
                <p className="text-xs text-gray-500 mt-0.5">Masquez la section si vous n&apos;avez pas encore de vrais témoignages.</p>
              </div>
              <button
                onClick={() => set('showTestimonials', !settings.showTestimonials)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${settings.showTestimonials ? 'bg-brand-green' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${settings.showTestimonials ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </Section>

          <Section title="Liste des témoignages" description="Utilisez l'icône œil pour masquer/afficher un témoignage individuel.">
            <div className="space-y-3">
              {testimonials.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Quote className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Aucun témoignage. Cliquez sur &ldquo;Ajouter&rdquo; pour commencer.</p>
                </div>
              )}
              {testimonials.map((t, i) => (
                <ArrayItem key={i} index={i}
                  onRemove={() => updateArr('testimonials', testimonials.filter((_, j) => j !== i))}
                  onUp={() => updateArr('testimonials', arrayMove(testimonials, i, i - 1))}
                  onDown={() => updateArr('testimonials', arrayMove(testimonials, i, i + 1))}
                  isFirst={i === 0} isLast={i === testimonials.length - 1}
                  visible={t.visible !== false}
                  onToggleVisible={() => {
                    const u = [...testimonials]; u[i] = { ...t, visible: t.visible === false ? true : false }
                    updateArr('testimonials', u)
                  }}
                >
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field label="Prénom Nom">
                      <input type="text" value={t.name}
                        onChange={(e) => { const u = [...testimonials]; u[i] = { ...t, name: e.target.value }; updateArr('testimonials', u) }}
                        className={inputClass} placeholder="Fatou Diallo" />
                    </Field>
                    <Field label="Rôle / Ville">
                      <input type="text" value={t.role}
                        onChange={(e) => { const u = [...testimonials]; u[i] = { ...t, role: e.target.value }; updateArr('testimonials', u) }}
                        className={inputClass} placeholder="Développeuse Frontend · Dakar" />
                    </Field>
                    <Field label="Formation suivie">
                      <input type="text" value={t.formation}
                        onChange={(e) => { const u = [...testimonials]; u[i] = { ...t, formation: e.target.value }; updateArr('testimonials', u) }}
                        className={inputClass} placeholder="Développement Web Full-Stack" />
                    </Field>
                    <Field label="URL avatar" hint="Laisser vide pour un avatar généré automatiquement.">
                      <input type="url" value={t.avatar}
                        onChange={(e) => { const u = [...testimonials]; u[i] = { ...t, avatar: e.target.value }; updateArr('testimonials', u) }}
                        className={inputClass} placeholder="https://..." />
                    </Field>
                  </div>
                  <Field label="Témoignage">
                    <textarea rows={3} value={t.text}
                      onChange={(e) => { const u = [...testimonials]; u[i] = { ...t, text: e.target.value }; updateArr('testimonials', u) }}
                      className={textareaClass} placeholder="Grâce aux projets concrets, j'ai pu..." />
                  </Field>
                  {/* Avatar preview */}
                  {(t.avatar || t.name) && (
                    <div className="flex items-center gap-2 mt-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={t.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=10B981&color=fff&size=64`}
                        alt={t.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="text-xs text-gray-500">
                        <p className="font-semibold text-gray-700">{t.name || 'Prénom Nom'}</p>
                        <p>{t.role || 'Rôle'}</p>
                      </div>
                    </div>
                  )}
                </ArrayItem>
              ))}
              <button onClick={() => updateArr('testimonials', [...testimonials, { name: '', role: '', avatar: '', formation: '', text: '', visible: true }])}
                className="flex items-center gap-2 text-sm text-brand-green font-semibold hover:opacity-80 transition-opacity">
                <Plus className="w-4 h-4" /> Ajouter un témoignage
              </button>
            </div>
          </Section>

          <div className="flex justify-end"><SaveBtn label="Sauvegarder les témoignages" /></div>
        </>}

        {/* ══ 6. FAQ ════════════════════════════════════════ */}
        {activeTab === 'faq' && <>
          <Section title="Questions fréquentes" description="Affichées sur la page Contact. L'icône œil permet de masquer une question sans la supprimer.">
            <div className="space-y-3">
              {faq.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Aucune question. Cliquez sur &ldquo;Ajouter&rdquo; pour commencer.</p>
                </div>
              )}
              {faq.map((item, i) => (
                <ArrayItem key={i} index={i}
                  onRemove={() => updateArr('faq', faq.filter((_, j) => j !== i))}
                  onUp={() => updateArr('faq', arrayMove(faq, i, i - 1))}
                  onDown={() => updateArr('faq', arrayMove(faq, i, i + 1))}
                  isFirst={i === 0} isLast={i === faq.length - 1}
                  visible={item.visible !== false}
                  onToggleVisible={() => {
                    const u = [...faq]; u[i] = { ...item, visible: item.visible === false ? true : false }
                    updateArr('faq', u)
                  }}
                >
                  <Field label="Question">
                    <input type="text" value={item.question}
                      onChange={(e) => { const u = [...faq]; u[i] = { ...item, question: e.target.value }; updateArr('faq', u) }}
                      className={inputClass} placeholder="Y a-t-il des prérequis pour s'inscrire ?" />
                  </Field>
                  <Field label="Réponse">
                    <textarea rows={3} value={item.answer}
                      onChange={(e) => { const u = [...faq]; u[i] = { ...item, answer: e.target.value }; updateArr('faq', u) }}
                      className={textareaClass} placeholder="Chaque formation a ses propres prérequis..." />
                  </Field>
                </ArrayItem>
              ))}
              <button onClick={() => updateArr('faq', [...faq, { question: '', answer: '', visible: true }])}
                className="flex items-center gap-2 text-sm text-brand-green font-semibold hover:opacity-80 transition-opacity">
                <Plus className="w-4 h-4" /> Ajouter une question
              </button>
            </div>
          </Section>

          <div className="flex justify-end"><SaveBtn label="Sauvegarder la FAQ" /></div>
        </>}

        {/* ══ 7. RÉSEAUX SOCIAUX ════════════════════════════ */}
        {activeTab === 'reseaux' && <>
          <Section title="Liens vers vos profils" description="Laissez un champ vide pour ne pas afficher ce réseau dans le footer.">
            <div className="grid sm:grid-cols-2 gap-4">
              {([
                { key: 'socialFacebook',  label: 'Facebook',    placeholder: 'https://facebook.com/siriusacademy',  emoji: '📘' },
                { key: 'socialInstagram', label: 'Instagram',   placeholder: 'https://instagram.com/siriusacademy', emoji: '📸' },
                { key: 'socialLinkedin',  label: 'LinkedIn',    placeholder: 'https://linkedin.com/company/sirius',  emoji: '💼' },
                { key: 'socialTwitter',   label: 'Twitter / X', placeholder: 'https://twitter.com/siriusacademy',   emoji: '𝕏'  },
                { key: 'socialTiktok',    label: 'TikTok',      placeholder: 'https://tiktok.com/@siriusacademy',   emoji: '🎵' },
                { key: 'socialYoutube',   label: 'YouTube',     placeholder: 'https://youtube.com/@siriusacademy',  emoji: '▶️' },
              ] as Array<{ key: keyof SiteSettings; label: string; placeholder: string; emoji: string }>).map(({ key, label, placeholder, emoji }) => (
                <Field key={key} label={`${emoji} ${label}`}>
                  <div className="relative">
                    <input type="url" value={(settings[key] as string) || ''}
                      onChange={(e) => set(key, e.target.value)}
                      className={inputClass} placeholder={placeholder} />
                    {(settings[key] as string) && (
                      <a href={settings[key] as string} target="_blank" rel="noopener noreferrer"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brand-green font-semibold hover:underline">
                        Test →
                      </a>
                    )}
                  </div>
                </Field>
              ))}
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-600 mb-2">Réseaux actifs :</p>
              <div className="flex flex-wrap gap-2">
                {['socialFacebook','socialInstagram','socialLinkedin','socialTwitter','socialTiktok','socialYoutube'].map((key) => {
                  const val = settings[key as keyof SiteSettings] as string
                  const label = { socialFacebook:'Facebook', socialInstagram:'Instagram', socialLinkedin:'LinkedIn', socialTwitter:'Twitter/X', socialTiktok:'TikTok', socialYoutube:'YouTube' }[key]
                  return val ? (
                    <span key={key} className="text-xs bg-brand-green/10 text-brand-green font-semibold px-2 py-1 rounded-lg">{label}</span>
                  ) : (
                    <span key={key} className="text-xs bg-gray-100 text-gray-400 px-2 py-1 rounded-lg line-through">{label}</span>
                  )
                })}
              </div>
            </div>
          </Section>

          <div className="flex justify-end"><SaveBtn label="Sauvegarder les réseaux sociaux" /></div>
        </>}

        {/* ══ 8. FOOTER & LÉGAL ═════════════════════════════ */}
        {activeTab === 'footer' && <>
          <Section title="Pied de page">
            <Field label="Texte du footer" hint="Généralement les droits d'auteur et l'année.">
              <input type="text" value={settings.footerText} onChange={(e) => set('footerText', e.target.value)}
                className={inputClass} placeholder="© 2025 Sirius Academy — Tous droits réservés." />
            </Field>
          </Section>

          <Section title="Mentions légales" description="Texte complet affiché sur la page Mentions légales.">
            <Field label="Contenu des mentions légales">
              <textarea rows={10} value={settings.legalMentions || ''} onChange={(e) => set('legalMentions', e.target.value)}
                className={textareaClass} placeholder="Responsable de la publication : Léna Badiane&#10;Sirius Academy&#10;Dakar, Sénégal&#10;&#10;Hébergeur : Vercel Inc...." />
            </Field>
          </Section>

          <Section title="Politique de confidentialité" description="Texte complet affiché sur la page Politique de confidentialité.">
            <Field label="Contenu de la politique de confidentialité">
              <textarea rows={10} value={settings.privacyPolicy || ''} onChange={(e) => set('privacyPolicy', e.target.value)}
                className={textareaClass} placeholder="Nous collectons vos données uniquement pour traiter vos demandes..." />
            </Field>
          </Section>

          <div className="flex justify-end"><SaveBtn label="Sauvegarder le footer & légal" /></div>
        </>}

      </div>
    </div>
  )
}
