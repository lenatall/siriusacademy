import { NextResponse } from 'next/server'
import { store } from '@/lib/store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const f = store.formations.getBySlug(params.slug)
  if (!f) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(f)
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  const body = await request.json()
  const updated = store.formations.update(params.slug, body)
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
  const ok = store.formations.delete(params.slug)
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
