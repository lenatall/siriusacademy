import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  Clock,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  CalendarDays,
  Lock,
  Target,
  BookOpen,
  Layers,
  MessageCircle,
  Star,
  ShieldCheck,
} from 'lucide-react'
import { store } from '@/lib/store'
import Badge from '@/components/ui/Badge'
import FormationCard from '@/components/formations/FormationCard'
import WaitlistForm from '@/components/formations/WaitlistForm'
import PdfDownloadForm from '@/components/formations/PdfDownloadForm'
import ModuleAccordion from '@/components/formations/ModuleAccordion'
import FormationNav from '@/components/formations/FormationNav'
import FormationMobileCTA from '@/components/formations/FormationMobileCTA'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const formation = store.formations.getBySlug(params.slug)
  if (!formation || formation.status === 'brouillon') return { title: 'Formation introuvable' }
  return {
    title: formation.metaTitle || formation.title,
    description: formation.metaDescription || formation.shortDescription,
  } as Metadata & { metaTitle?: string; metaDescription?: string }
}

export const dynamic = 'force-dynamic'

const levelVariant: Record<string, 'green' | 'blue' | 'yellow' | 'navy'> = {
  Débutant: 'green',
  Intermédiaire: 'blue',
  Avancé: 'yellow',
  'Tous niveaux': 'navy',
}

const categoryColor: Record<string, string> = {
  Développement: 'bg-blue-500',
  Marketing: 'bg-emerald-500',
  Design: 'bg-purple-500',
  'Data & IA': 'bg-amber-500',
}

export default function FormationDetailPage({ params }: Props) {
  const formation = store.formations.getBySlug(params.slug)
  if (!formation || formation.status === 'brouillon') notFound()

  const relatedFormations = store.formations
    .getAll()
    .filter((f) => f.id !== formation.id && f.category === formation.category && f.status !== 'brouillon')
    .slice(0, 2)

  const settings = store.settings.get()

  const discount = formation.originalPrice
    ? Math.round(((formation.originalPrice - formation.price) / formation.originalPrice) * 100)
    : null

  const isOpen = formation.status === 'ouvert'
  const firstTranche = formation.paymentType === 'tranches' && formation.tranches?.length
    ? formation.tranches[0].montant
    : undefined
  const catColor = categoryColor[formation.category] ?? 'bg-gray-400'

  return (
    <>
      {/* Sticky sub-navigation (client component) */}
      <FormationNav />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <div className="bg-hero-gradient pt-28 pb-0">
        <div className="container-custom pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <Link href="/formations" className="hover:text-white transition-colors">Formations</Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <span className="text-white truncate max-w-[200px]">{formation.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left — title & info */}
            <div className="lg:col-span-2">
              {/* Status + badges */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {isOpen ? (
                  <span className="inline-flex items-center gap-1.5 bg-brand-green text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Inscriptions ouvertes
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-brand-yellow text-navy-900 text-xs font-bold px-3 py-1.5 rounded-lg">
                    <Lock className="w-3 h-3" />
                    Bientôt disponible
                  </span>
                )}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white ${catColor}`}>
                  {formation.category}
                </span>
                <Badge variant={levelVariant[formation.level] ?? 'navy'} size="md">
                  {formation.level}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
                {formation.title}
              </h1>

              <p className="text-slate-300 text-lg leading-relaxed mb-7 max-w-2xl">
                {formation.shortDescription}
              </p>

              {/* Meta chips */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white backdrop-blur-sm">
                  <Clock className="w-4 h-4 text-brand-green shrink-0" />
                  <span>{formation.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white backdrop-blur-sm">
                  <Users className="w-4 h-4 text-brand-green shrink-0" />
                  <span>Petits groupes · suivi inclus</span>
                </div>
                {formation.certificate && (
                  <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white backdrop-blur-sm">
                    <Award className="w-4 h-4 text-brand-yellow shrink-0" />
                    <span>Attestation de réussite</span>
                  </div>
                )}
                {formation.maxPlaces && (
                  <div className="flex items-center gap-2 bg-brand-yellow/20 border border-brand-yellow/30 rounded-full px-4 py-2 text-sm text-brand-yellow backdrop-blur-sm">
                    <Star className="w-4 h-4 shrink-0 fill-current" />
                    <span>{formation.maxPlaces} places max.</span>
                  </div>
                )}
              </div>

              {/* Schedule */}
              {formation.schedule === 'weekend' && formation.weekendDates?.length ? (
                <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-6 text-sm">
                  <div className="flex items-center gap-2 font-semibold text-white mb-2">
                    <CalendarDays className="w-4 h-4 text-brand-yellow" />
                    Prochaines sessions week-end
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formation.weekendDates.map((d) => (
                      <span key={d} className="bg-white/10 text-slate-200 px-2.5 py-1 rounded-lg text-xs font-medium">{d}</span>
                    ))}
                  </div>
                </div>
              ) : formation.schedule === 'date-fixe' && formation.startDate ? (
                <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-6 text-sm flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-brand-yellow shrink-0" />
                  <span className="text-white font-semibold">
                    Début : {new Date(formation.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  {formation.endDate && (
                    <span className="text-slate-300">
                      — Fin : {new Date(formation.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  )}
                </div>
              ) : null}

              {/* Instructor mini */}
              <div className="flex items-center gap-3">
                <Image
                  src={formation.instructor.avatar}
                  alt={formation.instructor.name}
                  width={44}
                  height={44}
                  className="rounded-full border-2 border-white/30 shrink-0"
                />
                <div className="text-sm">
                  <span className="text-slate-400">Formation par </span>
                  <span className="text-white font-bold">{formation.instructor.name}</span>
                  <span className="text-slate-400"> · {formation.instructor.title}</span>
                </div>
              </div>
            </div>

            {/* Right — pricing preview (desktop only, full card in sidebar below) */}
            <div className="hidden lg:flex flex-col justify-end pb-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Tarif</p>
                {isOpen ? (
                  firstTranche ? (
                    <>
                      <div className="text-3xl font-black mb-0.5">
                        {firstTranche.toLocaleString('fr-FR')} <span className="text-lg font-semibold text-slate-300">FCFA</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-4">
                        à l&apos;inscription · total {formation.price.toLocaleString('fr-FR')} FCFA en {formation.tranches!.length} tranches
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-3xl font-black mb-0.5">
                        {formation.price.toLocaleString('fr-FR')} <span className="text-lg font-semibold text-slate-300">FCFA</span>
                      </div>
                      {formation.originalPrice && (
                        <p className="text-slate-400 line-through text-sm mb-1">
                          {formation.originalPrice.toLocaleString('fr-FR')} FCFA
                        </p>
                      )}
                      {discount && (
                        <span className="inline-block bg-brand-yellow text-navy-900 text-xs font-bold px-2 py-0.5 rounded-lg mb-3">
                          -{discount}% de réduction
                        </span>
                      )}
                      {!discount && <div className="mb-3" />}
                    </>
                  )
                ) : (
                  <p className="text-slate-300 text-sm mb-4">Prochaine session bientôt disponible</p>
                )}
                {isOpen ? (
                  <Link
                    href={`/inscription?formation=${formation.slug}`}
                    className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 rounded-xl transition-colors text-sm"
                  >
                    Demander l&apos;inscription <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <p className="text-center text-sm text-slate-300">Rejoindre la liste d&apos;attente ↓</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="overflow-hidden leading-none">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48L1440 48L1440 0C1200 32 960 48 720 40C480 32 240 8 0 0L0 48Z" fill="#F9FAFB" />
          </svg>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────────── */}
      <div className="bg-gray-50 pb-24">
        <div className="container-custom pt-12">
          <div className="grid lg:grid-cols-3 gap-8 items-start">

            {/* ── LEFT COLUMN ──────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-2">

              {/* ── SECTION: Vue d'ensemble ── */}
              <div id="overview" className="scroll-mt-28">

                {/* Key highlights */}
                {formation.keyPoints.length > 0 && (
                  <div className="bg-navy-900 rounded-2xl p-7 mb-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-7 h-7 bg-brand-yellow/20 rounded-lg flex items-center justify-center">
                        <Star className="w-4 h-4 text-brand-yellow fill-current" />
                      </div>
                      <h2 className="text-base font-bold text-white">Points essentiels</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {formation.keyPoints.map((point) => (
                        <div key={point} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-200 leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pour qui */}
                {formation.targetAudience && (
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-7 mb-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-amber-600" />
                      </div>
                      <h2 className="text-base font-bold text-amber-900">Cette formation est faite pour vous si…</h2>
                    </div>
                    <p className="text-amber-800 leading-relaxed text-sm">{formation.targetAudience}</p>
                  </div>
                )}

                {/* À propos */}
                <div className="bg-white rounded-2xl p-7 mb-5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-7 h-7 bg-navy-900/5 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-navy-700" />
                    </div>
                    <h2 className="text-base font-bold text-navy-900">À propos de la formation</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{formation.fullDescription}</p>
                </div>

                {/* Objectives */}
                {formation.objectives.length > 0 && (
                  <div className="bg-white rounded-2xl p-7 mb-5 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-brand-green" />
                      </div>
                      <h2 className="text-base font-bold text-navy-900">Ce que vous apprendrez</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {formation.objectives.map((obj) => (
                        <div key={obj} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle className="w-3 h-3 text-brand-green" />
                          </div>
                          <span className="text-sm text-gray-700 leading-relaxed">{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {(formation.skillsTargeted?.length || 0) > 0 && (
                  <div className="bg-white rounded-2xl p-7 mb-5 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Target className="w-4 h-4 text-blue-600" />
                      </div>
                      <h2 className="text-base font-bold text-navy-900">Compétences visées</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(formation.skillsTargeted || []).map((skill) => (
                        <span key={skill} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-3 py-1.5 text-xs font-semibold">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ── SECTION: Programme ── */}
              {formation.modules.length > 0 && (
                <div id="programme" className="scroll-mt-28 pt-4">
                  <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-navy-900 rounded-lg flex items-center justify-center">
                          <Layers className="w-4 h-4 text-white" />
                        </div>
                        <h2 className="text-base font-bold text-navy-900">Programme de la formation</h2>
                      </div>
                      <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                        {formation.modules.length} modules
                      </span>
                    </div>
                    <ModuleAccordion modules={formation.modules} />
                  </div>
                </div>
              )}

              {/* ── SECTION: Prérequis ── */}
              {formation.prerequisites.length > 0 && (
                <div className="pt-4">
                  <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-7 h-7 bg-purple-50 rounded-lg flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4 text-purple-600" />
                      </div>
                      <h2 className="text-base font-bold text-navy-900">Prérequis</h2>
                    </div>
                    <ul className="space-y-3">
                      {formation.prerequisites.map((req) => (
                        <li key={req} className="flex items-start gap-3 text-sm text-gray-600">
                          <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                          </div>
                          <span className="leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* ── SECTION: Formateur ── */}
              <div id="formateur" className="scroll-mt-28 pt-4">
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                  <h2 className="text-base font-bold text-navy-900 mb-6">Votre formateur</h2>
                  <div className="flex items-start gap-5">
                    <Image
                      src={formation.instructor.avatar}
                      alt={formation.instructor.name}
                      width={80}
                      height={80}
                      className="rounded-2xl shrink-0 ring-4 ring-gray-100"
                    />
                    <div className="min-w-0">
                      <h3 className="font-bold text-navy-900 text-lg">{formation.instructor.name}</h3>
                      <p className="text-sm text-brand-green font-semibold mb-3">{formation.instructor.title}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{formation.instructor.bio}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {formation.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4">
                  {formation.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-500 hover:border-navy-300 hover:text-navy-700 transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* ── RIGHT SIDEBAR ──────────────────────────────────── */}
            <div id="tarifs" className="lg:col-span-1 scroll-mt-28">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

                  {/* Image */}
                  <div className="relative h-44">
                    <Image
                      src={formation.image}
                      alt={formation.title}
                      fill
                      className="object-cover"
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                    {discount && isOpen && (
                      <div className="absolute top-3 right-3 bg-brand-yellow text-navy-900 font-bold text-sm px-3 py-1 rounded-lg shadow">
                        -{discount}%
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3">
                      <span className={`inline-flex items-center gap-1.5 ${isOpen ? 'bg-brand-green' : 'bg-brand-yellow text-navy-900'} text-white text-xs font-bold px-2.5 py-1 rounded-lg`}>
                        {isOpen ? (
                          <><span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Inscriptions ouvertes</>
                        ) : (
                          <><Lock className="w-3 h-3" /> Bientôt disponible</>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="p-6">
                    {isOpen ? (
                      <>
                        <div className="mb-5">
                          {formation.paymentType === 'tranches' && formation.tranches?.length ? (
                            <>
                              <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-3xl font-black text-navy-900">
                                  {formation.tranches[0].montant.toLocaleString('fr-FR')}
                                  <span className="text-base font-semibold text-gray-400 ml-1">FCFA</span>
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mb-4">
                                à l&apos;inscription · total{' '}
                                <span className="font-bold text-navy-900">{formation.price.toLocaleString('fr-FR')} FCFA</span>
                                {' '}en {formation.tranches.length} tranches
                              </p>
                              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-4">
                                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wide mb-3">
                                  Modalités de paiement
                                </p>
                                <div className="space-y-2.5">
                                  {formation.tranches.map((t, i) => (
                                    <div key={i} className="flex items-start justify-between gap-2">
                                      <div>
                                        <p className="text-xs font-semibold text-emerald-900">{t.nom}</p>
                                        <p className="text-xs text-emerald-600">{t.echeance}</p>
                                      </div>
                                      <span className="text-xs font-bold text-emerald-800 shrink-0 bg-white px-2 py-0.5 rounded-lg border border-emerald-100">
                                        {t.montant.toLocaleString('fr-FR')} FCFA
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                <p className="text-xs text-emerald-600 mt-3 pt-3 border-t border-emerald-100">
                                  L&apos;accès est maintenu lorsque les paiements sont à jour.
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-baseline gap-3 mb-1">
                                <span className="text-3xl font-black text-navy-900">
                                  {formation.price.toLocaleString('fr-FR')}
                                  <span className="text-base font-semibold text-gray-400 ml-1">FCFA</span>
                                </span>
                                {formation.originalPrice && (
                                  <span className="text-gray-400 line-through text-base">
                                    {formation.originalPrice.toLocaleString('fr-FR')} FCFA
                                  </span>
                                )}
                              </div>
                              {discount && (
                                <span className="inline-block mb-3 bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-lg">
                                  Économisez {(formation.originalPrice! - formation.price).toLocaleString('fr-FR')} FCFA
                                </span>
                              )}
                              <p className="text-xs text-gray-400 mb-4">Paiement unique avant le démarrage</p>
                            </>
                          )}
                        </div>

                        <Link
                          href={`/inscription?formation=${formation.slug}`}
                          className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg shadow-brand-green/20 hover:-translate-y-0.5 mb-3 text-base"
                        >
                          Demander l&apos;inscription
                          <ArrowRight className="w-4 h-4" />
                        </Link>

                        <PdfDownloadForm
                          formationSlug={formation.slug}
                          formationTitle={formation.title}
                          programPdfUrl={formation.programPdfUrl}
                        />

                        <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
                          Aucun paiement en ligne · L&apos;équipe vous contacte sous 48h
                        </p>
                      </>
                    ) : (
                      <WaitlistForm formationSlug={formation.slug} formationTitle={formation.title} />
                    )}

                    {/* Ce que ça inclut */}
                    <div className="mt-5 pt-5 border-t border-gray-100">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                        Cette formation inclut :
                      </p>
                      <ul className="space-y-3">
                        {[
                          { icon: Clock, text: `${formation.duration} de formation` },
                          { icon: BookOpen, text: `${formation.modules.length} modules pratiques` },
                          { icon: Users, text: 'Suivi pédagogique personnalisé' },
                          { icon: Award, text: 'Attestation de réussite' },
                        ].map(({ icon: Icon, text }) => (
                          <li key={text} className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                              <Icon className="w-3.5 h-3.5 text-brand-green" />
                            </div>
                            {text}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Trust signals */}
                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-center gap-3 text-xs text-gray-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-green shrink-0" />
                      <span>Données protégées · Aucun engagement</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={settings.whatsappLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-3 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-brand-green/20 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand-green group-hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5 text-brand-green group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900">Vous avez des questions ?</p>
                    <p className="text-xs text-gray-400">Réponse rapide sur WhatsApp</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 ml-auto shrink-0 group-hover:text-brand-green transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* ── Final CTA banner ──────────────────────────────── */}
          {isOpen && (
            <div className="mt-16 bg-navy-900 rounded-2xl p-8 md:p-12 border-l-4 border-brand-green overflow-hidden relative">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '28px 28px',
                }}
              />
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-brand-green text-xs font-bold uppercase tracking-widest mb-2">
                    Prochaine étape
                  </p>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                    Prêt(e) à rejoindre <span className="text-brand-green">{formation.title}</span> ?
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Complétez le formulaire · L&apos;équipe vous contacte sous 48h sur WhatsApp.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Link
                    href={`/inscription?formation=${formation.slug}`}
                    className="inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-brand-green/20 hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    Demander l&apos;inscription <ArrowRight className="w-5 h-5" />
                  </Link>
                  {formation.programPdfUrl && (
                    <a
                      href={formation.programPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white font-semibold px-6 py-4 rounded-xl hover:bg-white/10 transition-colors text-base whitespace-nowrap"
                    >
                      Voir le programme
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Related formations ──────────────────────────── */}
          {relatedFormations.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-navy-900">Formations similaires</h2>
                <Link href="/formations" className="text-sm font-semibold text-brand-green hover:text-brand-green-dark flex items-center gap-1 transition-colors">
                  Tout voir <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedFormations.map((f) => (
                  <FormationCard key={f.id} formation={f} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sticky CTA (client component) */}
      <FormationMobileCTA
        slug={formation.slug}
        price={formation.price}
        firstTranche={firstTranche}
        isOpen={isOpen}
      />
    </>
  )
}
