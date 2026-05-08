import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube, Instagram, MessageCircle } from 'lucide-react'
import { store } from '@/lib/store'
import SiteLogo from './SiteLogo'

const footerLinks = {
  formations: [
    { label: 'Développement Web Full-Stack', href: '/formations/developpement-web-full-stack' },
    { label: 'Marketing Digital & SEO', href: '/formations/marketing-digital-seo' },
    { label: 'Design UX/UI', href: '/formations/design-ux-ui' },
    { label: 'Data Science & IA', href: '/formations/data-science-ia' },
  ],
  ressources: [
    { label: 'Blog', href: '/blog' },
    { label: 'À Propos', href: '/a-propos' },
  ],
  support: [
    { label: 'Contact', href: '/contact' },
    { label: "S'inscrire", href: '/inscription' },
    { label: 'FAQ', href: '/contact#faq' },
  ],
}

const legalLinks = ['Mentions légales', 'CGV', 'Politique de confidentialité', 'Cookies']

interface FooterProps {
  logoUrl?: string
  siteName?: string
}

export default function Footer({ logoUrl, siteName }: FooterProps) {
  const settings = store.settings.get()

  const socialLinks = [
    { icon: Linkedin, href: settings.socialLinkedin || '#', label: 'LinkedIn' },
    { icon: Twitter, href: settings.socialTwitter || '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Instagram, href: settings.socialInstagram || '#', label: 'Instagram' },
  ]

  return (
    <footer className="bg-navy-950 text-slate-300">

      {/* ── WhatsApp CTA Banner ──────────────────────────────── */}
      <div className="bg-brand-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-snug">
                  Vous avez une question ?
                </p>
                <p className="text-emerald-100 text-sm">
                  Notre équipe répond sur WhatsApp, souvent en quelques minutes.
                </p>
              </div>
            </div>
            <a
              href={settings.whatsappLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-brand-green font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" />
              Écrire sur WhatsApp →
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Footer ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex mb-5 group">
              <SiteLogo logoUrl={logoUrl} siteName={siteName ?? settings.siteName} />
            </Link>

            <p className="text-sm leading-relaxed text-slate-400 mb-6 max-w-sm">
              {settings.siteDescription || "Sirius Academy est une académie digitale basée au Sénégal. Nous vous aidons à construire des compétences concrètes, visibles et utiles grâce à un accompagnement personnalisé en petits groupes."}
            </p>

            {/* Contact info */}
            <ul className="space-y-3 text-sm mb-7">
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="w-4 h-4 text-brand-green shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-brand-green transition-colors">
                  {settings.contactEmail}
                </a>
              </li>
              {settings.contactPhone && (
                <li className="flex items-center gap-3 text-slate-400">
                  <Phone className="w-4 h-4 text-brand-green shrink-0" />
                  <a href={`tel:${settings.contactPhone.replace(/\s/g, '')}`} className="hover:text-brand-green transition-colors">
                    {settings.contactPhone}
                  </a>
                </li>
              )}
              {settings.contactAddress && (
                <li className="flex items-center gap-3 text-slate-400">
                  <MapPin className="w-4 h-4 text-brand-green shrink-0" />
                  <span>{settings.contactAddress}</span>
                </li>
              )}
            </ul>

            {/* Social icons */}
            <div className="grid grid-cols-4 gap-2 max-w-[176px]">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-green text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Formations */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-brand-green rounded-full" />
              Formations
            </h3>
            <ul className="space-y-3">
              {footerLinks.formations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-green transition-colors"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-green text-xs">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-brand-green rounded-full" />
              Ressources
            </h3>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-green transition-colors"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-green text-xs">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support + Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-brand-green rounded-full" />
              Support
            </h3>
            <ul className="space-y-3 mb-8">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-green transition-colors"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-green text-xs">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                <p className="text-sm font-semibold text-white">Newsletter</p>
              </div>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                Conseils, ressources et actus chaque semaine.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="votre@email.fr"
                  className="flex-1 min-w-0 bg-white/5 border border-white/10 text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-brand-green focus:bg-white/10 transition-all duration-200 placeholder-slate-500"
                />
                <button className="bg-brand-green hover:bg-brand-green-dark text-white text-sm px-3 py-2 rounded-lg transition-colors font-semibold shrink-0">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────── */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            {settings.footerText || `© ${new Date().getFullYear()} Sirius Academy. Tous droits réservés.`}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            {legalLinks.map((item, index) => (
              <span key={item} className="flex items-center gap-3">
                {index > 0 && (
                  <span className="text-slate-600 select-none">|</span>
                )}
                <a
                  href="#"
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {item}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
