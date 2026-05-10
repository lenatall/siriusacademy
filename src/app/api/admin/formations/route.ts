import { NextResponse } from 'next/server'
import { store } from '@/lib/store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  return NextResponse.json(store.formations.getAll())
}

export async function POST(request: Request) {
  const body = await request.json()
  const formation = store.formations.create(body)
  return NextResponse.json(formation, { status: 201 })
}
