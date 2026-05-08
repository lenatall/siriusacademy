'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus, Trash2, Loader2, Save, ArrowLeft, Check,
  Globe, Users, FileText, CalendarDays, CreditCard, Star, Search,
  Eye, EyeOff, ChevronRight,
} from 'lucide-react'
import type { Formation, Module, FormationStatus, FormationSchedule } from '@/types'
import Link from 'next/link'

interface Props {
  initial?: Partial<Formation>
  mode: 'create' | 'edit'
}

const LEVELS = ['Débutant', 'Intermédiaire', 'Avancé', 'Tous niveaux'] as const
const CATEGORIES = ['Marketing', 'Développement', 'Design', 'Data & IA'] as const

const STEPS = [
  { id: 'general',    label: 'Général',         icon: Globe },
  { id: 'public',     label: 'Public & résultats', icon: Users },
  { id: 'programme',  label: 'Programme & PDF',  icon: FileText },
  { id: 'planning',   label: 'Planning',         icon: CalendarDays },
  { id: 'tarif',      label: 'Tarification',     icon: CreditCard },
  { id: 'formateur',  label: 'Formateur',        icon: Star },
  { id: 'seo',        label: 'SEO & options',    icon: Search },
] as const

type StepId = typeof STEPS[number]['id']

/* ── Sub-components must live OUTSIDE the parent to keep stable identity ── */
function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}

function Section({ title, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50">
        <h3 className="font-bold text-navy-900 text-sm">{title}</h3>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  )
}

function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-navy-900">{label}</p>
        {hint && <p className="text-xs text-gray-500 mt-0.5">{hint}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors ${checked ? 'bg-brand-green' : 'bg-gray-200'}`}
      >
        <span className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  )
}

const DEFAULT_INSTRUCTOR = {
  name: 'Léna Badiane',
  title: 'Référente Digitale certifiée · Fondatrice de Sirius Academy',
  avatar: 'https://ui-avatars.com/api/?name=Lena+Badiane&background=F59E0B&color=0B1F3A&size=200',
  bio: "Référente Digitale certifiée avec plus de 5 ans d'expérience en marketing digital, création de contenu, gestion des réseaux sociaux et accompagnement d'entreprises.",
}

const emptyModule = (): Module => ({
  id: String(Date.now() + Math.random()),
  title: '',
  description: '',
  duration: '',
  lessons: 0,
})

export default function FormationForm({ initial = {}, mode }: Props) {
  const router = useRouter()
  const [step, setStep] = useState<StepId>('general')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    title: initial.title ?? '',
    shortDescription: initial.shortDescription ?? '',
    fullDescription: initial.fullDescription ?? '',
    image: initial.image ?? '',
    price: initial.price ?? 0,
    originalPrice: initial.originalPrice ?? '',
    duration: initial.duration ?? '',
    level: initial.level ?? 'Débutant',
    category: initial.category ?? 'Marketing',
    isFeatured: initial.isFeatured ?? false,
    certificate: initial.certificate ?? true,
    showDetailedProgram: initial.showDetailedProgram ?? false,
    showRelatedFormations: initial.showRelatedFormations ?? false,
    tags: initial.tags?.join(', ') ?? '',
    objectives: initial.objectives?.join('\n') ?? '',
    prerequisites: initial.prerequisites?.join('\n') ?? '',
    keyPoints: initial.keyPoints?.join('\n') ?? '',
    status: (initial.status ?? 'bientot') as FormationStatus,
    schedule: (initial.schedule ?? 'sans-date') as FormationSchedule,
    startDate: initial.startDate ?? '',
    endDate: initial.endDate ?? '',
    weekendDates: initial.weekendDates?.join('\n') ?? '',
    targetAudience: initial.targetAudience ?? '',
    skillsTargeted: (initial.skillsTargeted ?? []).join('\n'),
    maxPlaces: initial.maxPlaces ? String(initial.maxPlaces) : '',
    programPdfUrl: initial.programPdfUrl ?? '',
    metaTitle: initial.metaTitle ?? '',
    metaDescription: initial.metaDescription ?? '',
    instructorName: initial.instructor?.name ?? DEFAULT_INSTRUCTOR.name,
    instructorTitle: initial.instructor?.title ?? DEFAULT_INSTRUCTOR.title,
    instructorAvatar: initial.instructor?.avatar ?? DEFAULT_INSTRUCTOR.avatar,
    instructorBio: initial.instructor?.bio ?? DEFAULT_INSTRUCTOR.bio,
  })

  const [paymentType, setPaymentType] = useState<'unique' | 'tranches'>(
    (initial.paymentType as 'unique' | 'tranches') ?? 'unique'
  )
  const [tranches, setTranches] = useState<Array<{ id: string; nom: string; montant: string; echeance: string }>>(
    initial.tranches?.map((t) => ({
      id: Math.random().toString(36).slice(2),
      nom: t.nom,
      montant: String(t.montant),
      echeance: t.echeance,
    })) ?? [
      { id: Math.random().toString(36).slice(2), nom: "Paiement à l'inscription", montant: '', echeance: "À l'inscription" },
      { id: Math.random().toString(36).slice(2), nom: 'Deuxième paiement', montant: '', echeance: 'Au début du 2e mois' },
    ]
  )

  const emptyTranche = () => ({ id: Math.random().toString(36).slice(2), nom: '', montant: '', echeance: '' })
  const trancheSomme = tranches.reduce((acc, t) => acc + (Number(t.montant) || 0), 0)
  const trancheValid = paymentType === 'unique' || trancheSomme === Number(form.price)

  const [modules, setModules] = useState<Module[]>(
    initial.modules?.length ? initial.modules : [emptyModule()]
  )
  const [showInstructorAvatar, setShowInstructorAvatar] = useState(false)

  const updateModule = (id: string, field: keyof Module, value: string | number) => {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
  }

  const set = (key: keyof typeof form, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    if (!trancheValid) {
      setError('La somme des tranches ne correspond pas au montant total.')
      setLoading(false)
      return
    }

    const payload = {
      ...form,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      objectives: form.objectives.split('\n').map((o) => o.trim()).filter(Boolean),
      prerequisites: form.prerequisites.split('\n').map((p) => p.trim()).filter(Boolean),
      keyPoints: form.keyPoints.split('\n').map((k) => k.trim()).filter(Boolean),
      weekendDates: form.weekendDates.split('\n').map((d) => d.trim()).filter(Boolean),
      targetAudience: form.targetAudience || undefined,
      skillsTargeted: form.skillsTargeted.split('\n').map((s) => s.trim()).filter(Boolean),
      maxPlaces: form.maxPlaces ? Number(form.maxPlaces) : undefined,
      paymentType,
      tranches: paymentType === 'tranches'
        ? tranches.map((t) => ({ nom: t.nom, montant: Number(t.montant), echeance: t.echeance }))
        : [],
      programPdfUrl: form.programPdfUrl || undefined,
      startDate: form.startDate || undefined,
      endDate: form.endDate || undefined,
      metaTitle: form.metaTitle || undefined,
      metaDescription: form.metaDescription || undefined,
      instructor: {
        name: form.instructorName,
        title: form.instructorTitle,
        avatar: form.instructorAvatar,
        bio: form.instructorBio,
      },
      modules,
    }

    try {
      const url = mode === 'create' ? '/api/admin/formations' : `/api/admin/formations/${initial.slug}`
      const res = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setSuccess(true)
        setTimeout(() => router.push('/admin/formations'), 1200)
      } else {
        setError('Erreur lors de la sauvegarde')
      }
    } catch {
      setError('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  /* ── Style helpers ────────────────────────────────────────── */
  const inputCls = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-colors'
  const textareaCls = `${inputCls} resize-none`

  return (
    <div>
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <Link href="/admin/formations" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy-900 mb-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
          <h1 className="text-2xl font-black text-navy-900">
            {mode === 'create' ? 'Nouvelle formation' : `Modifier : ${initial.title}`}
          </h1>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-70 shadow-sm"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : success ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {loading ? 'Sauvegarde...' : success ? 'Sauvegardé !' : 'Sauvegarder'}
        </button>
      </div>

      {error && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* ── Step tabs ──────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
        <div className="flex overflow-x-auto scrollbar-hide">
          {STEPS.map((s, idx) => {
            const Icon = s.icon
            const isActive = step === s.id
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-2 px-4 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all shrink-0 ${
                  isActive
                    ? 'border-navy-900 text-navy-900 bg-navy-50/50'
                    : 'border-transparent text-gray-400 hover:text-navy-900 hover:bg-gray-50'
                }`}
              >
                <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${isActive ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {idx + 1}
                </span>
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Step content ───────────────────────────────────── */}
      <div className="space-y-5">

        {/* ══ 1. GÉNÉRAL ══════════════════════════════════════ */}
        {step === 'general' && <>
          <Section title="Titre & descriptions">
            <Field label="Titre de la formation" required>
              <input type="text" value={form.title} onChange={(e) => set('title', e.target.value)}
                className={inputCls} placeholder="Atelier Intensif Canva" />
            </Field>
            <Field label="Description courte" required hint="1 à 2 phrases — utilisée sur les cartes et dans le Hero.">
              <textarea rows={3} value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)}
                className={textareaCls} placeholder="Apprenez à créer des visuels professionnels sur Canva pour Facebook, Instagram et LinkedIn." />
            </Field>
            <Field label="Description complète" hint="Affichée dans le PDF et optionnellement sur la page.">
              <textarea rows={5} value={form.fullDescription} onChange={(e) => set('fullDescription', e.target.value)}
                className={textareaCls} placeholder="En 2 week-ends, apprenez à utiliser Canva avec méthode..." />
            </Field>
          </Section>

          <Section title="Visuel">
            <Field label="URL de l'image" hint="Image Unsplash ou URL HTTPS">
              <input type="url" value={form.image} onChange={(e) => set('image', e.target.value)}
                className={inputCls} placeholder="https://images.unsplash.com/..." />
            </Field>
            {form.image && (
              <div className="relative rounded-xl overflow-hidden h-40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.image} alt="Aperçu" className="w-full h-full object-cover" />
              </div>
            )}
          </Section>

          <Section title="Classification & statut">
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Catégorie" required>
                <select value={form.category} onChange={(e) => set('category', e.target.value)} className={inputCls}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Niveau" required>
                <select value={form.level} onChange={(e) => set('level', e.target.value as typeof form.level)} className={inputCls}>
                  {LEVELS.map((l) => <option key={l}>{l}</option>)}
                </select>
              </Field>
              <Field label="Statut" required>
                <select value={form.status} onChange={(e) => set('status', e.target.value as FormationStatus)} className={inputCls}>
                  <option value="ouvert">Ouvert — inscriptions actives</option>
                  <option value="bientot">Bientôt disponible</option>
                  <option value="brouillon">Brouillon — non visible</option>
                </select>
              </Field>
            </div>
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-semibold ${
              form.status === 'ouvert' ? 'border-brand-green bg-emerald-50 text-emerald-700' :
              form.status === 'bientot' ? 'border-brand-yellow bg-amber-50 text-amber-700' :
              'border-gray-300 bg-gray-50 text-gray-500'
            }`}>
              <div className={`w-2 h-2 rounded-full shrink-0 ${form.status === 'ouvert' ? 'bg-brand-green animate-pulse' : form.status === 'bientot' ? 'bg-brand-yellow' : 'bg-gray-400'}`} />
              {form.status === 'ouvert' ? 'Visible · Inscriptions ouvertes' : form.status === 'bientot' ? 'Visible · Inscriptions fermées' : 'Non visible sur le site public'}
            </div>
          </Section>

          <div className="flex justify-between items-center">
            <span />
            <button type="button" onClick={() => setStep('public')}
              className="inline-flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors">
              Suivant <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>}

        {/* ══ 2. PUBLIC & RÉSULTATS ════════════════════════════ */}
        {step === 'public' && <>
          <Section title="Public cible" description="">
            <Field label="Pour qui ?" hint="Une ligne par profil, ou séparés par des virgules. Exemple : Étudiants, Entrepreneurs, Freelances">
              <textarea rows={4} value={form.targetAudience} onChange={(e) => set('targetAudience', e.target.value)}
                className={textareaCls} placeholder={"Étudiants\nEntrepreneurs\nFreelances\nCréateurs de contenu"} />
            </Field>
          </Section>

          <Section title="Ce que vous allez pratiquer" >
            <Field label="Points pratiques" required hint="Un point par ligne — max 6 affichés. Formulés en action : améliorer, créer, personnaliser...">
              <textarea rows={7} value={form.keyPoints} onChange={(e) => set('keyPoints', e.target.value)}
                className={textareaCls}
                placeholder={"Améliorer un visuel mal structuré\nPersonnaliser un template Canva\nCréer un visuel sans modèle\nDécliner un design en post, story et carrousel\nCréer un mini-kit visuel\nExporter correctement ses créations"} />
            </Field>
          </Section>

          <Section title="À la fin, vous saurez">
            <Field label="Résultats concrets" hint="Un objectif par ligne — max 6 affichés. Formulés en compétence acquise.">
              <textarea rows={6} value={form.objectives} onChange={(e) => set('objectives', e.target.value)}
                className={textareaCls}
                placeholder={"Choisir le bon format selon le réseau social\nUtiliser les couleurs, polices et espacements avec méthode\nCréer un visuel sans modèle\nAdapter un design à plusieurs formats"} />
            </Field>
          </Section>

          <Section title="Prérequis & compétences visées">
            <Field label="Prérequis" hint="Un prérequis par ligne">
              <textarea rows={3} value={form.prerequisites} onChange={(e) => set('prerequisites', e.target.value)}
                className={textareaCls} placeholder={"Aucune compétence requise\nUn smartphone ou ordinateur\n..."} />
            </Field>
            <Field label="Compétences visées" hint="Un point par ligne — optionnel">
              <textarea rows={4} value={form.skillsTargeted} onChange={(e) => set('skillsTargeted', e.target.value)}
                className={textareaCls} placeholder={"Gérer les réseaux sociaux professionnellement\nCréer du contenu visuel avec Canva\n..."} />
            </Field>
          </Section>

          <div className="flex justify-between">
            <button type="button" onClick={() => setStep('general')}
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Précédent
            </button>
            <button type="button" onClick={() => setStep('programme')}
              className="inline-flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors">
              Suivant <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>}

        {/* ══ 3. PROGRAMME & PDF ═══════════════════════════════ */}
        {step === 'programme' && <>
          <Section title="Programme PDF">
            <Field label="URL du programme PDF" hint="Lien Google Drive, Dropbox ou hébergement direct.">
              <input type="url" value={form.programPdfUrl} onChange={(e) => set('programPdfUrl', e.target.value)}
                className={inputCls} placeholder="https://drive.google.com/..." />
            </Field>
            {form.programPdfUrl && (
              <a href={form.programPdfUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-brand-green font-semibold hover:underline">
                Tester le lien PDF →
              </a>
            )}
          </Section>

          <Section title="Affichage du programme détaillé">
            <Toggle
              checked={form.showDetailedProgram}
              onChange={(v) => set('showDetailedProgram', v)}
              label="Afficher les modules sur la page publique"
              hint={form.showDetailedProgram ? 'Les modules sont visibles sur la page formation.' : 'Par défaut masqué — l\'apprenant reçoit le PDF après avoir rempli le formulaire.'}
            />
            {form.showDetailedProgram && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700">
                <Eye className="w-4 h-4 shrink-0" />
                Le programme complet sera visible sans formulaire. Cela peut réduire l&apos;intérêt du bouton &ldquo;Recevoir le programme&rdquo;.
              </div>
            )}
            {!form.showDetailedProgram && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-xs text-emerald-700">
                <EyeOff className="w-4 h-4 shrink-0" />
                Les modules restent masqués. L&apos;apprenant doit remplir le formulaire pour accéder au programme.
              </div>
            )}
          </Section>

          <Section title="Modules détaillés">
            <p className="text-xs text-gray-500 mb-3">
              Ces modules sont utilisés dans le PDF et {form.showDetailedProgram ? 'affichés sur la page publique.' : 'restent réservés au programme PDF.'}
            </p>
            <div className="space-y-4">
              {modules.map((mod, idx) => (
                <div key={mod.id} className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Module {idx + 1}</span>
                    {modules.length > 1 && (
                      <button type="button" onClick={() => setModules((p) => p.filter((m) => m.id !== mod.id))}
                        className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input type="text" value={mod.title}
                    onChange={(e) => updateModule(mod.id, 'title', e.target.value)}
                    className={inputCls} placeholder="Titre du module" />
                  <textarea rows={2} value={mod.description}
                    onChange={(e) => updateModule(mod.id, 'description', e.target.value)}
                    className={textareaCls} placeholder="Description du module..." />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" value={mod.duration}
                      onChange={(e) => updateModule(mod.id, 'duration', e.target.value)}
                      className={inputCls} placeholder="Durée (ex: 1 week-end)" />
                    <input type="number" value={mod.lessons}
                      onChange={(e) => updateModule(mod.id, 'lessons', Number(e.target.value))}
                      className={inputCls} placeholder="Nb séances" min={0} />
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => setModules((p) => [...p, emptyModule()])}
                className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-brand-green hover:text-brand-green transition-colors font-medium flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Ajouter un module
              </button>
            </div>
          </Section>

          <div className="flex justify-between">
            <button type="button" onClick={() => setStep('public')}
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Précédent
            </button>
            <button type="button" onClick={() => setStep('planning')}
              className="inline-flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors">
              Suivant <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>}

        {/* ══ 4. PLANNING ═════════════════════════════════════ */}
        {step === 'planning' && <>
          <Section title="Format & durée">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Durée totale" required>
                <input type="text" value={form.duration} onChange={(e) => set('duration', e.target.value)}
                  className={inputCls} placeholder="2 week-ends · 16h" />
              </Field>
              <Field label="Nombre de places" hint="Laisser vide si illimité">
                <input type="text" inputMode="numeric" value={form.maxPlaces}
                  onChange={(e) => set('maxPlaces', e.target.value.replace(/\D/g, ''))}
                  className={inputCls} placeholder="20" />
              </Field>
            </div>
          </Section>

          <Section title="Type de planning">
            <Field label="Format" required>
              <div className="grid sm:grid-cols-3 gap-3">
                {([
                  { value: 'sans-date', label: 'Sans date', desc: 'Dates à confirmer' },
                  { value: 'weekend',   label: 'Week-ends',  desc: 'Sessions week-end' },
                  { value: 'date-fixe', label: 'Dates fixes', desc: 'Début et fin définis' },
                ] as { value: FormationSchedule; label: string; desc: string }[]).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => set('schedule', opt.value)}
                    className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-colors text-left ${
                      form.schedule === opt.value
                        ? 'border-navy-900 bg-navy-50 text-navy-900'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <p>{opt.label}</p>
                    <p className="text-xs font-normal opacity-70 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </Field>

            {form.schedule === 'date-fixe' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Date de début">
                  <input type="date" value={form.startDate} onChange={(e) => set('startDate', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Date de fin">
                  <input type="date" value={form.endDate} onChange={(e) => set('endDate', e.target.value)} className={inputCls} />
                </Field>
              </div>
            )}

            {form.schedule === 'weekend' && (
              <Field label="Dates des week-ends" hint="Une date par ligne, ex : Sam 14 & Dim 15 juin 2025">
                <textarea rows={5} value={form.weekendDates} onChange={(e) => set('weekendDates', e.target.value)}
                  className={textareaCls} placeholder={"Sam 14 & Dim 15 juin 2025\nSam 21 & Dim 22 juin 2025\n..."} />
              </Field>
            )}
          </Section>

          <div className="flex justify-between">
            <button type="button" onClick={() => setStep('programme')}
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Précédent
            </button>
            <button type="button" onClick={() => setStep('tarif')}
              className="inline-flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors">
              Suivant <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>}

        {/* ══ 5. TARIFICATION ══════════════════════════════════ */}
        {step === 'tarif' && <>
          <Section title="Type de paiement">
            <div className="grid sm:grid-cols-2 gap-3">
              {([['unique', 'Paiement unique', 'Montant total en une fois'], ['tranches', 'Paiement par tranches', 'Fractionner le paiement']] as const).map(([val, lab, desc]) => (
                <button key={val} type="button" onClick={() => setPaymentType(val)}
                  className={`py-4 px-4 rounded-xl border-2 text-sm font-semibold transition-colors text-left ${
                    paymentType === val ? 'border-brand-green bg-emerald-50 text-brand-green' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  <p>{lab}</p>
                  <p className="text-xs font-normal opacity-70 mt-0.5">{desc}</p>
                </button>
              ))}
            </div>
          </Section>

          <Section title="Montants">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Montant total (FCFA)" required>
                <input type="text" inputMode="numeric" value={form.price}
                  onChange={(e) => set('price', Number(e.target.value.replace(/\D/g, '')) || 0)}
                  className={inputCls} placeholder="150000" />
              </Field>
              <Field label="Prix barré (FCFA)" hint="Optionnel — prix avant réduction">
                <input type="text" inputMode="numeric" value={String(form.originalPrice)}
                  onChange={(e) => set('originalPrice', e.target.value.replace(/\D/g, ''))}
                  className={inputCls} placeholder="200000" />
              </Field>
            </div>
          </Section>

          {paymentType === 'tranches' && (
            <Section title="Tranches de paiement">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500">La somme des tranches doit correspondre au montant total.</p>
                {Number(form.price) > 0 && (
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    trancheValid ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {trancheSomme.toLocaleString('fr-FR')} / {Number(form.price).toLocaleString('fr-FR')} FCFA
                  </span>
                )}
              </div>
              <div className="space-y-3">
                {tranches.map((tranche, idx) => (
                  <div key={tranche.id} className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Tranche {idx + 1}</p>
                      {tranches.length > 1 && (
                        <button type="button" onClick={() => setTranches((p) => p.filter((t) => t.id !== tranche.id))}
                          className="text-xs text-red-400 hover:text-red-600 transition-colors">Supprimer</button>
                      )}
                    </div>
                    <input type="text" value={tranche.nom}
                      onChange={(e) => setTranches((p) => p.map((t) => t.id === tranche.id ? { ...t, nom: e.target.value } : t))}
                      className={inputCls} placeholder="Nom de la tranche" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" inputMode="numeric" value={tranche.montant}
                        onChange={(e) => setTranches((p) => p.map((t) => t.id === tranche.id ? { ...t, montant: e.target.value.replace(/\D/g, '') } : t))}
                        className={inputCls} placeholder="Montant FCFA" />
                      <input type="text" value={tranche.echeance}
                        onChange={(e) => setTranches((p) => p.map((t) => t.id === tranche.id ? { ...t, echeance: e.target.value } : t))}
                        className={inputCls} placeholder="Échéance" />
                    </div>
                  </div>
                ))}
                <button type="button" onClick={() => setTranches((p) => [...p, emptyTranche()])}
                  className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-brand-green hover:text-brand-green transition-colors font-medium">
                  + Ajouter une tranche
                </button>
                {!trancheValid && Number(form.price) > 0 && (
                  <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    Écart : {Math.abs(Number(form.price) - trancheSomme).toLocaleString('fr-FR')} FCFA
                  </p>
                )}
              </div>
            </Section>
          )}

          <div className="flex justify-between">
            <button type="button" onClick={() => setStep('planning')}
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Précédent
            </button>
            <button type="button" onClick={() => setStep('formateur')}
              className="inline-flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors">
              Suivant <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>}

        {/* ══ 6. FORMATEUR ═════════════════════════════════════ */}
        {step === 'formateur' && <>
          <Section title="Formateur">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-700 font-medium">
              Pré-rempli avec Léna Badiane. Modifiez si nécessaire.
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nom">
                <input type="text" value={form.instructorName} onChange={(e) => set('instructorName', e.target.value)} className={inputCls} />
              </Field>
              <Field label="Titre / Rôle">
                <input type="text" value={form.instructorTitle} onChange={(e) => set('instructorTitle', e.target.value)} className={inputCls} />
              </Field>
            </div>
            <Field label="Biographie courte" hint="Affichée dans le PDF. Sur la page publique, seul le nom et le rôle sont visibles.">
              <textarea rows={3} value={form.instructorBio} onChange={(e) => set('instructorBio', e.target.value)} className={textareaCls} />
            </Field>
            <Field label="URL de l'avatar">
              <div className="flex gap-3 items-start">
                <input type="url" value={form.instructorAvatar} onChange={(e) => set('instructorAvatar', e.target.value)} className={inputCls} />
                {form.instructorAvatar && (
                  <button type="button" onClick={() => setShowInstructorAvatar(!showInstructorAvatar)}
                    className="shrink-0 text-xs text-brand-green font-semibold hover:underline mt-2.5">
                    {showInstructorAvatar ? 'Masquer' : 'Aperçu'}
                  </button>
                )}
              </div>
              {showInstructorAvatar && form.instructorAvatar && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.instructorAvatar} alt="Avatar" className="w-16 h-16 rounded-full object-cover mt-2 border-2 border-white shadow" />
              )}
            </Field>
          </Section>

          <div className="flex justify-between">
            <button type="button" onClick={() => setStep('tarif')}
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Précédent
            </button>
            <button type="button" onClick={() => setStep('seo')}
              className="inline-flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors">
              Suivant <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>}

        {/* ══ 7. SEO & OPTIONS ═════════════════════════════════ */}
        {step === 'seo' && <>
          <Section title="Référencement (SEO)">
            <Field label="Meta title" hint="Titre affiché dans les résultats Google. Laisser vide pour utiliser le titre de la formation.">
              <input type="text" value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)}
                className={inputCls} placeholder={form.title || 'Titre SEO'} />
            </Field>
            <Field label="Meta description" hint="Description affichée dans Google (150-160 caractères recommandés).">
              <textarea rows={3} value={form.metaDescription} onChange={(e) => set('metaDescription', e.target.value)}
                className={textareaCls} placeholder={form.shortDescription || 'Description pour les moteurs de recherche...'} />
              {form.metaDescription && (
                <p className={`text-xs mt-1 ${form.metaDescription.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                  {form.metaDescription.length} caractères
                </p>
              )}
            </Field>
          </Section>

          <Section title="Options d'affichage">
            <div className="space-y-4">
              <Toggle
                checked={form.isFeatured}
                onChange={(v) => set('isFeatured', v)}
                label="Formation vedette"
                hint="Mise en avant sur la page d'accueil"
              />
              <Toggle
                checked={form.certificate}
                onChange={(v) => set('certificate', v)}
                label="Attestation de réussite incluse"
                hint="Visible sur la page formation et dans le Hero"
              />
              <Toggle
                checked={form.showRelatedFormations}
                onChange={(v) => set('showRelatedFormations', v)}
                label="Afficher les formations similaires"
                hint="Par défaut masqué pour éviter de distraire le visiteur"
              />
            </div>
          </Section>

          <Section title="Tags">
            <Field label="Tags" hint="Séparés par des virgules">
              <input type="text" value={form.tags} onChange={(e) => set('tags', e.target.value)}
                className={inputCls} placeholder="Canva, Réseaux sociaux, Design, Débutant" />
            </Field>
            {form.tags && (
              <div className="flex flex-wrap gap-2">
                {form.tags.split(',').map((t) => t.trim()).filter(Boolean).map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">#{tag}</span>
                ))}
              </div>
            )}
          </Section>

          <div className="flex justify-between">
            <button type="button" onClick={() => setStep('formateur')}
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Précédent
            </button>
            <button type="button" onClick={handleSubmit} disabled={loading}
              className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-7 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-70 shadow-sm">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sauvegarde...</> :
               success ? <><Check className="w-4 h-4" /> Sauvegardé !</> :
               <><Save className="w-4 h-4" /> Sauvegarder la formation</>}
            </button>
          </div>
        </>}

      </div>
    </div>
  )
}
