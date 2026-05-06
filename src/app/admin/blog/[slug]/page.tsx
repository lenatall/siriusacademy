'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import type { BlogPost } from '@/types'
import BlogForm from '@/components/admin/BlogForm'

export default function EditBlogPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/blog/${slug}`)
      .then((r) => r.json())
      .then((data) => { setPost(data); setLoading(false) })
  }, [slug])

  if (loading)
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" /></div>

  if (!post) return <div className="text-center py-20 text-gray-400">Article introuvable.</div>

  return <BlogForm mode="edit" initial={post} />
}
