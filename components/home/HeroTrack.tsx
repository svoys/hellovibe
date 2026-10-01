"use client";

import { animate, useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

import { useMediaQuery } from "@/lib/media-query";

/**
 * Must stay in sync with the `.hero-track` / `.hero-stage` media query in
 * `app/globals.css`.
 *
 * Above this the Hero is a tall track with a sticky stage and scroll position
 * drives the machine. Below it there is no track: the Hero is a normal document
 * block and the machine plays a single intro instead. That split exists because
 * on a stacked layout the copy and the machine cannot both fit inside a fixed
 * `100svh` sticky box, and squeezing them in would break short viewports.
 */
export const TRACK_QUERY = "(min-width: 64rem) and (min-height: 40rem)";

const INTRO_DURATION = 2.4;
const INTRO_DELAY = 0.3;
const INTRO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HeroProgressContext = createContext<MotionValue<number> | null>(null);

/**
 * Owns the Hero's 0–1 progress value and hands it to the Vibe Machine through
 * context. Keeping the provider here means `Hero` itself stays a Server
 * Component — only this wrapper and the machine cross into the client.
 */
export function HeroTrack({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const tracked = useMediaQuery(TRACK_QUERY);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Settle slightly before the track ends so the final state rests for a beat
  // instead of snapping as the next section arrives.
  const scrollProgress = useTransform(scrollYProgress, [0, 0.88], [0, 1]);

  const intro = useMotionValue(0);
  useEffect(() => {
    if (tracked) return;
    const controls = animate(intro, 1, {
      duration: INTRO_DURATION,
      delay: INTRO_DELAY,
      ease: INTRO_EASE,
    });
    return () => controls.stop();
  }, [tracked, intro]);

  return (
    <HeroProgressContext.Provider value={tracked ? scrollProgress : intro}>
      <section ref={sectionRef} aria-labelledby="hero-title" className="hero-track">
        {children}
      </section>
    </HeroProgressContext.Provider>
  );
}

/** The Hero's 0–1 progress. Throws outside {@link HeroTrack} rather than silently no-op. */
export function useHeroProgress(): MotionValue<number> {
  const progress = useContext(HeroProgressContext);
  if (!progress) {
    throw new Error("useHeroProgress must be used inside <HeroTrack>");
  }
  return progress;
}
