'use client';

import { useState } from 'react';
import Link from 'next/link';
import { products, Product } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

type Answers = {
  size: '<1' | '1-3' | '3-7' | '7-15' | '15+' | null;
  use: 'home' | 'side' | 'commercial' | null;
  terrain: 'flat' | 'rolling' | 'steep' | null;
  budget: '<5k' | '5-10k' | '10-15k' | '15k+' | null;
};

const QUESTIONS: {
  key: keyof Answers;
  question: string;
  options: { value: string; label: string; sub?: string }[];
}[] = [
  {
    key: 'size',
    question: 'How much ground are you cutting?',
    options: [
      { value: '<1', label: 'Less than 1 acre', sub: 'A typical residential yard' },
      { value: '1-3', label: '1 – 3 acres', sub: 'Large home property' },
      { value: '3-7', label: '3 – 7 acres', sub: 'Small farm / mini-estate' },
      { value: '7-15', label: '7 – 15 acres', sub: 'Multiple properties / big estate' },
      { value: '15+', label: '15+ acres', sub: 'Commercial / large acreage' },
    ],
  },
  {
    key: 'use',
    question: 'Who\'s doing the cutting?',
    options: [
      { value: 'home', label: 'Just me, at home', sub: 'Weekend use, my own property' },
      { value: 'side', label: 'Me + a little side work', sub: 'A few yards on the side' },
      { value: 'commercial', label: 'Full-time commercial crew', sub: 'Mowing every day for a living' },
    ],
  },
  {
    key: 'terrain',
    question: 'What does your ground look like?',
    options: [
      { value: 'flat', label: 'Mostly flat & smooth' },
      { value: 'rolling', label: 'Rolling hills, some bumps' },
      { value: 'steep', label: 'Steep, rough, or uneven' },
    ],
  },
  {
    key: 'budget',
    question: 'What\'s your budget?',
    options: [
      { value: '<5k', label: 'Under $5,000' },
      { value: '5-10k', label: '$5,000 – $10,000' },
      { value: '10-15k', label: '$10,000 – $15,000' },
      { value: '15k+', label: '$15,000 or more' },
    ],
  },
];

function score(product: Product, a: Answers): number {
  const price = product.price ?? 0;
  if (!price) return -Infinity;

  const name = product.name.toLowerCase();
  let s = 0;

  // Hard filter: budget ceiling
  const maxBudget = { '<5k': 5000, '5-10k': 10000, '10-15k': 15000, '15k+': 100000 }[a.budget!];
  if (price > maxBudget) return -Infinity;

  // Reward using budget well (but don't go near zero — that feels cheap)
  const budgetFloor = { '<5k': 2000, '5-10k': 5000, '10-15k': 9000, '15k+': 14000 }[a.budget!];
  if (price >= budgetFloor) s += 2;

  // Property size → right class
  if (a.size === '<1' || a.size === '1-3') {
    if (name.includes('srs z1') || name.includes('srs z2') || name.includes('fw15') || name.includes('fw25') || name.includes('300e') || name.includes('300r') || name.includes('300s')) s += 3;
    if (name.includes('isx 2200') || name.includes('isx 3300') || name.includes('6200') || name.includes('2600')) s -= 4;
  } else if (a.size === '3-7') {
    if (name.includes('500s') || name.includes('srs z2') || name.includes('srs z3x') || name.includes('is® 600') || name.includes('is® 700') || name.includes('300s') || name.includes('isx 800')) s += 3;
  } else if (a.size === '7-15') {
    if (name.includes('isx 800') || name.includes('isx 2200') || name.includes('is® 600') || name.includes('is® 700') || name.includes('srs z3x')) s += 4;
    if (name.includes('fw') || name.includes('srs z1')) s -= 3;
  } else if (a.size === '15+') {
    if (name.includes('isx 2200') || name.includes('isx 3300') || name.includes('6200') || name.includes('2600')) s += 5;
    if (name.includes('fw') || name.includes('srs z1') || name.includes('300')) s -= 5;
  }

  // Use type
  if (a.use === 'home') {
    if (name.includes('srs') || name.includes('300') || name.includes('fw25')) s += 2;
    if (name.includes('isx 3300') || name.includes('6200')) s -= 2;
  } else if (a.use === 'side') {
    if (name.includes('500s') || name.includes('is® 600') || name.includes('srs z3x') || name.includes('isx 800')) s += 2;
  } else if (a.use === 'commercial') {
    if (name.includes('isx') || name.includes('is® 6') || name.includes('is® 7') || name.includes('is® 2') || name.includes('is® 6200')) s += 3;
    if (name.includes('srs z1') || name.includes('fw15') || name.includes('300e') || name.includes('300r')) s -= 3;
  }

  // Terrain — suspension (ISX / IS / 500S) matters on rough ground
  if (a.terrain === 'rolling') {
    if (name.includes('isx') || name.includes('is®') || name.includes('500s') || name.includes('srs z3x')) s += 2;
  } else if (a.terrain === 'steep') {
    if (name.includes('isx 2200') || name.includes('isx 3300') || name.includes('is® 600') || name.includes('is® 700') || name.includes('is® 2') || name.includes('is® 6200')) s += 3;
    if (name.includes('srs z1') || name.includes('srs z2') || name.includes('fw15')) s -= 2;
  }

  // Exclude products that aren't really mowers for this context
  if (name.includes('hurricane') || name.includes('procut')) s -= 10;

  return s;
}

function recommend(a: Answers): Product[] {
  const ranked = products
    .map((p) => ({ p, s: score(p, a) }))
    .filter((x) => x.s > -Infinity)
    .sort((a, b) => b.s - a.s);

  // Dedupe by model series name so we don't show 3 versions of ISX 800
  const seen = new Set<string>();
  const picks: Product[] = [];
  for (const { p } of ranked) {
    if (seen.has(p.name)) continue;
    seen.add(p.name);
    picks.push(p);
    if (picks.length === 3) break;
  }
  return picks;
}

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ size: null, use: null, terrain: null, budget: null });
  const [done, setDone] = useState(false);

  const current = QUESTIONS[step];
  const total = QUESTIONS.length;

  const pick = (value: string) => {
    const next = { ...answers, [current.key]: value } as Answers;
    setAnswers(next);
    if (step + 1 < total) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({ size: null, use: null, terrain: null, budget: null });
    setDone(false);
  };

  if (done) {
    const picks = recommend(answers);
    return (
      <div className="bg-[#0a0a0a] min-h-screen text-white">
        <div className="max-w-[1280px] mx-auto px-4 py-12">
          <p className="text-[#C8C8C8] text-xs font-semibold uppercase tracking-widest mb-3">Your matches</p>
          <h1 className="text-3xl md:text-4xl font-black mb-3"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}>
            Here's what we'd put you on
          </h1>
          <p className="text-gray-400 mb-10 max-w-2xl">
            Based on what you told us, these are the Ferris machines worth looking at first. Not sure?
            Call us at (601) 909-5380 — we'll talk it through.
          </p>

          {picks.length === 0 ? (
            <div className="bg-[#111] border border-gray-800 rounded-xl p-8 text-center">
              <p className="text-gray-300 mb-4">We couldn't find a perfect fit in that budget range — but we can still help.</p>
              <a href="tel:6019095380" className="btn-primary inline-block">
                Call (601) 909-5380
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {picks.map((p) => (
                <ProductCard key={p.sku} product={p} />
              ))}
            </div>
          )}

          <div className="bg-[#111] border border-gray-800 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg mb-1">Still not sure which one?</h3>
              <p className="text-gray-400 text-sm">Talk to our team — we'll match you to the right machine and give you a real price.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="tel:6019095380" className="btn-primary text-sm px-6 py-3">Call Sales</a>
              <Link href="/catalog" className="btn-outline text-sm px-6 py-3">Browse Catalog</Link>
              <button onClick={reset} className="text-sm text-gray-400 hover:text-white px-4 py-3">
                Start over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Question {step + 1} of {total}</span>
            <button onClick={reset} className="hover:text-white">Start over</button>
          </div>
          <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C8C8C8] transition-all duration-300"
              style={{ width: `${((step + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        <p className="text-[#C8C8C8] text-xs font-semibold uppercase tracking-widest mb-3">
          Which mower is right for me?
        </p>
        <h1 className="text-2xl md:text-3xl font-bold mb-8 leading-snug">
          {current.question}
        </h1>

        <div className="space-y-3">
          {current.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => pick(opt.value)}
              className="w-full text-left bg-[#1a1a1a] border border-gray-700 hover:border-[#C8C8C8] hover:bg-[#222] transition-all rounded-xl p-5"
            >
              <p className="font-semibold text-white">{opt.label}</p>
              {opt.sub && <p className="text-gray-500 text-sm mt-1">{opt.sub}</p>}
            </button>
          ))}
        </div>

        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="mt-6 text-sm text-gray-500 hover:text-white"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
