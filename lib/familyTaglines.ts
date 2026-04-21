// Verbatim family taglines from the Ferris 2026 Product Catalog.
// Rendered on product detail pages with attribution.

interface FamilyTagline {
  match: (compactName: string) => boolean;
  tagline: string;
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const FAMILIES: FamilyTagline[] = [
  // Diesel IS — match before plain IS so IS 2600 / IS 6200 land here.
  {
    match: (n) => n.includes('is2600') || n.includes('is6200'),
    tagline:
      "Step up to the diesel IS Series for exceptional performance in an industry-leading package. With powerful engine options from CAT and Yanmar there is a reliable diesel solution to answer any challenge. Plus, while they pack a punch for performance, they don't sacrifice comfort with their patented 4-point suspension system.",
  },
  // ISX — match before plain IS so ISX models don't fall into IS Series.
  {
    match: (n) => n.includes('isx800') || n.includes('isx2200') || n.includes('isx3300'),
    tagline:
      'Our leadership in suspension technology excels in the industry-leading ForeFront Suspension System. Delivering a premium, cushioned ride that drastically reduces shock to your body, as well as the mower, and enables you to mow faster and get done quicker than ever before.',
  },
  // IS Series (residential premium).
  {
    match: (n) => n.includes('is600') || n.includes('is700'),
    tagline:
      'End the day feeling good with the IS Series commercially-inspired mowers featuring patented suspension technology and powerful engine options. Whether you run a fleet or are an owner-operator there is a unique solution for you.',
  },
  // SRS Stand-On.
  {
    match: (n) => n.includes('srsz1') || n.includes('srsz2') || n.includes('srsz3'),
    tagline:
      'The Soft Ride Stand-on Series delivers the kind of heightened productivity that has become synonymous with the Ferris brand, in a stand-on machine. Precision-engineered for superior maneuverability and balanced stability and traction, loaded with innovative features that help you work faster, take on more jobs, and finish the day feeling good.',
  },
  // F Series (F60).
  {
    match: (n) => n.includes('f60'),
    tagline:
      'The F Series pairs essential commercial-grade components with a compact, sturdy frame to allow for easy maneuverability in tight spaces.',
  },
  // R & S Series (300R, 300S, 500S). Skip 300e (electric, no catalog tagline).
  {
    match: (n) =>
      (n.includes('300r') || n.includes('300s') || n.includes('500s')) && !n.includes('300e'),
    tagline:
      'The 300 series delivers power in a compact size. Designed for smaller lot lines or maneuvering around intricate landscaping, with suspension for a smooth operation.',
  },
  // ProCut S.
  {
    match: (n) => n.includes('procuts'),
    tagline:
      'Getting under low branches and along fencing is quick work for the front-mounted deck of the ProCut S. Easy to use and service, with high visibility.',
  },
  // FW Walk-Behind.
  {
    match: (n) => n.includes('fw15') || n.includes('fw25') || n.includes('fw45'),
    tagline:
      "This isn't the mower you grew up pushing. Ferris Walk Behinds are meticulously built to help pros make quick work of trim and slope cutting. Ergonomic controls built around you and a variety of cutting widths make these mowers a valuable secret weapon for any crew.",
  },
  // FB Hurricane Blowers.
  {
    match: (n) => n.includes('fb1000') || n.includes('fb2000') || n.includes('fb3000'),
    tagline:
      'Step up your turf clean up game with the Ferris line of stand-on blowers. Designed to provide maximum air flow and power for effective lawn clean up, the Hurricane signature patented Dual Air Flow System splits the air-stream for deep cleaning and blowing the debris to the desired distance.',
  },
  // FS Spreaders / spreader-sprayers (Rover, Pathfinder, Venture X, FS-prefixed).
  {
    match: (n) =>
      n.includes('rover') ||
      n.includes('pathfinder') ||
      n.includes('venturex') ||
      n.includes('venturexc') ||
      n.includes('fs1200') ||
      n.includes('fs2100') ||
      n.includes('fs2200') ||
      n.includes('fs3200'),
    tagline:
      'The Ferris line of spreaders and spreader/sprayers allows you to provide a personalized treatment for each of your clients. No more one-size-fits-all application of granular and liquid chemicals.',
  },
];

export const FAMILY_TAGLINE_ATTRIBUTION = 'From the Ferris 2026 Product Catalog.';

export function getFamilyTagline(productName: string): string | null {
  const compact = normalize(productName);
  for (const f of FAMILIES) {
    if (f.match(compact)) return f.tagline;
  }
  return null;
}
