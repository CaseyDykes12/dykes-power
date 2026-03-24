import { Product } from './products';

export interface CartItem {
  sku: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  deckSize?: string;
}

export interface Cart {
  items: CartItem[];
}

const CART_KEY = 'dykes_power_cart';

export function getCart(): Cart {
  if (typeof window === 'undefined') return { items: [] };
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
}

export function saveCart(cart: Cart): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product: Product, deckSize?: string): Cart {
  const cart = getCart();
  const existing = cart.items.find(
    (i) => i.sku === product.sku && i.deckSize === deckSize
  );
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({
      sku: product.sku,
      name: product.name,
      price: product.price ?? 0,
      quantity: 1,
      imageUrl: product.imageUrl,
      deckSize,
    });
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(sku: string, deckSize?: string): Cart {
  const cart = getCart();
  cart.items = cart.items.filter(
    (i) => !(i.sku === sku && i.deckSize === deckSize)
  );
  saveCart(cart);
  return cart;
}

export function updateQuantity(sku: string, quantity: number, deckSize?: string): Cart {
  const cart = getCart();
  const item = cart.items.find(
    (i) => i.sku === sku && i.deckSize === deckSize
  );
  if (item) {
    if (quantity <= 0) return removeFromCart(sku, deckSize);
    item.quantity = quantity;
  }
  saveCart(cart);
  return cart;
}

export function clearCart(): Cart {
  const empty: Cart = { items: [] };
  saveCart(empty);
  return empty;
}

export function cartTotal(cart: Cart): number {
  return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function cartCount(cart: Cart): number {
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
}
