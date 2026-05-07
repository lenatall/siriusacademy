import { NextResponse } from 'next/server'

// In-memory waitlist — replace with DB later
const waitlist: Array<{
  formationSlug: string
  nom: string
  prenom: string
  email: string
  telephone: string
  statut: string
  createdAt: string
}> = []

export async function POST(request: Request) {
  const body = await request.json()
  const { formationSlug, nom, prenom, email, telephone, statut } = body

  if (!formationSlug || !nom || !prenom || !email) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
  }

  const entry = { formationSlug, nom, prenom, email, telephone: telephone ?? '', statut: statut ?? '', createdAt: new Date().toISOString() }
  waitlist.push(entry)

  console.log('Nouvelle inscription liste d\'attente:', entry)

  return NextResponse.json({ success: true })
}

export async function GET() {
  return NextResponse.json(waitlist)
}
