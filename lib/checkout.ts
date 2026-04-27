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

// Freight tiers for large equipment (mowers, trailers) shipped from
// Collins, MS. Rates benchmarked against 360powersports.com published
// state-by-state UTV freight rates ($799-$1099) and adjusted for our MS
// origin (closer to most of the US than Texas-origin competitors).
// Rates are estimates — final freight is reconciled when we book the
// carrier behind the scenes.
const FREIGHT_TIER_SE = 599;   // Southeast
const FREIGHT_TIER_MID = 899;  // Eastern half / Midwest
const FREIGHT_TIER_WEST = 1099; // Western half

const FREIGHT_RATES: Record<string, number> = {
  // Tier SE — Southeast / adjacent (in or near the Pine Belt freight lanes)
  AL: FREIGHT_TIER_SE, AR: FREIGHT_TIER_SE, FL: FREIGHT_TIER_SE, GA: FREIGHT_TIER_SE,
  KY: FREIGHT_TIER_SE, LA: FREIGHT_TIER_SE, MS: FREIGHT_TIER_SE, MO: FREIGHT_TIER_SE,
  NC: FREIGHT_TIER_SE, OK: FREIGHT_TIER_SE, SC: FREIGHT_TIER_SE, TN: FREIGHT_TIER_SE,
  TX: FREIGHT_TIER_SE, VA: FREIGHT_TIER_SE,
  // Tier MID — Eastern half + Midwest
  CT: FREIGHT_TIER_MID, DC: FREIGHT_TIER_MID, DE: FREIGHT_TIER_MID, IL: FREIGHT_TIER_MID,
  IN: FREIGHT_TIER_MID, KS: FREIGHT_TIER_MID, MA: FREIGHT_TIER_MID, MD: FREIGHT_TIER_MID,
  ME: FREIGHT_TIER_MID, MI: FREIGHT_TIER_MID, NE: FREIGHT_TIER_MID, NH: FREIGHT_TIER_MID,
  NJ: FREIGHT_TIER_MID, NY: FREIGHT_TIER_MID, OH: FREIGHT_TIER_MID, PA: FREIGHT_TIER_MID,
  RI: FREIGHT_TIER_MID, VT: FREIGHT_TIER_MID, WI: FREIGHT_TIER_MID, WV: FREIGHT_TIER_MID,
  // Tier WEST — Western half
  AZ: FREIGHT_TIER_WEST, CA: FREIGHT_TIER_WEST, CO: FREIGHT_TIER_WEST, IA: FREIGHT_TIER_WEST,
  ID: FREIGHT_TIER_WEST, MN: FREIGHT_TIER_WEST, MT: FREIGHT_TIER_WEST, ND: FREIGHT_TIER_WEST,
  NM: FREIGHT_TIER_WEST, NV: FREIGHT_TIER_WEST, OR: FREIGHT_TIER_WEST, SD: FREIGHT_TIER_WEST,
  UT: FREIGHT_TIER_WEST, WA: FREIGHT_TIER_WEST, WY: FREIGHT_TIER_WEST,
};

const NOT_SHIPPED_STATES = new Set(['AK', 'HI']);

/** Look up large-equipment freight cost for a destination state (2-letter). */
export function getFreightRate(state: string): number | null {
  const code = state.trim().toUpperCase();
  if (NOT_SHIPPED_STATES.has(code)) return null;
  return FREIGHT_RATES[code] ?? null;
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
    const rate = state ? getFreightRate(state) : null;
    if (state && rate === null) {
      // State entered but not eligible (AK/HI or unknown code)
      freight = {
        id: 'freight',
        label: 'Freight Shipping (unavailable for selected state)',
        description: 'We do not ship large equipment outside the contiguous United States.',
        price: 'quote',
        available: false,
        notes: 'Pickup at Collins, MS or local delivery within 50 mi remains available. For other arrangements, call (601) 909-5380.',
      };
    } else if (state && rate !== null) {
      freight = {
        id: 'freight',
        label: 'Freight Shipping',
        description: `Tracked freight to ${state.toUpperCase()} — 7–14 business days`,
        price: rate,
        available: true,
        notes: 'Calculated based on destination. Carrier confirmed before shipment.',
      };
    } else {
      // No state selected yet — show a placeholder so the user knows freight is available
      freight = {
        id: 'freight',
        label: 'Freight Shipping',
        description: 'Enter your shipping state to see freight cost',
        price: 'quote',
        available: true,
        notes: 'Freight cost is calculated based on destination state — typically $599–$1,099 within the contiguous US. 7–14 business days.',
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
