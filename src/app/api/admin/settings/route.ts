import { NextResponse } from 'next/server'
import { store } from '@/lib/store'

export async function GET() {
  return NextResponse.json(store.settings.get())
}

export async function PUT(request: Request) {
  const body = await request.json()
  const updated = store.settings.update(body)
  return NextResponse.json(updated)
}
