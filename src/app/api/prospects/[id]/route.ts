import { NextResponse } from 'next/server'
import { store } from '@/lib/store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const updated = store.prospects.update(params.id, body)
  if (!updated) return NextResponse.json({ error: 'Prospect introuvable' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const deleted = store.prospects.delete(params.id)
  return NextResponse.json({ success: deleted })
}
