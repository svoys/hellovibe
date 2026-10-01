"use client";

import { useRef, type CSSProperties } from "react";
import { useInView } from "motion/react";

import { Tag } from "@/components/ui/Tag";
import { auditCaption, auditScanAreas } from "@/data/ai-audit";
import { REDUCED_MOTION_QUERY, useMediaQuery } from "@/lib/media-query";

const NEXT_STEPS = ["Prioritize", "Build", "Measure"] as const;

/**
 * The accessible name for the whole panel.
 *
 * It has to carry the disclaimer too, not just the visual caption: the panel is
 * `role="img"`, so this string is the *only* thing a screen reader gets, and it
 * must not be possible to mistake the diagram for a real analysis through it.
 */
const LABEL =
  "Conceptual diagnostic interface, labelled Demo. A panel titled Business scan, listing the seven areas an AI audit examines — business model, processes, customer journey, operations, sales, marketing and existing technology — above the next steps: prioritize, build, measure. Illustrative interface, not a live analysis.";

/**
 * Section 06 — the AI Audit diagnostic panel.
 *
 * Client Component purely for the in-view trigger. The stagger is a CSS
 * transition on `transform` and `opacity`, so the animation stays off the main
 * thread and the whole panel collapses to its final state in one step under
 * reduced motion.
 *
 * What this panel deliberately does **not** contain: any number, percentage,
 * score or value bar. The source conversation forbids fabricated metrics in
 * three separate places and then contradicts itself with a mock full of them
 * (`12 processes analyzed`, `7 AI opportunities found`). The seven rows below
 * are a fixed description of the *method*, which can be stated honestly; a
 * finding about a business we have never audited cannot.
 */
export function AIAuditVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  /*
   * `data-shown` below is real rendered output, so the preference has to come
   * from `useMediaQuery` rather than Motion's `useReducedMotion()` — the latter
   * already reports `true` on the first client render while the server rendered
   * `false`, which is a hydration mismatch on the attribute.
   */
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);

  const shown = Boolean(reducedMotion) || inView;

  return (
    <figure className="flex flex-col gap-4">
      <div
        ref={ref}
        role="img"
        aria-label={LABEL}
        data-shown={shown}
        className="audit-panel border border-black bg-white"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <span className="flex min-w-0 items-center gap-3">
            <span aria-hidden="true" className="inline-block size-2 shrink-0 bg-black" />
            <span className="font-mono text-label uppercase text-black">Business scan</span>
          </span>

          {/*
            The one place `--color-vibe` appears in this section. It marks the
            panel as a system artefact rather than a result.
          */}
          <Tag variant="vibe">Demo</Tag>
        </div>

        <div className="px-5 py-5">
          <p className="font-mono text-label uppercase text-black/70">What we look at</p>

          <ul className="mt-4 flex flex-col">
            {auditScanAreas.map((area, index) => (
              <li
                key={area}
                style={{ "--d": `${index * 60}ms` } as CSSProperties}
                /*
                  The label column has to fit "Existing technology" on one line
                  at every width — about 153px at the smallest step of
                  `text-label`. `8.5rem` was tried and wrapped that label to two
                  lines at 320px, which makes the row taller than its siblings
                  and breaks the rhythm of the panel. A short rule at 320px is
                  the better trade.
                */
                className="audit-row grid grid-cols-[minmax(0,10rem)_1fr] items-center gap-4 py-2.5"
              >
                <span className="font-mono text-label uppercase text-black/70">{area}</span>
                {/* Equal length on every row — a varying rule would read as a chart. */}
                <span aria-hidden="true" className="h-px w-full bg-line" />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line px-5 py-4">
          <span className="font-mono text-label uppercase text-black/70">Next</span>
          <span className="font-mono text-label uppercase text-black">
            {NEXT_STEPS.map((step, index) => (
              <span key={step}>
                {index > 0 ? <span aria-hidden="true">{" → "}</span> : null}
                {step}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/*
        Deliberately *not* the uppercase mono the rest of the panel uses. The
        instrument labels are styling; this sentence is the studio speaking, and
        it has to be read rather than skimmed — so it stays in sentence case in
        the body face, visually outside the instrument.
      */}
      <figcaption className="text-small text-black/70">{auditCaption}</figcaption>
    </figure>
  );
}
