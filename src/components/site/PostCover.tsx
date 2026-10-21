/** Brand-coloured cover for an article card. Uses the brand name as typography, so no logos or stock photos are needed. */
const PostCover = ({ brand, category, large = false }: { brand?: string; category: string; large?: boolean }) => (
  <div
    className={`relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0b1f3f] via-[#0a1a35] to-[#030a16] text-white ${
      large ? "min-h-[240px] p-7 md:min-h-[320px] md:p-10" : "aspect-[16/10] p-6"
    }`}
  >
    {/* fine dotted grid + soft glows */}
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:18px_18px]" />
    <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#1a4480]/40 blur-3xl transition-transform duration-700 group-hover:scale-125" />
    <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-[#E6E84A]/10 blur-3xl" />

    <span className="relative inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
      {category}
    </span>
    <span className={`relative font-extrabold leading-none tracking-tight text-white transition-transform duration-500 group-hover:translate-x-1 ${large ? "text-5xl md:text-6xl" : "text-3xl sm:text-4xl"}`}>
      {brand ?? "Insights"}
      <span className="text-[#E6E84A]">.</span>
    </span>
  </div>
);

export default PostCover;
