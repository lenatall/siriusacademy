import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  Clock,
  Users,
  Award,
  ArrowRight,
  ChevronRight,
  Lock,
  MessageCircle,
  ShieldCheck,
  CheckCircle,
  FileText,
  MessageSquare,
  RotateCcw,
} from 'lucide-react'
import { store } from '@/lib/store'
import Badge from '@/components/ui/Badge'
import WaitlistForm from '@/components/formations/WaitlistForm'
import PdfDownloadForm from '@/components/formations/PdfDownloadForm'
import ModuleAccordion from '@/components/formations/ModuleAccordion'
import FormationMobileCTA from '@/components/formations/FormationMobileCTA'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const f = store.formations.getBySlug(params.slug)
  if (!f || f.status === 'brouillon') return { title: 'Formation introuvable' }
  return { title: f.metaTitle || f.title, description: f.metaDescription || f.shortDescription } as Metadata
}

export const dynamic = 'force-dynamic'

const levelVariant: Record<string, 'green' | 'blue' | 'yellow' | 'navy'> = {
  Débutant: 'green', Intermédiaire: 'blue', Avancé: 'yellow', 'Tous niveaux': 'navy',
}

const METHOD_ITEMS = [
  { icon: CheckCircle,  label: 'Exercices guidés' },
  { icon: FileText,     label: 'Travaux à rendre' },
  { icon: RotateCcw,    label: 'Corrections collectives' },
  { icon: MessageSquare, label: 'Groupe WhatsApp dédié' },
]

function sessionLabel(f: { schedule: string; startDate?: string; weekendDates?: string[] }): string | null {
  if (f.schedule === 'date-fixe' && f.startDate) {
    return 'Début : ' + new Date(f.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  }
  if (f.schedule === 'weekend' && f.weekendDates?.length) {
    const first = f.weekendDates[0]
    const parts = first.split(/[\s&]+/).filter(Boolean)
    const monthMatch = first.match(/(jan|fév|mar|avr|mai|juin|juil|août|sep|oct|nov|déc)\w*\s+\d{4}/i)
    return 'Prochaine session : ' + (monthMatch ? monthMatch[0] : parts.slice(-2).join(' '))
  }
  return null
}

export default function FormationDetailPage({ params }: Props) {
  const formation = store.formations.getBySlug(params.slug)
  if (!formation || formation.status === 'brouillon') notFound()

  const settings = store.settings.get()
  const isOpen = formation.status === 'ouvert'
  const firstTranche = formation.paymentType === 'tranches' && formation.tranches?.length
    ? formation.tranches[0]
    : null
  const discount = formation.originalPrice
    ? Math.round(((formation.originalPrice - formation.price) / formation.originalPrice) * 100)
    : null

  const keyPoints = (formation.keyPoints ?? []).slice(0, 4)
  const session = sessionLabel(formation)

  const relatedFormations = formation.showRelatedFormations
    ? store.formations.getAll().filter((f) => f.id !== formation.id && f.category === formation.category && f.status !== 'brouillon').slice(0, 2)
    : []

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="bg-hero-gradient pt-28 pb-0">
        <div className="container-custom pb-14">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href="/formations" className="hover:text-white transition-colors">Formations</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-white truncate max-w-[220px]">{formation.title}</span>
          </nav>

          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* ── Left ─── */}
            <div className="lg:col-span-3">
              {/* Status */}
              <div className="mb-5">
                {isOpen ? (
                  <span className="inline-flex items-center gap-1.5 bg-brand-green text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Inscriptions ouvertes
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-brand-yellow text-navy-900 text-xs font-bold px-3 py-1.5 rounded-lg">
                    <Lock className="w-3 h-3" />
                    Bientôt disponible
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-[2.6rem] font-black text-white leading-tight mb-4">
                {formation.title}
              </h1>

              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-7 max-w-xl">
                {formation.shortDescription}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-sm text-white">
                  <Clock className="w-3.5 h-3.5 text-brand-green shrink-0" />
                  {formation.duration}
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-sm text-white">
                  <Users className="w-3.5 h-3.5 text-brand-green shrink-0" />
                  Petits groupes
                </div>
                <Badge variant={levelVariant[formation.level] ?? 'navy'} size="md">
                  {formation.level}
                </Badge>
                {formation.certificate && (
                  <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-sm text-white">
                    <Award className="w-3.5 h-3.5 text-brand-yellow shrink-0" />
                    Attestation incluse
                  </div>
                )}
              </div>

              {/* Session courte */}
              {session && (
                <p className="text-sm text-brand-yellow font-semibold">
                  📅 {session}
                </p>
              )}
            </div>

            {/* ── Right — pricing card ─── */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Image */}
                <div className="relative h-40">
                  <Image
                    src={formation.image}
                    alt={formation.title}
                    fill
                    className="object-cover"
                    sizes="450px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {discount && isOpen && (
                    <span className="absolute top-3 right-3 bg-brand-yellow text-navy-900 font-bold text-xs px-2.5 py-1 rounded-lg">
                      -{discount}%
                    </span>
                  )}
                </div>

                <div className="p-5">
                  {isOpen ? (
                    <>
                      {/* Price */}
                      {firstTranche ? (
                        <div className="mb-4">
                          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Première tranche</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-navy-900">
                              {firstTranche.montant.toLocaleString('fr-FR')}
                            </span>
                            <span className="text-sm text-gray-400 font-semibold">FCFA</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Total : <strong className="text-navy-900">{formation.price.toLocaleString('fr-FR')} FCFA</strong>
                            {' '}en {formation.tranches!.length} tranches
                          </p>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Tarif</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-navy-900">
                              {formation.price.toLocaleString('fr-FR')}
                            </span>
                            <span className="text-sm text-gray-400 font-semibold">FCFA</span>
                            {formation.originalPrice && (
                              <span className="text-gray-300 line-through text-sm">
                                {formation.originalPrice.toLocaleString('fr-FR')}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">Paiement unique</p>
                        </div>
                      )}

                      <Link
                        href={`/inscription?formation=${formation.slug}`}
                        className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-brand-green/20 hover:-translate-y-0.5 mb-2.5 text-sm"
                      >
                        Demander l&apos;inscription <ArrowRight className="w-4 h-4" />
                      </Link>

                      <PdfDownloadForm
                        formationSlug={formation.slug}
                        formationTitle={formation.title}
                        programPdfUrl={formation.programPdfUrl}
                      />

                      <p className="text-xs text-center text-gray-400 mt-3">
                        Aucun paiement en ligne · Réponse sous 48h
                      </p>
                    </>
                  ) : (
                    <WaitlistForm formationSlug={formation.slug} formationTitle={formation.title} />
                  )}
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href={settings.whatsappLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3 hover:bg-white/15 transition-colors group"
              >
                <MessageCircle className="w-4 h-4 text-brand-green shrink-0" />
                <p className="text-sm text-slate-300 group-hover:text-white transition-colors">
                  Une question ? <span className="font-semibold text-white">Écrivez-nous sur WhatsApp</span>
                </p>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 ml-auto shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="overflow-hidden leading-none">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 0C1200 28 960 40 720 34C480 28 240 6 0 0L0 40Z" fill="#F9FAFB" />
          </svg>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="bg-gray-50 pb-24">
        <div className="container-custom max-w-3xl pt-14 space-y-10">

          {/* Ce que vous allez pratiquer (max 4) */}
          {keyPoints.length > 0 && (
            <section>
              <h2 className="text-xl font-black text-navy-900 mb-5">Ce que vous allez pratiquer</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {keyPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 bg-white rounded-xl px-4 py-3.5 border border-gray-100 shadow-sm">
                    <CheckCircle className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Programme détaillé si activé */}
          {formation.showDetailedProgram && formation.modules.length > 0 && (
            <section>
              <h2 className="text-xl font-black text-navy-900 mb-5">Programme</h2>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <ModuleAccordion modules={formation.modules} />
              </div>
            </section>
          )}

          {/* Méthode */}
          <section>
            <h2 className="text-xl font-black text-navy-900 mb-1">
              Une méthode simple : démonstration, pratique, correction
            </h2>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Chaque séance combine une démonstration, un exercice pratique et des retours collectifs pour progresser concrètement.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {METHOD_ITEMS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 border border-gray-100 shadow-sm">
                  <div className="w-7 h-7 bg-brand-green/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-brand-green" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Recevoir le programme */}
          <section className="bg-navy-900 rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 bg-brand-yellow/20 rounded-xl flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-brand-yellow" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white mb-1">
                  Recevez le programme détaillé avant de vous inscrire
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Consultez le détail des séances, des exercices, du planning et des livrables prévus.
                </p>
              </div>
            </div>
            <PdfDownloadForm
              formationSlug={formation.slug}
              formationTitle={formation.title}
              programPdfUrl={formation.programPdfUrl}
              variant="section"
            />
          </section>

          {/* CTA final */}
          {isOpen && (
            <section className="text-center py-6">
              <h2 className="text-2xl font-black text-navy-900 mb-2">
                Vous souhaitez rejoindre la prochaine session ?
              </h2>
              <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto leading-relaxed">
                Remplissez le formulaire. L&apos;équipe Sirius Academy vous contacte sur WhatsApp pour confirmer les informations.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href={`/inscription?formation=${formation.slug}`}
                  className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-brand-green/20 hover:-translate-y-0.5 text-sm"
                >
                  Demander l&apos;inscription <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={settings.whatsappLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-600 hover:border-brand-green hover:text-brand-green font-semibold px-6 py-4 rounded-xl transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Poser une question sur WhatsApp
                </a>
              </div>
              <p className="text-xs text-gray-400 mt-4 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                Aucun paiement en ligne · Données protégées
              </p>
            </section>
          )}

          {/* Formations similaires (optionnel) */}
          {relatedFormations.length > 0 && (
            <section className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-black text-navy-900">Autres formations</h2>
                <Link href="/formations" className="text-sm font-semibold text-brand-green hover:text-brand-green-dark flex items-center gap-1">
                  Tout voir <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedFormations.map((f) => (
                  <Link
                    key={f.id}
                    href={`/formations/${f.slug}`}
                    className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-gray-200 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 relative">
                      <Image src={f.image} alt={f.title} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-navy-900 group-hover:text-brand-green transition-colors truncate">{f.title}</p>
                      <p className="text-xs text-gray-400 truncate">{f.duration} · {f.level}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 ml-auto group-hover:text-brand-green transition-colors" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <FormationMobileCTA
        slug={formation.slug}
        price={formation.price}
        firstTranche={firstTranche?.montant}
        isOpen={isOpen}
      />
    </>
  )
}
