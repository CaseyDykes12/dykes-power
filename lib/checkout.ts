import type { Cart } from './cart';

export const TAX_RATE_MS = 0.07;

export type ShippingMethod = 'pickup' | 'local' | 'freight';

export interface ShippingOption {
  id: ShippingMethod;
  label: string;
  description: string;
  price: number | 'quote';
  available: boolean;
  notes?: string;
}

const MOWER_PRICE_THRESHOLD = 1500;
export const FLAT_SHIPPING_RATE = 12.99;
export const FREE_SHIPPING_THRESHOLD = 75;

// Free freight nationally on mowers and trailers within the contiguous US.
// Casey absorbs the actual carrier cost as a marketing expense to match
// the dominant Ferris-dealer pattern (Russo, MowersDirect, etc.) where
// "Free shipping" is the standard ad display.
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

/** Flat-rate parts shipping: $12.99, free over $75. Returns 0 if cart qualifies for free shipping. */
export function calculatePartsShipping(cart: Cart): number {
  if (cart.items.length === 0) return 0;
  if (cartSubtotal(cart) >= FREE_SHIPPING_THRESHOLD) return 0;
  return FLAT_SHIPPING_RATE;
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
        description: 'Tracked freight delivery — 7–14 business days within the contiguous US',
        price: 0,
        available: true,
        notes: 'Free shipping included on all mowers and trailers in the contiguous US.',
      };
    }
  } else {
    const fee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
    freight = {
      id: 'freight',
      label: fee === 0 ? 'FREE Standard Shipping' : 'Standard Shipping',
      description: '3–7 business days via tracked carrier',
      price: fee,
      available: true,
      notes: fee === 0
        ? 'Your order qualifies for free shipping (subtotal $75+).'
        : 'Flat rate $12.99. Add $' + (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2) + ' more to qualify for free shipping.',
    };
  }

  const pickup: ShippingOption = {
    id: 'pickup',
    label: 'Pickup at Collins, MS',
    description: '3069 Hwy 49, Collins MS 39428',
    price: 0,
    available: true,
    notes: 'Pickup ready within 1 business day. We will call when your order is ready.',
  };

  const local: ShippingOption = {
    id: 'local',
    label: large ? 'Local Delivery (within 50 mi of Collins)' : 'Local Delivery (within 50 mi)',
    description: 'Direct delivery from our Collins, MS location',
    price: large ? 200 : 50,
    available: true,
    notes: 'Local delivery scheduled within 2 business days. Driver will confirm time window.',
  };

  return [pickup, local, freight];
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
