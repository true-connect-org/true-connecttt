/** Brand-coloured cover for an article card. Uses the brand name as a graphic, so no logos or stock photos are needed. */
const PostCover = ({ brand, category, large = false }: { brand?: string; category: string; large?: boolean }) => (
  <div className={`relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0a1a35] via-[#0b1f3f] to-black text-white ${large ? "min-h-[260px] md:min-h-[340px] p-8 md:p-10" : "aspect-[16/9] p-6"}`}>
    <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#1a4480]/35 blur-3xl" />
    <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-[#E6E84A]/10 blur-3xl" />
    <span className="relative text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60">{category}</span>
    <span className={`relative font-extrabold leading-none tracking-tight text-white/90 ${large ? "text-5xl md:text-7xl" : "text-3xl sm:text-4xl"}`}>
      {brand ?? "Insights"}
    </span>
  </div>
);

export default PostCover;
