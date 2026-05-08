'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  FileText,
  Users,
  Plus,
  ArrowRight,
  Settings,
  Mail,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react'
import type { Formation, BlogPost, Prospect } from '@/types'

export default function AdminDashboard() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [waitlist, setWaitlist] = useState<Prospect[]>([])
  const [blog, setBlog] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchProspects = () => {
    fetch('/api/prospects')
      .then((r) => r.json())
      .then((w) => {
        setWaitlist(Array.isArray(w) ? w : [])
        setLastUpdated(new Date())
      })
      .catch(() => {})
  }

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/formations').then((r) => r.json()),
      fetch('/api/prospects').then((r) => r.json()),
      fetch('/api/admin/blog').then((r) => r.json()),
    ]).then(([f, w, b]) => {
      setFormations(Array.isArray(f) ? f : [])
      setWaitlist(Array.isArray(w) ? w : [])
      setBlog(Array.isArray(b) ? b : [])
      setLoading(false)
      setLastUpdated(new Date())
    })
    const interval = setInterval(fetchProspects, 30000)
    return () => clearInterval(interval)
  }, [])

  const ouvertes = formations.filter((f) => f.status === 'ouvert').length

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-navy-900">Tableau de bord</h1>
        <p className="text-gray-500 mt-1">Bienvenue dans l&apos;administration de Sirius Academy.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link href="/admin/formations" className="group">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-navy-900">{loading ? '—' : formations.length}</div>
            <div className="text-xs text-gray-500 mt-0.5">Formations</div>
          </div>
        </Link>

        <Link href="/admin/formations" className="group">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-navy-900">{loading ? '—' : ouvertes}</div>
            <div className="text-xs text-gray-500 mt-0.5">Inscriptions ouvertes</div>
          </div>
        </Link>

        <Link href="/admin/liste-attente" className="group">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-navy-900">{loading ? '—' : waitlist.length}</div>
            <div className="text-xs text-gray-500 mt-0.5">Prospects</div>
          </div>
        </Link>

        <Link href="/admin/blog" className="group">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-navy-900">{loading ? '—' : blog.length}</div>
            <div className="text-xs text-gray-500 mt-0.5">Articles de blog</div>
          </div>
        </Link>
      </div>

      {/* Main content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: formations list */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-navy-900">Formations</h2>
              <Link href="/admin/formations/nouvelle" className="inline-flex items-center gap-1.5 bg-navy-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-navy-800 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Nouvelle
              </Link>
            </div>
            {loading ? (
              <div className="p-4 space-y-2">
                {[1, 2, 3].map((i) => <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />)}
              </div>
            ) : formations.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-sm text-gray-400">Aucune formation</p>
                <Link href="/admin/formations/nouvelle" className="mt-2 inline-flex items-center gap-1 text-xs text-brand-green font-semibold hover:underline">
                  <Plus className="w-3 h-3" /> Créer la première
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {formations.map((f) => (
                  <div key={f.id} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-navy-900 truncate">{f.title}</p>
                      <p className="text-xs text-gray-400">{f.duration} · {f.level}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        f.status === 'ouvert' ? 'bg-emerald-100 text-emerald-700' :
                        f.status === 'bientot' ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {f.status === 'ouvert' ? 'Ouvert' : f.status === 'bientot' ? 'Bientôt' : 'Brouillon'}
                      </span>
                      <Link href={`/admin/formations/${f.slug}`} className="text-xs text-gray-400 hover:text-navy-900 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Blog preview */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-navy-900">Articles de blog</h2>
              <Link href="/admin/blog" className="text-xs text-brand-green font-semibold flex items-center gap-1 hover:underline">
                Voir tout <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {loading ? (
              <div className="p-4 space-y-2">
                {[1, 2, 3].map((i) => <div key={i} className="h-8 bg-gray-100 rounded-lg animate-pulse" />)}
              </div>
            ) : blog.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-sm text-gray-400">Aucun article</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {blog.slice(0, 4).map((post) => (
                  <div key={post.id} className="flex items-center gap-3 px-5 py-3">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${post.published !== false ? 'bg-brand-green' : 'bg-gray-300'}`} />
                    <p className="text-xs text-navy-900 font-medium truncate flex-1">{post.title}</p>
                    <span className="text-xs text-gray-400 shrink-0">{post.category}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Prospects preview */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h2 className="font-bold text-navy-900">Derniers prospects</h2>
                {lastUpdated && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    Mis à jour à {lastUpdated.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchProspects}
                  title="Actualiser"
                  className="text-gray-400 hover:text-navy-900 transition-colors p-1 rounded-lg hover:bg-gray-100"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <Link href="/admin/liste-attente" className="text-xs text-brand-green font-semibold flex items-center gap-1 hover:underline">
                  Voir tout <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
            {loading ? (
              <div className="p-4 space-y-2">
                {[1, 2, 3].map((i) => <div key={i} className="h-8 bg-gray-100 rounded-lg animate-pulse" />)}
              </div>
            ) : waitlist.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-sm text-gray-400">Aucun prospect</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {[...waitlist].reverse().slice(0, 5).map((entry, i) => (
                  <div key={i} className={`flex items-center gap-3 px-4 py-3 ${entry.status === 'nouveau' ? 'border-l-2 border-blue-500 bg-blue-50/30' : ''}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${entry.status === 'nouveau' ? 'bg-blue-100 text-blue-700' : 'bg-brand-green/10 text-brand-green'}`}>
                      {(entry.prenom?.[0] || '?')}{(entry.nom?.[0] || '?')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold text-navy-900 truncate">{entry.prenom} {entry.nom}</p>
                        {entry.status === 'nouveau' && (
                          <span className="shrink-0 text-[10px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded-full leading-none">NEW</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 truncate">{entry.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {waitlist.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                <Link href="/admin/liste-attente" className="flex items-center gap-1.5 text-xs text-brand-green font-semibold hover:underline">
                  <Mail className="w-3.5 h-3.5" />
                  Gérer les prospects ({waitlist.length})
                </Link>
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h2 className="font-bold text-navy-900 mb-3 text-sm">Actions rapides</h2>
            <div className="space-y-2">
              <Link href="/admin/formations/nouvelle" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-colors">
                <Plus className="w-4 h-4 shrink-0" />
                Nouvelle formation
              </Link>
              <Link href="/admin/blog/nouvel-article" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors">
                <Plus className="w-4 h-4 shrink-0" />
                Nouvel article
              </Link>
              <Link href="/admin/parametres" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors">
                <Settings className="w-4 h-4 shrink-0" />
                Paramètres du site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
