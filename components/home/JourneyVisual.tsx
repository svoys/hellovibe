import { motion } from "motion/react";
import { Fragment, type ReactNode } from "react";

import type { JourneyVisualKind } from "@/data/product-journey";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Builds the Motion props for one mark.
 *
 * `initial={false}` means "start at the animate value and do not animate on
 * mount" — which is exactly what a panel that is already on screen needs. When
 * the stage becomes active the `animate` target flips, and Motion animates from
 * wherever the mark currently is. The stagger is expressed as an explicit
 * per-index delay rather than `staggerChildren`, so the order is a literal in
 * the source instead of a property of the tree.
 *
 * Reduced motion only ever changes the `transition`, never the `animate`
 * target. That is deliberate: `initial={false}` makes Motion write the animate
 * value straight into the server-rendered `style` attribute, so anything
 * reduced-motion-dependent in there would differ between the server and a
 * reduced-motion client and break hydration. The offset on an inactive mark is
 * never seen anyway — its panel is `hidden`. A zero duration is all that is
 * needed, and the global `prefers-reduced-motion` block in `globals.css` cannot
 * do it for us, because Motion animates in JavaScript.
 */
function createMark(active: boolean, reduced: boolean) {
  return (index: number) => ({
    initial: false as const,
    animate: { opacity: active ? 1 : 0, y: active ? 0 : 4 },
    transition: reduced
      ? { duration: 0 }
      : { duration: 0.22, ease: EASE, delay: active ? 0.06 + index * 0.04 : 0 },
  });
}

type MarkProps = {
  index: number;
  mark: ReturnType<typeof createMark>;
  className?: string;
  children?: ReactNode;
};

/** One decorative mark. Always `aria-hidden` — the panel copy carries the meaning. */
function Mark({ index, mark, className, children }: MarkProps) {
  return (
    <motion.span aria-hidden="true" className={className} {...mark(index)}>
      {children}
    </motion.span>
  );
}

/**
 * The four abstract marks.
 *
 * Deliberately shapes, not pictures: no fake screenshots, no fake analytics, no
 * neural-network clichés, no glowing orbs. `--color-vibe` marks the one thing
 * that matters in each diagram; it is never used as a text colour, because
 * #c7ff3d on a light surface is far below AA.
 */
function Marks({
  kind,
  mark,
}: {
  kind: JourneyVisualKind;
  mark: ReturnType<typeof createMark>;
}) {
  if (kind === "discover") {
    // Scan a field, spot the one that matters.
    return (
      <div className="flex w-fit flex-col gap-2">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 6 }, (_, index) => (
            <Mark
              key={index}
              index={index}
              mark={mark}
              className={cn(
                "size-2.5 border",
                index === 2 ? "border-black bg-vibe" : "border-black/25",
              )}
            />
          ))}
        </div>
        <Mark index={6} mark={mark} className="h-px w-full bg-black/15" />
      </div>
    );
  }

  if (kind === "design") {
    // A bet scoped inside a boundary.
    return (
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-1.5">
          <Mark index={0} mark={mark} className="h-px w-2.5 bg-black/15" />
          <Mark index={1} mark={mark} className="h-px w-2.5 bg-black/15" />
        </div>
        <Mark
          index={2}
          mark={mark}
          className="flex size-11 items-center justify-center border border-dashed border-black/30"
        >
          <span aria-hidden="true" className="h-3 w-6 border border-black bg-vibe" />
        </Mark>
      </div>
    );
  }

  if (kind === "build") {
    // Built up, with the next piece in progress.
    return (
      <div className="flex flex-col items-center gap-1">
        <Mark index={0} mark={mark} className="h-2.5 w-6 border border-dashed border-black/30" />
        <Mark index={1} mark={mark} className="h-2.5 w-9 bg-black/70" />
        <Mark index={2} mark={mark} className="h-2.5 w-12 border-t-2 border-t-vibe bg-black" />
      </div>
    );
  }

  // Scale — direction of travel, unlabelled. No axes and no numbers, so it can
  // never read as a chart claiming a result.
  return (
    <div className="flex w-fit flex-col gap-2">
      <div className="flex items-end gap-1.5">
        <Mark index={0} mark={mark} className="h-3 w-3 bg-black/25" />
        <Mark index={1} mark={mark} className="h-5 w-3 bg-black/60" />
        <Mark index={2} mark={mark} className="flex w-3 flex-col">
          <span aria-hidden="true" className="h-1 w-full bg-vibe" />
          <span aria-hidden="true" className="h-7 w-full bg-black" />
        </Mark>
      </div>
      <Mark index={3} mark={mark} className="h-px w-full bg-black/15" />
    </div>
  );
}

/**
 * Abstract diagram for one journey stage: a bordered stage box holding the
 * mark, with the pack's visual metaphor in mono at the foot — the same
 * treatment `ServiceVisual` gives its stage captions, so the two sections read
 * as one system.
 *
 * The metaphor is the only text in the box and it carries meaning, so it is
 * rendered as its three words with the arrows hidden from assistive tech —
 * otherwise a screen reader announces "right arrow" twice for no reason. The
 * mark above stays decorative.
 *
 * No hooks and no `"use client"`: it is pulled into the client bundle by
 * `JourneyStepper`, which owns the state that drives it.
 */
export function JourneyVisual({
  kind,
  metaphor,
  active,
  reduced,
}: {
  kind: JourneyVisualKind;
  metaphor: string;
  active: boolean;
  reduced: boolean;
}) {
  const mark = createMark(active, reduced);
  const words = metaphor.split("→").map((word) => word.trim());

  return (
    <div className="flex h-full flex-col border border-line">
      {/*
        The four marks are different heights — 19px for DISCOVER, 44px for the
        dashed DESIGN box, 38px for BUILD and SCALE. Reserving the tallest plus
        the `py-10` keeps every stage's box the same height, which matters
        wherever the columns are stacked: below `lg` this box sits under the
        copy, so a 25px difference moves everything below it.
      */}
      <div className="flex min-h-[7.75rem] flex-1 items-center justify-center px-6 py-10">
        <Marks kind={kind} mark={mark} />
      </div>

      {/*
        `block` matters. As an inline span the line boxes would take the parent's
        line-height (~24px) rather than the label's own 1.2, so a wrapped
        caption would add ~24px instead of ~13px. Block gives the span its own
        line boxes, and `min-h-[2.4em]` then reserves exactly two lines — which
        is what the longest metaphor needs once the box is full-width and narrow
        (below ~430px). At `lg` the box stretches to the grid row anyway, so the
        reservation costs nothing there.
      */}
      <div className="border-t border-line px-6 py-4">
        <span className="block min-h-[2.4em] font-mono text-label uppercase text-black/70">
          {words.map((word, index) => (
            <Fragment key={word}>
              {index > 0 ? <span aria-hidden="true">{" → "}</span> : null}
              <span>{word}</span>
            </Fragment>
          ))}
        </span>
      </div>
    </div>
  );
}
