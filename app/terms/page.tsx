import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Dykes Motors Power Equipment',
  description: 'Terms of service for Dykes Motors Power Equipment — authorized Ferris dealer in Collins, MS.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <p className="text-gray-400 mb-10">Last updated: April 8, 2026</p>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Agreement to Terms</h2>
        <p className="text-gray-300">
          By accessing or using the dykespower.com website ("Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Site. These Terms apply to all visitors, users, and customers of Dykes Motors Power Equipment.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">About Us</h2>
        <p className="text-gray-300">
          Dykes Motors Power Equipment is an authorized Ferris dealer located at 3069 Hwy 49, Collins, MS 39428. We sell new commercial outdoor power equipment, parts, and accessories, and provide service and repair.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Products & Pricing</h2>
        <ul className="space-y-3 text-gray-300">
          <li>
            <span className="font-semibold text-white">Pricing:</span> All prices listed on the Site are in U.S. dollars. Prices are subject to change without notice. Prices on the Site may differ from in-store prices. We reserve the right to correct pricing errors.
          </li>
          <li>
            <span className="font-semibold text-white">Availability:</span> Product availability is subject to change. Listing a product on our Site does not guarantee it is in stock. Contact us to confirm availability before visiting.
          </li>
          <li>
            <span className="font-semibold text-white">MAP Pricing:</span> Ferris equipment is subject to Minimum Advertised Price (MAP) policies set by the manufacturer. Prices shown are consistent with MAP requirements.
          </li>
          <li>
            <span className="font-semibold text-white">Financing:</span> Financing offers are subject to credit approval through Sheffield Financial or other financing partners. Rates and terms are subject to change.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Online Purchases & Checkout</h2>
        <p className="text-gray-300 mb-4">
          When you complete a purchase through our Site, you agree to provide accurate and complete information. Payment is processed securely through Stripe. By placing an order, you authorize us to charge the payment method provided.
        </p>
        <p className="text-gray-300">
          Online purchases are subject to our Shipping & Returns policy. Large equipment purchases may require in-person pickup or local delivery arrangements.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Prohibited Uses</h2>
        <p className="text-gray-300 mb-4">You may not use our Site to:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Violate any applicable laws or regulations</li>
          <li>Submit false or misleading information</li>
          <li>Transmit any harmful, offensive, or disruptive content</li>
          <li>Attempt to gain unauthorized access to any part of our systems</li>
          <li>Collect or harvest any information about other users</li>
          <li>Use automated tools to scrape or access the Site without permission</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Intellectual Property</h2>
        <p className="text-gray-300">
          All content on this Site — including text, images, logos, and design — is the property of Dykes Motors Power Equipment or its licensors (including Ferris / Briggs & Stratton). You may not reproduce, distribute, or create derivative works without our written permission. Ferris® and related trademarks are the property of Briggs & Stratton, LLC.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Disclaimers</h2>
        <p className="text-gray-300 mb-4">
          The Site is provided "as is" without warranties of any kind. We do not warrant that the Site will be error-free, uninterrupted, or free of viruses. Product images and descriptions are for illustrative purposes and may not represent exact specifications of in-stock units.
        </p>
        <p className="text-gray-300">
          Manufacturer warranties are provided by Ferris / Briggs & Stratton and are subject to their terms and conditions. We are not responsible for the performance of manufacturer warranties.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Limitation of Liability</h2>
        <p className="text-gray-300">
          To the maximum extent permitted by law, Dykes Motors Power Equipment shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this Site or purchase of products. Our total liability shall not exceed the amount you paid for the product or service in question.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Governing Law</h2>
        <p className="text-gray-300">
          These Terms are governed by the laws of the State of Mississippi. Any disputes shall be resolved in the courts of Covington County, Mississippi.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Changes to Terms</h2>
        <p className="text-gray-300">
          We reserve the right to modify these Terms at any time. Changes will be effective upon posting to the Site with an updated date. Your continued use of the Site after changes constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Contact Us</h2>
        <p className="text-gray-300">Questions about these Terms? Contact us:</p>
        <ul className="mt-3 space-y-1 text-gray-300">
          <li>Dykes Motors Power Equipment</li>
          <li>3069 Hwy 49, Collins, MS 39428</li>
          <li>Phone: <a href="tel:6016415475" className="text-white underline">(601) 641-5475</a></li>
          <li>Email: <a href="mailto:info@dykesmotors.com" className="text-white underline">info@dykesmotors.com</a></li>
        </ul>
      </section>
    </div>
  );
}
