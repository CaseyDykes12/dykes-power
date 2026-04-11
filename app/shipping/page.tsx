import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Returns | Dykes Motors Power Equipment',
  description: 'Shipping, delivery, and return policy for Dykes Motors Power Equipment — Authorized Ferris Dealer in Collins, MS.',
};

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Shipping & Returns</h1>
      <p className="text-gray-400 mb-10">Last updated: April 8, 2026</p>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Delivery & Pickup</h2>
        <p className="text-gray-300 mb-4">
          Dykes Motors Power Equipment is a local dealership serving Collins, Mississippi and the surrounding area. Most purchases are picked up in person at our location:
        </p>
        <p className="text-gray-300 font-semibold">3069 Hwy 49, Collins, MS 39428</p>
        <p className="text-gray-400 mt-2">
          Local delivery may be available within a limited radius for an additional fee. Contact us at{' '}
          <a href="tel:6016415475" className="text-white underline">(601) 641-5475</a> to discuss delivery options for your order.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Shipping</h2>
        <p className="text-gray-300 mb-4">
          For smaller items such as parts and accessories, shipping may be available. Shipping costs are calculated based on item weight, dimensions, and destination. You will be provided a shipping quote before your order is finalized.
        </p>
        <p className="text-gray-400">
          We ship to addresses within the continental United States only. Shipping times vary by carrier and destination but are typically 3–7 business days after processing.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Returns & Exchanges</h2>
        <p className="text-gray-300 mb-4">
          We want you to be completely satisfied with your purchase. Our return policy is as follows:
        </p>
        <ul className="space-y-3 text-gray-300">
          <li>
            <span className="font-semibold text-white">New Equipment:</span> New mowers and equipment may be returned within 7 days of purchase in original, unused condition with all original packaging and documentation. A restocking fee of up to 15% may apply.
          </li>
          <li>
            <span className="font-semibold text-white">Parts & Accessories:</span> New, unused parts may be returned within 30 days with receipt. Items must be in original packaging and uninstalled.
          </li>
          <li>
            <span className="font-semibold text-white">Non-Returnable Items:</span> Special-order items, electrical parts, and items that have been installed or used are not eligible for return.
          </li>
          <li>
            <span className="font-semibold text-white">Defective Items:</span> If you receive a defective item, contact us immediately. Manufacturer warranty claims will be handled directly with the manufacturer (Ferris / Briggs & Stratton).
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Warranty</h2>
        <p className="text-gray-300 mb-4">
          All new Ferris equipment is sold with the manufacturer's warranty. Warranty service is performed at our dealership by our certified technicians. Contact our service department at{' '}
          <a href="tel:6013362541" className="text-white underline">(601) 336-2541</a> to schedule warranty service.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">How to Initiate a Return</h2>
        <p className="text-gray-300 mb-4">To initiate a return or exchange:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-300">
          <li>Contact us by phone at (601) 641-5475 or by email at <a href="mailto:info@dykesmotors.com" className="text-white underline">info@dykesmotors.com</a></li>
          <li>Provide your name, order details, and reason for return</li>
          <li>We will provide return instructions and a return authorization if applicable</li>
          <li>Items must be returned in original condition with all original documentation</li>
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Contact Us</h2>
        <p className="text-gray-300">
          Questions about your order or our shipping and returns policy? We're here to help.
        </p>
        <ul className="mt-3 space-y-1 text-gray-300">
          <li>Phone: <a href="tel:6016415475" className="text-white underline">(601) 641-5475</a></li>
          <li>Email: <a href="mailto:info@dykesmotors.com" className="text-white underline">info@dykesmotors.com</a></li>
          <li>Address: 3069 Hwy 49, Collins, MS 39428</li>
          <li>Hours: Mon–Fri 9am–6pm, Sat 9am–2pm</li>
        </ul>
      </section>
    </div>
  );
}
