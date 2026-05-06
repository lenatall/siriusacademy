import Link from 'next/link'
import { Star, Mail, Phone, MapPin, Linkedin, Twitter, Youtube, Instagram } from 'lucide-react'

const footerLinks = {
  formations: [
    { label: 'Développement Web Full-Stack', href: '/formations/developpement-web-full-stack' },
    { label: 'Marketing Digital & SEO', href: '/formations/marketing-digital-seo' },
    { label: 'Design UX/UI', href: '/formations/design-ux-ui' },
    { label: 'Data Science & IA', href: '/formations/data-science-ia' },
  ],
  ressources: [
    { label: 'Cours Gratuits', href: '/cours-gratuits' },
    { label: 'Blog', href: '/blog' },
    { label: 'À Propos', href: '/a-propos' },
  ],
  support: [
    { label: 'Contact', href: '/contact' },
    { label: 'S\'inscrire', href: '/inscription' },
    { label: 'FAQ', href: '/contact#faq' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-yellow to-amber-500 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-navy-900 fill-current" />
              </div>
              <div>
                <span className="text-white font-bold text-xl">Sirius</span>
                <span className="text-brand-yellow font-bold text-xl"> Academy</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              Sirius Academy est une académie digitale basée au Sénégal. Nous vous aidons à
              construire des compétences concrètes, visibles et utiles grâce à un accompagnement
              personnalisé en petits groupes.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-green shrink-0" />
                <span>contact@sirius-academy.sn</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-green shrink-0" />
                <span>+221 77 000 00 00</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-brand-green shrink-0" />
                <span>Dakar, Sénégal (et 100% en ligne)</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Youtube, href: '#', label: 'YouTube' },
                { icon: Instagram, href: '#', label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-green hover:text-white flex items-center justify-center transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Formations */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Formations
            </h3>
            <ul className="space-y-3">
              {footerLinks.formations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-brand-green transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Ressources
            </h3>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-brand-green transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-brand-green transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter mini */}
            <div className="mt-8">
              <p className="text-sm font-semibold text-white mb-3">Newsletter</p>
              <p className="text-xs text-slate-400 mb-3">
                Conseils, ressources et actus chaque semaine.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="votre@email.fr"
                  className="flex-1 min-w-0 bg-white/5 border border-white/10 text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-brand-green transition-colors placeholder-slate-500"
                />
                <button className="bg-brand-green hover:bg-brand-green-dark text-white text-sm px-3 py-2 rounded-lg transition-colors font-medium">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Sirius Academy. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            {['Mentions légales', 'CGV', 'Politique de confidentialité', 'Cookies'].map((item) => (
              <a key={item} href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
