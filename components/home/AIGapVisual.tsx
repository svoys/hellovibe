"use client";

import { useTranslations } from "next-intl";
import { useRef, type CSSProperties } from "react";
import { useInView } from "motion/react";

import { REDUCED_MOTION_QUERY, useMediaQuery } from "@/lib/media-query";

/**
 * Deterministic dispersion offsets, index-matched to the first token row.
 *
 * Fixed values rather than `Math.random()` so the server render, the client
 * render and every replay are identical — the same rule the Vibe Machine
 * follows. The tokens themselves now come from `AIGap.visual.tierOne` in the
 * message catalogues, so this table is matched to that list by position; the
 * `% DISPERSION.length` in {@link scatter} is what keeps a longer translation
 * from reading past the end.
 */
const DISPERSION: readonly [number, number, number][] = [
  [-16, 12, 5],
  [12, -14, -4],
  [-9, -10, 3],
  [15, 9, -6],
  [-13, 14, 4],
  [8, 11, 5],
  [-11, -13, -3],
  [14, -8, 6],
  [-6, 15, -5],
];

/** Builds the CSS custom properties that place a token in its scattered state. */
function scatter(index: number, scale: number, delay: number): CSSProperties {
  const [dx, dy, dr] = DISPERSION[index % DISPERSION.length];
  return {
    "--dx": `${dx * scale}px`,
    "--dy": `${dy * scale}px`,
    "--dr": `${dr * scale}deg`,
    "--d": `${delay}ms`,
  } as CSSProperties;
}

const CHIP =
  "aigap-token inline-flex border border-line bg-bg px-2 py-1 font-mono text-label uppercase text-black";

/**
 * The AI Gap diagram: AI everywhere → business reality → one working system.
 *
 * Client Component purely for the in-view trigger. Convergence is a CSS
 * transition on `transform`, so the animation stays off the main thread and the
 * whole diagram collapses to its final state in one step under reduced motion.
 */
export function AIGapVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  /*
   * `data-shown` below is real rendered output, so the preference has to come
   * from `useMediaQuery` rather than Motion's `useReducedMotion()` — the latter
   * already reports `true` on the first client render while the server rendered
   * `false`, which is a hydration mismatch on the attribute.
   */
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const t = useTranslations("AIGap.visual");

  const shown = Boolean(reducedMotion) || inView;

  /*
   * The two token rows are read as arrays rather than as numbered keys: they are
   * lists whose length is the diagram's content (nine scattered possibilities,
   * five elements of business reality), and `t.raw` keeps that shape. Their
   * labels stay short and uppercase in every locale — they are chips inside a
   * figure, not prose.
   */
  const tierOne = t.raw("tierOne") as readonly string[];
  const tierTwo = t.raw("tierTwo") as readonly string[];

  return (
    <div
      ref={ref}
      role="img"
      aria-label={t("label")}
      data-shown={shown}
      className="aigap-visual border border-black bg-white"
    >
      {/* 01 — AI everywhere */}
      <div className="px-5 py-5">
        <p className="text-label uppercase text-black/70">{t("from")}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {tierOne.map((token, index) => (
            <li key={token} className={CHIP} style={scatter(index, 1, index * 40)}>
              {token}
            </li>
          ))}
        </ul>
      </div>

      {/* 02 — Business reality */}
      <div className="flex gap-4 border-t border-line px-5 py-5">
        <span
          aria-hidden="true"
          className="aigap-arrow w-3 shrink-0 pt-1 font-mono text-label leading-none text-black/70"
        >
          ↓
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-label uppercase text-black/70">{t("to")}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {tierTwo.map((token, index) => (
              <li key={token} className={CHIP} style={scatter(index, 0.5, 420 + index * 40)}>
                {token}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 03 — One working system */}
      <div className="flex gap-4 border-t border-line px-5 py-5">
        <span
          aria-hidden="true"
          className="aigap-arrow w-3 shrink-0 pt-1 font-mono text-label leading-none text-black/70"
        >
          ↓
        </span>
        <div
          className="aigap-system flex min-w-0 flex-1 items-center gap-3 border border-black bg-vibe px-4 py-3"
          style={{ "--d": "720ms" } as CSSProperties}
        >
          <span aria-hidden="true" className="inline-block size-2 shrink-0 bg-black" />
          <span className="font-mono text-label uppercase text-black">{t("result")}</span>
        </div>
      </div>
    </div>
  );
}
