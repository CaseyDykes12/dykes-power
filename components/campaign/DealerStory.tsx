import Image from 'next/image';

export default function DealerStory() {
  return (
    <section
      id="dealer-story"
      className="bg-dykes-gray-900 py-16 md:py-24 px-4 md:px-8"
      aria-labelledby="dealer-story-heading"
    >
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="relative aspect-[4/3] md:aspect-square rounded-xl overflow-hidden bg-dykes-black border border-dykes-gray-700">
          {/* TODO: replace with team photo once shot */}
          <Image
            src="/images/ferris/campaign/lifestyle-homeowner.webp"
            alt="Ferris zero-turn outside a Mississippi home at golden hour"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute bottom-3 right-3 bg-dykes-black/80 backdrop-blur rounded px-2 py-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/df-logo.png" alt="Dykes Motors" className="h-6 w-auto opacity-90" />
          </div>
        </div>

        <div>
          <p className="text-ferris-yellow text-sm font-semibold tracking-widest uppercase mb-2">
            The Dealer Story
          </p>
          <h2
            id="dealer-story-heading"
            className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.01em' }}
          >
            Family Built. Family Backed.
          </h2>
          <div className="text-dykes-gray-100 text-base md:text-lg leading-relaxed space-y-4 mb-8">
            <p>
              Dykes Motors has been selling trucks out of Collins, Mississippi for years. Power
              Equipment is the new chapter. Same family, same handshake, same
              phone-answered-by-a-human promise.
            </p>
            <p>
              We carry the full Ferris lineup because when you&apos;re running a crew in Mississippi
              heat, your mower needs to work as hard as you do. That&apos;s the Ferris promise. And
              ours.
            </p>
          </div>

          <div className="border-l-2 border-ferris-yellow pl-4 mb-8">
            <p className="text-white font-semibold">3069 Hwy 49, Collins, MS 39428</p>
            <p className="text-dykes-gray-300 text-sm">Mon–Fri 9–6 · Sat 9–2</p>
          </div>

          <a
            href="https://maps.google.com/?cid=3714816284108870885"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-dykes-black font-bold px-8 py-3 rounded-md hover:bg-dykes-gray-100 transition-colors"
          >
            Come See Us →
          </a>
        </div>
      </div>
    </section>
  );
}
