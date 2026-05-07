import { Star } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Fatou Diallo',
    role: 'Développeuse Frontend · Dakar',
    avatar: 'https://ui-avatars.com/api/?name=Fatou+Diallo&background=10B981&color=fff&size=200',
    formation: 'Développement Web Full-Stack',
    text: "Grâce aux projets concrets, j'ai pu constituer un vrai portfolio dès la fin de la formation. Je me suis lancée en freelance deux semaines après.",
    color: 'bg-emerald-500',
  },
  {
    name: 'Mamadou Sow',
    role: 'Community Manager Freelance',
    avatar: 'https://ui-avatars.com/api/?name=Mamadou+Sow&background=F59E0B&color=0B1F3A&size=200',
    formation: 'Marketing Digital & Réseaux Sociaux',
    text: "Les exercices sont applicables immédiatement. J'ai décroché mes premiers clients avec exactement ce que j'avais appris en formation. Du concret, enfin.",
    color: 'bg-amber-500',
  },
  {
    name: 'Amina Traoré',
    role: 'UI Designer · Agence créative',
    avatar: 'https://ui-avatars.com/api/?name=Amina+Traore&background=4c6ef5&color=fff&size=200',
    formation: 'Design UX/UI avec Figma',
    text: "L'accompagnement individualisé fait vraiment la différence. J'ai un portfolio solide que je peux présenter avec confiance — impossible à avoir seule.",
    color: 'bg-blue-500',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-navy-900 relative overflow-hidden">
      {/* Background deco */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-white/10">
            <Star className="w-3.5 h-3.5 text-brand-yellow fill-current" />
            <span>Ils ont sauté le pas</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Ce qu&apos;ils ont accompli
          </h2>
          <p className="text-slate-400 text-base max-w-md mx-auto">
            Des compétences réelles. Des projets concrets. Des résultats mesurables.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col hover:bg-white/8 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-brand-yellow fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-300 text-sm leading-relaxed flex-grow mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="rounded-full shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500 truncate">{t.role}</p>
                  <span className={`inline-block mt-1 text-xs font-semibold text-white/70 bg-white/10 px-2 py-0.5 rounded-full`}>
                    {t.formation}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
