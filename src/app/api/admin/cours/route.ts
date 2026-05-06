import { NextResponse } from 'next/server'
import { store } from '@/lib/store'

export async function GET() {
  return NextResponse.json(store.cours.getAll())
}

export async function POST(request: Request) {
  const body = await request.json()
  const cours = store.cours.create(body)
  return NextResponse.json(cours, { status: 201 })
}
