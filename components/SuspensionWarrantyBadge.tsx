import Link from 'next/link';

const ELIGIBLE_SERIES = [
  'IS 600',
  'IS 700',
  'ISX 800',
  'ISX 2200',
  'ISX 3300',
  'IS 2600',
  'IS 6200',
  'SRS Z1',
  'SRS Z2',
  'SRS Z3X',
  'ProCut S',
  '300S',
  '500S',
];

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function isWarrantyEligible(productName: string): boolean {
  const compactName = normalize(productName);
  return ELIGIBLE_SERIES.some((series) => compactName.includes(normalize(series)));
}

export function SuspensionWarrantyBadge({
  variant = 'card',
}: {
  variant?: 'card' | 'detail';
}) {
  if (variant === 'detail') {
    return (
      <Link
        href="/warranty"
        className="block mb-6 rounded-lg border border-ferris-yellow/60 bg-ferris-yellow/5 px-4 py-3 hover:bg-ferris-yellow/10 transition-colors"
      >
        <p className="text-ferris-yellow font-bold text-sm tracking-wide">
          10-YEAR SUSPENSION WARRANTY
        </p>
        <p className="text-gray-300 text-xs mt-1">
          Covered by Ferris on the suspension system. See full terms.
        </p>
      </Link>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded border border-ferris-yellow/60 bg-black/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ferris-yellow">
      10-Yr Suspension Warranty
    </span>
  );
}
