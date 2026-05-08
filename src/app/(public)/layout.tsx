import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { store } from '@/lib/store'

// Force dynamic rendering so logo/settings changes appear immediately
export const dynamic = 'force-dynamic'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = store.settings.get()
  return (
    <>
      <Header
        logoUrl={settings.logoUrl}
        siteName={settings.siteName}
        whatsappLink={settings.whatsappLink}
      />
      <main className="flex-1">{children}</main>
      <Footer logoUrl={settings.logoUrl} siteName={settings.siteName} />
    </>
  )
}
