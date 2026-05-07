import Link from 'next/link'
import Image from 'next/image'
import { Clock, Calendar, ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/types'
import Badge from '@/components/ui/Badge'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

const categoryVariant: Record<string, 'green' | 'blue' | 'yellow' | 'navy'> = {
  Conseils: 'green',
  Développement: 'blue',
  Design: 'yellow',
  Marketing: 'navy',
}

const categoryBorderColor: Record<string, string> = {
  Conseils: '#10B981',
  Développement: '#3B82F6',
  Design: '#F59E0B',
  Marketing: '#0B1F3A',
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const borderColor = categoryBorderColor[post.category] ?? '#6B7280'

  /* ------------------------------------------------------------------ */
  /* Featured variant — horizontal layout                                 */
  /* ------------------------------------------------------------------ */
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden grid md:grid-cols-5">
          {/* Image — 2 cols */}
          <div className="relative h-64 md:h-auto md:col-span-2 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          </div>

          {/* Content — 3 cols */}
          <div className="p-8 md:col-span-3 flex flex-col justify-center">
            <Badge
              variant={categoryVariant[post.category] ?? 'navy'}
              className="mb-4 self-start"
            >
              {post.category}
            </Badge>

            <h3 className="text-2xl font-bold text-navy-900 mb-3 group-hover:text-brand-green transition-colors leading-snug">
              {post.title}
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Author + date + read time */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={36}
                  height={36}
                  className="rounded-full object-cover ring-2 ring-gray-100"
                />
                <div>
                  <p className="text-xs font-semibold text-navy-900">{post.author.name}</p>
                  <p className="text-xs text-gray-400">{post.author.title}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime} min de lecture</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-5 flex justify-end">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green group-hover:gap-2.5 transition-all duration-200">
                Lire l&apos;article
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  /* ------------------------------------------------------------------ */
  /* Regular card                                                         */
  /* ------------------------------------------------------------------ */
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <div
        className="bg-white rounded-2xl shadow-md overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 border-l-[3px]"
        style={{ borderLeftColor: borderColor }}
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Category badge — top left on image */}
          <div className="absolute top-3 left-3">
            <Badge variant={categoryVariant[post.category] ?? 'navy'} size="sm">
              {post.category}
            </Badge>
          </div>

          {/* Read time — bottom right on image */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
            <Clock className="w-3 h-3" />
            <span>{post.readTime} min</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="font-bold text-navy-900 text-base leading-snug mb-2 group-hover:text-brand-green transition-colors">
            {post.title}
          </h3>

          {/* Excerpt — capped to 2 lines */}
          <p className="text-sm text-gray-500 leading-relaxed flex-grow mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Author row + arrow */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={28}
                height={28}
                className="rounded-full object-cover ring-2 ring-gray-100"
              />
              <div>
                <p className="text-xs font-semibold text-navy-900">{post.author.name}</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>

            {/* Hover-reveal arrow */}
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
              Lire
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
