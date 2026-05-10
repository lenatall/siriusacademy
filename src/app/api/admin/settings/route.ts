import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { store } from '@/lib/store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  return NextResponse.json(store.settings.get())
}

export async function PUT(request: Request) {
  const body = await request.json()
  const updated = store.settings.update(body)
  // Invalidate Next.js cache for all public pages so Footer/Header re-render
  revalidatePath('/', 'layout')
  return NextResponse.json(updated)
}
