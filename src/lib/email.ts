import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.NODE_ENV === 'production' && process.env.RESEND_DOMAIN_VERIFIED
  ? 'Sirius Academy <notifications@sirius-academy.net>'
  : 'Sirius Academy <onboarding@resend.dev>'
const ADMIN_EMAIL = process.env.NOTIFY_EMAIL ?? 'admin@sirius-academy.net'

export async function sendProspectNotification(data: {
  nom: string
  prenom: string
  email: string
  telephone?: string
  formationSlug?: string
  source: string
  message?: string
}) {
  if (!process.env.RESEND_API_KEY) return

  const sourceLabel: Record<string, string> = {
    contact: 'Formulaire de contact',
    inscription: 'Formulaire d\'inscription',
    'liste-attente': 'Liste d\'attente',
  }
  const label = sourceLabel[data.source] ?? data.source

  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `[Sirius Academy] Nouveau prospect — ${label}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <div style="background:#0f172a;padding:20px 24px;border-radius:12px 12px 0 0">
          <h1 style="color:#10b981;margin:0;font-size:20px">Sirius Academy</h1>
          <p style="color:#94a3b8;margin:4px 0 0;font-size:14px">Nouvelle soumission — ${label}</p>
        </div>
        <div style="background:#f8fafc;padding:24px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#64748b;font-size:13px;width:130px">Nom complet</td>
                <td style="padding:8px 0;font-weight:600;color:#0f172a">${data.prenom} ${data.nom}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b;font-size:13px">Email</td>
                <td style="padding:8px 0"><a href="mailto:${data.email}" style="color:#10b981">${data.email}</a></td></tr>
            ${data.telephone ? `<tr><td style="padding:8px 0;color:#64748b;font-size:13px">Téléphone</td>
                <td style="padding:8px 0;color:#0f172a">${data.telephone}</td></tr>` : ''}
            ${data.formationSlug ? `<tr><td style="padding:8px 0;color:#64748b;font-size:13px">Formation</td>
                <td style="padding:8px 0;color:#0f172a">${data.formationSlug}</td></tr>` : ''}
            ${data.message ? `<tr><td style="padding:8px 0;color:#64748b;font-size:13px;vertical-align:top">Message</td>
                <td style="padding:8px 0;color:#0f172a;white-space:pre-wrap">${data.message}</td></tr>` : ''}
          </table>
          <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8">
            Reçu le ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    `,
  })
}
