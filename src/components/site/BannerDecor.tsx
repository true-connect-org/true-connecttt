/**
 * Poster-style decoration for the navy page banners: faint constellation lines with white and
 * brand-yellow nodes, and the yellow "circuit" line with a glowing dot from True Connect's posters.
 * Each page gets its own arrangement so the banners never look the same. Purely decorative.
 */
type Node = [number, number, boolean];
const netA: { nodes: Node[]; links: number[][] } = {
  nodes: [[20, 40, false], [110, 20, false], [70, 110, true], [180, 70, true], [150, 170, false], [40, 200, true], [230, 150, false], [260, 60, false]],
  links: [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [4, 5], [3, 6], [4, 6], [3, 7]],
};
const netB: { nodes: Node[]; links: number[][] } = {
  nodes: [[60, 30, true], [170, 60, false], [120, 140, true], [230, 120, false], [90, 230, false], [200, 220, true], [260, 30, false], [30, 150, false]],
  links: [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [4, 5], [3, 5], [1, 6], [2, 7]],
};

const Net = ({ net, className }: { net: typeof netA; className: string }) => (
  <svg aria-hidden viewBox="0 0 280 260" className={`pointer-events-none absolute ${className}`}>
    {net.links.map(([a, b], i) => (
      <line key={i} x1={net.nodes[a][0]} y1={net.nodes[a][1]} x2={net.nodes[b][0]} y2={net.nodes[b][1]} stroke="#ffffff" strokeOpacity="0.14" strokeWidth="0.8" />
    ))}
    {net.nodes.map(([x, y, yellow], i) => (
      <circle key={i} cx={x} cy={y} r={yellow ? 2.6 : 2} fill={yellow ? "#E6E84A" : "#ffffff"} opacity={yellow ? 0.95 : 0.55} />
    ))}
  </svg>
);

/** Circuit line: a straight run that steps up (or down) with a glowing dot, as on the posters. */
const Circuit = ({ className, square = false }: { className: string; square?: boolean }) => {
  const dotX = square ? 78 : 38; // % along the line
  return (
    <div aria-hidden className={`pointer-events-none absolute ${className}`}>
      <svg viewBox="0 0 600 80" preserveAspectRatio="none" className="h-full w-full">
        <path d={square ? "M14 14 H260 C300 14 305 62 345 62 H600" : "M0 62 H360 C400 62 405 14 445 14 H600"} fill="none" stroke="#E6E84A" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      {square && <span className="absolute left-0 top-[10%] h-3 w-3 bg-[#E6E84A]" />}
      {/* glowing dot (HTML, so it stays round however the line stretches) */}
      <span className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fffbc2] shadow-[0_0_12px_4px_rgba(230,232,74,0.7)]" style={{ left: `${dotX}%`, top: "77.5%" }} />
    </div>
  );
};

export type BannerVariant = "about" | "services" | "insights" | "contact";

const BannerDecor = ({ variant = "services" }: { variant?: BannerVariant }) => {
  switch (variant) {
    // About: like the A4 poster - constellation top-right, circuit line running across the bottom
    case "about":
      return (
        <>
          <Net net={netA} className="-right-6 top-20 h-[200px] w-[220px] opacity-90 sm:h-[260px] sm:w-[290px]" />
          <Circuit className="left-0 bottom-8 hidden h-[44px] w-[30%] md:block" />
        </>
      );
    // Insights: constellations on both sides, no circuit - calm and editorial
    case "insights":
      return (
        <>
          <Net net={netB} className="-left-8 top-24 h-[200px] w-[220px] opacity-80 sm:h-[250px] sm:w-[280px]" />
          <Net net={netA} className="-right-8 bottom-0 hidden h-[230px] w-[260px] opacity-80 md:block" />
        </>
      );
    // Contact: circuit line rising from the left into the content, constellation bottom-right
    case "contact":
      return (
        <>
          <Circuit square className="left-0 bottom-8 hidden h-[44px] w-[34%] md:block" />
          <Net net={netB} className="-right-6 -bottom-4 h-[190px] w-[210px] opacity-85 sm:h-[250px] sm:w-[280px]" />
        </>
      );
    // Services (and service / article pages): constellation left, circuit top-right
    default:
      return (
        <>
          <Net net={netA} className="-left-6 top-24 h-[180px] w-[200px] opacity-80 sm:top-20 sm:h-[240px] sm:w-[260px]" />
          <Net net={netB} className="-right-8 bottom-2 hidden h-[220px] w-[240px] opacity-80 md:block lg:h-[260px] lg:w-[280px]" />
          <Circuit square className="right-0 top-24 hidden h-[56px] w-[320px] md:block lg:w-[420px]" />
        </>
      );
  }
};

export default BannerDecor;
