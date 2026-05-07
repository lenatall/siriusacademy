'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import {
  GraduationCap,
  FileText,
  Users,
  Plus,
  ArrowRight,
  Eye,
  Clock,
  Lock,
  CheckCircle2,
  Settings,
} from 'lucide-react'

interface Formation {
  id: string
  slug: string
  title: string
  status: string
  price: number
  monthlyPrice?: number
}

interface WaitlistEntry {
  formationSlug: string
  nom: string
  prenom: string
  email: string
  telephone: string
  statut: string
  createdAt: string
}

interface BlogPost {
  id: string
  slug: string
  title: string
  published: boolean
  createdAt?: string
}

export default function AdminDashboard() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([])
  const [blog, setBlog] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/formations').then((r) => r.json()),
      fetch('/api/waitlist').then((r) => r.json()),
      fetch('/api/admin/blog').then((r) => r.json()),
    ]).then(([f, w, b]) => {
      setFormations(f)
      setWaitlist(w)
      setBlog(b)
      setLoading(false)
    })
  }, [])

  const ouvertes = formations.filter((f) => f.status === 'ouvert').length
  const bientot = formations.filter((f) => f.status === 'bientot').length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Tableau de bord</h1>
          <p className="text-gray-500 mt-1 text-sm">Bienvenue dans l&apos;administration de Sirius Academy.</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold border border-gray-200 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Voir le site
          </a>
          <Link
            href="/admin/formations/nouvelle"
            className="inline-flex items-center gap-2 text-sm font-semibold bg-navy-900 text-white px-3 py-2 rounded-xl hover:bg-navy-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nouvelle formation
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
            <div className="text-xs text-gray-500 mt-0.5">Liste d&apos;attente</div>
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Formations overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-navy-900">Formations</h2>
            <Link href="/admin/formations" className="text-xs text-brand-green font-semibold flex items-center gap-1 hover:underline">
              Gérer <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {loading ? (
            <div className="p-5 space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" />)}
            </div>
          ) : formations.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-gray-400">Aucune formation</p>
              <Link href="/admin/formations/nouvelle" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green hover:underline">
                <Plus className="w-4 h-4" /> Créer une formation
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {formations.map((f) => (
                <div key={f.id} className="flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${f.status === 'ouvert' ? 'bg-brand-green' : 'bg-amber-400'}`} />
                    <p className="text-sm font-medium text-navy-900 truncate">{f.title}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${f.status === 'ouvert' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {f.status === 'ouvert' ? (
                        <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Ouvert</span>
                      ) : (
                        <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Bientôt</span>
                      )}
                    </span>
                    <span className="text-xs text-gray-400">
                      {f.monthlyPrice ? `${f.monthlyPrice.toLocaleString('fr-FR')} FCFA/mois` : `${f.price.toLocaleString('fr-FR')} FCFA`}
                    </span>
                    <Link href={`/admin/formations/${f.slug}`} className="text-xs text-gray-400 hover:text-brand-green transition-colors">
                      Modifier
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-green" />{ouvertes} ouvert{ouvertes > 1 ? 'es' : ''}</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" />{bientot} bientôt</span>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Waitlist preview */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-navy-900">Liste d&apos;attente</h2>
              <Link href="/admin/liste-attente" className="text-xs text-brand-green font-semibold flex items-center gap-1 hover:underline">
                Voir tout <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {loading ? (
              <div className="p-4 space-y-2">
                {[1,2,3].map(i => <div key={i} className="h-8 bg-gray-100 rounded-lg animate-pulse" />)}
              </div>
            ) : waitlist.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-sm text-gray-400">Aucune demande</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {waitlist.slice(-5).reverse().map((entry, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3">
                    <div className="w-7 h-7 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green font-bold text-xs shrink-0">
                      {entry.prenom[0]}{entry.nom[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-navy-900 truncate">{entry.prenom} {entry.nom}</p>
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
                  Copier les emails ({waitlist.length})
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

          {/* Blog preview */}
          {blog.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 className="font-bold text-navy-900">Blog récent</h2>
                <Link href="/admin/blog" className="text-xs text-brand-green font-semibold flex items-center gap-1 hover:underline">
                  Voir tout <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="divide-y divide-gray-50">
                {blog.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex items-center gap-3 px-4 py-3">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${post.published ? 'bg-brand-green' : 'bg-gray-300'}`} />
                    <p className="text-xs text-navy-900 font-medium truncate">{post.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
