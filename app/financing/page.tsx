'use client';
import { useState } from 'react';
import { products } from '@/lib/products';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
];

// Products eligible for financing (price > $1,500)
const FINANCEABLE_PRODUCTS = products
  .filter((p) => p.price !== null && p.price >= 1500)
  .map((p) => ({
    label: `${p.name}${p.deckSizes.length === 1 ? ` ${p.deckSizes[0]}` : ''} — $${p.price!.toLocaleString()} MAP`,
    price: p.price!,
    sku: p.sku,
    name: p.name,
    deckSize: p.deckSizes.length === 1 ? p.deckSizes[0] : '',
  }));

const inputClass =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#C8C8C8]';
const labelClass = 'block text-sm font-semibold mb-1 text-white';
const sectionClass = 'bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 space-y-4';

const blankPerson = {
  firstName: '', lastName: '', dob: '', ssn: '',
  address: '', city: '', state: 'MS', zip: '',
  yearsAtAddress: '', residenceType: '', monthlyHousingPayment: '',
  phone: '', email: '',
};

const blankEmployment = { status: '', employerName: '', monthlyIncome: '' };

type PrequalResult = 'approved' | 'denied' | null;

function runPrequal(
  equipmentPrice: number,
  monthlyIncome: number,
  monthlyHousing: number,
  employmentStatus: string
): PrequalResult {
  if (!equipmentPrice || !monthlyIncome) return null;
  // Estimated monthly payment: 60-month term at ~8% APR
  const rate = 0.08 / 12;
  const n = 60;
  const estimatedPayment = Math.ceil(
    equipmentPrice * (rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1)
  );
  const totalObligations = estimatedPayment + monthlyHousing;
  const dti = totalObligations / monthlyIncome;
  const hasIncome = monthlyIncome >= 1500;
  const employed = ['Full-Time', 'Part-Time', 'Self-Employed', 'Retired'].includes(employmentStatus);
  return dti <= 0.5 && hasIncome && employed ? 'approved' : 'denied';
}

export default function FinancingPage() {
  const [applicant, setApplicant] = useState({ ...blankPerson });
  const [employment, setEmployment] = useState({ ...blankEmployment });
  const [hasCoApp, setHasCoApp] = useState(false);
  const [coApplicant, setCoApplicant] = useState({ ...blankPerson });
  const [coEmployment, setCoEmployment] = useState({ ...blankEmployment });
  const [selectedSku, setSelectedSku] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [prequalResult, setPrequalResult] = useState<PrequalResult>(null);
  const [submitted, setSubmitted] = useState(false);

  const fieldOf = (
    obj: Record<string, string>,
    setter: (v: Record<string, string>) => void
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setter({ ...obj, [e.target.name]: e.target.value });
  };

  const selectedProduct = FINANCEABLE_PRODUCTS.find((p) => p.sku === selectedSku);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const equipmentPrice = selectedProduct?.price ?? 0;
      const monthlyIncome = parseFloat(employment.monthlyIncome) || 0;
      const monthlyHousing = parseFloat(applicant.monthlyHousingPayment) || 0;

      const result = runPrequal(equipmentPrice, monthlyIncome, monthlyHousing, employment.status);

      const equipmentLabel = selectedProduct?.label ?? 'Not selected';
      await fetch('/api/financing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicant,
          employment,
          coApplicant: hasCoApp ? coApplicant : null,
          coEmployment: hasCoApp ? coEmployment : null,
          equipment: equipmentLabel,
          prequal: result,
        }),
      });

      setPrequalResult(result);
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please call us at (601) 641-5475.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    if (prequalResult === 'approved') {
      return (
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-5">🎉</div>
          <h1 className="text-3xl font-bold mb-3 text-white">You&apos;re Pre-Qualified!</h1>
          <p className="text-gray-300 mb-4 text-lg">
            Based on the information you provided, you appear to meet our basic financing criteria.
          </p>
          <div className="bg-[#1a1a1a] border border-green-700 rounded-xl p-6 mb-6 text-left space-y-2">
            <p className="text-green-400 font-semibold text-sm uppercase tracking-wider">Pre-Qualification Summary</p>
            {selectedProduct && (
              <p className="text-white font-bold text-lg">{selectedProduct.name}{selectedProduct.deckSize ? ` ${selectedProduct.deckSize}` : ''}</p>
            )}
            <p className="text-gray-400 text-sm">
              Our finance team will contact you shortly to finalize your application and confirm your rate.
              Pre-qualification is not a guarantee of credit approval and is subject to verification.
            </p>
          </div>
          <p className="text-gray-400 mb-8">
            Questions? Call us at{' '}
            <a href="tel:6016415475" className="text-[#C8C8C8] font-semibold">(601) 641-5475</a>
            {' '}or email{' '}
            <a href="mailto:info@dykesmotors.com" className="text-[#C8C8C8] font-semibold">info@dykesmotors.com</a>
          </p>
          <a href="/catalog" className="btn-primary">Continue Browsing</a>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-5">📋</div>
        <h1 className="text-3xl font-bold mb-3 text-white">Application Received</h1>
        <p className="text-gray-300 mb-4">
          Based on the information provided, we were unable to automatically pre-qualify your application at this time.
        </p>
        <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 mb-6 text-left space-y-2">
          <p className="text-[#C8C8C8] font-semibold text-sm uppercase tracking-wider">What Happens Next</p>
          <p className="text-gray-300 text-sm">
            Our finance team will personally review your application. We work with multiple lenders and may
            still be able to find a solution — including options with a co-applicant or down payment.
            We will be in touch within one business day.
          </p>
        </div>
        <p className="text-gray-400 mb-8">
          Prefer to speak with someone now? Call{' '}
          <a href="tel:6016415475" className="text-[#C8C8C8] font-semibold">(601) 641-5475</a>
        </p>
        <a href="/catalog" className="btn-primary">Continue Browsing</a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Apply for Financing</h1>
      <p className="text-gray-400 mb-2">
        We work with Sheffield Financial, Synchrony, and Octane to get you the best rate.
        Fill out the form below and you&apos;ll receive an instant pre-qualification decision.
      </p>
      <div className="flex items-center gap-2 mb-4 text-sm text-green-400">
        <span>✓</span>
        <span>No credit impact — pre-qualification uses a soft check only</span>
      </div>

      {/* Tecobi quick-action buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          className="tecobi-quick-qualify-toggle text-sm font-semibold px-4 py-2 rounded-lg bg-[#D4AF37] text-black hover:bg-[#C8A830]"
        >
          Quick Qualify (30 seconds)
        </button>
        <button
          type="button"
          className="tecobi-full-credit-toggle text-sm font-semibold px-4 py-2 rounded-lg border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
        >
          Full Credit App
        </button>
      </div>

      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-[#C8C8C8] mb-3">Financing Options</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="border border-gray-700 rounded-lg p-4">
            <p className="font-bold text-white mb-1">60 Months</p>
            <p className="text-2xl font-bold text-green-400">5.9% APR</p>
            <p className="text-gray-400 mt-1">Shorter term · less interest paid</p>
          </div>
          <div className="border border-gray-700 rounded-lg p-4">
            <p className="font-bold text-white mb-1">72 Months</p>
            <p className="text-2xl font-bold text-green-400">5.9% APR</p>
            <p className="text-gray-400 mt-1">Most popular · balanced payment</p>
          </div>
          <div className="border border-gray-700 rounded-lg p-4">
            <p className="font-bold text-white mb-1">84 Months</p>
            <p className="text-2xl font-bold text-green-400">5.9% APR</p>
            <p className="text-gray-400 mt-1">Lowest monthly payment</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Rates shown are examples and may vary based on creditworthiness, loan amount, and lender. Actual terms are determined after full credit review. All financing is subject to credit approval.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Equipment */}
        <div className={sectionClass}>
          <h2 className="text-lg font-bold text-[#C8C8C8]">Equipment to Finance</h2>
          <div>
            <label className={labelClass}>Select a Ferris Product *</label>
            <select
              required
              value={selectedSku}
              onChange={(e) => setSelectedSku(e.target.value)}
              className={inputClass}
            >
              <option value="">— Select equipment —</option>
              {FINANCEABLE_PRODUCTS.map((p) => (
                <option key={p.sku} value={p.sku}>{p.label}</option>
              ))}
            </select>
          </div>
          {selectedProduct && (
            <div className="bg-[#111] rounded-lg p-3 border border-gray-700 text-sm text-gray-300">
              Selected: <span className="text-white font-semibold">{selectedProduct.label}</span>
            </div>
          )}
        </div>

        {/* Applicant Personal */}
        <div className={sectionClass}>
          <h2 className="text-lg font-bold text-[#C8C8C8]">Your Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>First Name *</label>
              <input required name="firstName" value={applicant.firstName} onChange={fieldOf(applicant, setApplicant as never)} className={inputClass} placeholder="John" />
            </div>
            <div>
              <label className={labelClass}>Last Name *</label>
              <input required name="lastName" value={applicant.lastName} onChange={fieldOf(applicant, setApplicant as never)} className={inputClass} placeholder="Smith" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Date of Birth *</label>
              <input required type="date" name="dob" value={applicant.dob} onChange={fieldOf(applicant, setApplicant as never)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Social Security Number *</label>
              <input required name="ssn" value={applicant.ssn} onChange={fieldOf(applicant, setApplicant as never)} className={inputClass} placeholder="XXX-XX-XXXX" maxLength={11} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Street Address *</label>
            <input required name="address" value={applicant.address} onChange={fieldOf(applicant, setApplicant as never)} className={inputClass} placeholder="123 Main St" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className={labelClass}>City *</label>
              <input required name="city" value={applicant.city} onChange={fieldOf(applicant, setApplicant as never)} className={inputClass} placeholder="Collins" />
            </div>
            <div>
              <label className={labelClass}>State *</label>
              <select required name="state" value={applicant.state} onChange={fieldOf(applicant, setApplicant as never)} className={inputClass}>
                {US_STATES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Zip *</label>
              <input required name="zip" value={applicant.zip} onChange={fieldOf(applicant, setApplicant as never)} className={inputClass} placeholder="39428" maxLength={5} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Years at Address *</label>
              <select required name="yearsAtAddress" value={applicant.yearsAtAddress} onChange={fieldOf(applicant, setApplicant as never)} className={inputClass}>
                <option value="">Select</option>
                <option>Less than 1 year</option>
                <option>1–2 years</option>
                <option>2–5 years</option>
                <option>5–10 years</option>
                <option>10+ years</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Residence Type *</label>
              <select required name="residenceType" value={applicant.residenceType} onChange={fieldOf(applicant, setApplicant as never)} className={inputClass}>
                <option value="">Select</option>
                <option>Own</option>
                <option>Rent</option>
                <option>Living with Family</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Monthly Housing Payment *</label>
              <input required type="number" name="monthlyHousingPayment" value={applicant.monthlyHousingPayment} onChange={fieldOf(applicant, setApplicant as never)} className={inputClass} placeholder="1200" min="0" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Phone *</label>
              <input required type="tel" name="phone" value={applicant.phone} onChange={fieldOf(applicant, setApplicant as never)} className={inputClass} placeholder="(601) 555-0123" />
            </div>
            <div>
              <label className={labelClass}>Email *</label>
              <input required type="email" name="email" value={applicant.email} onChange={fieldOf(applicant, setApplicant as never)} className={inputClass} placeholder="john@example.com" />
            </div>
          </div>
        </div>

        {/* Employment */}
        <div className={sectionClass}>
          <h2 className="text-lg font-bold text-[#C8C8C8]">Employment &amp; Income</h2>

          <div>
            <label className={labelClass}>Employment Status *</label>
            <select required name="status" value={employment.status} onChange={fieldOf(employment, setEmployment as never)} className={inputClass}>
              <option value="">Select</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Self-Employed</option>
              <option>Retired</option>
              <option>Other Income</option>
            </select>
          </div>

          {employment.status && !['Retired', 'Other Income'].includes(employment.status) && (
            <div>
              <label className={labelClass}>Employer Name *</label>
              <input required name="employerName" value={employment.employerName} onChange={fieldOf(employment, setEmployment as never)} className={inputClass} placeholder="ABC Company" />
            </div>
          )}

          <div>
            <label className={labelClass}>Monthly Gross Income *</label>
            <input required type="number" name="monthlyIncome" value={employment.monthlyIncome} onChange={fieldOf(employment, setEmployment as never)} className={inputClass} placeholder="5000" min="0" />
          </div>
        </div>

        {/* Co-applicant toggle */}
        <div className={sectionClass}>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasCoApp}
              onChange={(e) => setHasCoApp(e.target.checked)}
              className="w-4 h-4 accent-[#C8C8C8]"
            />
            <span className="font-semibold text-white">Add a co-applicant</span>
          </label>
          <p className="text-sm text-gray-400">Adding a co-applicant can improve approval odds and rates.</p>
        </div>

        {/* Co-applicant fields */}
        {hasCoApp && (
          <>
            <div className={sectionClass}>
              <h2 className="text-lg font-bold text-[#C8C8C8]">Co-Applicant Information</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>First Name *</label>
                  <input required name="firstName" value={coApplicant.firstName} onChange={fieldOf(coApplicant, setCoApplicant as never)} className={inputClass} placeholder="Jane" />
                </div>
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <input required name="lastName" value={coApplicant.lastName} onChange={fieldOf(coApplicant, setCoApplicant as never)} className={inputClass} placeholder="Smith" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Date of Birth *</label>
                  <input required type="date" name="dob" value={coApplicant.dob} onChange={fieldOf(coApplicant, setCoApplicant as never)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Social Security Number *</label>
                  <input required name="ssn" value={coApplicant.ssn} onChange={fieldOf(coApplicant, setCoApplicant as never)} className={inputClass} placeholder="XXX-XX-XXXX" maxLength={11} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Street Address *</label>
                <input required name="address" value={coApplicant.address} onChange={fieldOf(coApplicant, setCoApplicant as never)} className={inputClass} placeholder="123 Main St" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className={labelClass}>City *</label>
                  <input required name="city" value={coApplicant.city} onChange={fieldOf(coApplicant, setCoApplicant as never)} className={inputClass} placeholder="Collins" />
                </div>
                <div>
                  <label className={labelClass}>State *</label>
                  <select required name="state" value={coApplicant.state} onChange={fieldOf(coApplicant, setCoApplicant as never)} className={inputClass}>
                    {US_STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Zip *</label>
                  <input required name="zip" value={coApplicant.zip} onChange={fieldOf(coApplicant, setCoApplicant as never)} className={inputClass} placeholder="39428" maxLength={5} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Years at Address *</label>
                  <select required name="yearsAtAddress" value={coApplicant.yearsAtAddress} onChange={fieldOf(coApplicant, setCoApplicant as never)} className={inputClass}>
                    <option value="">Select</option>
                    <option>Less than 1 year</option>
                    <option>1–2 years</option>
                    <option>2–5 years</option>
                    <option>5–10 years</option>
                    <option>10+ years</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Residence Type *</label>
                  <select required name="residenceType" value={coApplicant.residenceType} onChange={fieldOf(coApplicant, setCoApplicant as never)} className={inputClass}>
                    <option value="">Select</option>
                    <option>Own</option>
                    <option>Rent</option>
                    <option>Living with Family</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Monthly Housing Payment *</label>
                  <input required type="number" name="monthlyHousingPayment" value={coApplicant.monthlyHousingPayment} onChange={fieldOf(coApplicant, setCoApplicant as never)} className={inputClass} placeholder="1200" min="0" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Phone *</label>
                  <input required type="tel" name="phone" value={coApplicant.phone} onChange={fieldOf(coApplicant, setCoApplicant as never)} className={inputClass} placeholder="(601) 555-0123" />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input required type="email" name="email" value={coApplicant.email} onChange={fieldOf(coApplicant, setCoApplicant as never)} className={inputClass} placeholder="jane@example.com" />
                </div>
              </div>
            </div>

            <div className={sectionClass}>
              <h2 className="text-lg font-bold text-[#C8C8C8]">Co-Applicant Employment &amp; Income</h2>

              <div>
                <label className={labelClass}>Employment Status *</label>
                <select required name="status" value={coEmployment.status} onChange={fieldOf(coEmployment, setCoEmployment as never)} className={inputClass}>
                  <option value="">Select</option>
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Self-Employed</option>
                  <option>Retired</option>
                  <option>Other Income</option>
                </select>
              </div>

              {coEmployment.status && !['Retired', 'Other Income'].includes(coEmployment.status) && (
                <div>
                  <label className={labelClass}>Employer Name *</label>
                  <input required name="employerName" value={coEmployment.employerName} onChange={fieldOf(coEmployment, setCoEmployment as never)} className={inputClass} placeholder="ABC Company" />
                </div>
              )}

              <div>
                <label className={labelClass}>Monthly Gross Income *</label>
                <input required type="number" name="monthlyIncome" value={coEmployment.monthlyIncome} onChange={fieldOf(coEmployment, setCoEmployment as never)} className={inputClass} placeholder="5000" min="0" />
              </div>
            </div>
          </>
        )}

        {/* Consent + submit */}
        <div className={sectionClass}>
          <label className="flex items-start gap-3 cursor-pointer">
            <input required type="checkbox" className="w-4 h-4 mt-0.5 accent-[#C8C8C8]" />
            <span className="text-sm text-gray-300">
              I certify that the information provided is true and accurate, and I authorize
              Dykes Motors Power Equipment to review this application for financing pre-qualification
              purposes. I understand this is not a credit application and does not affect my credit score.
            </span>
          </label>

          <p className="text-xs text-gray-500">
            SSNs are used for identity verification only and are never stored on our servers.
            Pre-qualification results are based on basic financial criteria and do not guarantee credit approval.
          </p>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
            {loading ? 'Checking Pre-Qualification...' : 'Submit & Check Pre-Qualification'}
          </button>
        </div>

      </form>
    </div>
  );
}
