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

export function hasLargeEquipment(cart: Cart): boolean {
  return cart.items.some((i) => i.price >= MOWER_PRICE_THRESHOLD);
}

export function getShippingOptions(cart: Cart): ShippingOption[] {
  const subtotal = cart.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const large = hasLargeEquipment(cart);

  const localFee = large ? 200 : 75;

  let freight: ShippingOption;
  if (large) {
    freight = {
      id: 'freight',
      label: 'Freight Shipping',
      description: 'Crated and shipped via freight carrier',
      price: 'quote',
      available: true,
      notes: 'We will contact you with a freight quote within 1 business day before charging your card.',
    };
  } else {
    let fee = 15;
    if (subtotal > 500) fee = 50;
    else if (subtotal > 100) fee = 25;
    freight = {
      id: 'freight',
      label: 'Standard Shipping',
      description: '3–7 business days via UPS / FedEx Ground',
      price: fee,
      available: true,
    };
  }

  return [
    {
      id: 'pickup',
      label: 'Pickup at Collins, MS',
      description: '3069 Hwy 49, Collins MS 39428',
      price: 0,
      available: true,
      notes: 'Pickup ready within 1 business day. We will call when your order is ready.',
    },
    {
      id: 'local',
      label: 'Local Delivery (within 50 mi)',
      description: 'Direct delivery from our Collins, MS location',
      price: localFee,
      available: true,
      notes: 'Local delivery scheduled within 2 business days. Driver will confirm time window.',
    },
    freight,
  ];
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
