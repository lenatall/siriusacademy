import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Sophie Bernard',
    role: 'Développeuse Frontend · Ex-comptable',
    avatar: 'https://ui-avatars.com/api/?name=Sophie+Bernard&background=10B981&color=fff&size=200',
    rating: 5,
    formation: 'Développement Web Full-Stack',
    text: "J'ai changé de vie grâce à Sirius Academy. En 4 mois, je suis passée de comptable à développeuse frontend dans une startup parisienne. Le programme est exigeant mais les formateurs sont extraordinaires.",
  },
  {
    name: 'Lucas Martin',
    role: 'Consultant SEO Freelance',
    avatar: 'https://ui-avatars.com/api/?name=Lucas+Martin&background=F59E0B&color=0B1F3A&size=200',
    rating: 5,
    formation: 'Marketing Digital & SEO',
    text: "La formation Marketing Digital m'a donné toutes les clés pour lancer mon activité freelance. 3 mois après la fin de la formation, j'avais déjà 5 clients réguliers. Le ROI est incroyable.",
  },
  {
    name: 'Amina Traoré',
    role: 'UI Designer · Agence créative',
    avatar: 'https://ui-avatars.com/api/?name=Amina+Traore&background=4c6ef5&color=fff&size=200',
    rating: 5,
    formation: 'Design UX/UI',
    text: "Camille est une formatrice exceptionnelle. J'avais des bases en design mais la formation m'a amenée à un niveau professionnel. Mon portfolio a tout de suite tapé dans l'œil des recruteurs.",
  },
  {
    name: 'Pierre Dubois',
    role: 'Data Analyst · Fintech',
    avatar: 'https://ui-avatars.com/api/?name=Pierre+Dubois&background=364fc7&color=fff&size=200',
    rating: 5,
    formation: 'Data Science & IA',
    text: 'Julien explique des concepts complexes avec une clarté remarquable. La partie LLMs m\'a donné un avantage énorme lors de mes entretiens. Je recommande sans hésitation à tous ceux qui veulent se lancer dans la data.',
  },
  {
    name: 'Marie-Claire Fontaine',
    role: 'Chef de projet digital',
    avatar: 'https://ui-avatars.com/api/?name=Marie-Claire+Fontaine&background=059669&color=fff&size=200',
    rating: 5,
    formation: 'Marketing Digital & SEO',
    text: 'Une formation très complète qui couvre vraiment tous les aspects du marketing digital. Les exercices pratiques et les retours personnalisés m\'ont permis de progresser très vite.',
  },
  {
    name: 'Antoine Lemaire',
    role: 'Développeur Full-Stack · Remote',
    avatar: 'https://ui-avatars.com/api/?name=Antoine+Lemaire&background=D97706&color=fff&size=200',
    rating: 5,
    formation: 'Développement Web Full-Stack',
    text: 'Après 6 mois de formation autodidacte en dilettante, Sirius Academy m\'a donné la structure et la rigueur qui me manquaient. Le projet final m\'a permis d\'avoir quelque chose de concret à montrer.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Star className="w-4 h-4 fill-current" />
            <span>4.9/5 sur 937 avis</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-navy-900 mb-4">
            Ils ont transformé leur carrière
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Découvrez les témoignages de nos apprenants qui ont franchi le cap.
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
