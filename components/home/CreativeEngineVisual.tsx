"use client";

import { useRef, type CSSProperties } from "react";
import { useInView } from "motion/react";

import { creativeCaption, creativeOutputs, creativeSeed } from "@/data/creative-engine";
import { REDUCED_MOTION_QUERY, useMediaQuery } from "@/lib/media-query";

/** Delay between two consecutive branches, in ms. */
const STEP = 90;

/** The stagger for branch `n`. */
const beat = (n: number) => ({ "--d": `${n * STEP}ms` }) as CSSProperties;

/**
 * The accessible name for the whole diagram.
 *
 * The figure is `role="img"`, so this string is the only thing a screen reader
 * gets — the caption below it is not announced as part of the figure. It has to
 * carry both the content (one seed, six formats) and the disclaimer, because
 * neither is available anywhere else.
 */
const LABEL =
  "Diagram of one seed idea branching into six output formats — film, reel, ad, social, story and landing. Illustrative diagram of a content system, not a client campaign or a published asset.";

/**
 * Section 10 — the creative-engine diagram.
 *
 * Client Component purely for the in-view trigger. The build is a CSS stagger on
 * `opacity` and `transform`, so it never touches the main thread and collapses
 * to its finished state in one step under reduced motion.
 *
 * The source asks for this block to be a visual break and names the motion
 * concept it wants — "One → Many" — so the diagram is literally that: a single
 * seed block, a trunk that draws itself downward, and six branches extending
 * off it one after another. That is deliberately a different *primitive* from
 * the Product Studio frame next to it, which fades and lifts its layers into
 * place; here nothing fades in from nowhere, everything is drawn from the seed
 * outward.
 *
 * The connectors are `aria-hidden` decoration and carry no information on their
 * own — the six format labels do, which is why those keep an opacity floor in
 * their resting state instead of dropping to zero.
 */
export function CreativeEngineVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  /*
   * `data-shown` is real rendered output, so the preference has to come from
   * `useMediaQuery` rather than Motion's `useReducedMotion()` — the latter is
   * already `true` on the first client render while the server rendered `false`,
   * which mismatches the attribute during hydration.
   */
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);

  const shown = Boolean(reducedMotion) || inView;

  return (
    <figure className="flex flex-col gap-5">
      <div ref={ref} role="img" aria-label={LABEL} data-shown={shown} className="ce-visual">
        {/*
          The seed. `origin-bottom-left` means it grows out of the exact corner
          the trunk attaches to, so the two never drift apart mid-animation.
        */}
        <div className="ce-seed inline-flex items-center bg-black px-5 py-3 text-white">
          <span className="font-mono text-label uppercase">{creativeSeed}</span>
        </div>

        {/*
          The fan. Each row owns its own slice of the trunk, so the segments abut
          into one continuous line without anything measuring the list — the same
          technique the Method rail uses. The row carries no vertical padding:
          the spacing lives on the chip's own margin, which keeps the branch
          column's centre and the chip's centre on the same line, so every stub
          meets its chip exactly.
        */}
        <ol>
          {creativeOutputs.map((output, index) => (
            <li key={output.id} style={beat(index)} className="ce-row flex items-center">
              <span aria-hidden="true" className="relative block w-8 self-stretch">
                <span className="ce-trunk absolute left-0 top-0 w-px bg-black" />
                <span className="ce-stub absolute left-0 top-1/2 h-px w-8 bg-black" />
              </span>

              <span className="ce-chip my-2 border border-black px-3.5 py-2 font-mono text-label uppercase">
                {output.label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <figcaption className="text-small text-black/70">{creativeCaption}</figcaption>
    </figure>
  );
}
