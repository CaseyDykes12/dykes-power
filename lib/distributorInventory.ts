import data from '@/data/distributor-inventory.json';

export interface DistributorStock {
  description: string;
  /** Units physically on hand at Power Distributors today. */
  today: number;
  /** Production scheduled to land this month. */
  productionThisMonth: number;
  /** Expected on-hand by end of month (today + production - committed shipments). */
  endOfMonth: number;
}

export interface DistributorInventoryFile {
  asOfDate: string;
  source: string;
  lastUpdated: string;
  items: Record<string, DistributorStock>;
}

const file = data as DistributorInventoryFile;

/** Date the upstream inventory snapshot was generated (filename / sheet header). */
export const INVENTORY_AS_OF: string = file.asOfDate;

/** Look up a specific SKU's distributor availability. Null when the SKU isn't in the sheet. */
export function getDistributorStock(sku: string): DistributorStock | null {
  return file.items[sku] ?? null;
}

/**
 * Stock state for display under a product's price block:
 *   - today >= 1   -> "12 in stock"
 *   - today == 0   -> "Temporarily Out of Stock"
 *   - not in sheet -> "Temporarily Out of Stock"
 * Per Casey 2026-05-13: any SKU at 0 today is "Temporarily Out of Stock" —
 * never advertise EOM production windows, because they slip.
 */
export type AvailabilityState =
  | { tone: 'in-stock'; label: string; count: number }
  | { tone: 'out'; label: 'Temporarily Out of Stock'; count: 0 };

export function getAvailability(sku: string): AvailabilityState {
  const s = getDistributorStock(sku);
  if (s && s.today >= 1) {
    return {
      tone: 'in-stock',
      label: `${s.today} in stock`,
      count: s.today,
    };
  }
  return { tone: 'out', label: 'Temporarily Out of Stock', count: 0 };
}
