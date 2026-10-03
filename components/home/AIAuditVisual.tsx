"use client";

import { useTranslations } from "next-intl";
import { useRef, type CSSProperties } from "react";
import { useInView } from "motion/react";

import { Tag } from "@/components/ui/Tag";
import { REDUCED_MOTION_QUERY, useMediaQuery } from "@/lib/media-query";

/**
 * Section 06 — the AI Audit diagnostic panel.
 *
 * Client Component purely for the in-view trigger. The stagger is a CSS
 * transition on `transform` and `opacity`, so the animation stays off the main
 * thread and the whole panel collapses to its final state in one step under
 * reduced motion.
 *
 * Every string is localised: the panel title, the instrument labels, the seven
 * method rows, the next steps and the accessible name under `AIAudit.visual`
 * and `AIAudit.scanAreas`. The accessible name has to be translated with
 * particular care — the panel is `role="img"`, so it is the *only* thing a
 * screen reader gets, and it must not be possible to mistake the diagram for a
 * real analysis in any language.
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
  const t = useTranslations("AIAudit");

  const shown = Boolean(reducedMotion) || inView;
  const scanAreas = t.raw("scanAreas") as readonly string[];
  const nextSteps = t.raw("visual.nextSteps") as readonly string[];

  return (
    <figure className="flex flex-col gap-4">
      <div
        ref={ref}
        role="img"
        aria-label={t("visual.label")}
        data-shown={shown}
        className="audit-panel border border-black bg-white"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <span className="flex min-w-0 items-center gap-3">
            <span aria-hidden="true" className="inline-block size-2 shrink-0 bg-black" />
            <span className="font-mono text-label uppercase text-black">
              {t("visual.panelTitle")}
            </span>
          </span>

          {/*
            The one place `--color-vibe` appears in this section. It marks the
            panel as a system artefact rather than a result.
          */}
          <Tag variant="vibe">{t("visual.demoTag")}</Tag>
        </div>

        <div className="px-5 py-5">
          <p className="font-mono text-label uppercase text-black/70">{t("visual.scanLabel")}</p>

          <ul className="mt-4 flex flex-col">
            {scanAreas.map((area, index) => (
              <li
                key={area}
                style={{ "--d": `${index * 60}ms` } as CSSProperties}
                /*
                  The label column has to fit the longest area on one line at
                  every width — about 153px at the smallest step of `text-label`.
                  `8.5rem` was tried and wrapped that label to two lines at
                  320px, which makes the row taller than its siblings and breaks
                  the rhythm of the panel. A short rule at 320px is the better
                  trade. The column is fixed rather than content-sized for the
                  same reason: a translation that is a little longer must not
                  resize the panel.
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
          <span className="font-mono text-label uppercase text-black/70">{t("visual.nextLabel")}</span>
          <span className="font-mono text-label uppercase text-black">
            {nextSteps.map((step, index) => (
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
      <figcaption className="text-small text-black/70">{t("caption")}</figcaption>
    </figure>
  );
}
