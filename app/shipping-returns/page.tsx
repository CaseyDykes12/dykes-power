import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Returns | Dykes Motors Power Equipment',
  description: 'Shipping, delivery, and return policy for Dykes Motors Power Equipment — Authorized Ferris Dealer in Collins, MS.',
};

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Shipping & Returns</h1>
      <p className="text-gray-400 mb-10">Last updated: April 14, 2026</p>

      <section className="mb-10">
        <p className="text-gray-300">
          Dykes Motors Power Equipment is an authorized Ferris dealership at{' '}
          <span className="font-semibold text-white">3069 Hwy 49, Collins, MS 39428</span>.
          We ship parts and accessories nationally from our Collins location and the Ferris distribution network. Mowers, trailers, and large equipment are handled locally — reserve online with a $1,000 deposit and finalize in person, or arrange local delivery within 50 miles of Collins. Questions? Call{' '}
          <a href="tel:6019095380" className="text-white underline">(601) 909-5380</a> (sales) or{' '}
          <a href="tel:6013362541" className="text-white underline">(601) 336-2541</a> (parts & service).
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Returns</h2>
        <p className="text-gray-300 mb-4">
          All sales are final except for manufacturer defects. Defective products may be returned or addressed through our service department under the Ferris manufacturer warranty. We do not accept returns for non-defective items (change of mind, wrong selection, or buyer's remorse).
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Exchanges</h2>
        <p className="text-gray-300">
          Exchanges are not accepted. If you are unsure which model is right for your property, please contact our sales team before purchase at{' '}
          <a href="tel:6019095380" className="text-white underline">(601) 909-5380</a>. We're happy to help you pick the right machine the first time.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Defective Products</h2>
        <p className="text-gray-300 mb-4">If you receive a defective product:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-300">
          <li>Contact us within 7 days at <a href="tel:6019095380" className="text-white underline">(601) 909-5380</a> or <a href="mailto:info@dykesmotors.com" className="text-white underline">info@dykesmotors.com</a></li>
          <li>Our service department will inspect the equipment and coordinate warranty service with Ferris</li>
          <li>Warranty repairs are handled by our experienced techs at the Collins, MS shop</li>
        </ol>
        <p className="text-gray-400 mt-4">
          Ferris warranty coverage: 3-year residential / 2-year commercial (coverage varies by model).
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Refunds</h2>
        <p className="text-gray-300 mb-4">
          If a product is confirmed defective and cannot be repaired or replaced under warranty, a refund will be issued to the original payment method within 5–7 business days after our service department completes the inspection.
        </p>
        <ul className="space-y-2 text-gray-300">
          <li>
            <span className="font-semibold text-white">Credit/debit card purchases:</span> Refund issued to the original card. Allow 5–7 business days for the refund to appear on your statement.
          </li>
          <li>
            <span className="font-semibold text-white">Financed purchases:</span> Refund coordinated with the financing provider. Timeline depends on the lender.
          </li>
          <li>
            <span className="font-semibold text-white">Cash or check purchases:</span> Refund issued by company check within 5–7 business days.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Shipping — Parts & Accessories</h2>
        <ul className="space-y-3 text-gray-300">
          <li>
            <span className="font-semibold text-white">Flat rate:</span> $12.99 per order within the continental United States.
          </li>
          <li>
            <span className="font-semibold text-white">Free shipping:</span> Orders of $75 or more ship free within the continental US.
          </li>
          <li>
            <span className="font-semibold text-white">Processing:</span> 1–2 business days. In-stock items ship from our Collins, MS location; certain parts drop-ship directly from the Ferris distributor.
          </li>
          <li>
            <span className="font-semibold text-white">Delivery:</span> 3–7 business days via USPS, UPS, or FedEx depending on the item. Tracking emailed when the label is created.
          </li>
          <li>
            <span className="font-semibold text-white">Not shipped:</span> Alaska, Hawaii, Puerto Rico, and international. Call (601) 336-2541 for special arrangements.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Mowers & Large Equipment</h2>
        <p className="text-gray-300 mb-3">
          Zero-turn mowers, walk-behinds, and stand-on units are <span className="font-semibold text-white">not shipped</span> via standard carrier. Delivery works one of two ways:
        </p>
        <ul className="space-y-3 text-gray-300">
          <li>
            <span className="font-semibold text-white">Reserve online with a $1,000 deposit:</span> Secure the unit from our inventory. We finalize payment and hand you the keys at 3069 Hwy 49, Collins, MS. Your deposit applies to the purchase price.
          </li>
          <li>
            <span className="font-semibold text-white">Local delivery:</span> Flat fee delivery within 50 miles of Collins, MS. Call (601) 909-5380 before placing a reservation to confirm coverage and schedule.
          </li>
          <li>
            <span className="font-semibold text-white">Outside the 50-mile zone:</span> Pickup at the dealership, or call us to quote freight. We do not ship mowers blind — we want you to inspect and sign off at delivery.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Trailers</h2>
        <p className="text-gray-300">
          Utility trailers sold locally only — pickup at 3069 Hwy 49, Collins, MS. Local delivery available for a fee; call (601) 909-5380 for a quote.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Contact Us</h2>
        <ul className="space-y-1 text-gray-300">
          <li>Sales: <a href="tel:6019095380" className="text-white underline">(601) 909-5380</a></li>
          <li>Service & Parts: <a href="tel:6013362541" className="text-white underline">(601) 336-2541</a></li>
          <li>Email: <a href="mailto:info@dykesmotors.com" className="text-white underline">info@dykesmotors.com</a></li>
          <li>Address: 3069 Hwy 49, Collins, MS 39428</li>
          <li>Hours: Mon–Fri 9am–6pm · Sat 9am–2pm · Sun Closed</li>
        </ul>
      </section>
    </div>
  );
}
