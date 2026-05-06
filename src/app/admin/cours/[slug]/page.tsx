'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import type { FreeCourse } from '@/types'
import CoursForm from '@/components/admin/CoursForm'

export default function EditCoursPage() {
  const { slug } = useParams<{ slug: string }>()
  const [cours, setCours] = useState<FreeCourse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/cours/${slug}`)
      .then((r) => r.json())
      .then((data) => { setCours(data); setLoading(false) })
  }, [slug])

  if (loading)
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full animate-spin" /></div>

  if (!cours) return <div className="text-center py-20 text-gray-400">Cours introuvable.</div>

  return <CoursForm mode="edit" initial={cours} />
}
