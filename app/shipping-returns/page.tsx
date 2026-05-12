import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Returns | Dykes Motors Power Equipment',
  description: 'Shipping options, delivery times, and return policy for Dykes Motors Power Equipment.',
  alternates: { canonical: 'https://www.dykespower.com/shipping-returns' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you ship Ferris mowers nationwide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Dykes Motors Power Equipment ships Ferris mowers and trailers to all 48 contiguous states. Freight is included on every mower and most trailers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does mower shipping take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most Ferris mowers ship in 3–7 business days. Stocked units leave our Collins, MS shop within 1–2 days; factory-direct units ship in 5–10 business days from Ferris.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast do parts and accessories ship?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Parts and accessories ship same-day if ordered before 2 PM Central. Most arrive in 3–5 business days via UPS or FedEx.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is your return policy on Ferris mowers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'New, unused mowers and parts may be returned within 30 days of delivery for a full refund minus return shipping. Defective items returned within 30 days are refunded in full including shipping. Used or operated mowers are not eligible for return; they fall under Ferris\'s manufacturer warranty.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are mowers covered by warranty?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every Ferris mower comes with the full Ferris factory warranty (typically 3-year limited residential or 1-year/750-hour commercial). Dykes Motors is an authorized warranty service center.',
      },
    },
  ],
};

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 className="text-3xl font-bold mb-2">Shipping & Returns</h1>
      <p className="text-gray-400 mb-10">Last updated: May 2, 2026</p>

      <section className="mb-10">
        <p className="text-gray-300">
          Dykes Motors Power Equipment ships within the contiguous United States. Questions?
          Call <a href="tel:6019095380" className="text-white underline">(601) 909-5380</a> for sales
          or <a href="tel:6013362541" className="text-white underline">(601) 336-2541</a> for parts and service.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Shipping — Parts &amp; Accessories</h2>
        <ul className="space-y-3 text-gray-300">
          <li>
            <span className="font-semibold text-white">FREE shipping</span> on every parts and accessories order — no minimum.
          </li>
          <li>
            <span className="font-semibold text-white">Processing:</span> 1–2 business days.
          </li>
          <li>
            <span className="font-semibold text-white">Delivery:</span> 3–7 business days via tracked carrier.
            Tracking emailed when the label is created.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Shipping — Mowers, Trailers &amp; Large Equipment</h2>
        <ul className="space-y-3 text-gray-300">
          <li>
            <span className="font-semibold text-white">FREE freight shipping</span> on all mowers
            and trailers within the contiguous United States.
          </li>
          <li>
            <span className="font-semibold text-white">Lead time:</span> 7–14 business days from order
            confirmation via tracked freight carrier.
          </li>
          <li>
            <span className="font-semibold text-white">Pickup option:</span> Free pickup at 3069 Hwy 49,
            Collins, MS 39428 during business hours.
          </li>
          <li>
            <span className="font-semibold text-white">Local delivery:</span> Flat fee delivery within
            50 miles of Collins, MS. Confirm coverage at <a href="tel:6019095380" className="text-white underline">(601) 909-5380</a>.
          </li>
          <li>
            <span className="font-semibold text-white">Reserve a unit:</span> $1,000 deposit holds your
            machine. Deposit applies to the purchase price.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Not Shipped</h2>
        <p className="text-gray-300">
          We do not ship to Alaska, Hawaii, Puerto Rico, or outside the United States.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Returns</h2>
        <p className="text-gray-300 mb-4">
          New, unused mowers and parts may be returned within 30 days of delivery for a full refund
          minus return shipping. Defective items returned within 30 days are refunded in full,
          including shipping both ways. Used or operated mowers are not eligible for return;
          they fall under the Ferris manufacturer warranty (see <a href="/warranty" className="text-white underline">warranty page</a>).
        </p>
        <p className="text-gray-300 mb-4">
          To start a return, contact us at{' '}
          <a href="tel:6019095380" className="text-white underline">(601) 909-5380</a> or{' '}
          <a href="mailto:support@dykespower.com" className="text-white underline">support@dykespower.com</a>.
          Returned items must be in original packaging with all included parts, manuals, and accessories.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Refunds</h2>
        <p className="text-gray-300 mb-4">
          Approved refunds are issued to the original payment method within 5–7 business days of
          inspection. Financed purchases are refunded through the lender on the lender&apos;s timeline.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Warranty Coverage</h2>
        <p className="text-gray-300">
          Ferris warranty coverage: 3-year residential / 2-year commercial (coverage varies by model).
          Warranty service is performed at our Collins, MS location. See the{' '}
          <a href="/warranty" className="text-white underline">warranty page</a> for full details.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Contact</h2>
        <ul className="space-y-1 text-gray-300">
          <li>Sales: <a href="tel:6019095380" className="text-white underline">(601) 909-5380</a></li>
          <li>Service &amp; Parts: <a href="tel:6013362541" className="text-white underline">(601) 336-2541</a></li>
          <li>Email: <a href="mailto:support@dykespower.com" className="text-white underline">support@dykespower.com</a></li>
          <li>Address: 3069 Hwy 49, Collins, MS 39428</li>
          <li>Hours: Mon–Fri 9am–6pm · Sat 9am–2pm · Sun Closed</li>
        </ul>
      </section>
    </div>
  );
}
