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

export function getShippingOptions(cart: Cart): ShippingOption[] {
  const subtotal = cartSubtotal(cart);
  const large = hasLargeEquipment(cart);

  let freight: ShippingOption;
  if (large) {
    freight = {
      id: 'freight',
      label: 'Freight Quote',
      description: 'Large equipment — we coordinate freight or you pick up',
      price: 'quote',
      available: true,
      notes: 'Mowers and large equipment are not shipped via standard carrier. We will contact you within 1 business day to confirm pickup or arrange freight before charging your card.',
    };
  } else {
    const fee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
    freight = {
      id: 'freight',
      label: fee === 0 ? 'FREE Standard Shipping' : 'Standard Shipping',
      description: '3–7 business days via USPS, UPS, or FedEx Ground',
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

export function getShippingPrice(method: ShippingMethod, cart: Cart): number {
  const opt = getShippingOptions(cart).find((o) => o.id === method);
  if (!opt || opt.price === 'quote') return 0;
  return opt.price;
}
