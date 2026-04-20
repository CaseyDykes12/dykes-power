import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Dykes Motors Power Equipment',
  description: 'Privacy policy for Dykes Motors Power Equipment — how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-gray-400 mb-10">Last updated: April 8, 2026</p>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Who We Are</h2>
        <p className="text-gray-300">
          Dykes Motors Power Equipment ("we," "us," or "our") operates dykespower.com. We are an authorized Ferris dealer located at 3069 Hwy 49, Collins, MS 39428. This Privacy Policy describes how we collect, use, and protect information you provide when you use our website.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Information We Collect</h2>
        <p className="text-gray-300 mb-4">We may collect the following types of information:</p>
        <ul className="space-y-3 text-gray-300">
          <li>
            <span className="font-semibold text-white">Contact Information:</span> Name, email address, phone number, and mailing address when you submit a contact form, request a quote, or apply for financing.
          </li>
          <li>
            <span className="font-semibold text-white">Purchase Information:</span> Details about products you purchase or inquire about, including equipment model and pricing.
          </li>
          <li>
            <span className="font-semibold text-white">Usage Data:</span> Information about how you interact with our website, including pages visited, time spent, and referring URLs. This is collected via Google Analytics and similar tools.
          </li>
          <li>
            <span className="font-semibold text-white">Device Information:</span> Browser type, IP address, device type, and operating system.
          </li>
          <li>
            <span className="font-semibold text-white">Cookies:</span> We use cookies and similar tracking technologies to improve your browsing experience and analyze site traffic. You may disable cookies in your browser settings, though some features may not function properly.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">How We Use Your Information</h2>
        <p className="text-gray-300 mb-4">We use the information we collect to:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Respond to your inquiries, quotes, and service requests</li>
          <li>Process transactions and send related information</li>
          <li>Send promotional communications (only if you have opted in)</li>
          <li>Improve our website and customer experience</li>
          <li>Comply with legal obligations</li>
          <li>Run targeted advertising (Google Ads, Meta/Facebook Ads)</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Sharing Your Information</h2>
        <p className="text-gray-300 mb-4">
          We do not sell your personal information. We may share your information with:
        </p>
        <ul className="space-y-3 text-gray-300">
          <li>
            <span className="font-semibold text-white">Service Providers:</span> Third-party vendors who assist us in operating our website, processing payments, and conducting business (e.g., Google, Meta, Stripe, financing partners).
          </li>
          <li>
            <span className="font-semibold text-white">Legal Requirements:</span> We may disclose information when required by law or to protect the rights and safety of our business and customers.
          </li>
          <li>
            <span className="font-semibold text-white">Business Transfers:</span> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Advertising & Analytics</h2>
        <p className="text-gray-300 mb-4">
          We use the following third-party advertising and analytics services:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li><span className="font-semibold text-white">Google Analytics & Google Ads:</span> Tracks website usage and ad performance. <a href="https://policies.google.com/privacy" className="text-white underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
          <li><span className="font-semibold text-white">Meta Pixel (Facebook):</span> Tracks conversions and enables retargeting ads. <a href="https://www.facebook.com/privacy/policy/" className="text-white underline" target="_blank" rel="noopener noreferrer">Meta Privacy Policy</a></li>
        </ul>
        <p className="text-gray-400 mt-4">
          You can opt out of interest-based advertising through the <a href="https://optout.aboutads.info/" className="text-white underline" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance</a> or your browser's ad settings.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Data Security</h2>
        <p className="text-gray-300">
          We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your data.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Your Rights</h2>
        <p className="text-gray-300 mb-4">Depending on your location, you may have the right to:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Request access to the personal information we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your personal information</li>
          <li>Opt out of marketing communications at any time</li>
        </ul>
        <p className="text-gray-400 mt-4">
          To exercise these rights, contact us at <a href="mailto:info@dykesmotors.com" className="text-white underline">info@dykesmotors.com</a>.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Children's Privacy</h2>
        <p className="text-gray-300">
          Our website is not directed to children under 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Changes to This Policy</h2>
        <p className="text-gray-300">
          We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date. Your continued use of the website after changes constitutes acceptance of the updated policy.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Contact Us</h2>
        <p className="text-gray-300">Questions or concerns about this Privacy Policy? Contact us:</p>
        <ul className="mt-3 space-y-1 text-gray-300">
          <li>Dykes Motors Power Equipment</li>
          <li>3069 Hwy 49, Collins, MS 39428</li>
          <li>Phone: <a href="tel:6019095380" className="text-white underline">(601) 909-5380</a></li>
          <li>Email: <a href="mailto:info@dykesmotors.com" className="text-white underline">info@dykesmotors.com</a></li>
        </ul>
      </section>
    </div>
  );
}
