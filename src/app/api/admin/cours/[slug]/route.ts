import { NextResponse } from 'next/server'
import { store } from '@/lib/store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const c = store.cours.getBySlug(params.slug)
  if (!c) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(c)
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  const body = await request.json()
  const updated = store.cours.update(params.slug, body)
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
  const ok = store.cours.delete(params.slug)
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
