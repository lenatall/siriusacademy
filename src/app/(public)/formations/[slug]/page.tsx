import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  Clock,
  Users,
  BookOpen,
  Award,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Zap,
  CalendarDays,
  Lock,
  Sparkles,
} from 'lucide-react'
import { store } from '@/lib/store'
import ModuleAccordion from '@/components/formations/ModuleAccordion'
import Badge from '@/components/ui/Badge'
import FormationCard from '@/components/formations/FormationCard'
import WaitlistForm from '@/components/formations/WaitlistForm'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const formation = store.formations.getBySlug(params.slug)
  if (!formation) return { title: 'Formation introuvable' }
  return {
    title: formation.title,
    description: formation.shortDescription,
  }
}

export const dynamic = 'force-dynamic'

const levelVariant: Record<string, 'green' | 'blue' | 'yellow' | 'navy'> = {
  Débutant: 'green',
  Intermédiaire: 'blue',
  Avancé: 'yellow',
  'Tous niveaux': 'navy',
}

export default function FormationDetailPage({ params }: Props) {
  const formation = store.formations.getBySlug(params.slug)
  if (!formation) notFound()

  const relatedFormations = store.formations.getAll()
    .filter((f) => f.id !== formation.id && f.category === formation.category)
    .slice(0, 2)

  const discount = formation.originalPrice
    ? Math.round(((formation.originalPrice - formation.price) / formation.originalPrice) * 100)
    : null

  const totalLessons = formation.modules.reduce((sum, m) => sum + m.lessons, 0)

  return (
    <>
      {/* Hero */}
      <div className="bg-hero-gradient pt-28 pb-0">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/formations" className="hover:text-white transition-colors">
              Formations
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{formation.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8 pb-12">
            {/* Left content */}
            <div className="lg:col-span-2">
              {/* Status + badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {formation.status === 'ouvert' ? (
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
                <Badge variant={levelVariant[formation.level] ?? 'navy'}>{formation.level}</Badge>
                <Badge variant="gray">{formation.category}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                {formation.title}
              </h1>

              <p className="text-slate-300 text-base leading-relaxed mb-6">
                {formation.shortDescription}
              </p>

              {/* Dates / planning */}
              {formation.schedule === 'weekend' && formation.weekendDates?.length && (
                <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-5 text-sm text-slate-200">
                  <div className="flex items-center gap-2 font-semibold text-white mb-2">
                    <CalendarDays className="w-4 h-4 text-brand-yellow" />
                    Prochaines sessions week-end
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formation.weekendDates.map((d) => (
                      <span key={d} className="bg-white/10 px-2.5 py-1 rounded-lg text-xs">{d}</span>
                    ))}
                  </div>
                </div>
              )}
              {formation.schedule === 'date-fixe' && formation.startDate && (
                <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-5 text-sm">
                  <div className="flex items-center gap-2 font-semibold text-white">
                    <CalendarDays className="w-4 h-4 text-brand-yellow" />
                    Début : {new Date(formation.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {formation.endDate && (
                      <span className="text-slate-300 font-normal">
                        — Fin : {new Date(formation.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-5 text-sm text-slate-300 mb-6">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-brand-green" />
                  <span>Suivi pédagogique · retours sur les travaux</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-green" />
                  <span>{formation.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-brand-green" />
                  <span>{totalLessons} leçons</span>
                </div>
                {formation.certificate && (
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-brand-yellow" />
                    <span>Attestation de réussite</span>
                  </div>
                )}
              </div>

              {/* Instructor preview */}
              <div className="flex items-center gap-3">
                <Image
                  src={formation.instructor.avatar}
                  alt={formation.instructor.name}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white/20"
                />
                <div className="text-sm">
                  <span className="text-slate-400">Formateur : </span>
                  <span className="text-white font-semibold">{formation.instructor.name}</span>
                  <span className="text-slate-400"> · {formation.instructor.title}</span>
                </div>
              </div>
            </div>

            {/* Right — Sticky pricing card (mobile: below) */}
            <div className="lg:col-span-1 hidden lg:block" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50">
        <div className="container-custom py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Key points — points essentiels */}
              {formation.keyPoints.length > 0 && (
                <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-8 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <Sparkles className="w-5 h-5 text-brand-yellow" />
                    <h2 className="text-xl font-bold text-white">Points essentiels</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {formation.keyPoints.map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-200">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* About */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-navy-900 mb-4">À propos de la formation</h2>
                <p className="text-gray-600 leading-relaxed">{formation.fullDescription}</p>
              </div>

              {/* Objectives */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-navy-900 mb-6">
                  Ce que vous apprendrez
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {formation.objectives.map((obj) => (
                    <div key={obj} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modules */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-navy-900">
                    Programme de la formation
                  </h2>
                  <span className="text-sm text-gray-400">
                    {formation.modules.length} modules · {totalLessons} leçons
                  </span>
                </div>
                <ModuleAccordion modules={formation.modules} />
              </div>

              {/* Prerequisites */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-navy-900 mb-4">Prérequis</h2>
                <ul className="space-y-2">
                  {formation.prerequisites.map((req) => (
                    <li key={req} className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructor */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-navy-900 mb-6">Votre formateur</h2>
                <div className="flex items-start gap-5">
                  <Image
                    src={formation.instructor.avatar}
                    alt={formation.instructor.name}
                    width={80}
                    height={80}
                    className="rounded-2xl shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-navy-900 text-lg">{formation.instructor.name}</h3>
                    <p className="text-sm text-brand-green font-medium mb-3">
                      {formation.instructor.title}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {formation.instructor.bio}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {formation.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sticky Pricing Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  {/* Formation image */}
                  <div className="relative h-44">
                    <Image
                      src={formation.image}
                      alt={formation.title}
                      fill
                      className="object-cover"
                      sizes="400px"
                    />
                    {discount && (
                      <div className="absolute top-3 right-3 bg-brand-yellow text-navy-900 font-bold text-sm px-3 py-1 rounded-lg">
                        -{discount}%
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {formation.status === 'ouvert' ? (
                      <>
                        {/* Price */}
                        <div className="mb-5">
                          {formation.monthlyPrice ? (
                            <>
                              <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-3xl font-black text-navy-900">
                                  {formation.monthlyPrice.toLocaleString('fr-FR')} FCFA
                                </span>
                                <span className="text-gray-500 font-semibold text-sm">/ mois</span>
                              </div>
                              <p className="text-xs text-gray-400">
                                Soit {formation.price.toLocaleString('fr-FR')} FCFA au total
                                {formation.paymentMonths ? ` (${formation.paymentMonths} versements)` : ''}
                              </p>
                            </>
                          ) : (
                            <div className="flex items-baseline gap-3">
                              <span className="text-3xl font-black text-navy-900">
                                {formation.price.toLocaleString('fr-FR')} FCFA
                              </span>
                              {formation.originalPrice && (
                                <span className="text-gray-400 line-through text-base">
                                  {formation.originalPrice.toLocaleString('fr-FR')} FCFA
                                </span>
                              )}
                            </div>
                          )}
                          {discount && !formation.monthlyPrice && (
                            <p className="text-xs text-brand-green font-semibold mt-1">
                              Économisez {(formation.originalPrice! - formation.price).toLocaleString('fr-FR')} FCFA
                            </p>
                          )}
                        </div>
                        <Link
                          href={`/inscription?formation=${formation.slug}`}
                          className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-green-lg hover:-translate-y-0.5 mb-3"
                        >
                          S&apos;inscrire à cette formation
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                          href="/contact"
                          className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-600 hover:border-navy-800 hover:text-navy-800 font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm"
                        >
                          Demander des informations
                        </Link>
                        {/* Modalités paiement mensuel */}
                        {formation.monthlyPrice && formation.paymentMonths && (
                          <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                            <p className="text-xs font-bold text-emerald-800 mb-2">Modalités de paiement</p>
                            <div className="space-y-1.5">
                              {Array.from({ length: formation.paymentMonths }, (_, i) => (
                                <div key={i} className="flex items-center justify-between text-xs text-emerald-700">
                                  <span>{i === 0 ? '1er versement — Début de formation' : `${i + 1}e versement — Mois ${i + 1}`}</span>
                                  <span className="font-bold">{formation.monthlyPrice!.toLocaleString('fr-FR')} FCFA</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <p className="text-xs text-center text-gray-400 mt-4">
                          Paiement sécurisé · Paiement en plusieurs fois possible
                        </p>
                      </>
                    ) : (
                      <>
                        <WaitlistForm formationSlug={formation.slug} formationTitle={formation.title} />
                      </>
                    )}

                    {/* Includes — always visible */}
                    <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
                      <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Cette formation inclut :
                      </p>
                      {[
                        { icon: Clock, text: `${formation.duration} de formation` },
                        { icon: BookOpen, text: `${totalLessons > 0 ? `${totalLessons} leçons` : `${formation.modules.length} modules`}` },
                        { icon: Zap, text: 'Projets concrets & portfolio' },
                        { icon: Users, text: 'Suivi pédagogique inclus' },
                        { icon: Award, text: 'Attestation de réussite' },
                      ].map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-center gap-3 text-sm text-gray-600">
                          <Icon className="w-4 h-4 text-brand-green shrink-0" />
                          {text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related formations */}
          {relatedFormations.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Formations similaires</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedFormations.map((f) => (
                  <FormationCard key={f.id} formation={f} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
