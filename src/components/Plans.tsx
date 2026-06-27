import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardData {
  title: string;
  items: string[];
  imageUrl: string;
  borderClasses: string;
  glowColor: string;
  // Each card gets a unique phase offset so they don't all move in sync
  phaseOffset: number;
  speedMultiplier: number;
}

const servicesData: ServiceCardData[] = [
  {
    title: "Connectivity & Telecom",
    items: [
      "Enterprise Leased Line",
      "SIP Trunk Solutions",
      "IP PBX Solutions",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
    borderClasses: "border-left-behind",
    glowColor: "rgba(11, 31, 63, 0.6)",
    phaseOffset: 0,
    speedMultiplier: 1.0,
  },
  {
    title: "Software & SaaS",
    items: [
      "Custom Software Dev",
      "SaaS Product Development",
      "Business Automation",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    borderClasses: "border-right-behind border-bottom-behind",
    glowColor: "rgba(226, 192, 68, 0.5)",
    phaseOffset: Math.PI * 0.6,
    speedMultiplier: 0.85,
  },
  {
    title: "Mobile & Web Dev",
    items: [
      "Mobile App Development",
      "E-Commerce Solutions",
      "UI/UX Design",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop&q=80",
    borderClasses: "border-left-behind",
    glowColor: "rgba(56, 189, 248, 0.5)",
    phaseOffset: Math.PI * 1.2,
    speedMultiplier: 1.15,
  },
  {
    title: "Digital Growth",
    items: [
      "Digital Marketing",
      "Performance Marketing",
      "Lead Generation",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=600&auto=format&fit=crop&q=80",
    borderClasses: "border-right-behind border-bottom-behind",
    glowColor: "rgba(34, 197, 94, 0.55)",
    phaseOffset: Math.PI * 1.8,
    speedMultiplier: 0.95,
  },
];

// Max tilt angle for autonomous float
const MAX_TILT = 8;
// Extra tilt added on hover
const HOVER_TILT = 20;

const remap = (value: number, oldMax: number, newMax: number) => {
  const newValue = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
  return Math.min(Math.max(newValue, -newMax), newMax);
};

const Plans = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Per-card hover state: null = not hovered, {x, y} = mouse-driven target tilt
  const hoverTargets = useRef<({ x: number; y: number } | null)[]>(
    servicesData.map(() => null)
  );
  // Smoothed hover tilt (lerped toward target)
  const hoverCurrent = useRef<{ x: number; y: number }[]>(
    servicesData.map(() => ({ x: 0, y: 0 }))
  );

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = (rect.left + rect.right) / 2;
    const cy = (rect.top + rect.bottom) / 2;
    const x = remap(e.clientX - cx, rect.width / 2, HOVER_TILT);
    const y = remap(e.clientY - cy, rect.height / 2, HOVER_TILT);
    hoverTargets.current[index] = { x, y: -y };
  };

  const handleMouseLeave = (index: number) => {
    hoverTargets.current[index] = null;
  };

  useEffect(() => {
    // GSAP Scroll Animations
    gsap.fromTo(
      ".services-title",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-title",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".plans-3d-card",
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".plans-3d-grid",
          start: "top 85%",
        },
      }
    );

    // Autonomous floating animation loop
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      const elapsed = (timestamp - startTimeRef.current) / 1000; // seconds

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const { phaseOffset, speedMultiplier } = servicesData[index];
        const t = elapsed * speedMultiplier;

        // Autonomous float (always running)
        const floatY = Math.sin(t * 0.7 + phaseOffset) * MAX_TILT;
        const floatX = Math.sin(t * 0.5 + phaseOffset + Math.PI * 0.4) * (MAX_TILT * 0.65);

        // Hover tilt (lerped toward mouse position, or back to 0)
        const hoverTarget = hoverTargets.current[index];
        const hc = hoverCurrent.current[index];
        const targetX = hoverTarget ? hoverTarget.x : 0;
        const targetY = hoverTarget ? hoverTarget.y : 0;
        const lerpSpeed = hoverTarget ? 0.12 : 0.06;
        hc.x = lerp(hc.x, targetX, lerpSpeed);
        hc.y = lerp(hc.y, targetY, lerpSpeed);

        // On hover the mouse tilt dominates; float still contributes subtly
        const hoverWeight = hoverTarget ? 0.25 : 1.0;
        const rotateY = floatY * hoverWeight + hc.x;
        const rotateX = floatX * hoverWeight + hc.y;

        card.style.setProperty("--rotateY", `${rotateY}deg`);
        card.style.setProperty("--rotateX", `${rotateX}deg`);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section id="plans" className="py-10 md:py-24 bg-slate-50 relative overflow-hidden">
      {/* Abstract Background Blue Lines & Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
        <svg className="w-full h-full min-h-[600px]" xmlns="http://www.w3.org/2000/svg">
          <line x1="-10%" y1="20%" x2="50%" y2="60%" stroke="#0b1f3f" strokeWidth="2" strokeDasharray="10 15" />
          <line x1="110%" y1="30%" x2="40%" y2="80%" stroke="#0b1f3f" strokeWidth="3" />
          <line x1="20%" y1="85%" x2="80%" y2="75%" stroke="#0b1f3f" strokeWidth="1.5" />
          <line x1="90%" y1="10%" x2="75%" y2="40%" stroke="#0b1f3f" strokeWidth="2" strokeDasharray="5 5" />
          <circle cx="15%" cy="35%" r="6" fill="none" stroke="#0b1f3f" strokeWidth="2" />
          <circle cx="85%" cy="65%" r="12" fill="none" stroke="#0b1f3f" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* Styles */}
      <style>{`
        .plans-3d-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 1rem;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .plans-3d-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.5rem;
          }
        }

        @media (min-width: 1024px) {
          .plans-3d-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 1.5rem;
          }
        }

        @media (min-width: 1280px) {
          .plans-3d-grid {
            gap: 2rem;
          }
        }

        .plans-3d-card {
          position: relative;
          height: 20rem;
          width: 100%;
          aspect-ratio: 5 / 7;
          color: #ffffff;
          perspective: 50rem;
          cursor: pointer;
          /* Smooth rendering for the continuous rotation */
          will-change: transform;
        }

        @media (min-width: 768px) {
          .plans-3d-card {
            height: 26rem;
          }
        }

        /* Glowing backdrop shadow behind card */
        .plans-3d-card .card-shadow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, var(--glow-color, rgba(11, 31, 63, 0.4)), transparent 70%);
          opacity: 0.8;
          filter: blur(2rem);
          transform: rotateX(var(--rotateX, 0deg)) rotateY(var(--rotateY, 0deg)) translate3d(0, 1.5rem, -1.5rem);
          transition: transform 0.05s linear;
        }

        /* Card background holding the real image */
        .plans-3d-card .card-bg-image {
          position: absolute;
          inset: 0;
          background-image: var(--url);
          background-size: cover;
          background-position: center;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transform: rotateX(var(--rotateX, 0deg)) rotateY(var(--rotateY, 0deg)) translate3d(0, 0, 0rem);
          transition: transform 0.05s linear;
        }

        /* Vignette and color gradient overlay */
        .plans-3d-card .card-bg-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(15, 23, 42, 0.95) 0%,
            rgba(15, 23, 42, 0.6) 40%,
            rgba(15, 23, 42, 0.2) 100%
          );
        }

        /* 3D Content Info Layer */
        .plans-3d-card .card-content {
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          inset: 0;
          padding: 1.5rem;
          transform: rotateX(var(--rotateX, 0deg)) rotateY(var(--rotateY, 0deg)) translate3d(0, 0, 3.5rem);
          z-index: 4;
          transition: transform 0.05s linear;
        }

        @media (min-width: 768px) {
          .plans-3d-card .card-content {
            padding: 3rem 2.25rem;
          }
        }

        .plans-3d-card h3 {
          font-family: "Montserrat", sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);
          color: #ffffff;
        }

        .plans-3d-card .card-items {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .plans-3d-card .card-item {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: "Montserrat", sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.92);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 6px;
          padding: 0.25rem 0.6rem;
          backdrop-filter: blur(4px);
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
          letter-spacing: 0.01em;
        }

        .plans-3d-card .card-item::before {
          content: "";
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.7);
          flex-shrink: 0;
        }

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .plans-3d-card .card-shadow,
          .plans-3d-card .card-bg-image,
          .plans-3d-card .card-content {
            transform: none !important;
          }
        }
      `}</style>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl z-0" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header — split layout */}
        <div className="mb-8 md:mb-16">
          {/* Top label */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-[#0b1f3f]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#0b1f3f]/60">
              What We Offer
            </span>
          </div>

          {/* Two-column row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Left — big title */}
            <h2 className="services-title text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              <span
                style={{
                  background: "linear-gradient(135deg, #0b1f3f 0%, #1a4480 45%, #2d6aad 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                  paddingBottom: "0.1em",
                  paddingRight: "0.1em",
                }}
              >
                Our Premium<br />Services
              </span>
            </h2>

            {/* Right — description with left accent bar */}
            <div className="services-title flex gap-4 md:max-w-sm">
              <div className="w-1 rounded-full bg-gradient-to-b from-[#0b1f3f] to-[#2d6aad] flex-shrink-0" />
              <p className="text-base text-slate-500 leading-relaxed">
                Discover cutting-edge technology and tailored digital solutions built to drive growth and accelerate your business.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-8 h-px bg-gradient-to-r from-[#0b1f3f]/20 via-[#2d6aad]/10 to-transparent" />
        </div>

        {/* 3D Cards Grid */}
        <div className="plans-3d-grid">
          {servicesData.map((service, index) => {
            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`plans-3d-card ${service.borderClasses}`}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {/* Glowing Outer Aura */}
                <div
                  className="card-shadow"
                  style={{ "--glow-color": service.glowColor } as React.CSSProperties}
                />

                {/* 3D Card Image Background */}
                <div
                  className="card-bg-image"
                  style={{ "--url": `url('${service.imageUrl}')` } as React.CSSProperties}
                />

                {/* 3D Content Info Layer */}
                <div className="card-content">
                  <h3>{service.title}</h3>
                  <div className="card-items">
                    {service.items.map((item, i) => (
                      <span key={i} className="card-item">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Plans;
