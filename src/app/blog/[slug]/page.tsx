import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Calendar, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'
import { getBlogPostBySlug, blogPosts } from '@/data/blog'
import Badge from '@/components/ui/Badge'
import BlogCard from '@/components/blog/BlogCard'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)
  if (!post) return { title: 'Article introuvable' }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export const dynamic = 'force-dynamic'

const categoryVariant: Record<string, 'green' | 'blue' | 'yellow' | 'navy'> = {
  Conseils: 'green',
  Développement: 'blue',
  Design: 'yellow',
  Marketing: 'navy',
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug)
  if (!post) notFound()

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2)

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      {/* Hero */}
      <div className="bg-hero-gradient pt-28 pb-0">
        <div className="container-custom pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-300 truncate max-w-xs">{post.title}</span>
          </nav>

          <div className="max-w-3xl">
            <Badge variant={categoryVariant[post.category] ?? 'navy'} className="mb-5">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">{post.excerpt}</p>

            <div className="flex items-center gap-4">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={48}
                height={48}
                className="rounded-full border-2 border-white/20"
              />
              <div>
                <p className="text-white font-bold">{post.author.name}</p>
                <p className="text-slate-400 text-sm">{post.author.title}</p>
              </div>
              <div className="ml-4 pl-4 border-l border-white/20 flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min de lecture</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Article */}
            <div className="lg:col-span-2">
              {/* Featured image */}
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8 shadow-md">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  priority
                />
              </div>

              {/* Article content */}
              <div className="bg-white rounded-2xl p-8 shadow-sm prose prose-sm max-w-none
                prose-headings:font-black prose-headings:text-navy-900
                prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-li:text-gray-600
                prose-strong:text-navy-900
                prose-a:text-brand-green prose-a:no-underline hover:prose-a:underline">
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .replace(/## (.+)/g, '<h2>$1</h2>')
                      .replace(/\n- (.+)/g, '<li>$1</li>')
                      .replace(/\n\n/g, '</p><p>')
                      .replace(/^/, '<p>')
                      .replace(/$/, '</p>'),
                  }}
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm mt-6 flex items-start gap-4">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={60}
                  height={60}
                  className="rounded-2xl shrink-0"
                />
                <div>
                  <p className="font-bold text-navy-900">{post.author.name}</p>
                  <p className="text-sm text-brand-green font-medium mb-2">{post.author.title}</p>
                  <p className="text-sm text-gray-500">
                    Expert passionné par la transmission du savoir. Formateur chez Sirius Academy.
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-brand-green font-semibold hover:gap-3 transition-all duration-200 mt-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour au blog
              </Link>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA card */}
              <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-6 text-white sticky top-28">
                <p className="text-brand-yellow font-semibold text-sm mb-2">
                  Envie d&apos;aller plus loin ?
                </p>
                <h3 className="font-black text-lg mb-3">
                  Formez-vous avec nos experts
                </h3>
                <p className="text-slate-300 text-sm mb-5 leading-relaxed">
                  Des formations pratiques en petits groupes pour acquérir des compétences concrètes et constituer un portfolio.
                </p>
                <Link
                  href="/formations"
                  className="w-full flex items-center justify-center gap-2 bg-brand-yellow hover:bg-amber-400 text-navy-900 font-bold py-3 rounded-xl transition-colors text-sm"
                >
                  Voir les formations
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div>
                  <h3 className="font-bold text-navy-900 mb-4">Articles similaires</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((p) => (
                      <BlogCard key={p.id} post={p} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
