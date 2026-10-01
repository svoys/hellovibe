"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";

import { useMediaQuery } from "@/lib/media-query";
import { cn } from "@/lib/utils";
import {
  COMPACT_QUERY,
  LAYOUT_COMPACT,
  LAYOUT_DESKTOP,
  MACHINE_WORDS,
  STAGES,
  SYSTEM_COLUMNS,
  stageIndex,
} from "@/lib/vibe-machine";

import { useHeroProgress } from "./HeroTrack";
import { VibeMachineWord } from "./VibeMachineWord";

const POINTER_SPRING = { stiffness: 60, damping: 18, mass: 0.6 };

/** Grid lines and column captions fade in as the system takes shape. */
const GRID_RANGE: [number, number] = [0.3, 0.55];
const HEADER_RANGE: [number, number] = [0.38, 0.5];
const OUTCOME_RANGE: [number, number] = [0.82, 0.92];
const RULE_RANGE: [number, number] = [0.78, 0.92];

const MACHINE_LABEL =
  "The Vibe Machine: ten scattered words — idea, data, users, process, AI, automation, content, code, creative and product — organise into a system of inputs, system and output, and resolve into a product and an outcome.";

/** Opacity-only reveal driven by Hero progress. */
function Reveal({
  progress,
  range,
  className,
  style,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <motion.div className={className} style={{ ...style, opacity }}>
      {children}
    </motion.div>
  );
}

/**
 * The Hero's central visual: scattered words that organise into a system and
 * resolve into an outcome.
 *
 * Scroll is the primary interaction. Pointer influence is a small, mouse-only
 * nudge that fades away as the system forms; touch never drives it.
 */
export function VibeMachine() {
  const scrollProgress = useHeroProgress();
  const reducedMotion = useReducedMotion();
  const compact = useMediaQuery(COMPACT_QUERY);

  const layout = compact ? LAYOUT_COMPACT : LAYOUT_DESKTOP;

  // Reduced motion: skip the choreography entirely and present the settled
  // state. The stage rail below still spells the sequence out as text.
  const settled = useMotionValue(1);
  const progress = reducedMotion ? settled : scrollProgress;

  const boxRef = useRef<HTMLDivElement | null>(null);
  const boxW = useMotionValue(0);
  const boxH = useMotionValue(0);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, POINTER_SPRING);
  const pointerY = useSpring(rawY, POINTER_SPRING);

  const [scrollStage, setScrollStage] = useState(0);
  useMotionValueEvent(progress, "change", (value) => {
    const next = stageIndex(value);
    // Bail out unless the stage actually changed, so a 60fps scroll does not
    // turn into 60 React renders a second.
    setScrollStage((current) => (current === next ? current : next));
  });
  const stage = reducedMotion ? STAGES.length - 1 : scrollStage;

  // The words are positioned in percentages, so the box has to be measured
  // before a percentage can become a pixel offset.
  useEffect(() => {
    const element = boxRef.current;
    if (!element) return;
    const measure = () => {
      boxW.set(element.clientWidth);
      boxH.set(element.clientHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [boxW, boxH]);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const gridOpacity = useTransform(progress, GRID_RANGE, [0.3, 1]);
  const ruleScale = useTransform(progress, RULE_RANGE, [0, 1]);

  return (
    <div className="w-full">
      <div
        ref={boxRef}
        role="img"
        aria-label={MACHINE_LABEL}
        data-calm={stage >= 2}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="hero-machine relative select-none overflow-hidden border border-black bg-white"
      >
        {/* Editorial grid */}
        <motion.svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ opacity: gridOpacity }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <line
              key={`v${i}`}
              x1={`${(i / 6) * 100}%`}
              x2={`${(i / 6) * 100}%`}
              y1="0"
              y2="100%"
              stroke="var(--color-line)"
              strokeWidth="1"
            />
          ))}
          {[1, 2, 3, 4, 5].map((i) => (
            <line
              key={`h${i}`}
              x1="0"
              x2="100%"
              y1={`${(i / 6) * 100}%`}
              y2={`${(i / 6) * 100}%`}
              stroke="var(--color-line)"
              strokeWidth="1"
            />
          ))}
        </motion.svg>

        {/* Status bar — real text, so the current stage is never animation-only */}
        <div className="absolute inset-x-0 top-0 z-10 flex h-9 items-center justify-between border-b border-black bg-bg px-3 font-mono text-label uppercase">
          <span>The Vibe Machine</span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-block size-2 bg-orange" />
            <span>
              {String(stage + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")} ·{" "}
              {STAGES[stage].label}
            </span>
          </span>
        </div>

        {/* System column captions — dropped in the compact layout */}
        {layout.showHeaders
          ? SYSTEM_COLUMNS.map((label, index) => (
              <Reveal
                key={label}
                progress={progress}
                range={HEADER_RANGE}
                className="absolute -translate-y-1/2 font-mono text-label font-medium uppercase text-black/70"
                style={{ left: `${layout.columns[index]}%`, top: `${layout.headerY}%` }}
              >
                {label}
              </Reveal>
            ))
          : null}

        {/* Product → Outcome */}
        <motion.div
          aria-hidden="true"
          className="absolute h-px -translate-y-1/2 bg-black"
          style={{
            left: `${layout.ruleFrom}%`,
            top: `${layout.outcomeY}%`,
            width: `${layout.ruleTo - layout.ruleFrom}%`,
            scaleX: ruleScale,
            transformOrigin: "0% 50%",
          }}
        />

        <Reveal
          progress={progress}
          range={OUTCOME_RANGE}
          className="absolute flex -translate-y-1/2 items-center gap-2 font-mono text-label font-medium uppercase"
          style={{ left: `${layout.outcomeLabelX}%`, top: `${layout.outcomeY}%` }}
        >
          <span aria-hidden="true" className="inline-block size-3 border border-black bg-vibe" />
          Outcome
        </Reveal>

        {MACHINE_WORDS.map((word) => (
          <VibeMachineWord
            key={`${word.label}:${compact ? "compact" : "desktop"}`}
            word={word}
            layout={layout}
            progress={progress}
            boxW={boxW}
            boxH={boxH}
            pointerX={pointerX}
            pointerY={pointerY}
          />
        ))}
      </div>

      {/* Stage rail — the sequence as real text, readable with motion disabled */}
      <ol
        aria-label="Vibe Machine stages"
        className="mt-4 flex flex-wrap gap-x-4 gap-y-3 font-mono text-label uppercase sm:grid sm:grid-cols-5 sm:gap-x-2"
      >
        {STAGES.map((item, index) => {
          const current = index === stage;
          const passed = index < stage;
          return (
            <li
              key={item.id}
              aria-current={current ? "step" : undefined}
              className={cn(
                "basis-[5.5rem] grow border-t-2 pt-1.5 transition-colors duration-300 motion-reduce:transition-none",
                current ? "border-black" : passed ? "border-black/40" : "border-line",
              )}
            >
              <span className="block text-black/70">{String(index + 1).padStart(2, "0")}</span>
              <span className={cn("text-black/70", current && "bg-vibe px-0.5 text-black")}>
                {item.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
