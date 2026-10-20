import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageBanner from "@/components/site/PageBanner";
import { InsightsVisual } from "@/components/site/BannerVisuals";
import PostCover from "@/components/site/PostCover";
import { useSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_URL, seo, insights, business } from "@/content/site";
import { posts, formatDate } from "@/lib/insights";

const Insights = () => {
  useSeo({
    ...seo.insights,
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Insights", path: "/insights" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "True Connect Insights",
        url: `${SITE_URL}/insights`,
        blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE_URL}/insights/${p.slug}`, datePublished: p.date })),
      },
    ],
  });

  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? posts : posts.filter((p) => p.category === cat);
  const [featured, ...rest] = shown;

  return (
    <div className="bg-white min-h-screen text-[#2d2a26] font-sans pb-0 overflow-x-hidden">
      <PageBanner
        visual={<InsightsVisual />}
        eyebrow="Insights"
        title={insights.hero.headline}
        sub={insights.hero.sub}
        crumbs={[{ label: "Home", to: "/" }, { label: "Insights" }]}
      />

      <section className="py-14 md:py-20 bg-[#f6f7f9]">
        <div className="container-tc">
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-10 md:mb-14" role="group" aria-label="Filter by category">
            {insights.categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={`px-5 py-2.5 rounded-full border text-[13px] font-semibold transition-all duration-300 ${
                  cat === c ? "bg-[#0b1f3f] text-white border-[#0b1f3f]" : "bg-white border-gray-200 text-gray-700 hover:border-[#0b1f3f] hover:-translate-y-0.5"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {shown.length === 0 ? (
            <div className="rounded-[2rem] border border-gray-200 bg-white p-10 md:p-14 text-center">
              <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">{insights.empty}</p>
              {business.social.instagram && (
                <a href={business.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 bg-[#0b1f3f] hover:bg-tc-yellow text-white hover:text-tc-navy font-semibold text-sm px-8 py-4 rounded-full transition-colors">
                  Follow us on Instagram
                </a>
              )}
            </div>
          ) : (
            <>
              {/* Featured article */}
              <Link
                to={`/insights/${featured.slug}`}
                className="group card-lift mb-6 md:mb-8 grid grid-cols-1 overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-sm lg:grid-cols-2"
              >
                <PostCover brand={featured.brand} category={featured.category} large />
                <div className="flex flex-col justify-center p-7 md:p-10">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">Latest article</span>
                  <h2 className="mt-3 text-2xl md:text-[1.75rem] leading-snug text-[#0b1f3f] tracking-tight">{featured.title}</h2>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-gray-500">{featured.summary}</p>
                  <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
                    <span>{formatDate(featured.date)}{featured.readTime ? ` · ${featured.readTime}` : ""}</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0b1f3f]">
                      Read article <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>

              {rest.length > 0 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
                  {rest.map((p) => (
                    <Link key={p.slug} to={`/insights/${p.slug}`} className="group card-lift flex flex-col overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-sm">
                      <PostCover brand={p.brand} category={p.category} />
                      <div className="flex flex-1 flex-col p-6 md:p-7">
                        <h3 className="text-lg leading-snug text-[#0b1f3f]">{p.title}</h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">{p.summary}</p>
                        <div className="mt-5 flex items-center justify-between text-xs text-gray-400">
                          <span>{formatDate(p.date)}{p.readTime ? ` · ${p.readTime}` : ""}</span>
                          <ArrowUpRight size={16} className="text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0b1f3f]" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to action */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-tc">
          <div className="rounded-[1.75rem] md:rounded-[2.5rem] bg-gradient-to-br from-[#0a1a35] via-[#030a16] to-black p-8 text-center text-white sm:p-12 md:p-16">
            <h2 className="mx-auto max-w-2xl text-2xl md:text-4xl leading-tight tracking-tight">Want a campaign like these for your business?</h2>
            <p className="mx-auto mt-4 max-w-xl text-[13px] sm:text-base leading-relaxed text-white/70">Tell us your goal. Our team will come back with clear next steps.</p>
            <Link to="/contact" className="mt-8 inline-flex items-center justify-center rounded-full bg-tc-yellow px-8 py-3.5 text-sm font-semibold text-tc-navy transition-colors hover:bg-white">
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insights;
