import { Star } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Fatou Diallo',
    role: 'Développeuse Frontend · Dakar',
    avatar: 'https://ui-avatars.com/api/?name=Fatou+Diallo&background=10B981&color=fff&size=200',
    formation: 'Développement Web Full-Stack',
    text: "Grâce aux projets concrets, j'ai pu constituer un vrai portfolio dès la fin de la formation. Je me suis lancée en freelance deux semaines après.",
  },
  {
    name: 'Mamadou Sow',
    role: 'Community Manager Freelance',
    avatar: 'https://ui-avatars.com/api/?name=Mamadou+Sow&background=F59E0B&color=0B1F3A&size=200',
    formation: 'Marketing Digital & Réseaux Sociaux',
    text: "Les exercices sont applicables immédiatement. J'ai décroché mes premiers clients avec exactement ce que j'avais appris en formation.",
  },
  {
    name: 'Amina Traoré',
    role: 'UI Designer · Agence créative',
    avatar: 'https://ui-avatars.com/api/?name=Amina+Traore&background=4c6ef5&color=fff&size=200',
    formation: 'Design UX/UI avec Figma',
    text: "L'accompagnement individualisé fait vraiment la différence. J'ai un portfolio solide que je peux présenter avec confiance.",
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-navy-900 mb-3">
            Ce qu&apos;ils ont accompli
          </h2>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            Des compétences concrètes, des projets réalisés, des débuts encourageants.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-brand-yellow fill-current" />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <Image src={t.avatar} alt={t.name} width={40} height={40} className="rounded-full shrink-0" />
                <div>
                  <p className="font-bold text-navy-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                  <p className="text-xs text-brand-green font-medium mt-0.5">{t.formation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
