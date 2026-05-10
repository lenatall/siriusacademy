import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  const cwd = process.cwd()
  const dataDir = process.env.DATA_DIR ?? path.join(cwd, '.sirius-data')

  let writeTest = 'non testé'
  try {
    fs.mkdirSync(dataDir, { recursive: true })
    const testFile = path.join(dataDir, '.write-test')
    fs.writeFileSync(testFile, 'ok')
    fs.unlinkSync(testFile)
    writeTest = '✅ écriture OK'
  } catch (err: unknown) {
    writeTest = `❌ ERREUR: ${err instanceof Error ? err.message : String(err)}`
  }

  const files = (() => {
    try { return fs.readdirSync(dataDir) } catch { return [] }
  })()

  return NextResponse.json({
    cwd,
    DATA_DIR_ENV: process.env.DATA_DIR ?? '(non défini)',
    dataDir,
    writeTest,
    fichiers: files,
    NODE_ENV: process.env.NODE_ENV,
  })
}
