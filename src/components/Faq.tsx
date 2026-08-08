import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Sparkles,
  Network,
  Zap,
  ShieldCheck,
  CreditCard,
  Infinity as InfinityIcon,
  Headphones,
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  badgeText: string;
  highlightText: string;
  answer: string;
  bulletPoints: string[];
  icon: React.ElementType;
  accentBg: string;
}

const faqData: FAQItem[] = [
  {
    id: "01",
    question: "What is the advantage of a leased line over standard broadband?",
    badgeText: "1:1 Symmetrical Speed",
    highlightText: "Guaranteed 1:1 Bandwidth",
    answer:
      "A True Connect leased line provides an unshared, 1:1 dedicated internet pipe exclusively for your organization. Unlike shared broadband where speeds drop during peak hours, your leased line guarantees identical upload and download speeds with zero contention.",
    bulletPoints: [
      "Dedicated 1:1 symmetrical bandwidth",
      "Reliance Jio Tier-1 optical fiber network",
      "Zero speed throttling & unshared capacity",
      "Enterprise SLA with 99.99% uptime guarantee",
      "Static IP addresses & MPLS routing included"
    ],
    icon: Network,
    accentBg: "from-[#ff2e55] to-[#e01d42]",
  },
  {
    id: "02",
    question: "How fast can a True Connect leased line be deployed for my business?",
    badgeText: "Rapid Onboarding",
    highlightText: "Fast Turnkey Setup",
    answer:
      "Our engineering team conducts a rapid site feasibility survey and deploys dedicated fiber optic infrastructure to your building. We ensure a seamless setup with zero disruption to your active operations.",
    bulletPoints: [
      "Free professional site feasibility assessment",
      "Dedicated fiber line installation & testing",
      "Pre-configured hardware router & firewall",
      "Zero downtime migration from old provider",
      "Dedicated engineer assigned to your account"
    ],
    icon: Zap,
    accentBg: "from-[#ff2e55] to-[#d61b3d]",
  },
  {
    id: "03",
    question: "What is the pricing model for dedicated leased lines?",
    badgeText: "Transparent Billing",
    highlightText: "Custom Tiered Pricing",
    answer:
      "Pricing depends on your selected speed tier (10 Mbps to 1 Gbps+), SLA level, and contract duration. We provide flat-rate monthly billing with no hidden fees, peak surcharges, or usage caps.",
    bulletPoints: [
      "Fixed, predictable monthly flat rate",
      "Flexible plans from 10 Mbps up to 10 Gbps",
      "No overage fees or peak-hour surcharges",
      "Custom enterprise SLA packages available",
      "Free hardware leasing & maintenance options"
    ],
    icon: CreditCard,
    accentBg: "from-[#ff2e55] to-[#e01d42]",
  },
  {
    id: "04",
    question: "Is there any cap on monthly data usage or speed throttling?",
    badgeText: "100% Unlimited",
    highlightText: "Truly Unlimited Data",
    answer:
      "No. True Connect enterprise leased lines feature unmetered data bandwidth. You get unlimited data consumption at maximum speed 24 hours a day, 365 days a year without any Fair Usage Policy (FUP) caps.",
    bulletPoints: [
      "Truly unmetered enterprise data throughput",
      "No Fair Usage Policy (FUP) limits or throttling",
      "Consistent low latency for cloud & VoIP",
      "High-speed backup & large file transfers",
      "Optimized routing for enterprise applications"
    ],
    icon: InfinityIcon,
    accentBg: "from-[#ff2e55] to-[#d61b3d]",
  },
  {
    id: "05",
    question: "What kind of uptime SLA and technical support do you guarantee?",
    badgeText: "99.99% Uptime SLA",
    highlightText: "24/7 NOC Monitoring",
    answer:
      "We back our network with a strict 99.99% uptime Service Level Agreement (SLA). Our Network Operations Center (NOC) monitors your link 24/7/365, with an average Mean Time to Repair (MTTR) of under 2 hours.",
    bulletPoints: [
      "Guaranteed 99.99% network uptime SLA",
      "24/7/365 proactive NOC monitoring",
      "Sub-2-hour MTTR on-site technical resolution",
      "Direct line to dedicated support engineers",
      "Financially backed SLA credit protection"
    ],
    icon: ShieldCheck,
    accentBg: "from-[#ff2e55] to-[#e01d42]",
  },
  {
    id: "06",
    question: "Why choose True Connect powered by Reliance Jio?",
    badgeText: "Enterprise Backbone",
    highlightText: "Jio Enterprise Partner",
    answer:
      "True Connect combines Reliance Jio's world-class optical fiber backbone with personalized, local enterprise service. You get unmatched network reach paired with direct, responsive human support.",
    bulletPoints: [
      "Backed by Reliance Jio's nationwide network",
      "End-to-end SD-WAN & cyber security options",
      "Scalable infrastructure designed for business growth",
      "Single point of contact for billing & support",
      "Proven reliability across thousands of enterprises"
    ],
    icon: Headphones,
    accentBg: "from-[#ff2e55] to-[#d61b3d]",
  },
];

// Pentatonic piano scale frequencies (C4, D4, E4, G4, A4, C5, E5)
const PIANO_NOTES = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 659.25];

let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
};

const playPianoNote = (index: number) => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const freq = PIANO_NOTES[index % PIANO_NOTES.length];
    const now = ctx.currentTime;

    // Fundamental Sine Oscillator (Soft Acoustic Tone)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, now);

    // Harmonic Overtone Oscillator (Piano Body Ring)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Envelope Curves (Fast Strike, Exponential Decay with boosted volume)
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.38, now + 0.01);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.12, now + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

    // Low-pass Filter for rich grand piano timbre
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2200, now);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(filter);
    gain2.connect(filter);
    filter.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.95);
    osc2.stop(now + 0.95);
  } catch {
    // Silent fallback if AudioContext fails
  }
};

const Faq: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  useEffect(() => {
    // Unlock browser audio context on first user click or touch anywhere
    const unlockAudio = () => {
      getAudioContext();
    };
    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  const handleHover = (index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
      playPianoNote(index);
    }
  };

  const toggleItem = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
      playPianoNote(index);
    }
  };

  return (
    <section id="faq" className="py-10 md:py-14 bg-[#fafbfc] text-[#0b1f3f] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-slate-100/60 via-slate-50/20 to-transparent pointer-events-none -z-10" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-[#0b1f3f] text-[11px] font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3 text-[#0b1f3f]" />
            <span>Support Center</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0b1f3f] leading-[1.15]">
                Frequently Asked <br />
                Questions
              </h2>
            </div>
            <p className="text-slate-500 text-sm md:text-base max-w-md leading-relaxed">
              Get instant, transparent answers about True Connect's dedicated Jio Leased Line network, deployment, and SLA guarantees.
            </p>
          </div>

          {/* Section Divider Line */}
          <div className="mt-8 flex items-center justify-between border-b border-slate-200 pb-2.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              BUILD & OPERATE — FAQ
            </span>
            <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">
              Hover over any question to expand
            </span>
          </div>
        </div>

        {/* FAQ Accordion List (Lorolabs style) */}
        <div className="flex flex-col">
          {faqData.map((item, index) => {
            const isExpanded = activeIndex === index;
            const IconComponent = item.icon;

            return (
              <div
                key={item.id}
                onMouseEnter={() => handleHover(index)}
                className="border-b border-slate-200 transition-colors duration-200"
              >
                {/* Collapsed State Header Row */}
                {!isExpanded ? (
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    onMouseEnter={() => handleHover(index)}
                    className="w-full py-4 md:py-5 flex items-center justify-between gap-4 text-left group hover:bg-slate-50/80 px-3 md:px-5 rounded-xl transition-all duration-200"
                  >
                    {/* Left: Icon + Question Title */}
                    <div className="flex items-center gap-3.5 md:gap-4 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 group-hover:border-[#0b1f3f]/30 group-hover:bg-white transition-colors">
                        <IconComponent className="w-3.5 h-3.5 text-[#0b1f3f]" />
                      </div>
                      <span className="text-base md:text-lg font-semibold text-[#0b1f3f] group-hover:text-[#0b1f3f] transition-colors truncate sm:whitespace-normal">
                        {item.question}
                      </span>
                    </div>

                    {/* Right: Badge + Arrow */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden md:inline-block text-xs font-medium text-slate-500">
                        {item.badgeText}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-[#0b1f3f] group-hover:border-[#0b1f3f]/40 group-hover:bg-[#0b1f3f]/10 transition-all">
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </button>
                ) : (
                  /* Expanded Primary Blue Card (Shows Only Question & Answer) */
                  <div className="my-3">
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full rounded-2xl bg-[#0B1F3F] p-5 sm:p-6 md:p-8 text-white shadow-xl relative overflow-hidden"
                    >
                      {/* Top Header Row of Card */}
                      <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-white/15">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                            <IconComponent className="w-4 h-4 text-[#E6E84A]" />
                          </div>
                          <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white leading-snug">
                            {item.question}
                          </h3>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleItem(index)}
                          className="flex items-center gap-1 text-xs font-medium text-white/80 hover:text-white underline underline-offset-4 shrink-0 transition-opacity"
                        >
                          <span>Close</span>
                          <ArrowUpRight className="w-3.5 h-3.5 rotate-180" />
                        </button>
                      </div>

                      {/* Card Content: Only Answer Paragraph */}
                      <div className="relative z-10">
                        <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;

