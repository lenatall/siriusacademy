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

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden grid md:grid-cols-2">
          <div className="relative h-64 md:h-auto overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <Badge variant={categoryVariant[post.category] ?? 'navy'} className="mb-4 self-start">
              {post.category}
            </Badge>
            <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-brand-green transition-colors leading-snug">
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <p className="text-xs font-semibold text-navy-900">{post.author.name}</p>
                  <p className="text-xs text-gray-400">{formattedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime} min</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <Badge variant={categoryVariant[post.category] ?? 'navy'} size="sm">
              {post.category}
            </Badge>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-bold text-navy-900 text-base leading-snug mb-2 group-hover:text-brand-green transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed flex-grow mb-4">{post.excerpt}</p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={28}
                height={28}
                className="rounded-full"
              />
              <div>
                <p className="text-xs font-semibold text-navy-900">{post.author.name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{post.readTime} min</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
