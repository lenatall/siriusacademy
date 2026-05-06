'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  BookOpen,
  FileText,
  Users,
  TrendingUp,
  Plus,
  ArrowRight,
  Eye,
} from 'lucide-react'

interface Stats {
  formations: number
  cours: number
  articles: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ formations: 0, cours: 0, articles: 0 })

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/formations').then((r) => r.json()),
      fetch('/api/admin/cours').then((r) => r.json()),
      fetch('/api/admin/blog').then((r) => r.json()),
    ]).then(([formations, cours, blog]) => {
      setStats({ formations: formations.length, cours: cours.length, articles: blog.length })
    })
  }, [])

  const statCards = [
    {
      icon: GraduationCap,
      label: 'Formations payantes',
      value: stats.formations,
      color: 'bg-blue-50 text-blue-600',
      href: '/admin/formations',
    },
    {
      icon: BookOpen,
      label: 'Cours gratuits',
      value: stats.cours,
      color: 'bg-emerald-50 text-emerald-600',
      href: '/admin/cours',
    },
    {
      icon: FileText,
      label: 'Articles de blog',
      value: stats.articles,
      color: 'bg-amber-50 text-amber-600',
      href: '/admin/blog',
    },
    {
      icon: Users,
      label: 'Apprenants (simulé)',
      value: '3 075',
      color: 'bg-purple-50 text-purple-600',
      href: '#',
    },
  ]

  const quickActions = [
    {
      label: 'Nouvelle formation payante',
      href: '/admin/formations/nouvelle',
      color: 'bg-navy-900 hover:bg-navy-800 text-white',
      icon: Plus,
    },
    {
      label: 'Nouveau cours gratuit',
      href: '/admin/cours/nouveau',
      color: 'bg-brand-green hover:bg-brand-green-dark text-white',
      icon: Plus,
    },
    {
      label: 'Nouvel article de blog',
      href: '/admin/blog/nouvel-article',
      color: 'bg-amber-500 hover:bg-amber-600 text-white',
      icon: Plus,
    },
    {
      label: 'Voir le site public',
      href: '/',
      color: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
      icon: Eye,
      target: '_blank',
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-navy-900">Tableau de bord</h1>
        <p className="text-gray-500 mt-1">Bienvenue dans l&apos;administration de Sirius Academy.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link key={card.label} href={card.href} className="group">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                <div
                  className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-3`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-navy-900">{card.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{card.label}</div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="font-bold text-navy-900 mb-4">Actions rapides</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.label}
                href={action.href}
                target={(action as { target?: string }).target}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${action.color}`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {action.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Links */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            title: 'Gérer les formations',
            desc: 'Ajouter, modifier ou supprimer des formations payantes.',
            href: '/admin/formations',
            color: 'border-blue-200',
          },
          {
            title: 'Gérer les cours gratuits',
            desc: 'Publier ou modifier des cours accessibles gratuitement.',
            href: '/admin/cours',
            color: 'border-emerald-200',
          },
          {
            title: 'Gérer le blog',
            desc: 'Rédiger et publier des articles de blog avec Markdown.',
            href: '/admin/blog',
            color: 'border-amber-200',
          },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="group">
            <div
              className={`bg-white rounded-2xl border-2 ${item.color} shadow-sm p-5 hover:shadow-md transition-shadow h-full`}
            >
              <h3 className="font-bold text-navy-900 mb-1 group-hover:text-brand-green transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{item.desc}</p>
              <div className="flex items-center gap-1 text-xs font-semibold text-brand-green">
                Accéder <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
