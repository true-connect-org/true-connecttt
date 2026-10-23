import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageBanner from "@/components/site/PageBanner";
import PostCover from "@/components/site/PostCover";
import { useSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_URL, business, insights } from "@/content/site";
import { getPost, posts, formatDate } from "@/lib/insights";
import NotFound from "./NotFound";

const InsightPost = () => {
  const { slug = "" } = useParams();
  const post = getPost(slug);

  useSeo({
    title: post ? `${post.title} | True Connect Insights` : "Not found | True Connect",
    description: post?.summary ?? "",
    path: `/insights/${slug}`,
    type: "article",
    noindex: !post || post.draft,
    jsonLd: post
      ? [
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: post.title, path: `/insights/${post.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.summary,
            datePublished: post.date,
            dateModified: post.date,
            author: { "@type": "Organization", name: business.name, url: SITE_URL },
            publisher: { "@id": `${SITE_URL}/#organization` },
            mainEntityOfPage: `${SITE_URL}/insights/${post.slug}`,
          },
        ]
      : undefined,
  });

  if (!post) return <NotFound />;
  const { Component } = post;
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="bg-white min-h-screen text-[#2d2a26] font-sans overflow-x-clip">
      <PageBanner
        compact
        eyebrow={post.category}
        title={post.title}
        sub={post.summary}
        crumbs={[{ label: "Home", to: "/" }, { label: "Insights", to: "/insights" }, { label: post.brand ?? "Article" }]}
      >
        <span className="text-xs text-white/60">
          {formatDate(post.date)}{post.readTime ? ` · ${post.readTime}` : ""}
        </span>
      </PageBanner>

      <article className="py-14 md:py-20 bg-white">
        <div className="container-tc">
          <div className="mx-auto max-w-[760px]">
            <div className="prose prose-sm sm:prose-base max-w-none prose-headings:text-[#0b1f3f] prose-headings:tracking-tight prose-h2:mt-10 prose-h2:mb-3 prose-h2:text-xl md:prose-h2:text-2xl prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-[#0b1f3f] prose-a:text-[#0b1f3f]">
              <Component />
            </div>

            {post.sources && post.sources.length > 0 && (
              <div className="mt-14 rounded-2xl border border-gray-200 bg-[#f6f7f9] p-6 md:p-8">
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 mb-4">Sources</h2>
                <ul className="space-y-2 text-sm">
                  {post.sources.map((s) => (
                    <li key={s}>
                      <a href={s} target="_blank" rel="noopener noreferrer nofollow" className="break-all text-[#0b1f3f] underline decoration-gray-300 underline-offset-4 hover:decoration-tc-yellow hover:decoration-2">{s}</a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-relaxed text-gray-500">Figures reported by brands or agencies are marked as such and have not been independently verified.</p>
              </div>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-14 md:py-20 bg-[#f6f7f9]">
          <div className="container-tc">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">KEEP READING</span>
              <h2 className="text-2xl md:text-3xl tracking-tight text-[#0b1f3f]">More from Insights</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {related.map((p) => (
                <Link key={p.slug} to={`/insights/${p.slug}`} className="group card-lift flex flex-col overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white shadow-sm">
                  <PostCover brand={p.brand} category={p.category} />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="line-clamp-2 flex-1 text-base leading-snug text-[#0b1f3f]">{p.title}</h3>
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
          </div>
        </section>
      )}

      <section className="py-14 md:py-20 bg-white">
        <div className="container-tc">
          <div className="rounded-[1.75rem] md:rounded-[2.5rem] bg-gradient-to-br from-[#0b1f3f] via-[#0b1f3f] to-[#153460] p-8 text-center text-white sm:p-12 md:p-16">
            <h2 className="mx-auto max-w-2xl text-2xl md:text-3xl leading-tight tracking-tight">{insights.postCta.text}</h2>
            <Link to={insights.postCta.to} className="mt-8 inline-flex items-center justify-center rounded-full bg-tc-yellow px-8 py-3.5 text-sm font-semibold text-tc-navy transition-colors hover:bg-white">
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsightPost;
