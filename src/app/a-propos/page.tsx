import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Target, Heart, Zap, Users, Award, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'À Propos',
  description:
    'Découvrez l\'histoire, la mission et l\'équipe de Sirius Academy — votre partenaire pour la formation digitale.',
}

const team = [
  {
    name: 'Marie Dupont',
    role: 'Co-fondatrice & Formatrice Dev Web',
    avatar: 'https://ui-avatars.com/api/?name=Marie+Dupont&background=10B981&color=fff&size=200',
    bio: 'Développeuse Full-Stack avec 10 ans d\'expérience. Passionnée par la transmission du savoir et l\'égalité des chances dans le numérique.',
  },
  {
    name: 'Thomas Renard',
    role: 'Co-fondateur & Formateur Marketing',
    avatar: 'https://ui-avatars.com/api/?name=Thomas+Renard&background=F59E0B&color=0B1F3A&size=200',
    bio: 'Consultant marketing digital depuis 8 ans. Certifié Google et Meta Ads. A accompagné plus de 150 entreprises dans leur transformation digitale.',
  },
  {
    name: 'Camille Martin',
    role: 'Formatrice Design UX/UI',
    avatar: 'https://ui-avatars.com/api/?name=Camille+Martin&background=4c6ef5&color=fff&size=200',
    bio: 'Lead Designer ex-Leboncoin et Doctolib. Championne du design centré sur l\'humain, elle croit que la beauté et l\'utilité ne font qu\'un.',
  },
  {
    name: 'Dr. Julien Leroy',
    role: 'Formateur Data Science & IA',
    avatar: 'https://ui-avatars.com/api/?name=Julien+Leroy&background=364fc7&color=fff&size=200',
    bio: 'Docteur en Intelligence Artificielle, ex-chercheur INRIA. Il rend les concepts les plus complexes accessibles à tous avec une pédagogie remarquable.',
  },
  {
    name: 'Sophie Bernard',
    role: 'Responsable Pédagogique',
    avatar: 'https://ui-avatars.com/api/?name=Sophie+Bernard&background=059669&color=fff&size=200',
    bio: 'Ancienne apprenante reconvertie, Sophie garantit la qualité pédagogique de chaque formation et veille à la réussite de chaque apprenant.',
  },
  {
    name: 'Lucas Petit',
    role: 'Responsable Communauté',
    avatar: 'https://ui-avatars.com/api/?name=Lucas+Petit&background=D97706&color=fff&size=200',
    bio: 'Il anime la communauté Sirius Academy et organise les événements en ligne et en présentiel pour connecter apprenants et professionnels du secteur.',
  },
]

const values = [
  {
    icon: Target,
    title: 'Qualité avant tout',
    description:
      'Nous refusons de compromettre la qualité de nos formations. Chaque module est conçu, testé et amélioré en continu.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Heart,
    title: 'Bienveillance',
    description:
      'Nous croyons que chacun peut apprendre. Notre communauté est un espace safe, inclusif et solidaire.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Zap,
    title: 'Pragmatisme',
    description:
      'Théorie et pratique vont de pair. Nos formations sont conçues pour être applicables dès le premier jour.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Users,
    title: 'Communauté',
    description:
      'Apprendre ensemble, c\'est apprendre mieux. La communauté Sirius Academy est un réseau de professionnels en devenir.',
    color: 'bg-blue-50 text-blue-600',
  },
]

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <Star className="w-4 h-4 text-brand-yellow fill-current" />
              <span>Notre histoire depuis 2021</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              Former les talents du
              <span className="text-brand-green"> numérique de demain</span>
            </h1>
            <p className="text-slate-300 text-xl leading-relaxed">
              Sirius Academy est née d&apos;un constat simple : la formation digitale en France est
              trop souvent théorique, trop chère et déconnectée des réalités du marché. Nous avons
              voulu créer quelque chose de différent.
            </p>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-navy-900 mb-6">Notre histoire</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Sirius Academy a été fondée en 2021 par Marie Dupont et Thomas Renard, deux
                  professionnels du digital frustrés par la qualité des formations disponibles sur
                  le marché. Trop théoriques, trop génériques, trop déconnectées du marché réel.
                </p>
                <p>
                  Leur pari : créer des formations courtes, intensives et pratiques, animées par des
                  professionnels qui exercent leur métier au quotidien. Des formations où l&apos;on
                  construit de vraies choses, sur de vraies données, avec de vrais outils.
                </p>
                <p>
                  Trois ans plus tard, Sirius Academy a formé plus de 3 000 apprenants. 87% d&apos;entre
                  eux ont trouvé un emploi ou des clients freelance dans les 6 mois suivant la fin
                  de leur formation. Ces chiffres, c&apos;est notre fierté.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-10">
                {[
                  { value: '2021', label: 'Année de création' },
                  { value: '3 000+', label: 'Apprenants formés' },
                  { value: '87%', label: 'Taux d\'emploi' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-black text-brand-green mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-navy-900 to-navy-800 p-8 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-brand-yellow/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Star className="w-10 h-10 text-brand-yellow fill-current" />
                  </div>
                  <h3 className="text-2xl font-black mb-3">Notre mission</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    Rendre la formation digitale de haute qualité accessible à tous, partout en
                    France, sans barrière géographique ou sociale.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {[
                      { icon: Award, text: 'Certifiant' },
                      { icon: Users, text: 'Communauté' },
                      { icon: Zap, text: 'Pratique' },
                      { icon: Heart, text: 'Bienveillant' },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2 text-sm text-slate-300">
                        <Icon className="w-4 h-4 text-brand-green" />
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-navy-900 mb-4">Nos valeurs</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Ces principes guident chacune de nos décisions, du design pédagogique à l&apos;expérience
              apprenant.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div
                  key={value.title}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center group hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-14 h-14 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-navy-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-navy-900 mb-4">Notre équipe</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Des experts passionnés qui exercent leur métier et partagent leur savoir avec
              authenticité.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={64}
                    height={64}
                    className="rounded-2xl shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h3 className="font-bold text-navy-900 text-base">{member.name}</h3>
                    <p className="text-sm text-brand-green font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom text-center">
          <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-white mb-4">
              Rejoignez l&apos;aventure Sirius Academy
            </h2>
            <p className="text-slate-300 mb-8">
              Des formations de qualité, une communauté soudée et un accompagnement humain.
              C&apos;est ça, Sirius Academy.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/formations"
                className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-7 py-3.5 rounded-xl transition-colors"
              >
                Découvrir les formations
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
