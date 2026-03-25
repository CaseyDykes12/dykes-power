import Link from 'next/link';

export default function ServicePage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">Service & Repairs</h1>
        <p className="text-gray-500">
          Dykes Motors Power Equipment services all Ferris mowers and most major brands.
          Our technicians are trained to keep your equipment running at peak performance.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: '🔧',
            title: 'Routine Maintenance',
            items: ['Oil changes', 'Blade sharpening & replacement', 'Belt inspection & replacement', 'Filter service', 'Seasonal tune-ups'],
          },
          {
            icon: '⚙️',
            title: 'Repairs',
            items: ['Engine diagnostics & repair', 'Hydrostatic drive service', 'Deck repair & fabrication', 'Electrical systems', 'Suspension service'],
          },
          {
            icon: '📦',
            title: 'Parts',
            items: ['OEM Ferris parts', 'Aftermarket options available', 'Same-day if in stock', 'Order turnaround varies', 'Call for availability'],
          },
        ].map((section) => (
          <div key={section.title} className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-3xl mb-3">{section.icon}</p>
            <h3 className="font-bold text-lg mb-3">{section.title}</h3>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-gray-600">
                  <span className="text-[#C8C8C8]">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-black text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Schedule Service</h2>
        <p className="text-gray-300 mb-6">
          Contact us to schedule a service appointment or drop your equipment off at our Collins, MS location.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:6016062095" className="btn-primary">
            Call (601) 606-2095
          </a>
          <Link href="/contact" className="btn-outline">
            Request Service Online
          </Link>
        </div>
      </div>
    </div>
  );
}
