'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import type { Formation } from '@/types'
import FormationForm from '@/components/admin/FormationForm'

export default function EditFormationPage() {
  const { slug } = useParams<{ slug: string }>()
  const [formation, setFormation] = useState<Formation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/formations/${slug}`)
      .then((r) => r.json())
      .then((data) => { setFormation(data); setLoading(false) })
  }, [slug])

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-navy-900 border-t-transparent rounded-full animate-spin" />
      </div>
    )

  if (!formation)
    return <div className="text-center py-20 text-gray-400">Formation introuvable.</div>

  return <FormationForm mode="edit" initial={formation} />
}
