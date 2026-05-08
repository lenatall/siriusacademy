import { NextResponse } from 'next/server'
import { store } from '@/lib/store'

export async function GET() {
  return NextResponse.json(store.prospects.getAll())
}

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.email || (!body.nom && !body.prenom)) {
    return NextResponse.json({ error: 'Email et nom requis' }, { status: 400 })
  }

  const prospect = store.prospects.create({
    nom: body.nom || '',
    prenom: body.prenom || '',
    email: body.email,
    telephone: body.telephone ?? '',
    formationSlug: body.formationSlug,
    source: body.source ?? 'contact',
    status: body.status ?? 'nouveau',
    note: body.note,
    message: body.message,
    statut: body.statut,
    createdAt: new Date().toISOString(),
  })

  return NextResponse.json(prospect, { status: 201 })
}
