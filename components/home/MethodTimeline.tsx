"use client";

import { useTranslations } from "next-intl";
import { useRef, type CSSProperties } from "react";
import { useInView } from "motion/react";

import { methodStages, type MethodStage } from "@/data/method";
import { REDUCED_MOTION_QUERY, useMediaQuery } from "@/lib/media-query";

/**
 * One stage: a rail segment on the left, the copy on the right.
 *
 * Each row owns its own slice of the rail rather than one line being driven by
 * a shared scroll value. That makes the fill advance stage by stage as you
 * scroll — the "progressive scroll / line" the source asks for — without a
 * MotionValue, without measuring anything, and without a second source of truth
 * for what is on screen. It is the same `data-shown` mechanism `ServiceVisual`
 * and the AI Audit panel already use.
 */
function MethodStageRow({ stage, index }: { stage: MethodStage; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  /*
   * `data-shown` is real rendered output, so the preference comes from
   * `useMediaQuery` rather than Motion's `useReducedMotion()` — the latter is
   * already `true` on the first client render while the server rendered `false`,
   * which mismatches the attribute during hydration.
   */
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const t = useTranslations("Method.stages");

  const shown = Boolean(reducedMotion) || inView;

  return (
    <li
      ref={ref}
      data-shown={shown}
      className="method-stage flex gap-6 sm:gap-10"
      style={{ "--d": `${index * 60}ms` } as CSSProperties}
    >
      {/*
        The rail column is exactly the marker's width, and every child is
        centred with `left-1/2` plus a negative margin rather than a Tailwind
        translate utility — the fill animates `transform`, and a translate
        utility would fight it for the same property.
      */}
      <div aria-hidden="true" className="relative w-2.5 shrink-0 self-stretch">
        <span className="method-rail absolute left-1/2 top-0 -ml-px h-full w-px bg-line" />
        <span className="method-rail-fill absolute left-1/2 top-0 -ml-px h-full w-px bg-black" />
        <span className="method-marker absolute left-1/2 top-1 -ml-[5px] size-2.5 border border-line bg-bg" />
      </div>

      {/*
        The row spacing lives on the body rather than on the `<li>`. If it were
        `pb-14` on the `<li>`, the rail column — which stretches to the row's
        content box — would stop short of it and the rail would break between
        rows. `globals.css` removes it on the last row.
      */}
      <div className="method-stage-body min-w-0 flex-1 pb-14">
        <p className="method-text flex items-center gap-3 font-mono text-label uppercase text-black/70">
          <span>{stage.number}</span>
          <span aria-hidden="true" className="h-px w-6 bg-line" />
          <span>{t(`${stage.id}.title`)}</span>
        </p>

        <p className="method-text mt-4 max-w-[52ch] text-body-lg text-pretty text-black/75">
          {t(`${stage.id}.description`)}
        </p>
      </div>
    </li>
  );
}

/**
 * The five method stages as a vertical timeline.
 *
 * Vertical at every width, which is what the source asks for on mobile and what
 * a five-step list wants anyway — there is no horizontal variant to switch to.
 */
export function MethodTimeline() {
  return (
    <ol className="flex flex-col">
      {methodStages.map((stage, index) => (
        <MethodStageRow key={stage.id} stage={stage} index={index} />
      ))}
    </ol>
  );
}
