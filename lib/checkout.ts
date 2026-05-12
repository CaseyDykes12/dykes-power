import type { Cart } from './cart';

export const TAX_RATE_MS = 0.07;

export type ShippingMethod = 'pickup' | 'freight';

export interface ShippingOption {
  id: ShippingMethod;
  label: string;
  description: string;
  price: number | 'quote';
  available: boolean;
  notes?: string;
}

const MOWER_PRICE_THRESHOLD = 1500;

// Free shipping site-wide on parts, accessories, mowers, and trailers within
// the contiguous US. Casey absorbs the carrier cost as a marketing expense
// (matches the dominant Ferris-dealer pattern: Russo, MowersDirect, etc.)
// and the Merchant Center feed declares free shipping everywhere — keeping
// the on-site copy and the shipping calculator aligned avoids the
// "misrepresentation" flag from Google.
const NOT_SHIPPED_STATES = new Set(['AK', 'HI']);

/** Returns 0 for serviceable contiguous US states, null for AK/HI/unknown. */
export function getFreightRate(state: string): number | null {
  const code = state.trim().toUpperCase();
  if (NOT_SHIPPED_STATES.has(code)) return null;
  // Two-letter US state code accepted? (loose validation)
  if (code.length !== 2) return null;
  return 0;
}

export function hasLargeEquipment(cart: Cart): boolean {
  return cart.items.some((i) => i.price >= MOWER_PRICE_THRESHOLD);
}

export function cartSubtotal(cart: Cart): number {
  return cart.items.reduce((s, i) => s + i.price * i.quantity, 0);
}

/** Parts shipping is free site-wide. Signature retained for callers. */
export function calculatePartsShipping(_cart: Cart): number {
  return 0;
}

export function getShippingOptions(cart: Cart, state?: string): ShippingOption[] {
  const subtotal = cartSubtotal(cart);
  const large = hasLargeEquipment(cart);

  let freight: ShippingOption;
  if (large) {
    const rate = state ? getFreightRate(state) : 0;
    if (rate === null) {
      // State is AK/HI or invalid — not serviceable for freight
      freight = {
        id: 'freight',
        label: 'Freight Shipping (unavailable for selected state)',
        description: 'We do not ship large equipment outside the contiguous United States.',
        price: 'quote',
        available: false,
        notes: 'Pickup at Collins, MS or local delivery within 50 mi remains available. For other arrangements, call (601) 909-5380.',
      };
    } else {
      freight = {
        id: 'freight',
        label: 'FREE Freight Shipping',
        description: 'Shipping times vary by product — we will confirm your delivery window after checkout.',
        price: 0,
        available: true,
      };
    }
  } else {
    freight = {
      id: 'freight',
      label: 'FREE Standard Shipping',
      description: 'Shipping times vary by product — we will confirm your delivery window after checkout.',
      price: 0,
      available: true,
    };
  }

  const pickup: ShippingOption = {
    id: 'pickup',
    label: 'Pickup at Collins, MS',
    description: '3069 Hwy 49, Collins MS 39428',
    price: 0,
    available: true,
  };

  return [pickup, freight];
}

export function calculateTax(subtotal: number, shippingState: string): number {
  if (shippingState.trim().toUpperCase() === 'MS') {
    return Math.round(subtotal * TAX_RATE_MS * 100) / 100;
  }
  return 0;
}

export function getShippingPrice(method: ShippingMethod, cart: Cart, state?: string): number {
  const opt = getShippingOptions(cart, state).find((o) => o.id === method);
  if (!opt || opt.price === 'quote') return 0;
  return opt.price;
}
