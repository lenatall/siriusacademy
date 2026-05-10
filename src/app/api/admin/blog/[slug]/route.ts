import { NextResponse } from 'next/server'
import { store } from '@/lib/store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const p = store.blog.getBySlug(params.slug)
  if (!p) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(p)
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  const body = await request.json()
  const updated = store.blog.update(params.slug, body)
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
  const ok = store.blog.delete(params.slug)
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
