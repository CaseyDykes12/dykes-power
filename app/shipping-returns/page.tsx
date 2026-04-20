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
          Dykes Motors Power Equipment is a local authorized Ferris mower dealership located at{' '}
          <span className="font-semibold text-white">3069 Hwy 49, Collins, MS 39428</span>.
          Most purchases are picked up in person at our location. Local delivery may be available for a fee — call{' '}
          <a href="tel:6019095380" className="text-white underline">(601) 909-5380</a> for a quote.
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
          <li>Warranty repairs are handled by certified technicians at our Collins, MS facility</li>
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
        <h2 className="text-xl font-bold mb-3">Shipping</h2>
        <ul className="space-y-3 text-gray-300">
          <li>
            <span className="font-semibold text-white">In-store pickup:</span> Most equipment purchases require pickup at 3069 Hwy 49, Collins, MS.
          </li>
          <li>
            <span className="font-semibold text-white">Local delivery:</span> Available for a fee within the Collins/Hattiesburg area. Call (601) 909-5380 for a quote.
          </li>
          <li>
            <span className="font-semibold text-white">Parts & accessories:</span> Ship within the continental US. Processing 1–2 business days; delivery 3–7 business days. Shipping cost quoted before order is finalized.
          </li>
          <li>
            <span className="font-semibold text-white">Area served:</span> United States (in-store purchases) · Mississippi and surrounding states (local delivery).
          </li>
        </ul>
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
