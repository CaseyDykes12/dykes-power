import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SMS Terms & Conditions | Dykes Motors',
  description: 'Text message program terms for Dykes Motors and Dykes Motors Power Equipment — opt-in, opt-out, message frequency, and rates.',
};

export default function SmsTermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">SMS Terms & Conditions</h1>
      <p className="text-gray-400 mb-10">Last updated: May 2, 2026</p>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Program Name</h2>
        <p className="text-gray-300">
          Dykes Motors Customer Messaging — operated by Dykes Motors, LLC (which does business as Dykes Motors and Dykes Motors Power Equipment), 3069 Hwy 49, Collins, MS 39428.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Program Description</h2>
        <p className="text-gray-300 mb-4">
          By opting in to our SMS program, you agree to receive text messages from Dykes Motors related to your customer relationship with us, which may include:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Responses to lead inquiries, credit applications, and appointment requests submitted on dykesmotors.com or dykespower.com</li>
          <li>Vehicle and equipment availability, pricing, and trade-in updates</li>
          <li>Appointment reminders and confirmations</li>
          <li>Service, parts, and warranty status updates</li>
          <li>Limited promotional offers from Dykes Motors and Dykes Motors Power Equipment</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">How to Opt In</h2>
        <p className="text-gray-300">
          You may opt in to text messages from Dykes Motors in any of the following ways: (1) submitting a lead, credit application, or appointment form on dykesmotors.com or dykespower.com and providing your phone number with consent to text messages; (2) texting <strong className="text-white">START</strong> to <a href="tel:6015167255" className="text-white underline">(601) 516-7255</a>; (3) verbally providing your phone number and consenting at our dealership at 3069 Hwy 49, Collins, MS 39428.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">How to Opt Out</h2>
        <p className="text-gray-300">
          You can opt out of our SMS program at any time by replying <strong className="text-white">STOP</strong> to any message from Dykes Motors. After replying STOP, you will receive one final confirmation that you have been unsubscribed and will not receive further text messages from us. To opt back in, reply <strong className="text-white">START</strong>.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">How to Get Help</h2>
        <p className="text-gray-300">
          Reply <strong className="text-white">HELP</strong> to any message for support, or contact us at <a href="tel:6016415475" className="text-white underline">(601) 641-5475</a> or <a href="mailto:info@dykesmotors.com" className="text-white underline">info@dykesmotors.com</a>.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Message Frequency</h2>
        <p className="text-gray-300">
          Message frequency varies based on your interaction with Dykes Motors. You may receive messages in response to forms you submit, when an appointment is scheduled or updated, when your inquiry status changes, or as periodic follow-ups. We do not send a fixed number of messages per week or month.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Message and Data Rates</h2>
        <p className="text-gray-300">
          Message and data rates may apply. Standard text messaging rates from your wireless carrier apply to all messages sent and received. Dykes Motors does not charge for SMS messages, but your carrier may. Contact your carrier for details about your messaging plan.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Carrier Disclaimer</h2>
        <p className="text-gray-300">
          Carriers are not liable for delayed or undelivered messages. SMS messages are supported by major U.S. carriers including AT&T, Verizon, T-Mobile, and U.S. Cellular.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Privacy</h2>
        <p className="text-gray-300">
          Information you share with Dykes Motors via SMS — including your phone number — is handled per our <a href="/privacy" className="text-white underline">Privacy Policy</a>. Your mobile number and consent information are not shared with third parties for marketing purposes. Carriers and our SMS service provider (Twilio) may process messages to deliver them.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Eligibility</h2>
        <p className="text-gray-300">
          You must be 18 years or older and the account holder, or have the account holder's permission, to opt in to our SMS program. By opting in you confirm that you meet these requirements.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Changes to These Terms</h2>
        <p className="text-gray-300">
          We may update these SMS Terms from time to time. The "Last updated" date above reflects the most recent revision. Continued participation in our SMS program after changes are posted constitutes acceptance.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Contact</h2>
        <ul className="space-y-1 text-gray-300">
          <li>Dykes Motors, LLC</li>
          <li>3069 Hwy 49, Collins, MS 39428</li>
          <li>Sales: <a href="tel:6016415475" className="text-white underline">(601) 641-5475</a></li>
          <li>SMS line: <a href="tel:6015167255" className="text-white underline">(601) 516-7255</a></li>
          <li>Email: <a href="mailto:info@dykesmotors.com" className="text-white underline">info@dykesmotors.com</a></li>
        </ul>
      </section>
    </div>
  );
}
