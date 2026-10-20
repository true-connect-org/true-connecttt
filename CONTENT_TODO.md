# Content still needed

All site copy lives in `src/content/site.ts`. Blocks below are **hidden** until the value is filled in; nothing is invented.

| What | Where in `src/content/site.ts` | Notes |
| --- | --- | --- |
| Client testimonial | `home.proof.testimonial` | Home page "Proof" section. Hidden while `null`. |
| Number of businesses served | `home.proof.stats` | Add `{ value: "…+", label: "Businesses served across Kerala and the UAE" }` |
| Starting price | `servicesPage.packages.startingPrice` | e.g. `"25,000"` shows "Starting from ₹25,000" |
| Connectivity key figures | `connectivity.keyFigures.*` | Speed range, uptime %, activation days, support hours. Only add confirmed figures. |
| Founder photo | `about.founder.photo` | Import an image and set the path. Hidden while `null`. |
| Team / office photo | `about.teamPhoto` | Hidden while `null`. |
| Team size, client count | `about.numbers` | Add entries once confirmed. |
| LinkedIn / YouTube / X URLs | `business.social.*` | Icons appear in the footer automatically when set. |
| Office days | `business.openingHours` | Currently assumed Mon–Fri 9–6. Confirm. |
| Google Maps pin | `contact.mapEmbed` | Replace with the embed link from your Google Business Profile once it exists. |

## Not code (do these outside the repo)
- Google Business Profile, Google Search Console (submit `https://true-connect.in/sitemap.xml`), Bing Webmaster Tools.
- Email deliverability for support@true-connect.in: SPF, DKIM and DMARC DNS records in Hostinger.
- EmailJS template: set the **To** address to support@true-connect.in and **Reply-To** to `{{from_email}}`.
- Write real Insights posts in `content/insights/*.mdx` (the sample is `draft: true`).
- Have the Privacy and Terms pages reviewed before relying on them.
