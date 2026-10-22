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
        variant="insights"
        visual={<InsightsVisual />}
        eyebrow="Insights"
        title="Marketing,"
        accent="decoded."
        sub={insights.hero.sub}
        crumbs={[{ label: "Home", to: "/" }, { label: "Insights" }]}
      />

      <section className="py-14 md:py-20 bg-[#f6f7f9]">
        <div className="container-tc">
          {/* Category filters */}
          <div className="mx-auto mb-10 grid max-w-md grid-cols-2 gap-2 sm:gap-2.5 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center md:mb-14" role="group" aria-label="Filter by category">
            {insights.categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={`w-full whitespace-nowrap px-1.5 py-2.5 rounded-full border text-[clamp(10px,3.1vw,12px)] tracking-tight sm:tracking-normal sm:w-auto sm:px-5 sm:text-[13px] font-semibold text-center transition-all duration-300 ${
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
                className="group card-lift mb-6 grid grid-cols-1 overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-sm md:mb-8 lg:grid-cols-2"
              >
                <PostCover brand={featured.brand} category={featured.category} large />
                <div className="flex flex-col justify-center p-7 md:p-10">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                    Latest · {formatDate(featured.date)}{featured.readTime ? ` · ${featured.readTime}` : ""}
                  </span>
                  <h2 className="mt-3 text-2xl leading-snug tracking-tight text-[#0b1f3f] md:text-[1.6rem]">{featured.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500 md:text-base">{featured.summary}</p>
                  <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#0b1f3f] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-tc-yellow group-hover:text-tc-navy">
                    Read article <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>

              {rest.length > 0 && (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                  {rest.map((p) => (
                    <Link key={p.slug} to={`/insights/${p.slug}`} className="group card-lift flex flex-col overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white shadow-sm">
                      <PostCover brand={p.brand} category={p.category} />
                      <div className="flex flex-1 flex-col p-6">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          {formatDate(p.date)}{p.readTime ? ` · ${p.readTime}` : ""}
                        </span>
                        <h3 className="mt-2 line-clamp-2 text-lg leading-snug text-[#0b1f3f]">{p.title}</h3>
                        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500">{p.summary}</p>
                        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                          <span className="text-sm font-semibold text-[#0b1f3f]">Read article</span>
                          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-[#0b1f3f] transition-all duration-300 group-hover:border-[#0b1f3f] group-hover:bg-[#0b1f3f] group-hover:text-white">
                            <ArrowUpRight size={15} />
                          </span>
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
          <div className="rounded-[1.75rem] md:rounded-[2.5rem] bg-gradient-to-br from-[#0b1f3f] via-[#0b1f3f] to-[#153460] p-8 text-center text-white sm:p-12 md:p-16">
            <h2 className="mx-auto max-w-2xl text-2xl md:text-3xl leading-tight tracking-tight">Want a campaign like these for your business?</h2>
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
