import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Briefcase, Workflow, Megaphone, Clapperboard, TrendingUp, Wallet, Wifi, Rocket } from "lucide-react";
import { home } from "@/content/site";

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

const faqMeta = [
  { badgeText: "Our services", icon: Briefcase },
  { badgeText: "Process", icon: Workflow },
  { badgeText: "Organic and ads", icon: Megaphone },
  { badgeText: "Content and influencers", icon: Clapperboard },
  { badgeText: "Results and SEO", icon: TrendingUp },
  { badgeText: "Pricing", icon: Wallet },
  { badgeText: "Enterprise internet", icon: Wifi },
  { badgeText: "Getting started", icon: Rocket },
];

const faqData: FAQItem[] = home.faq.items.map((item, i) => ({
  id: String(i + 1).padStart(2, "0"),
  question: item.q,
  badgeText: faqMeta[i].badgeText,
  highlightText: "",
  answer: item.a,
  bulletPoints: [],
  icon: faqMeta[i].icon,
  accentBg: "",
}));

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

  // Hover opens a question only when the mouse really moves over it. While the page is scrolling,
  // rows slide under a still mouse; opening them then changes the page height mid-scroll and makes
  // scrolling feel stuck, so hovers during (and just after) a scroll are ignored.
  const lastScroll = useRef(0);
  useEffect(() => {
    const onScroll = () => { lastScroll.current = performance.now(); };
    window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleHover = (index: number) => {
    if (performance.now() - lastScroll.current < 400) return;
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
    <section id="faq" className="py-14 md:py-20 bg-[#fafbfc] text-[#0b1f3f] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-slate-100/60 via-slate-50/20 to-transparent pointer-events-none -z-10" />

      <div className="container-tc">
        {/* Header Section */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-[#0b1f3f] text-[11px] font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3 text-[#0b1f3f]" />
            <span>FAQ</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-[#0b1f3f] leading-[1.15]">
                Frequently asked <br />
                questions
              </h2>
            </div>
            <p className="text-slate-500 text-[13px] sm:text-sm md:text-base max-w-md leading-relaxed">
              {home.faq.sub}
            </p>
          </div>

          {/* Section Divider Line */}
          <div className="mt-8 flex items-center justify-between border-b border-slate-200 pb-2.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              TRUE CONNECT — FAQ
            </span>
            <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">
              Hover over any question to expand
            </span>
          </div>
        </div>

        {/* FAQ Accordion List (Lorolabs style) */}
        <div data-stagger className="flex flex-col">
          {faqData.map((item, index) => {
            const isExpanded = activeIndex === index;
            const IconComponent = item.icon;
            const yellow = index % 2 === 1; // 1st navy, 2nd yellow, 3rd navy, 4th yellow ...
            const hoverBg = yellow
              ? "hover:bg-[#E6E84A] hover:shadow-lg"
              : "hover:bg-gradient-to-r hover:from-[#0b1f3f] hover:to-[#153460] hover:shadow-lg";
            const hoverText = yellow ? "group-hover:text-[#0b1f3f]" : "group-hover:text-white";

            return (
              <div
                key={item.id}
                onMouseMove={() => handleHover(index)}
                className="border-b border-slate-200 transition-colors duration-200"
              >
                {/* Collapsed State Header Row */}
                {!isExpanded ? (
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    onMouseMove={() => handleHover(index)}
                    className={`w-full py-4 md:py-5 flex items-center justify-between gap-4 text-left group px-3 md:px-5 rounded-xl transition-all duration-300 ${hoverBg}`}
                  >
                    {/* Left: Icon + Question Title */}
                    <div className="flex items-center gap-3.5 md:gap-4 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 group-hover:border-white/20 group-hover:bg-white/10 transition-colors">
                        <IconComponent className={`w-3.5 h-3.5 text-[#0b1f3f] ${hoverText} transition-colors`} />
                      </div>
                      <span className={`text-base md:text-lg font-semibold text-[#0b1f3f] ${hoverText} transition-colors truncate sm:whitespace-normal`}>
                        {item.question}
                      </span>
                    </div>

                    {/* Right: Badge + Arrow */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`hidden md:inline-block text-xs font-medium text-slate-500 ${yellow ? "group-hover:text-[#0b1f3f]/70" : "group-hover:text-white/70"}`}>
                        {item.badgeText}
                      </span>
                      <div className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 transition-all ${yellow ? "group-hover:text-[#0b1f3f] group-hover:border-[#0b1f3f]/40 group-hover:bg-[#0b1f3f]/10" : "group-hover:text-white group-hover:border-white/40 group-hover:bg-white/10"}`}>
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
                      className={`w-full rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl relative overflow-hidden ${yellow ? "bg-[#E6E84A] text-[#0b1f3f]" : "bg-gradient-to-br from-[#0b1f3f] to-[#153460] text-white"}`}
                    >
                      {/* Top Header Row of Card */}
                      <div className={`flex items-start justify-between gap-4 mb-4 pb-3 border-b ${yellow ? "border-[#0b1f3f]/15" : "border-white/15"}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg backdrop-blur-md border flex items-center justify-center shrink-0 ${yellow ? "bg-[#0b1f3f]/10 border-[#0b1f3f]/20" : "bg-white/10 border-white/20"}`}>
                            <IconComponent className={`w-4 h-4 ${yellow ? "text-[#0b1f3f]" : "text-[#E6E84A]"}`} />
                          </div>
                          <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight leading-snug">
                            {item.question}
                          </h3>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleItem(index)}
                          className="flex items-center gap-1 text-xs font-medium opacity-80 hover:opacity-100 underline underline-offset-4 shrink-0 transition-opacity"
                        >
                          <span>Close</span>
                          <ArrowUpRight className="w-3.5 h-3.5 rotate-180" />
                        </button>
                      </div>

                      {/* Card Content: Only Answer Paragraph */}
                      <div className="relative z-10">
                        <p className={`text-sm sm:text-base leading-relaxed font-normal ${yellow ? "text-[#0b1f3f]/90" : "text-white/90"}`}>
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

