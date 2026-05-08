import { Star } from 'lucide-react'
import Image from 'next/image'
import { store } from '@/lib/store'

export default function Testimonials() {
  const settings = store.settings.get()
  const testimonials = settings.testimonials ?? []

  if (testimonials.length === 0) return null

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Témoignages
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-navy-900 mb-3">
            Ce qu&apos;ils disent de Sirius Academy
          </h2>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            Des parcours concrets, des résultats visibles.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white border-l-4 border-brand-green rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="text-6xl font-black text-brand-yellow/20 leading-none mb-2 select-none">
                &ldquo;
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-brand-yellow fill-current" />
                ))}
              </div>
              <p className="text-gray-700 text-base leading-relaxed italic flex-grow mb-6">
                {t.text}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <Image
                  src={t.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=10B981&color=fff&size=200`}
                  alt={t.name}
                  width={44}
                  height={44}
                  className="rounded-full shrink-0"
                />
                <div>
                  <p className="font-bold text-navy-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                  {t.formation && (
                    <span className="inline-block mt-1 text-xs text-brand-green font-semibold bg-brand-green/10 px-2 py-0.5 rounded-full">
                      {t.formation}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
