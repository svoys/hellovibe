"use client";

import { ChevronRight } from "lucide-react";
import { Fragment, useRef, type CSSProperties } from "react";
import { useInView, useReducedMotion } from "motion/react";

import type { ServiceSurface, ServiceVisualKind } from "@/data/services";
import { cn } from "@/lib/utils";

type Palette = {
  /** Strongest ink on this surface. */
  ink: string;
  /** Faint ink, for secondary marks. */
  soft: string;
  /** Mid ink, for the middle stage. */
  mid: string;
  /** Hairline borders. */
  line: string;
  /** Stage captions. */
  label: string;
};

/**
 * Two surfaces, so the grid has rhythm without four identical cards.
 * `light` sits on white; `dark` sits on near-black.
 */
const PALETTE: Record<ServiceSurface, Palette> = {
  light: {
    ink: "bg-black",
    soft: "bg-black/15",
    mid: "bg-black/30",
    line: "border-black/25",
    label: "text-black/70",
  },
  dark: {
    ink: "bg-white",
    soft: "bg-white/20",
    mid: "bg-white/35",
    line: "border-white/30",
    label: "text-white/70",
  },
};

/** The three (or two) beats each diagram spells out. */
const STAGE_LABELS: Record<ServiceVisualKind, readonly string[]> = {
  strategy: ["Signals", "Opportunities", "Priority"],
  systems: ["Manual", "Automation", "Flow"],
  products: ["Idea", "Prototype", "Product"],
  creative: ["One idea", "Many outputs"],
};

/** Bar heights, in px, for the two bar-chart stages of the strategy diagram. */
const STRATEGY_BARS: readonly (readonly number[])[] = [
  [10, 20, 14, 24],
  [16, 28, 22],
];

const FAN_OPACITY = ["opacity-40", "opacity-70", "opacity-100"] as const;

/**
 * The abstract marks for one stage.
 *
 * Deliberately shapes, not pictures: no fake screenshots, no fake analytics and
 * no fake client logos.
 */
function Marks({
  kind,
  stage,
  palette,
}: {
  kind: ServiceVisualKind;
  stage: number;
  palette: Palette;
}) {
  if (kind === "strategy") {
    // SIGNALS → OPPORTUNITIES → PRIORITY
    if (stage === 2) {
      return <span className="h-9 w-2.5 border border-black bg-vibe" />;
    }
    return (
      <div className="flex h-9 items-end gap-1">
        {STRATEGY_BARS[stage].map((height, index) => (
          <span
            key={index}
            className={cn("w-[3px]", stage === 1 ? palette.mid : palette.soft)}
            style={{ height }}
          />
        ))}
      </div>
    );
  }

  if (kind === "systems") {
    // MANUAL → AUTOMATION → FLOW
    if (stage === 0) {
      return (
        <div className="flex h-9 flex-col justify-center gap-1.5">
          {[0, 1, 2].map((index) => (
            <span key={index} className={cn("h-px w-8", palette.soft)} />
          ))}
        </div>
      );
    }
    if (stage === 1) {
      return <span className="h-7 w-10 border border-black bg-vibe" />;
    }
    // Three marks joined by hairlines — the join is what makes it read as flow
    // rather than three unrelated squares.
    return (
      <div className="flex h-9 items-center">
        <span className={cn("h-px w-2.5", palette.soft)} />
        <span className={cn("size-2", palette.mid)} />
        <span className={cn("h-px w-1.5", palette.soft)} />
        <span className={cn("size-2", palette.ink)} />
        <span className={cn("h-px w-1.5", palette.soft)} />
        <span className={cn("size-2", palette.mid)} />
        <span className={cn("h-px w-2.5", palette.soft)} />
      </div>
    );
  }

  if (kind === "products") {
    // IDEA → PROTOTYPE → PRODUCT
    if (stage === 0) return <span className={cn("size-3 border", palette.line)} />;
    if (stage === 1) return <span className={cn("h-7 w-10 border border-dashed", palette.line)} />;
    return <span className={cn("h-7 w-10", palette.ink)} />;
  }

  // ONE IDEA → MANY OUTPUTS
  if (stage === 0) return <span className="size-3 bg-orange" />;
  return (
    <div className="grid grid-cols-3 gap-1">
      {Array.from({ length: 9 }, (_, index) => (
        <span key={index} className={cn("size-1.5 bg-orange", FAN_OPACITY[index % 3])} />
      ))}
    </div>
  );
}

/**
 * Abstract diagram for one service pillar.
 *
 * Client Component purely for the in-view trigger — the motion itself is a CSS
 * transition on `transform` and `opacity`. The stage captions are always
 * rendered and never animated, so the diagram still reads if the trigger never
 * fires; only the decorative marks fade in.
 */
export function ServiceVisual({
  kind,
  surface,
}: {
  kind: ServiceVisualKind;
  surface: ServiceSurface;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reducedMotion = useReducedMotion();

  const shown = Boolean(reducedMotion) || inView;
  const palette = PALETTE[surface];
  const labels = STAGE_LABELS[kind];

  return (
    <div ref={ref} data-shown={shown} className="svc-visual flex items-center gap-2 px-6 py-6">
      {labels.map((label, index) => (
        <Fragment key={label}>
          {index > 0 ? (
            <ChevronRight
              aria-hidden="true"
              className={cn("svc-arrow size-3.5 shrink-0", palette.label)}
              style={{ "--d": `${index * 110}ms` } as CSSProperties}
            />
          ) : null}

          <div className="flex min-w-0 flex-1 flex-col items-center gap-3">
            <div
              aria-hidden="true"
              className="svc-shape flex h-9 items-center justify-center"
              style={{ "--d": `${index * 110}ms` } as CSSProperties}
            >
              <Marks kind={kind} stage={index} palette={palette} />
            </div>

            <span className={cn("text-center font-mono text-label uppercase", palette.label)}>
              {label}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
