/**
 * Single source of truth for all website copy and business facts.
 * Edit text here; components only render it.
 *
 * Values set to `null` are not supplied yet (see CONTENT_TODO.md).
 * Components hide any block whose value is `null`, so nothing is invented.
 */

export const SITE_URL = "https://true-connect.in";

/* ───────────────────────── Business facts ───────────────────────── */

export const business = {
  name: "True Connect",
  legalName: "True Connect Ltd",
  foundingYear: 2025,
  phoneDisplay: "+91 88488 17833",
  phoneTel: "+918848817833",
  whatsappNumber: "918848817833",
  whatsappLink: "https://wa.me/918848817833",
  whatsappMessage: "Hi True Connect, I would like to know more about your services.",
  // Public email shown on the site and used in schema. Form enquiries are
  // delivered to this address through the EmailJS template (see src/lib/enquiry.ts).
  email: "info@true-connect.in",
  /** Where the email links on the site actually send to (shown address stays info@true-connect.in). */
  emailHref: "mailto:trueconnect.in@gmail.com?cc=support@true-connect.in",
  address: {
    line1: "True Connect Ltd, SBC 22, Basement Floor 2",
    line2: "Thejaswini Building, Technopark",
    locality: "Thiruvananthapuram",
    region: "Kerala",
    postalCode: "695581",
    country: "IN",
  },
  hoursDisplay: "9:00 AM – 6:00 PM",
  // schema.org openingHours. Days were not specified by the team: Mon–Fri assumed. Confirm.
  openingHours: "Mo-Fr 09:00-18:00",
  // Approximate Technopark coordinates, used for LocalBusiness schema only.
  geo: { latitude: 8.5581, longitude: 76.8814 },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61592914924920",
    instagram: "https://www.instagram.com/trueconnect.in/",
    linkedin: "https://www.linkedin.com/company/true-connectt/" as string | null,
    youtube: "https://www.youtube.com/@TrueeConnect" as string | null,
    x: null as string | null, // TODO: add the X (Twitter) profile link to show the X icon
    whatsapp: "https://wa.me/918848817833" as string | null,
  },

};

/** Registered office (shown on the Contact page). */
export const registeredOffice = {
  name: "True Connect Ltd, Varkala",
  address: "True Connect Ltd, Co-Operative Service Bank Building, P.O, Varkala, Kerala 695312",
  phoneDisplay: "+91 79076 85595",
  phoneTel: "+917907685595",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Co-Operative+Service+Bank+Building+Varkala+Kerala+695312",
};

export const fullAddress = `${business.address.line1}, ${business.address.line2}, ${business.address.locality}, ${business.address.region} ${business.address.postalCode}`;

export const whatsappHref = (message: string = business.whatsappMessage) =>
  `${business.whatsappLink}?text=${encodeURIComponent(message)}`;

/* ───────────────────────── Navigation ───────────────────────── */

export const TAGLINE = "Your Vision. Our Execution.";

export const nav = {
  links: [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Insights", to: "/insights" },
    { label: "Contact", to: "/contact" },
  ],
  cta: { label: "Start a project", to: "/contact" },
};

export const footer = {
  tagline: TAGLINE,
  description: "Branding, marketing and software for businesses that want to grow.",
  services: [
    { label: "Social Media Marketing", to: "/services/social-media-marketing" },
    { label: "Web & App Development", to: "/services/web-and-app-development" },
    { label: "Branding & Strategy", to: "/services/branding" },
    { label: "Custom Software", to: "/services/custom-software" },
    { label: "AI & Automation", to: "/services/ai-automation" },
    { label: "Enterprise Internet", to: "/connectivity" },
  ],
  company: [
    { label: "About", to: "/about" },
    { label: "Insights", to: "/insights" },
    { label: "Contact", to: "/contact" },
  ],
  bottom: "True Connect",
};

/* ───────────────────────── Home ───────────────────────── */

export const home = {
  hero: {
    eyebrow: TAGLINE,
    // Alternates: "Branding, marketing and software. One team." /
    //             "Your growth team in Trivandrum."
    headline: ["We take businesses", "from 0 to 100."],
    sub: "Brand, technology and connectivity, engineered as one system. The integrated growth partner for ambitious Kerala businesses.",
    primary: { label: "Start a project", to: "/contact" },
    secondary: { label: "Explore services", to: "/services" },
    ticker: ["Strategy", "Branding", "Social Media", "SEO", "Ads", "Websites", "Apps", "AI Automation"],
  },
  intro: {
    label: "About True Connect",
    heading: "One team. Every system your business needs to scale.",
    body: "Marketers, engineers, automation specialists and network technicians under one roof at Technopark. We learn how your business runs, then build the systems that let it grow in the AI era.",
    vision: {
      label: "Our vision",
      heading: "Business owners who can sit back, relax and scale.",
      text: "We build the systems that run your business, so growth no longer depends on you doing everything.",
    },
    capabilities: ["Marketing & Brand", "Software & Automation", "Enterprise Internet"],
  },
  servicesHeading: "What we do",
  servicesButton: "Explore service",
  servicesSection: {
    eyebrow: "Our services",
    headline: "From brand to bandwidth.",
    sub: "Everything you need to grow, delivered by one team.",
    button: { label: "View all services", to: "/services" },
  },

  zeroToHundred: {
    heading: "From first idea to full scale: one partner for the entire journey.",
    stops: [
      { value: "0", title: "Strategy", text: "Who you sell to and what makes you different." },
      { value: "25", title: "Brand", text: "Logo, colours, voice and guidelines." },
      { value: "50", title: "Build", text: "Website, app and the systems behind them." },
      { value: "75", title: "Launch", text: "Social media, SEO and ads that bring customers." },
      { value: "100", title: "Scale", text: "Automation, AI and data to grow without chaos." },
    ],
    line: "Start at any number. We meet you where your business is today.",
  },
  proof: {
    // No real testimonial yet: block stays hidden until supplied.
    testimonial: null as null | { quote: string; name: string; role: string; company: string },
    stats: [
      { value: "2025", label: "Serving businesses from Technopark since" },
      // TODO: add "Businesses served across Kerala and the UAE" once the real number is confirmed.
      { value: "100%", label: "Delivered by our in-house team" },
    ],
  },
  why: {
    label: "The True Connect difference",
    heading: "Why businesses choose True Connect",
    sub: "One accountable team across marketing, software and connectivity.",
    // Look of the video cards. "navy" = brand navy gradient behind the video (default).
    // Change to "black" to go back to the original pure black video look.
    cardStyle: "black" as "navy" | "black",
    items: [
      {
        title: "We Learn Your Business First",
        text: "We ask the questions most agencies skip before we build.",
      },
      {
        title: "Be Found by the Right Customers",
        text: "Local search that puts you in front of buyers ready to act.",
      },
      {
        title: "One Team, One Conversation",
        text: "Direct access to the people doing your work, with no middle layers.",
      },
      {
        title: "Honest Scoping. No Upselling.",
        text: "We recommend what you actually need, not what earns us more.",
      },
    ],
  },
  process: {
    heading: "A clear process, from first call to continuous growth",
    steps: [
      { title: "Discover", text: "A short call about your business and goals." },
      { title: "Plan", text: "A written plan with scope, timeline and fixed price." },
      { title: "Build", text: "Design, development and content, with a live preview link." },
      { title: "Launch", text: "Go live with tracking installed and your team trained." },
      { title: "Grow", text: "Monthly campaigns, reports and improvements." },
    ],
  },
  industries: {
    heading: "Industries we serve",
    items: [
      "Clinics & Hospitals",
      "Real Estate & Builders",
      "Schools & Coaching Centres",
      "Restaurants & Cafés",
      "Hotels, Resorts & Homestays",
      "Jewellery & Textile Showrooms",
      "Retail & Distribution",
      "IT & Startups",
    ],
  },
  insights: {
    heading: "Marketing, decoded.",
    body: "How the world's best brands win attention, and how a Kerala business can use the same ideas on a local budget.",
    button: { label: "Read Insights", to: "/insights" },
  },
  connectivityStrip: {
    text: "Jio-powered leased lines with a 99% uptime SLA and on-site support in 60 minutes.",
    link: { label: "Enterprise connectivity", to: "/connectivity" },
  },
  faq: {
    heading: "Frequently asked questions",
    sub: "Short, honest answers about working with True Connect.",
    items: [
      {
        q: "What services does True Connect offer?",
        a: "Social media marketing, web and app development, branding, custom software, AI automation and enterprise internet, all from one accountable team.",
      },
      {
        q: "How do you work with a business?",
        a: "We study your business, share a clear written plan with scope and timeline, then build, launch and improve with monthly reports.",
      },
      {
        q: "Do you work organically, with ads, or both?",
        a: "Both, in the right order. New brands start organically; established businesses can move straight to lead-focused Meta and Google campaigns.",
      },
      {
        q: "Do you handle reels, content and influencer marketing?",
        a: "Yes. We plan, script, shoot and edit content in English and Malayalam, and run influencer campaigns tied to your sales goals.",
      },
      {
        q: "How soon will I see results?",
        a: "Ads can bring leads within weeks. SEO and Google Maps rankings across Kerala usually take three to six months, with a monthly report along the way.",
      },
      {
        q: "How much do your services cost?",
        a: "It depends on your business and goals. Share your requirements and our team will come back with a clear plan and price.",
      },
      {
        q: "Do you serve businesses across Kerala?",
        a: "Yes. We work with businesses across Kerala, and deliver enterprise internet across India, subject to feasibility at your location.",
      },
      {
        q: "Can I start with one service, and who owns my accounts?",
        a: "Yes, start small and add more later. You always own your domain, ad accounts, code and logins.",
      },
    ],
  },
  cta: {
    heading: "Big plans? Let's talk.",
    body: "One conversation with our team is all it takes to get started.",
    primary: { label: "Start a project", to: "/contact" },
    whatsappLabel: "Chat on WhatsApp",
  },
};

/* ───────────────────────── Services ───────────────────────── */

export interface ServiceDetail {
  intro: string[];
  deliverables: { title: string; text: string }[];
  approach: { title: string; text: string }[];
  /** Optional story block, e.g. a worked example. */
  story?: { label: string; heading: string; paragraphs: string[] };
  cta: string;
}

export interface Service {
  id: string; // stable key, also the card id on /services
  slug: string; // URL: /services/<slug>. Enterprise Internet lives at /connectivity.
  to: string;
  title: string;
  seoTitle: string;
  short: string; // longer summary (service pages, lists)
  tagline: string; // one short line shown on hover on the home service cards
  label: string; // small uppercase line above the title on the home service cards
  description: string; // services page
  includes: string[];
  detail: ServiceDetail;
}

export const services: Service[] = [
  {
    id: "social-media-marketing",
    slug: "social-media-marketing",
    to: "/services/social-media-marketing",
    title: "Social Media Marketing",
    seoTitle: "Social Media Marketing Agency in Trivandrum, Kerala | True Connect",
    tagline: "Content and ads that bring enquiries.",
    label: "Audience growth and content",
    short: "Strategic content and targeted advertising that build visibility and generate qualified enquiries.",
    description:
      "A monthly content calendar, reels, posts and captions in English and Malayalam, backed by Meta and Google ads and local SEO. We plan around your sales goals, then post, reply and report.",
    includes: ["Content calendar and strategy", "Reels, posts and captions in English and Malayalam", "Meta and Google ads", "SEO and Google Business Profile", "Monthly report"],
    detail: {
      intro: [
        "Followers do not pay your bills. Enquiries do. Our social media marketing is planned around one question: how many people messaged or called you this month, and what did each one cost?",
        "We run your content, your ads and your local search together, so the reel someone watches, the ad they see and the Google listing they find all tell the same story.",
      ],
      deliverables: [
        { title: "Content planning", text: "A monthly calendar built around what your customers actually watch, with shoot plans and captions in English and Malayalam." },
        { title: "Reels and creative", text: "Scripts, editing, posts and templates that look like one brand across every platform." },
        { title: "Performance ads", text: "Meta and Google campaigns managed against leads and cost per lead, with weekly creative testing." },
        { title: "SEO and local search", text: "Technical fixes, pages that rank, and a Google Business Profile so you show up on the map when people nearby search." },
        { title: "Community management", text: "We post, reply to comments and route WhatsApp leads to your team." },
        { title: "Reports in plain words", text: "Every month: leads, cost per lead and what we are changing next." },
      ],
      approach: [
        { title: "Understand", text: "A call about your business, customers and goals." },
        { title: "Plan", text: "A written monthly plan with channels, content and budget." },
        { title: "Create and publish", text: "We shoot, edit, post and run the ads." },
        { title: "Measure and improve", text: "Monthly report, then we move budget to what works." },
      ],
      cta: "Talk to us about social media marketing",
    },
  },
  {
    id: "web-app-development",
    slug: "web-and-app-development",
    to: "/services/web-and-app-development",
    title: "Web & App Development",
    seoTitle: "Web & App Development Company in Trivandrum | True Connect",
    tagline: "Fast websites and apps that convert.",
    label: "Websites and mobile apps",
    short: "High-performance websites and mobile applications engineered to convert visitors into customers.",
    description:
      "Custom websites and mobile apps designed for your brand: fast on every phone, easy to use, and built to bring in enquiries, bookings and orders.",
    includes: [
      "Custom website design and development",
      "Android and iOS mobile apps",
      "Copywriting and SEO setup",
      "Admin panel to manage your own content",
      "Analytics and tracking",
      "Hosting, app store publishing and maintenance",
    ],
    detail: {
      intro: [
        "Your website is the first thing a customer checks before they call, and your app is the one thing they keep on their phone. Both should load fast, look like your brand and make the next step obvious.",
        "We design and build websites and Android and iOS apps from scratch for your business. Search optimisation and tracking are set up from day one, so your site can rank in Trivandrum and you can see exactly what is bringing in enquiries, bookings and orders.",
      ],
      deliverables: [
        { title: "Custom website", text: "Designed for your brand and customers, mobile-first, and fast on ordinary phones and connections. Never a reused template." },
        { title: "Mobile apps", text: "Android and iOS apps for bookings, orders, loyalty programmes or your internal team, published to the app stores." },
        { title: "Content and SEO", text: "Clear page text, proper structure and local business data, so people across Kerala can find you on Google." },
        { title: "Admin panel", text: "Update your website or app content yourself, without calling a developer for every change." },
        { title: "Analytics and tracking", text: "Know how many visitors become enquiries, bookings or orders, and where they came from." },
        { title: "Hosting and maintenance", text: "We look after hosting, updates, store releases and fixes. Your domain, accounts and code stay in your company's name." },
      ],
      approach: [
        { title: "Discover", text: "Goals, customers and what you need: a website, an app, or both." },
        { title: "Design", text: "Screens and layouts you approve before development starts." },
        { title: "Build", text: "Development with a live preview link you can open any time." },
        { title: "Launch", text: "Website live and app published, with tracking installed and your team trained." },
      ],
      cta: "Start your website or app project",
    },
  },
  {
    id: "branding",
    slug: "branding",
    to: "/services/branding",
    title: "Branding & Strategy",
    seoTitle: "Branding Agency in Trivandrum, Kerala | True Connect",
    tagline: "One confident brand, everywhere.",
    label: "Identity and positioning",
    short: "A distinctive identity and a clear marketing strategy, so every touchpoint looks and sounds like one confident business.",
    description:
      "Logo, colours, typography, brand voice and guidelines that make a local business look like a market leader on every screen and signboard, plus a clear 90-day marketing plan.",
    includes: ["Brand strategy and positioning", "Logo and identity", "Rebranding for existing businesses", "Brand guidelines", "Marketing strategy and 90-day plan"],
    detail: {
      intro: [
        "Strong brands are consistent. When your logo, website, social media and signboard look and sound like different businesses, customers hesitate.",
        "Whether you are launching a new brand or refreshing one that has outgrown its look, we start with strategy: who you sell to and what makes you different. Then we design everything to match.",
      ],
      deliverables: [
        { title: "Brand strategy", text: "Positioning, voice and the message that sets you apart from competitors." },
        { title: "Logo and identity", text: "Logo, colours and typography that work on screens, print and signboards." },
        { title: "Rebranding", text: "A careful refresh for established businesses, so you modernise without losing the trust you have built." },
        { title: "Brand guidelines", text: "A simple guide so every designer, printer and agency uses your brand correctly." },
        { title: "Marketing strategy", text: "A 90-day plan covering customers, channels, message and budget." },
        { title: "Templates", text: "Social media and document templates ready for your team to use." },
      ],
      approach: [
        { title: "Research", text: "Your market, competitors and customers." },
        { title: "Position", text: "What you stand for and how you say it." },
        { title: "Design", text: "Identity and guidelines, refined with your feedback." },
        { title: "Roll out", text: "Applied across your website, social media and print." },
      ],
      cta: "Talk to us about branding",
    },
  },
  {
    id: "custom-software",
    slug: "custom-software",
    to: "/services/custom-software",
    title: "Custom Software",
    seoTitle: "Custom Software, CRM & ERP Development in Kerala | True Connect",
    tagline: "CRM, ERP and dashboards, built around you.",
    label: "CRM, ERP and dashboards",
    short: "CRM, ERP, dashboards and business platforms built around the way your organisation operates.",
    description:
      "Software built for your business: CRM, ERP, customer portals and dashboards. Tools shaped around your process, not forced into somebody else's.",
    includes: ["CRM systems", "ERP and operations systems", "Customer and admin portals", "Dashboards and reports", "Integrations", "Support and maintenance"],
    detail: {
      intro: [
        "Off-the-shelf software makes you change how you work. Custom software does the opposite: it is built around your process, your team and your customers.",
        "We build the systems that run the daily business, from leads and customers to billing, stock and reporting, so your team spends less time on paperwork and more on customers.",
      ],
      deliverables: [
        { title: "CRM", text: "Track every lead, follow-up and customer in one place, with reminders so nothing is forgotten." },
        { title: "ERP and operations", text: "Sales, purchase, inventory, billing and reports connected in a single system." },
        { title: "Portals and dashboards", text: "Customer portals, admin panels and live dashboards for owners and managers." },
        { title: "Billing and inventory", text: "Invoices, stock and purchases handled in the same system as the rest of your operations." },
        { title: "Integrations", text: "Connect WhatsApp, payments, accounting and your existing tools." },
        { title: "Support", text: "Training for your team, plus ongoing maintenance and improvements." },
      ],
      approach: [
        { title: "Map your process", text: "We learn how work flows through your business today." },
        { title: "Design", text: "Screens and workflows you review before we build." },
        { title: "Build in stages", text: "Working software in steps, so you can use it early." },
        { title: "Launch and support", text: "Training, go-live and ongoing support." },
      ],
      cta: "Discuss your software project",
    },
  },
  {
    id: "ai-automation",
    slug: "ai-automation",
    to: "/services/ai-automation",
    title: "AI & Automation",
    seoTitle: "AI & Business Automation Services in Kerala | True Connect",
    tagline: "Systems that run your business.",
    label: "Systems and workflows",
    short: "Intelligent systems that automate operations, so your business runs smoothly without constant oversight.",
    description:
      "We study how your business runs, then plan and implement systems using advanced technologies that automate the repetitive work, so your business keeps running without the owner holding it together.",
    includes: ["Business process mapping", "WhatsApp automation and AI assistants", "CRM and lead follow-up systems", "Live dashboards and reports", "Workflow automation", "Training and support"],
    detail: {
      intro: [
        "Most business owners are the system. Every decision, follow-up and update goes through them, so the business can only grow as fast as the owner can work.",
        "Our vision is simple: make business owners sit back, relax and scale. We plan and implement systems tailored to your business, using advanced technologies and automation, so the work gets done without the stress and without you in the middle of everything.",
      ],
      deliverables: [
        { title: "Process mapping", text: "We study how your business really runs and find where time and money are being lost." },
        { title: "Automation systems", text: "Reminders, approvals, follow-ups and reports that run by themselves." },
        { title: "WhatsApp and AI assistants", text: "Answer enquiries, qualify leads and update your team automatically." },
        { title: "CRM and follow-up", text: "Every lead tracked and followed up on time, without manual chasing." },
        { title: "Live dashboards", text: "See sales, site progress and team performance in one view, from your phone." },
        { title: "Training and support", text: "Your team learns the system and we stay on to improve it." },
      ],
      approach: [
        { title: "Study", text: "We sit with you and your team to understand the business." },
        { title: "Plan", text: "A written plan of the systems your business needs." },
        { title: "Implement", text: "We build, connect and test the systems with your team." },
        { title: "Hand over and improve", text: "Your business runs on the system, and we keep refining it." },
      ],
      story: {
        label: "A real-world example",
        heading: "A construction company owner with 20 clients at once",
        paragraphs: [
          "Picture the owner of a construction company. They are handling 20 clients at the same time: quotations, site updates, material orders, payments and constant phone calls. They are always busy, and they are the only person who knows where everything stands.",
          "We help the team turn that into a system. Enquiries are captured and followed up automatically. Quotations, site progress, material requests and payment reminders move through defined steps. Clients receive updates without anyone chasing, and the owner sees everything on a dashboard.",
          "The result: the business runs without the owner holding every thread. They can step back, relax and focus on scaling the company, instead of firefighting every day.",
        ],
      },
      cta: "Book a free consultation",
    },
  },
  {
    id: "enterprise-internet",
    slug: "enterprise-internet",
    to: "/connectivity",
    title: "Enterprise Internet",
    seoTitle: "Jio Leased Line & Business Broadband in Trivandrum | True Connect",
    tagline: "Jio leased lines, our own technicians.",
    label: "Leased lines and broadband",
    short: "Dedicated leased lines and business broadband from an authorized Reliance Jio channel partner, backed by our own technicians.",
    description: "Dedicated leased lines and business broadband delivered by True Connect, an authorized Reliance Jio channel partner (not an ISP), with our own technicians and complaint software behind every connection.",
    includes: [
      "Dedicated leased lines",
      "Business broadband",
      "Our own technicians, available all day",
      "Technician at your site within 60 minutes",
      "99% service level agreement on leased lines",
    ],
    detail: {
      intro: [],
      deliverables: [],
      approach: [],
      cta: "Get a free consultation",
    },
  },
];

/** Cards shown in the home page services section, in order. */
export const homeServiceCards = services;

export const servicesPage = {
  hero: {
    headline: "Built to grow your business.",
    sub: "Six services. One accountable team.",
  },
  includesLabel: "Includes",
  connectivityCard: {
    eyebrow: "Also available",
    title: "Enterprise Internet",
    text: "Where True Connect began, and still a service our Technopark clients rely on. Dedicated leased lines and business internet as an authorized Reliance Jio enterprise channel partner, with network security and our own team managing it for you.",
    button: { label: "Explore Enterprise Internet", to: "/connectivity" },
  },
  packages: {
    heading: "Or start with a package",
    items: [
      { name: "Launch", for: "New businesses and branches", includes: "Brand identity, website, Google Business Profile, social media setup" },
      { name: "Growth", for: "Businesses ready to scale", includes: "Monthly social media, SEO and ads with one report" },
      { name: "Digital Office", for: "Offices and clinics", includes: "CRM or dashboard, AI automation, leased line and network security" },
    ],
    // TODO: set a real starting price (e.g. "25,000") to show a "Starting from ₹…" line. Hidden while null.
    startingPrice: null as string | null,
    button: { label: "Get a quote", to: "/contact" },
  },
};

/* ───────────────────────── Enterprise Connectivity ───────────────────────── */

export const connectivity = {
  hero: {
    eyebrow: "Enterprise Internet · Kerala",
    headline: "Business internet that doesn't blink.",
    sub: "Leased lines and broadband from an authorized Reliance Jio partner, backed by a 99% uptime SLA.",
    primary: { label: "Get a free consultation", href: "#availability" },
    secondary: { label: "Talk to an engineer", to: "/contact" },
  },
  partner: {
    badge: "Authorized Reliance Jio Channel Partner",
    heading: "We are not an ISP. We are your Jio channel partner.",
    text: "True Connect is an authorized Reliance Jio enterprise channel partner, not an internet service provider. You get Jio's network, and our own team handles feasibility, installation, support and complaints for you.",
  },
  whyJio: {
    heading: "Why Jio?",
    intro: "A business connection is only as good as the network behind it.",
    points: [
      { title: "A nationwide network", text: "One of India's largest networks, so multi-site businesses can stay with one provider across locations." },
      {
        title: "Built for business",
        text: "Dedicated leased lines with equal upload and download speeds and static IPs, so speed stays constant all day.",
      },
      { title: "Advanced network technology", text: "Enterprise-grade infrastructure, built for businesses that cannot afford downtime." },
    ],
  },
  problem: {
    heading: "When the internet stops, your business stops.",
    lead: "For most offices, the internet is the office. When it fails:",
    points: [
      "Client calls and video meetings drop mid-sentence.",
      "Cloud software, billing and online systems stall while your team waits.",
      "Shared connections slow to a crawl at peak hours, exactly when you are busiest.",
      "Remote access disconnects, locking out staff working off-site.",
      "Every outage means chasing a call centre instead of a person who can fix it.",
    ],
    closing: "A dedicated leased line with our own team behind it removes these problems.",
  },
  solutions: {
    heading: "What we provide",
    items: [
      {
        title: "Dedicated Leased Line",
        best: "Hospitals, banks, IT offices, campuses",
        get: "Bandwidth reserved only for you, equal upload and download speeds, static IPs, and a 99% service level agreement",
      },
      {
        title: "Business Broadband",
        best: "Shops, small offices, clinics",
        get: "Reliable high-speed internet at a lower cost, with priority business support",
      },
      { title: "Network Security", best: "Any business with customer data", get: "Managed firewall, threat protection, secure Wi-Fi and 24/7 monitoring" },
      { title: "Multi-site Connectivity", best: "Businesses with branches", get: "Connected branches with one point of contact for all locations" },
    ],
  },
  compare: {
    heading: "Leased line or business broadband?",
    businessInternet: "is shared with other users. It is affordable and fine for most small offices.",
    leasedLine: "is a private line reserved for your business. Speed stays constant all day, uploads match downloads, and uptime is backed by a 99% service level agreement. It suits hospitals, banks, IT teams and anyone running cloud systems.",
    note: "Not sure which you need? We will assess your usage and recommend the smaller option if it is enough.",
  },
  why: {
    heading: "Why choose True Connect?",
    items: [
      { title: "Our own technicians, available all day", text: "a True Connect team that you can call, not a toll-free queue." },
      { title: "Our own complaint software", text: "raise a complaint through our custom software and we track it until it is closed." },
      { title: "Technician at your site within 60 minutes", text: "for any complaint, our technician reaches your site within 60 minutes." },
      { title: "99% service level agreement", text: "every leased line comes with a 99% SLA in writing." },
      { title: "One accountable contact", text: "we handle feasibility, provisioning, activation and support. You don't chase anyone." },
      { title: "Security included", text: "we look at your firewall and Wi-Fi, not only your speed." },
    ],
  },
  // Confirmed figures only. Leave a value as null to hide it.
  keyFigures: {
    speedMin: null as string | null,
    speedMax: null as string | null,
    uptime: "99" as string | null,
    activationDays: null as string | null,
    supportHours: null as string | null,
    siteVisitMinutes: "60" as string | null,
  },
  process: {
    heading: "How it works",
    steps: [
      "Free consultation",
      "Feasibility check at your location",
      "Proposal and agreement",
      "Installation and activation",
      "Ongoing monitoring and support",
    ],
  },
  form: { heading: "Get a free consultation and check availability at your office.", button: "Check availability" },
};

/* ───────────────────────── About ───────────────────────── */

export const about = {
  hero: {
    headline: ["Your Vision.", "Our Execution."],
    sub: "Seen. Built. Connected.",
  },
  overview: {
    label: "Who we are",
    heading: "Growth, without the juggling.",
    paragraphs: ["One partner for brand, technology and connectivity."],
  },
  vision: {
    label: "Our vision",
    heading: "Business owners who can sit back, relax and scale.",
    text: "In the AI era, the businesses that win run on smart systems. We plan and build those systems, so growth no longer depends on the owner doing everything.",
  },
  mission: {
    label: "Our mission",
    heading: "One accountable partner for business growth.",
    text: "To give growing businesses one accountable partner for marketing, software, automation and internet, with honest scoping, clear reporting and every asset owned by the client.",
  },
  strengths: {
    label: "Our strengths",
    heading: "Why True Connect.",
    intro: "What you get when marketing, technology and connectivity sit in one team.",
    items: [
      {
        title: "An all-in-one team",
        text: "One strategy, one team and one contact, instead of a chain of vendors.",
        highlight: "One point of contact",
      },
      {
        title: "Authorized Jio channel partner",
        text: "Enterprise internet from an authorized Reliance Jio partner, with our own technicians.",
        highlight: "99% SLA · 60-minute site visit",
      },
      {
        title: "Engineers who market",
        text: "Fast websites and tracking that works, because our engineers understand marketing.",
        highlight: "Built for results",
      },
    ],
  },
  story: {
    heading: "Our story, in three steps",
    chapters: [
      {
        when: "2025",
        title: "Where it started",
        text: "We began in Trivandrum keeping IT companies and offices online as an authorized Reliance Jio channel partner, and saw what downtime really costs.",
      },
      {
        when: "The gap",
        title: "The bigger problem",
        text: "These businesses had strong products but outdated websites, irregular social media and ads nobody measured. Their growth was stuck, not their connection.",
      },
      {
        when: "Today",
        title: "One team",
        text: "So we built the team to fix it: marketing, software, automation and internet under one roof, for businesses across Kerala and the UAE.",
      },
    ],
  },
  process: {
    label: "How we work",
    heading: "From understanding your business to scaling it",
    intro: "A clear, evidence-led path for owners who are ready to grow in the AI era.",
    steps: [
      { title: "Understand your business", text: "We learn how your business runs today: your customers, your offer and your numbers." },
      { title: "Identify the gaps", text: "We find where marketing, systems and technology are holding your growth back." },
      { title: "Score and report", text: "You receive a score for where your business stands, and a written report on how to scale it." },
      { title: "Strategise and test", text: "We build a digital marketing strategy for the AI era and test it before committing your budget." },
      { title: "Launch and scale", text: "We launch what works, then scale it together with your team." },
    ],
    closing: {
      heading: "We partner with visionary business owners.",
      text: "Owners with clear goals and a long-term outlook, ready to grow with the right team. That is who we connect with, and who we build for.",
    },
  },
  founder: {
    name: "Rihab Shihan",
    role: "Founder",
    bio: "An engineer with a computer science background, now completing an MBA in Marketing and AI. Rihab leads strategy and technology at True Connect and serves as IT Head for a digital marketing agency in Abu Dhabi, bringing UAE agency standards to Kerala businesses.",
    photo: null as string | null, // TODO: founder photo. Hidden while null.
  },
  teamPhoto: null as string | null, // TODO: team / office photo at Technopark. Hidden while null.
  numbers: [
    { value: "2025", label: "Founded" },
    // TODO: team size and client count. Hidden until confirmed.
  ],
  office: {
    heading: "Office",
    text: "Technopark, Thiruvananthapuram, Kerala. Visits by appointment.",
  },
  cta: { label: "Start your 0 to 100", to: "/contact" },
};

/* ───────────────────────── Insights ───────────────────────── */

export const insights = {
  hero: {
    headline: "Marketing, decoded.",
    sub: "Big-brand thinking for Kerala businesses.",
  },
  categories: ["All", "Brand Positioning", "Experiential Marketing", "Content Marketing"],
  empty: "New breakdowns every month. Follow us on Instagram for the latest.",
  postCta: { text: "Want a campaign like this for your business? Talk to us.", to: "/contact" },
};

/* ───────────────────────── Contact ───────────────────────── */

export const contact = {
  headline: "Let's talk about your business.",
  sub: "One conversation. A clear plan.",
  needs: ["Social media marketing", "Web development", "Branding", "Custom software", "AI & automation", "Enterprise internet", "Not sure"],
  budgets: ["Under ₹25,000", "₹25,000–1,00,000", "₹1,00,000+", "Not sure"],
  button: "Send enquiry",
  success: (name: string) =>
    `Thanks, ${name}. We have your enquiry and our team will be in touch shortly. For anything urgent, message us on WhatsApp.`,
  hoursLabel: "Office hours",
  mapEmbed:
    "https://www.google.com/maps?q=Thejaswini+Building+Technopark+Thiruvananthapuram&output=embed",
};

/* ───────────────────────── SEO ───────────────────────── */

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  shareTitle?: string;
  shareDescription?: string;
}

export const seo: Record<string, PageSeo> = {
  home: {
    path: "/",
    title: "Digital Marketing Agency in Trivandrum, Kerala | True Connect",
    description: "Trivandrum's digital marketing agency for growing Kerala businesses: social media, websites, apps, branding, AI automation and Jio leased lines. Talk to us.",
    shareTitle: "True Connect | Your Vision. Our Execution.",
    shareDescription: "Marketing, websites, software, AI automation and Jio-powered business internet, delivered by one accountable team at Technopark, Kerala.",
  },
  services: {
    path: "/services",
    title: "Marketing, Web, Software & Internet Services | Trivandrum, Kerala",
    description: "Social media marketing, website development, branding, CRM and ERP software, AI automation and leased lines for businesses in Trivandrum and across Kerala.",
  },
  insights: {
    path: "/insights",
    title: "Marketing Insights & Brand Case Studies | True Connect Kerala",
    description: "Breakdowns of the world's best marketing campaigns, from KFC to Amul, and practical lessons for growing businesses in Kerala.",
  },
  about: {
    path: "/about",
    title: "About True Connect | Digital Marketing Company, Technopark Trivandrum",
    description: "True Connect is a digital marketing and technology company at Technopark, Trivandrum, helping Kerala businesses grow with marketing, software and enterprise internet.",
  },
  contact: {
    path: "/contact",
    title: "Contact True Connect | Digital Marketing Agency, Trivandrum",
    description: "Talk to True Connect, Technopark Trivandrum. Call +91 88488 17833, WhatsApp or email info@true-connect.in for marketing, software or leased line enquiries.",
  },
  connectivity: {
    path: "/connectivity",
    title: "Jio Leased Line Provider in Trivandrum, Kerala | True Connect",
    description: "Jio leased lines and business broadband in Trivandrum and across Kerala from an authorized Reliance Jio channel partner. 99% uptime SLA, free consultation.",
  },

};

/** Routes that are pre-rendered and listed in sitemap.xml (insight posts are added by the build script). */
export const staticRoutes = [
  "/",
  "/services",
  "/services/social-media-marketing",
  "/services/web-and-app-development",
  "/services/branding",
  "/services/custom-software",
  "/services/ai-automation",
  "/connectivity",
  "/about",
  "/insights",
  "/contact",
];
