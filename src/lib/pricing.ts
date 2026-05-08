import type { Formation } from '@/types'

export interface PricingInfo {
  type: 'tranches' | 'unique'
  totalPrice: number
  originalPrice?: number
  /** Premier versement (première tranche) */
  inscriptionAmount?: number
  /** "Puis 45 000 FCFA × 2" ou "Puis selon échéancier" */
  suivantLabel?: string
  nbTranches: number
  tranches?: Array<{ nom: string; montant: number; echeance: string }>
}

export function getPricing(
  f: Pick<Formation, 'price' | 'originalPrice' | 'paymentType' | 'tranches'>
): PricingInfo {
  const hasTranches =
    f.paymentType === 'tranches' &&
    Array.isArray(f.tranches) &&
    f.tranches.length > 0

  if (hasTranches) {
    const [first, ...rest] = f.tranches!
    let suivantLabel: string | undefined
    if (rest.length > 0) {
      const allSame = rest.every((t) => t.montant === rest[0].montant)
      suivantLabel = allSame
        ? `Puis ${rest[0].montant.toLocaleString('fr-FR')} FCFA × ${rest.length}`
        : 'Puis selon échéancier'
    }
    return {
      type: 'tranches',
      totalPrice: f.price,
      originalPrice: f.originalPrice,
      inscriptionAmount: first.montant,
      suivantLabel,
      nbTranches: f.tranches!.length,
      tranches: f.tranches,
    }
  }

  return {
    type: 'unique',
    totalPrice: f.price,
    originalPrice: f.originalPrice,
    nbTranches: 0,
  }
}
