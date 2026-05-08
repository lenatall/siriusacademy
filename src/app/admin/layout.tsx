'use client'

// Admin layout — navigation sidebar with auth guard
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Star,
  LayoutDashboard,
  GraduationCap,
  FileText,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Users,
  Settings,
} from 'lucide-react'

const navItems = [
  {
    label: 'Tableau de bord',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Formations',
    icon: GraduationCap,
    children: [
      { label: 'Toutes les formations', href: '/admin/formations' },
      { label: '+ Nouvelle formation', href: '/admin/formations/nouvelle' },
    ],
  },
  {
    label: 'Prospects & inscriptions',
    href: '/admin/liste-attente',
    icon: Users,
  },
  {
    label: 'Blog',
    icon: FileText,
    children: [
      { label: 'Tous les articles', href: '/admin/blog' },
      { label: '+ Nouvel article', href: '/admin/blog/nouvel-article' },
    ],
  },
  {
    label: 'Paramètres',
    href: '/admin/parametres',
    icon: Settings,
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checked, setChecked] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openSections, setOpenSections] = useState<string[]>(['Formations', 'Blog'])
  const [newProspects, setNewProspects] = useState(0)
  const [logoUrl, setLogoUrl] = useState<string | undefined>()
  const [siteName, setSiteName] = useState('Sirius Academy')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((s) => {
        if (s.logoUrl) setLogoUrl(s.logoUrl)
        if (s.siteName) setSiteName(s.siteName)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const fetchCount = () => {
      fetch('/api/prospects')
        .then((r) => r.json())
        .then((data: Array<{ status: string }>) => {
          if (Array.isArray(data)) {
            setNewProspects(data.filter((p) => p.status === 'nouveau').length)
          }
        })
        .catch(() => {})
    }
    fetchCount()
    const interval = setInterval(fetchCount, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (pathname === '/admin/login') { setChecked(true); return }
    const auth = localStorage.getItem('admin_auth')
    if (auth !== 'true') {
      router.push('/admin/login')
    } else {
      setChecked(true)
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    router.push('/admin/login')
  }

  const toggleSection = (label: string) => {
    setOpenSections((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    )
  }

  if (!checked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-navy-900 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (pathname === '/admin/login') return <>{children}</>

  const LogoBlock = ({ small = false }: { small?: boolean }) => (
    logoUrl ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt={siteName}
        className={`${small ? 'h-7' : 'h-8'} w-auto object-contain brightness-0 invert`}
      />
    ) : (
      <>
        <div className={`${small ? 'w-7 h-7' : 'w-8 h-8'} bg-brand-yellow rounded-lg flex items-center justify-center shrink-0`}>
          <Star className={`${small ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-navy-900 fill-current`} />
        </div>
        <div className="leading-none">
          <p className={`text-white font-bold ${small ? 'text-xs' : 'text-sm'}`}>{siteName}</p>
          {!small && <p className="text-slate-400 text-xs">Administration</p>}
        </div>
      </>
    )
  )

  const Sidebar = () => (
    <aside className="w-64 bg-navy-950 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2.5">
          <LogoBlock />
          {logoUrl && (
            <div className="leading-none ml-1">
              <p className="text-slate-400 text-xs">Administration</p>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          if (!item.children) {
            const active = pathname === item.href
            const isProspects = item.href === '/admin/liste-attente'
            return (
              <Link
                key={item.href}
                href={item.href!}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'text-white bg-white/10 border-r-2 border-brand-green'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {isProspects && newProspects > 0 && (
                  <span className="shrink-0 min-w-[20px] h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5 leading-none">
                    {newProspects > 99 ? '99+' : newProspects}
                  </span>
                )}
              </Link>
            )
          }

          const isOpen = openSections.includes(item.label)
          const hasActive = item.children.some((c) => pathname === c.href || pathname.startsWith(c.href.replace('/nouvelle', '').replace('/nouveau', '').replace('/nouvel-article', '')))

          return (
            <div key={item.label}>
              <button
                onClick={() => toggleSection(item.label)}
                className={`w-full flex items-center justify-between gap-3 px-5 py-2.5 text-sm font-medium transition-colors ${
                  hasActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.label}
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="ml-9 border-l border-white/10 pl-3 pb-1">
                  {item.children.map((child) => {
                    const active = pathname === child.href
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`block py-1.5 px-2 text-xs font-medium rounded-lg transition-colors ${
                          active
                            ? 'text-brand-green bg-white/5'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {child.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-4 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Voir le site public
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-red-400 transition-colors w-full"
        >
          <LogOut className="w-3.5 h-3.5" />
          Déconnexion
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:block shrink-0">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden bg-navy-950 px-4 py-3 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <LogoBlock small />
            {logoUrl && <span className="text-white font-bold text-sm ml-1">Admin</span>}
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white p-1">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
