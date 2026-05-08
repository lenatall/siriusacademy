interface LoginAttempt {
  count: number        // attempts in current window
  blockedUntil: number // timestamp when block expires (0 = not blocked)
  cycles: number       // how many 3-attempt blocks have been served
}

const attempts = new Map<string, LoginAttempt>()

const MAX_ATTEMPTS = 3
const BLOCK_DURATION_MS = 60 * 1000       // 1 minute
const LONG_BLOCK_DURATION_MS = 24 * 60 * 60 * 1000 // 24 hours
const MAX_CYCLES = 3 // after 3 cycles → 24h block

function getKey(ip: string, username: string): string {
  return `${ip}:${username.toLowerCase()}`
}

export interface RateLimitResult {
  allowed: boolean
  blockedUntil?: number
  remainingAttempts?: number
}

export function checkRateLimit(ip: string, username: string): RateLimitResult {
  const key = getKey(ip, username)
  const record = attempts.get(key) ?? { count: 0, blockedUntil: 0, cycles: 0 }
  const now = Date.now()

  if (record.blockedUntil > now) {
    return { allowed: false, blockedUntil: record.blockedUntil }
  }

  // Block expired — reset count for the new window
  if (record.blockedUntil > 0 && record.blockedUntil <= now) {
    record.count = 0
    record.blockedUntil = 0
  }

  return {
    allowed: true,
    remainingAttempts: MAX_ATTEMPTS - record.count,
  }
}

export function recordFailedAttempt(ip: string, username: string): RateLimitResult {
  const key = getKey(ip, username)
  const record = attempts.get(key) ?? { count: 0, blockedUntil: 0, cycles: 0 }
  const now = Date.now()

  // If currently blocked (shouldn't reach here normally)
  if (record.blockedUntil > now) {
    return { allowed: false, blockedUntil: record.blockedUntil }
  }

  record.count += 1

  if (record.count >= MAX_ATTEMPTS) {
    record.cycles += 1
    const blockDuration =
      record.cycles >= MAX_CYCLES ? LONG_BLOCK_DURATION_MS : BLOCK_DURATION_MS
    record.blockedUntil = now + blockDuration
    record.count = 0
    attempts.set(key, record)
    return { allowed: false, blockedUntil: record.blockedUntil }
  }

  attempts.set(key, record)
  return {
    allowed: true,
    remainingAttempts: MAX_ATTEMPTS - record.count,
  }
}

export function recordSuccessfulLogin(ip: string, username: string): void {
  attempts.delete(getKey(ip, username))
}
