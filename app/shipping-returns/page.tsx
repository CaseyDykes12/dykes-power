import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Returns | Dykes Motors Power Equipment',
  description: 'Shipping options, delivery times, and return policy for Dykes Motors Power Equipment.',
};

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Shipping & Returns</h1>
      <p className="text-gray-400 mb-10">Last updated: April 27, 2026</p>

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
            <span className="font-semibold text-white">Flat rate:</span> $12.99 per order.
          </li>
          <li>
            <span className="font-semibold text-white">Free shipping:</span> Orders of $75 or more.
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
            <span className="font-semibold text-white">Delivery:</span> Shipped via tracked freight carrier
            within the contiguous United States. Shipping cost is calculated based on destination
            and confirmed before your order is finalized.
          </li>
          <li>
            <span className="font-semibold text-white">Lead time:</span> 7–14 business days from order
            confirmation, depending on destination.
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
          Defective items may be returned within 7 days of delivery. Contact us at{' '}
          <a href="tel:6019095380" className="text-white underline">(601) 909-5380</a> or{' '}
          <a href="mailto:info@dykesmotors.com" className="text-white underline">info@dykesmotors.com</a>{' '}
          to start a return. We do not accept returns for change of mind, wrong selection, or
          buyer&apos;s remorse.
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
          <li>Email: <a href="mailto:info@dykesmotors.com" className="text-white underline">info@dykesmotors.com</a></li>
          <li>Address: 3069 Hwy 49, Collins, MS 39428</li>
          <li>Hours: Mon–Fri 9am–6pm · Sat 9am–2pm · Sun Closed</li>
        </ul>
      </section>
    </div>
  );
}
