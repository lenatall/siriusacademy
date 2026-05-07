'use client'

import { useEffect, useState } from 'react'
import { Users, Mail, Phone, Copy, Check, Download, Filter, MessageSquare, X, Search, Trash2, ChevronDown } from 'lucide-react'

type ProspectSource = 'inscription' | 'pdf' | 'contact' | 'liste-attente'
type ProspectStatus = 'nouveau' | 'contacte' | 'interesse' | 'attente-paiement' | 'inscrit' | 'relancer' | 'non-interesse'

interface Prospect {
  id: string
  nom: string
  prenom: string
  email: string
  telephone?: string
  formationSlug?: string
  source: ProspectSource
  status: ProspectStatus
  note?: string
  message?: string
  statut?: string
  createdAt: string
}

interface Formation {
  slug: string
  title: string
}

const SOURCE_LABELS: Record<string, string> = {
  inscription: 'Inscription',
  pdf: 'Programme PDF',
  contact: 'Contact',
  'liste-attente': "Liste d'attente",
}

const SOURCE_COLORS: Record<string, string> = {
  inscription: 'bg-emerald-100 text-emerald-700',
  pdf: 'bg-blue-100 text-blue-700',
  contact: 'bg-purple-100 text-purple-700',
  'liste-attente': 'bg-amber-100 text-amber-700',
}

const STATUT_LABELS: Record<string, string> = {
  etudiant: 'Étudiant(e)',
  entrepreneur: 'Entrepreneur(e)',
  freelance: 'Freelance',
  salarie: 'Salarié(e)',
  reconversion: 'Reconversion',
  autre: 'Autre',
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  nouveau: { label: 'Nouveau', color: 'bg-blue-100 text-blue-700' },
  contacte: { label: 'Contacté', color: 'bg-indigo-100 text-indigo-700' },
  interesse: { label: 'Intéressé', color: 'bg-emerald-100 text-emerald-700' },
  'attente-paiement': { label: 'En attente paiement', color: 'bg-amber-100 text-amber-700' },
  inscrit: { label: 'Inscrit ✓', color: 'bg-green-600 text-white' },
  relancer: { label: 'À relancer', color: 'bg-orange-100 text-orange-700' },
  'non-interesse': { label: 'Non intéressé', color: 'bg-red-100 text-red-600' },
}

export default function ProspectsPage() {
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [formations, setFormations] = useState<Formation[]>([])
  const [filterSource, setFilterSource] = useState('all')
  const [filterFormation, setFilterFormation] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [noteModal, setNoteModal] = useState<{ id: string; note: string; name: string } | null>(null)
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/prospects').then((r) => r.json()),
      fetch('/api/admin/formations').then((r) => r.json()),
    ]).then(([p, f]) => {
      setProspects(Array.isArray(p) ? p : [])
      setFormations(Array.isArray(f) ? f : [])
      setLoading(false)
    })
  }, [])

  const filtered = prospects
    .filter((p) => filterSource === 'all' || p.source === filterSource)
    .filter((p) => filterFormation === 'all' || p.formationSlug === filterFormation)
    .filter((p) => filterStatus === 'all' || p.status === filterStatus)
    .filter((p) => {
      if (!search) return true
      const q = search.toLowerCase()
      return (
        (p.nom || '').toLowerCase().includes(q) ||
        (p.prenom || '').toLowerCase().includes(q) ||
        (p.email || '').toLowerCase().includes(q) ||
        (p.telephone || '').includes(q)
      )
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const updateStatus = async (id: string, status: ProspectStatus) => {
    const res = await fetch(`/api/prospects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      setProspects((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))
    }
  }

  const saveNote = async () => {
    if (!noteModal) return
    const res = await fetch(`/api/prospects/${noteModal.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note: noteModal.note }),
    })
    if (res.ok) {
      setProspects((prev) =>
        prev.map((p) => (p.id === noteModal.id ? { ...p, note: noteModal.note } : p))
      )
      setNoteModal(null)
    }
  }

  const deleteProspect = async (id: string) => {
    if (!confirm('Supprimer ce prospect définitivement ?')) return
    const res = await fetch(`/api/prospects/${id}`, { method: 'DELETE' })
    if (res.ok) setProspects((prev) => prev.filter((p) => p.id !== id))
  }

  const copyEmails = () => {
    const emails = filtered.map((p) => p.email).join(', ')
    navigator.clipboard.writeText(emails)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const exportCSV = () => {
    const header = 'Prénom,Nom,Email,Téléphone,Formation,Source,Statut,Profil,Date,Note,Message'
    const rows = filtered.map((p) => {
      const formation = formations.find((f) => f.slug === p.formationSlug)
      return [
        p.prenom, p.nom, p.email, p.telephone || '',
        formation?.title || p.formationSlug || '',
        SOURCE_LABELS[p.source] || p.source,
        STATUS_CONFIG[p.status]?.label || p.status,
        STATUT_LABELS[p.statut || ''] || p.statut || '',
        new Date(p.createdAt).toLocaleDateString('fr-FR'),
        (p.note || '').replace(/,/g, ';'),
        (p.message || '').replace(/,/g, ';').replace(/\n/g, ' '),
      ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')
    })
    const csv = [header, ...rows].join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'prospects-sirius.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const statsByStatus = Object.keys(STATUS_CONFIG).reduce(
    (acc, key) => ({ ...acc, [key]: prospects.filter((p) => p.status === key).length }),
    {} as Record<string, number>
  )

  const hasFilters = filterSource !== 'all' || filterFormation !== 'all' || filterStatus !== 'all' || search

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Prospects & inscriptions</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {prospects.length} prospect{prospects.length > 1 ? 's' : ''} au total
            {hasFilters ? ` · ${filtered.length} affiché${filtered.length > 1 ? 's' : ''}` : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyEmails}
            disabled={filtered.length === 0}
            className="inline-flex items-center gap-2 text-sm font-semibold border border-gray-200 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-40"
          >
            {copied ? <Check className="w-4 h-4 text-brand-green" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copié !' : 'Copier emails'}
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

      {/* Stats statuts cliquables */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {Object.entries(STATUS_CONFIG).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setFilterStatus(filterStatus === key ? 'all' : key)}
            className={`px-3 py-2.5 rounded-xl text-left transition-all border-2 ${
              filterStatus === key ? 'border-navy-900 shadow-md scale-[1.02]' : 'border-transparent'
            } ${config.color}`}
          >
            <div className="text-2xl font-black leading-none mb-1">{statsByStatus[key] || 0}</div>
            <div className="text-xs font-medium opacity-80 leading-tight">{config.label}</div>
          </button>
        ))}
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 shrink-0">
            <Filter className="w-4 h-4" />
            Filtrer :
          </div>
          <div className="relative flex-1 min-w-48">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nom, email, téléphone..."
              className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-colors"
            />
          </div>
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-900/20 transition-colors"
          >
            <option value="all">Toutes sources</option>
            {Object.entries(SOURCE_LABELS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
          <select
            value={filterFormation}
            onChange={(e) => setFilterFormation(e.target.value)}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-900/20 transition-colors"
          >
            <option value="all">Toutes formations</option>
            {formations.map((f) => (
              <option key={f.slug} value={f.slug}>{f.title}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-900/20 transition-colors"
          >
            <option value="all">Tous statuts</option>
            {Object.entries(STATUS_CONFIG).map(([v, c]) => (
              <option key={v} value={v}>{c.label}</option>
            ))}
          </select>
          {hasFilters && (
            <button
              onClick={() => { setFilterSource('all'); setFilterFormation('all'); setFilterStatus('all'); setSearch('') }}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline"
            >
              Effacer filtres
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <Users className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="font-semibold text-gray-500">Aucun prospect</p>
          <p className="text-sm text-gray-400 mt-1">
            {hasFilters ? 'Aucun résultat pour ces filtres.' : 'Les demandes apparaîtront ici automatiquement.'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="hidden lg:grid grid-cols-12 gap-3 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div className="col-span-3">Personne</div>
            <div className="col-span-2">Contact</div>
            <div className="col-span-2">Formation</div>
            <div className="col-span-1">Source</div>
            <div className="col-span-2">Statut</div>
            <div className="col-span-1">Date</div>
            <div className="col-span-1">Actions</div>
          </div>

          <div className="divide-y divide-gray-50">
            {filtered.map((prospect) => {
              const formation = formations.find((f) => f.slug === prospect.formationSlug)
              const statusCfg = STATUS_CONFIG[prospect.status] || STATUS_CONFIG.nouveau
              const isExpanded = expandedRow === prospect.id

              return (
                <div key={prospect.id}>
                  <div className="grid grid-cols-12 gap-3 px-5 py-4 hover:bg-gray-50/50 transition-colors items-center">
                    <div className="col-span-12 lg:col-span-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-navy-50 border border-navy-100 flex items-center justify-center text-navy-700 font-bold text-xs shrink-0">
                          {(prospect.prenom || '?')[0]}{(prospect.nom || '?')[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-navy-900 truncate">
                            {prospect.prenom} {prospect.nom}
                          </p>
                          {prospect.statut && (
                            <p className="text-xs text-gray-400">{STATUT_LABELS[prospect.statut] || prospect.statut}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 hidden lg:block">
                      <a href={`mailto:${prospect.email}`} className="flex items-center gap-1 text-xs text-gray-600 hover:text-brand-green transition-colors">
                        <Mail className="w-3 h-3 shrink-0" />
                        <span className="truncate">{prospect.email}</span>
                      </a>
                      {prospect.telephone && (
                        <a href={`https://wa.me/${prospect.telephone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gray-400 hover:text-green-600 transition-colors mt-0.5">
                          <Phone className="w-3 h-3 shrink-0" />
                          {prospect.telephone}
                        </a>
                      )}
                    </div>

                    <div className="col-span-2 hidden lg:block">
                      <p className="text-xs text-gray-600 truncate">
                        {formation?.title || prospect.formationSlug || '—'}
                      </p>
                    </div>

                    <div className="col-span-1 hidden lg:block">
                      <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full leading-tight ${SOURCE_COLORS[prospect.source] || 'bg-gray-100 text-gray-600'}`}>
                        {SOURCE_LABELS[prospect.source] || prospect.source}
                      </span>
                    </div>

                    <div className="col-span-12 lg:col-span-2">
                      <select
                        value={prospect.status}
                        onChange={(e) => updateStatus(prospect.id, e.target.value as ProspectStatus)}
                        className={`text-xs font-semibold px-2 py-1.5 rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-navy-900/20 transition-colors w-full ${statusCfg.color}`}
                      >
                        {Object.entries(STATUS_CONFIG).map(([v, c]) => (
                          <option key={v} value={v}>{c.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-1 hidden lg:block">
                      <p className="text-xs text-gray-400">
                        {new Date(prospect.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                      </p>
                    </div>

                    <div className="col-span-1 hidden lg:flex items-center gap-1">
                      <button
                        onClick={() => setNoteModal({ id: prospect.id, note: prospect.note || '', name: `${prospect.prenom} ${prospect.nom}` })}
                        className={`p-1.5 rounded-lg transition-colors ${prospect.note ? 'text-amber-600 bg-amber-50' : 'text-gray-300 hover:text-gray-500 hover:bg-gray-100'}`}
                        title={prospect.note ? 'Modifier la note' : 'Ajouter une note'}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setExpandedRow(isExpanded ? null : prospect.id)}
                        className="p-1.5 rounded-lg text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-colors"
                        title="Détails"
                      >
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-4 bg-blue-50/30 border-t border-gray-100">
                      <div className="grid sm:grid-cols-3 gap-4 pt-3 text-xs">
                        <div>
                          <p className="font-semibold text-gray-500 mb-1.5">Contact complet</p>
                          <a href={`mailto:${prospect.email}`} className="block text-gray-700 hover:text-brand-green">{prospect.email}</a>
                          {prospect.telephone && (
                            <a href={`https://wa.me/${prospect.telephone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="block text-gray-600 hover:text-green-600 mt-0.5">
                              WhatsApp : {prospect.telephone}
                            </a>
                          )}
                          <p className="text-gray-400 mt-1">
                            {new Date(prospect.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                        {prospect.message && (
                          <div className="sm:col-span-2">
                            <p className="font-semibold text-gray-500 mb-1.5">Message</p>
                            <p className="text-gray-700 whitespace-pre-line bg-white rounded-lg p-3 border border-gray-100">{prospect.message}</p>
                          </div>
                        )}
                        {prospect.note && (
                          <div className="sm:col-span-3">
                            <p className="font-semibold text-amber-600 mb-1.5">Note interne</p>
                            <p className="text-gray-700 whitespace-pre-line bg-amber-50 rounded-lg p-3 border border-amber-100">{prospect.note}</p>
                          </div>
                        )}
                        <div className="sm:col-span-3 flex items-center gap-2 pt-2 border-t border-gray-200">
                          <button
                            onClick={() => setNoteModal({ id: prospect.id, note: prospect.note || '', name: `${prospect.prenom} ${prospect.nom}` })}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            {prospect.note ? 'Modifier la note' : 'Ajouter une note'}
                          </button>
                          <button
                            onClick={() => deleteProspect(prospect.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <p className="text-xs text-gray-500">{filtered.length} prospect{filtered.length > 1 ? 's' : ''}</p>
            <button onClick={copyEmails} className="text-xs text-brand-green font-semibold flex items-center gap-1 hover:underline">
              <Mail className="w-3.5 h-3.5" />
              Copier les emails ({filtered.length})
            </button>
          </div>
        </div>
      )}

      {noteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setNoteModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-navy-900">Note interne</h3>
                <p className="text-xs text-gray-500 mt-0.5">{noteModal.name}</p>
              </div>
              <button onClick={() => setNoteModal(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <textarea
                value={noteModal.note}
                onChange={(e) => setNoteModal({ ...noteModal, note: e.target.value })}
                rows={5}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-colors resize-none"
                placeholder="Suivi, date de contact, remarques, rendez-vous..."
                autoFocus
              />
              <div className="flex items-center justify-end gap-3">
                <button onClick={() => setNoteModal(null)} className="text-sm text-gray-500 hover:text-gray-700 font-medium">Annuler</button>
                <button onClick={saveNote} className="inline-flex items-center gap-2 bg-navy-900 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-navy-800 transition-colors">
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
