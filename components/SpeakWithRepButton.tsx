'use client';

import { useEffect, useState } from 'react';

interface Props {
  /** Page-context string sent with the lead (auto-fills "Interest" field). */
  context?: string;
  /** Tailwind class to style the trigger button. Defaults to outlined CTA style. */
  className?: string;
  /** Button label. Defaults to "Speak with a Representative". */
  label?: string;
}

const DEFAULT_BUTTON_CLASS =
  'block w-full text-center font-bold py-3 px-6 rounded-lg border border-gray-700 text-white hover:bg-gray-900 transition-colors';

export default function SpeakWithRepButton({
  context = 'General inquiry',
  className = DEFAULT_BUTTON_CLASS,
  label = 'Speak with a Representative',
}: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          interest: context,
          propertySize: '',
          message: form.message,
        }),
      });
      if (res.ok) {
        setDone(true);
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          (window as any).gtag('set', 'user_data', {
            email: form.email,
            phone_number: form.phone,
          });
          (window as any).gtag('event', 'conversion', {
            send_to: 'AW-17992871675/pNOLCL2li48cEPvd1YND',
          });
        }
      } else {
        alert(
          "We got your info but our email pipeline hit a snag — please call (601) 909-5380 and we'll take care of it.",
        );
      }
    } catch {
      alert("Something went wrong sending your message. Please call (601) 909-5380.");
    } finally {
      setSubmitting(false);
    }
  };

  const close = () => {
    setOpen(false);
    // Defer state reset so modal exit anim doesn't show empty fields.
    setTimeout(() => {
      setDone(false);
      setForm({ name: '', email: '', phone: '', message: '' });
    }, 250);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {label}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="speak-rep-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8 overflow-y-auto"
          onClick={close}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111] border border-gray-800 rounded-2xl p-6 md:p-8 max-w-md w-full text-white shadow-2xl"
          >
            <div className="flex items-start justify-between mb-1">
              <h2 id="speak-rep-title" className="text-xl md:text-2xl font-bold">
                {done ? 'Thanks — we got it.' : 'Talk to a real person.'}
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="text-gray-400 hover:text-white text-2xl leading-none ml-3"
              >
                ×
              </button>
            </div>

            {done ? (
              <>
                <p className="text-gray-300 mt-3 mb-5">
                  Casey, Brooks, Justin, or Nathan will reach out shortly. During business
                  hours we usually respond within 15 minutes. After hours, first thing the
                  next morning.
                </p>
                <p className="text-xs text-gray-500 mb-5">
                  Need it faster? Call or text us right now at{' '}
                  <a
                    href="tel:6019095380"
                    className="text-[#C8C8C8] font-semibold"
                  >
                    (601) 909-5380
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="w-full bg-[#C8C8C8] hover:bg-white text-black font-bold py-3 rounded-lg transition-colors"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-400 mb-4">
                  Real person responds within 15 minutes during business hours.
                  After hours, first thing the next morning.
                </p>
                <form onSubmit={submit} className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-gray-700 focus:border-[#C8C8C8] rounded-lg px-3 py-2.5 text-white placeholder-gray-500 outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-gray-700 focus:border-[#C8C8C8] rounded-lg px-3 py-2.5 text-white placeholder-gray-500 outline-none"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (optional)"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-gray-700 focus:border-[#C8C8C8] rounded-lg px-3 py-2.5 text-white placeholder-gray-500 outline-none"
                  />
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="What can we help with?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-gray-700 focus:border-[#C8C8C8] rounded-lg px-3 py-2.5 text-white placeholder-gray-500 outline-none resize-y"
                  />
                  <p className="text-xs text-gray-500 leading-snug">
                    Looking at: <span className="text-gray-300">{context}</span>
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#C8C8C8] hover:bg-white text-black font-bold py-3 rounded-lg disabled:opacity-60 transition-colors"
                  >
                    {submitting ? 'Sending…' : 'Send Message'}
                  </button>
                </form>

                <div className="mt-5 pt-5 border-t border-gray-800">
                  <p className="text-xs text-gray-500 mb-3 text-center">Or reach us right now</p>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="tel:6019095380"
                      className="bg-[#0a0a0a] border border-gray-700 hover:border-[#C8C8C8] text-white font-semibold py-3 rounded-lg text-center transition-colors"
                    >
                      📞 Call
                    </a>
                    <a
                      href="sms:+16019095380?body=Hi%20Dykes%20Motors%20Power%20Equipment%2C"
                      className="bg-[#0a0a0a] border border-gray-700 hover:border-[#C8C8C8] text-white font-semibold py-3 rounded-lg text-center transition-colors"
                    >
                      💬 Text
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
