import { NextResponse } from 'next/server'
import { store } from '@/lib/store'
import { sendProspectNotification } from '@/lib/email'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  const body = await request.json()
  const { formationSlug, nom, prenom, email, telephone, statut } = body

  if (!formationSlug || !nom || !prenom || !email) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
  }

  const prospect = store.prospects.create({
    nom,
    prenom,
    email,
    telephone: telephone ?? '',
    formationSlug,
    source: 'liste-attente',
    status: 'nouveau',
    statut: statut ?? '',
    createdAt: new Date().toISOString(),
  })

  sendProspectNotification({
    nom: prospect.nom,
    prenom: prospect.prenom,
    email: prospect.email,
    telephone: prospect.telephone,
    formationSlug: prospect.formationSlug,
    source: 'liste-attente',
  }).catch((err) => console.error('[email] waitlist notification failed', err))

  return NextResponse.json({ success: true, id: prospect.id })
}

export async function GET() {
  const entries = store.prospects
    .getAll()
    .filter((p) => p.source === 'liste-attente')
  return NextResponse.json(entries)
}
