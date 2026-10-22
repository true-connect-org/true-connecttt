/**
 * Poster-style decoration for the navy page banners: faint constellation lines with white and
 * brand-yellow nodes, as on True Connect's posters.
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

export type BannerVariant = "about" | "services" | "insights" | "contact";

const BannerDecor = ({ variant = "services" }: { variant?: BannerVariant }) => {
  switch (variant) {
    // About: like the A4 poster - constellation top-right, circuit line running across the bottom
    case "about":
      return (
        <>
          <Net net={netA} className="-left-6 top-20 h-[200px] w-[220px] opacity-90 sm:h-[260px] sm:w-[290px]" />
        </>
      );
    // Insights: one constellation bottom-right, no circuit - calm and editorial
    case "insights":
      return (
        <>
          <Net net={netA} className="-right-6 -bottom-2 h-[190px] w-[210px] opacity-85 sm:h-[250px] sm:w-[280px]" />
        </>
      );
    // Contact: constellation bottom-left, short circuit line bottom-right
    case "contact":
      return (
        <>
          <Net net={netB} className="-left-10 -bottom-12 h-[190px] w-[210px] opacity-85 sm:h-[250px] sm:w-[280px]" />
        </>
      );
    // Services (and service / article pages): constellation left, circuit top-right
    default:
      return (
        <>
          <Net net={netA} className="-right-6 top-20 h-[180px] w-[200px] opacity-80 sm:h-[240px] sm:w-[260px]" />
        </>
      );
  }
};

export default BannerDecor;
