import { NextResponse } from 'next/server'
import { store } from '@/lib/store'

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

  return NextResponse.json({ success: true, id: prospect.id })
}

export async function GET() {
  const entries = store.prospects
    .getAll()
    .filter((p) => p.source === 'liste-attente')
  return NextResponse.json(entries)
}
