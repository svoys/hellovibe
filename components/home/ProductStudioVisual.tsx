"use client";

import { useRef, type CSSProperties } from "react";
import { useInView } from "motion/react";

import { studioCaption, studioStages } from "@/data/product-studio";
import { REDUCED_MOTION_QUERY, useMediaQuery } from "@/lib/media-query";

/** Delay between two consecutive beats of the build, in ms. */
const STEP = 130;

/** The stagger for beat `n`. */
const beat = (n: number) => ({ "--d": `${n * STEP}ms` }) as CSSProperties;

/**
 * The accessible name for the whole diagram.
 *
 * It has to carry the disclaimer, not just the caption: the figure is
 * `role="img"`, so this string is the only thing a screen reader gets, and it
 * must not be possible to mistake the frame for a real product through it.
 * The two acronyms are expanded here as well — on the page they are expanded in
 * visible text, and a screen reader should not have to hear `MWP` bare.
 */
const LABEL =
  "Diagram of the six-stage product journey — idea, discovery, prototype, MWP, minimum working product, MVP, minimum viable product, and scale — beneath an abstract interface frame that firms up from wireframe to working interface. Illustrative diagram, not a screenshot of a real product.";

/**
 * Section 09 — the product-studio diagram.
 *
 * Client Component purely for the in-view trigger; the build itself is a CSS
 * stagger on `opacity` and `transform`, so it never touches the main thread and
 * collapses to its finished state in one step under reduced motion.
 *
 * The brief was "product UI fragments, wireframe → prototype → polished
 * interface", and the source permits a demo interface only where it is
 * *visually obvious* that it is a demo. So this is deliberately **shapes, not a
 * screenshot** — the same rule `ServiceVisual` already follows. There is no
 * chrome that could be read as a real app, no fake data, no fake client.
 *
 * Each layer is keyed to a stage of the journey: the chrome arrives with
 * `Idea`, the sidebar with `Discovery`, the dashed block with `Prototype`, the
 * filled blocks with `MWP`, the accent with `MVP`, and the repeated frames with
 * `Scale`. That is what makes the frame read as *firming up* rather than simply
 * fading in, and it is why the delays are derived from the stage index instead
 * of being hand-tuned.
 */
export function ProductStudioVisual() {
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
      <div
        ref={ref}
        role="img"
        aria-label={LABEL}
        data-shown={shown}
        className="studio-visual border border-white/15 bg-white/[0.03] p-4 sm:p-6"
      >
        {/* The frame. */}
        <div className="studio-frame border border-white/20">
          {/* beat 0 — window chrome */}
          <div
            style={beat(0)}
            className="studio-layer flex items-center gap-1.5 border-b border-white/15 px-3 py-2.5"
          >
            <span aria-hidden="true" className="size-1.5 bg-white/30" />
            <span aria-hidden="true" className="size-1.5 bg-white/30" />
            <span aria-hidden="true" className="size-1.5 bg-white/30" />
            <span aria-hidden="true" className="ml-auto h-px w-12 bg-white/25" />
          </div>

          <div className="grid grid-cols-[minmax(0,2.75rem)_minmax(0,1fr)] gap-3 p-3 sm:grid-cols-[minmax(0,5rem)_minmax(0,1fr)] sm:gap-4 sm:p-4">
            {/* beat 1 — sidebar */}
            <div style={beat(1)} className="studio-layer flex flex-col gap-2">
              <span aria-hidden="true" className="block h-1.5 w-full border border-white/25" />
              <span aria-hidden="true" className="block h-1.5 w-4/5 border border-white/25" />
              <span aria-hidden="true" className="block h-1.5 w-3/5 border border-white/25" />
            </div>

            <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
              {/* beat 2 — the wireframe block, still dashed */}
              <span
                aria-hidden="true"
                style={beat(2)}
                className="studio-layer block h-14 border border-dashed border-white/35 sm:h-20"
              />

              {/* beat 3 — the same content, now filled */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <span
                  aria-hidden="true"
                  style={beat(3)}
                  className="studio-layer block h-8 bg-white/25 sm:h-10"
                />
                <span
                  aria-hidden="true"
                  style={beat(3)}
                  className="studio-layer block h-8 bg-white/25 sm:h-10"
                />
              </div>

              {/* beat 4 — the one accent. `vibe` means system/progress, so it
                  marks the product as built rather than decorated. */}
              <span
                aria-hidden="true"
                style={beat(4)}
                className="studio-layer block h-1.5 w-1/3 bg-vibe"
              />
            </div>
          </div>

          {/* beat 5 — one interface becomes several */}
          <div
            style={beat(5)}
            className="studio-layer flex items-center gap-2 border-t border-white/15 px-3 py-2.5"
          >
            <span aria-hidden="true" className="h-4 flex-1 border border-white/25" />
            <span aria-hidden="true" className="h-4 flex-1 border border-white/25" />
            <span aria-hidden="true" className="h-4 flex-1 border border-white/25" />
          </div>
        </div>

        {/* The journey. A labelled grid rather than a rail — Method directly
            above this block already owns the vertical rail, and two rails in a
            row would read as one long section. */}
        <ol className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
          {studioStages.map((stage, index) => (
            <li key={stage.id} style={beat(index)} className="studio-stage flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="studio-node mt-1 size-1.5 shrink-0 bg-white/30"
              />
              <span className="min-w-0">
                <span className="block font-mono text-label uppercase text-white/70">
                  {stage.label}
                </span>
                {stage.gloss ? (
                  <span className="mt-1 block text-small text-pretty text-white/50">
                    {stage.gloss}
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/*
        Sentence case in the body face, deliberately not the uppercase mono the
        diagram uses. The diagram is an artefact; this sentence is the studio
        speaking, and it is what stops the frame being read as a screenshot.
      */}
      <figcaption className="text-small text-white/70">{studioCaption}</figcaption>
    </figure>
  );
}
