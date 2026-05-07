'use client'

import { useEffect, useState } from 'react'
import { Users, Mail, Phone, Copy, Check, Download, Filter, Trash2 } from 'lucide-react'

interface WaitlistEntry {
  formationSlug: string
  nom: string
  prenom: string
  email: string
  telephone: string
  statut: string
  createdAt: string
}

interface Formation {
  slug: string
  title: string
}

const STATUT_LABELS: Record<string, string> = {
  etudiant: 'Étudiant(e)',
  entrepreneur: 'Entrepreneur(e)',
  freelance: 'Freelance',
  salarie: 'Salarié(e)',
  reconversion: 'Reconversion',
  autre: 'Autre',
}

export default function ListeAttentePage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [formations, setFormations] = useState<Formation[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/api/waitlist').then(r => r.json()),
      fetch('/api/admin/formations').then(r => r.json()),
    ]).then(([w, f]) => {
      setEntries(w)
      setFormations(f)
      setLoading(false)
    })
  }, [])

  const filtered = filter === 'all' ? entries : entries.filter(e => e.formationSlug === filter)

  const copyEmails = () => {
    const emails = filtered.map(e => e.email).join(', ')
    navigator.clipboard.writeText(emails)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const exportCSV = () => {
    const header = 'Prénom,Nom,Email,Téléphone,Profil,Formation,Date'
    const rows = filtered.map(e =>
      `${e.prenom},${e.nom},${e.email},${e.telephone || ''},${STATUT_LABELS[e.statut] || e.statut},${e.formationSlug},${new Date(e.createdAt).toLocaleDateString('fr-FR')}`
    )
    const csv = [header, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'liste-attente.csv'
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Liste d&apos;attente</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {entries.length} demande{entries.length > 1 ? 's' : ''} reçue{entries.length > 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyEmails}
            disabled={filtered.length === 0}
            className="inline-flex items-center gap-2 text-sm font-semibold border border-gray-200 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-40"
          >
            {copied ? <Check className="w-4 h-4 text-brand-green" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copié !' : 'Copier les emails'}
          </button>
          <button
            onClick={exportCSV}
            disabled={filtered.length === 0}
            className="inline-flex items-center gap-2 text-sm font-semibold bg-navy-900 text-white px-3 py-2 rounded-xl hover:bg-navy-800 transition-colors disabled:opacity-40"
          >
            <Download className="w-4 h-4" />
            Exporter CSV
          </button>
        </div>
      </div>

      {/* Filter by formation */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <Filter className="w-4 h-4" />
            Filtrer :
          </div>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === 'all' ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Toutes ({entries.length})
          </button>
          {formations.filter(f => f.status === 'bientot').map((f: Formation & { status?: string }) => {
            const count = entries.filter(e => e.formationSlug === f.slug).length
            return (
              <button
                key={f.slug}
                onClick={() => setFilter(f.slug)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === f.slug ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {f.title} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="space-y-3">
            {[1,2,3,4].map(i => <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <Users className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="font-semibold text-gray-500">Aucune demande pour l&apos;instant</p>
          <p className="text-sm text-gray-400 mt-1">Les inscriptions sur liste d&apos;attente apparaîtront ici.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div className="col-span-3">Personne</div>
            <div className="col-span-3">Contact</div>
            <div className="col-span-2">Profil</div>
            <div className="col-span-3">Formation</div>
            <div className="col-span-1">Date</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-50">
            {filtered.map((entry, i) => {
              const formation = formations.find(f => f.slug === entry.formationSlug)
              return (
                <div key={i} className="grid grid-cols-12 gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors items-center">
                  <div className="col-span-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green font-bold text-xs shrink-0">
                        {entry.prenom[0]}{entry.nom[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy-900">{entry.prenom} {entry.nom}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <a href={`mailto:${entry.email}`} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-brand-green transition-colors">
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{entry.email}</span>
                    </a>
                    {entry.telephone && (
                      <a href={`https://wa.me/${entry.telephone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-green-600 transition-colors mt-0.5">
                        <Phone className="w-3 h-3 shrink-0" />
                        {entry.telephone}
                      </a>
                    )}
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      {STATUT_LABELS[entry.statut] || entry.statut || '—'}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <p className="text-sm text-gray-700 truncate">{formation?.title ?? entry.formationSlug}</p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-xs text-gray-400">
                      {new Date(entry.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <p className="text-xs text-gray-500">{filtered.length} entrée{filtered.length > 1 ? 's' : ''}</p>
            <button onClick={copyEmails} className="text-xs text-brand-green font-semibold flex items-center gap-1 hover:underline">
              <Mail className="w-3.5 h-3.5" />
              Copier tous les emails ({filtered.length})
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
