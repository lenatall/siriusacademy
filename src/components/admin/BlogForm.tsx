'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import type { BlogPost } from '@/types'
import Link from 'next/link'

const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

interface Props {
  initial?: Partial<BlogPost>
  mode: 'create' | 'edit'
}

const CATEGORIES = ['Conseils', 'Développement', 'Design', 'Marketing', 'Actualités'] as const

export default function BlogForm({ initial = {}, mode }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({
    title: initial.title ?? '',
    excerpt: initial.excerpt ?? '',
    content: initial.content ?? '',
    image: initial.image ?? '',
    publishedAt: initial.publishedAt ?? today,
    readTime: initial.readTime ?? 5,
    category: initial.category ?? 'Conseils',
    tags: initial.tags?.join(', ') ?? '',
    authorName: initial.author?.name ?? 'Léna Badiane',
    authorTitle: initial.author?.title ?? 'Fondatrice — Sirius Academy',
    authorAvatar: initial.author?.avatar ?? 'https://ui-avatars.com/api/?name=Lena+Badiane&background=F59E0B&color=0B1F3A&size=200',
    slug: initial.slug ?? '',
    metaTitle: initial.metaTitle ?? '',
    metaDescription: initial.metaDescription ?? '',
    isFeatured: initial.isFeatured ?? false,
    published: initial.published !== false,
  })

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: mode === 'create' ? slugify(title) : f.slug,
    }))
  }

  const renderMarkdown = (text: string) =>
    text
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-navy-900 mt-6 mb-3">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-navy-900 mt-4 mb-2">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-gray-600">$1</li>')
      .replace(/\n\n/g, '</p><p class="text-gray-600 mb-3">')
      .replace(/^/, '<p class="text-gray-600 mb-3">')
      .replace(/$/, '</p>')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      ...form,
      readTime: Number(form.readTime),
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      author: {
        name: form.authorName,
        title: form.authorTitle,
        avatar: form.authorAvatar,
      },
      slug: form.slug || slugify(form.title),
      metaTitle: form.metaTitle || undefined,
      metaDescription: form.metaDescription || undefined,
      isFeatured: form.isFeatured,
      published: form.published,
    }

    try {
      const url = mode === 'create' ? '/api/admin/blog' : `/api/admin/blog/${initial.slug}`
      const res = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setSuccess(true)
        setTimeout(() => router.push('/admin/blog'), 1200)
      } else {
        setError('Erreur lors de la sauvegarde')
      }
    } catch {
      setError('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy-900 mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au blog
          </Link>
          <h1 className="text-2xl font-black text-navy-900">
            {mode === 'create' ? 'Nouvel article' : `Modifier : ${initial.title}`}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 hover:border-gray-300 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
          >
            {preview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {preview ? 'Éditeur' : 'Prévisualiser'}
          </button>
          <button type="submit" disabled={loading} className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-70">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {loading ? 'Sauvegarde...' : 'Publier'}
          </button>
        </div>
      </div>

      {success && <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-4 py-3 rounded-xl font-medium">✓ Article sauvegardé ! Redirection...</div>}
      {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Editor / Preview */}
        <div className="lg:col-span-2 space-y-5">
          {!preview ? (
            <>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h2 className="font-bold text-navy-900 border-b border-gray-100 pb-3">Contenu</h2>
                <div>
                  <label className="label">Titre de l&apos;article *</label>
                  <input type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className="input text-lg font-semibold" placeholder="Comment choisir sa formation en 2025 ?" required />
                </div>
                <div>
                  <label className="label">Chapô (résumé court) *</label>
                  <textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="input resize-none" placeholder="Un résumé accrocheur de 1 à 2 phrases pour la card..." required />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="label mb-0">Corps de l&apos;article *</label>
                    <span className="text-xs text-gray-400">Markdown supporté</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-3 mb-2 text-xs text-gray-500 flex flex-wrap gap-3">
                    {[['## Titre', 'H2'], ['**gras**', 'Gras'], ['*italique*', 'Italique'], ['- item', 'Liste']].map(([syntax, label]) => (
                      <span key={label}><code className="bg-white border border-gray-200 px-1.5 py-0.5 rounded text-xs">{syntax}</code> <span className="text-gray-400">→ {label}</span></span>
                    ))}
                  </div>
                  <textarea
                    rows={18}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="input resize-y font-mono text-sm leading-relaxed"
                    placeholder={`## Introduction\n\nCommencez à rédiger votre article ici...\n\n## Section 1\n\nVotre contenu...\n\n- Point 1\n- Point 2`}
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">{form.content.split(' ').filter(Boolean).length} mots · environ {Math.ceil(form.content.split(' ').filter(Boolean).length / 200)} min de lecture</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <div className="mb-2">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">{form.category}</span>
              </div>
              <h1 className="text-3xl font-black text-navy-900 mb-4">{form.title || 'Titre de l\'article'}</h1>
              <p className="text-gray-500 text-lg mb-6 italic">{form.excerpt || 'Chapô de l\'article...'}</p>
              <div className="border-t border-gray-100 pt-6">
                <div
                  className="prose-custom"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(form.content || '*Commencez à rédiger...*') }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-navy-900 text-sm border-b border-gray-100 pb-3">Publication</h2>

            {/* Published toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
              <div>
                <p className="text-sm font-semibold text-gray-700">{form.published ? 'Publié' : 'Brouillon'}</p>
                <p className="text-xs text-gray-400">{form.published ? 'Visible sur le site' : 'Non visible sur le site'}</p>
              </div>
              <button
                type="button"
                onClick={() => setForm({ ...form, published: !form.published })}
                className={`relative w-11 h-6 rounded-full transition-colors ${form.published ? 'bg-brand-green' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${form.published ? 'left-5.5 translate-x-0.5' : 'left-0.5'}`} />
              </button>
            </div>

            <div>
              <label className="label">Catégorie</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Date de publication</label>
              <input type="date" value={form.publishedAt} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} className="input" />
            </div>
            <div>
              <label className="label">Temps de lecture (min)</label>
              <input type="number" value={form.readTime} onChange={(e) => setForm({ ...form, readTime: Number(e.target.value) })} className="input" min={1} />
            </div>
            <div>
              <label className="label">Tags</label>
              <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="input" placeholder="SEO, Marketing, Conseils" />
              <p className="text-xs text-gray-400 mt-1">Séparés par des virgules</p>
            </div>
            <div>
              <label className="label">Slug (URL)</label>
              <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} className="input font-mono text-xs" placeholder="mon-article" />
              <p className="text-xs text-gray-400 mt-1">/blog/{form.slug || 'slug-auto'}</p>
            </div>
            {/* Article mis en avant */}
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="sr-only" />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${form.isFeatured ? 'bg-brand-green border-brand-green' : 'border-gray-300'}`}>
                  {form.isFeatured && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700">Article mis en avant</span>
            </label>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-navy-900 text-sm border-b border-gray-100 pb-3">SEO</h2>
            <div>
              <label className="label">Méta titre</label>
              <input type="text" value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} className="input" placeholder={form.title || 'Titre pour les moteurs de recherche'} />
              <p className="text-xs text-gray-400 mt-1">{form.metaTitle.length}/60 caractères recommandés</p>
            </div>
            <div>
              <label className="label">Méta description</label>
              <textarea rows={3} value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} className="input resize-none" placeholder={form.excerpt || 'Description pour les moteurs de recherche (150-160 caractères)'} />
              <p className="text-xs text-gray-400 mt-1">{form.metaDescription.length}/155 caractères recommandés</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-navy-900 text-sm border-b border-gray-100 pb-3">Image & Auteur</h2>
            <div>
              <label className="label">URL image de couverture</label>
              <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input" placeholder="https://images.unsplash.com/..." />
            </div>
            {form.image && (
              <div className="relative h-24 rounded-xl overflow-hidden bg-gray-100">
                <img src={form.image} alt="preview" className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <label className="label">Nom de l&apos;auteur</label>
              <input type="text" value={form.authorName} onChange={(e) => setForm({ ...form, authorName: e.target.value })} className="input" />
            </div>
            <div>
              <label className="label">Titre de l&apos;auteur</label>
              <input type="text" value={form.authorTitle} onChange={(e) => setForm({ ...form, authorTitle: e.target.value })} className="input" />
            </div>
            <div>
              <label className="label">Avatar URL</label>
              <input type="url" value={form.authorAvatar} onChange={(e) => setForm({ ...form, authorAvatar: e.target.value })} className="input" placeholder="https://ui-avatars.com/..." />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
