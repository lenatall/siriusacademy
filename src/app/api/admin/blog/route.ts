import { NextResponse } from 'next/server'
import { store } from '@/lib/store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  return NextResponse.json(store.blog.getAll())
}

export async function POST(request: Request) {
  const body = await request.json()
  const post = store.blog.create(body)
  return NextResponse.json(post, { status: 201 })
}
