import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Fatou Diallo',
    role: 'Développeuse Frontend · Dakar',
    avatar: 'https://ui-avatars.com/api/?name=Fatou+Diallo&background=10B981&color=fff&size=200',
    rating: 5,
    formation: 'Développement Web Full-Stack',
    text: "J'ai pu construire mon premier portfolio complet grâce à la formation. Le suivi personnalisé et les projets concrets m'ont donné confiance pour me lancer. Je recommande à tous ceux qui veulent vraiment apprendre.",
  },
  {
    name: 'Mamadou Sow',
    role: 'Community Manager Freelance',
    avatar: 'https://ui-avatars.com/api/?name=Mamadou+Sow&background=F59E0B&color=0B1F3A&size=200',
    rating: 5,
    formation: 'Marketing Digital & SEO',
    text: "La formation m'a vraiment aidé à structurer ma pratique du marketing digital. Les exercices sont concrets et applicables immédiatement. J'ai pu proposer des services à mes premiers clients avec bien plus de méthode.",
  },
  {
    name: 'Amina Traoré',
    role: 'UI Designer · Agence créative',
    avatar: 'https://ui-avatars.com/api/?name=Amina+Traore&background=4c6ef5&color=fff&size=200',
    rating: 5,
    formation: 'Design UX/UI',
    text: "J'avais des bases en design mais la formation m'a amenée à un vrai niveau professionnel. J'ai maintenant un portfolio solide que je peux présenter avec confiance. L'accompagnement individualisé fait vraiment la différence.",
  },
  {
    name: 'Ibrahima Ndiaye',
    role: 'Data Analyst · Dakar',
    avatar: 'https://ui-avatars.com/api/?name=Ibrahima+Ndiaye&background=364fc7&color=fff&size=200',
    rating: 5,
    formation: 'Data Science & IA',
    text: 'Les concepts sont expliqués avec beaucoup de clarté et les projets appliqués sur données réelles donnent une compréhension concrète. J\'ai pu constituer un vrai portfolio data que je peux montrer.',
  },
  {
    name: 'Aïssatou Bâ',
    role: 'Chargée de communication',
    avatar: 'https://ui-avatars.com/api/?name=Aissatou+Ba&background=059669&color=fff&size=200',
    rating: 5,
    formation: 'Marketing Digital & SEO',
    text: 'Une formation très complète qui couvre vraiment tous les aspects du marketing digital. Les exercices pratiques et les retours personnalisés m\'ont permis de progresser très vite et d\'appliquer dès le lendemain.',
  },
  {
    name: 'Oumar Diop',
    role: 'Développeur Web · Freelance',
    avatar: 'https://ui-avatars.com/api/?name=Oumar+Diop&background=D97706&color=fff&size=200',
    rating: 5,
    formation: 'Développement Web Full-Stack',
    text: 'La structure de la formation et l\'accompagnement personnalisé m\'ont vraiment aidé à progresser rapidement. Le projet final m\'a permis d\'avoir quelque chose de concret à présenter à mes premiers clients.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Star className="w-4 h-4 fill-current" />
            <span>Témoignages de nos apprenants</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-navy-900 mb-4">
            Ils ont développé leurs compétences
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Découvrez ce que nos apprenants ont accompli grâce à un suivi concret et personnalisé.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-brand-yellow fill-current" />
                ))}
              </div>
              <Quote className="w-6 h-6 text-gray-200 mb-3" />
              <p className="text-sm text-gray-600 leading-relaxed flex-grow mb-5">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold text-navy-900 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-400">{testimonial.role}</p>
                  <p className="text-xs text-brand-green font-medium mt-0.5">
                    {testimonial.formation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
