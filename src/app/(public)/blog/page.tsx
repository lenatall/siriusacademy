import type { Metadata } from 'next'
import { blogPosts } from '@/data/blog'
import BlogCard from '@/components/blog/BlogCard'
import { PenLine } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Conseils, tendances et ressources pour les professionnels du digital. Le blog de Sirius Academy.',
}

const categories = ['Tous', 'Conseils', 'Développement', 'Design', 'Marketing']

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <div className="container-custom text-center">
          <div className="w-16 h-16 bg-brand-green/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <PenLine className="w-8 h-8 text-brand-green" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Le <span className="text-brand-green">blog</span> Sirius Academy
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Conseils pratiques, tendances du marché et retours d&apos;expérience pour les
            professionnels du digital.
          </p>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === 'Tous'
                    ? 'bg-navy-900 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {featured && (
            <div className="mb-8">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                Article à la une
              </p>
              <BlogCard post={featured} featured />
            </div>
          )}

          {/* Rest */}
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
            Tous les articles
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-16 bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-10 text-white text-center">
            <h3 className="text-2xl font-black mb-2">Ne manquez aucun article</h3>
            <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
              Recevez nos meilleurs articles et ressources directement dans votre boîte mail, chaque
              semaine.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="votre@email.fr"
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-slate-400 px-4 py-3 rounded-xl focus:outline-none focus:border-brand-green transition-colors text-sm"
              />
              <button className="bg-brand-green hover:bg-brand-green-dark text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm shrink-0">
                S&apos;abonner
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-3">Pas de spam. Désabonnement en un clic.</p>
          </div>
        </div>
      </section>
    </>
  )
}
