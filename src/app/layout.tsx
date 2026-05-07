import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Sirius Academy — Formations Digitales d\'Excellence',
    template: '%s | Sirius Academy',
  },
  description:
    'Sirius Academy propose des formations digitales de qualité en développement web, marketing digital, design UX/UI et data science. Formez-vous aux métiers du numérique.',
  keywords: [
    'formation digitale',
    'développement web',
    'marketing digital',
    'UX UI design',
    'data science',
    'formation en ligne',
    'reconversion professionnelle',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://sirius-academy.fr',
    siteName: 'Sirius Academy',
    title: 'Sirius Academy — Formations Digitales d\'Excellence',
    description: 'Formez-vous aux métiers du numérique avec les meilleurs experts.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
