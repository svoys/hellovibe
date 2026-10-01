"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import type { CSSProperties } from "react";

import {
  KEY_STOPS,
  framesFor,
  sampleFrame,
  wordColors,
  type MachineLayout,
  type MachineWord,
} from "@/lib/vibe-machine";

type VibeMachineWordProps = {
  word: MachineWord;
  layout: MachineLayout;
  progress: MotionValue<number>;
  boxW: MotionValue<number>;
  boxH: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
};

/**
 * A single word of the machine.
 *
 * The chaos position is written as static `left`/`top` percentages, so the
 * server render is already correct and hydration cannot shift anything. Every
 * subsequent move is a transform, which keeps the animation off the layout
 * thread.
 *
 * `layout` arrives as a plain prop rather than a motion value: the parent keys
 * these components by layout, so crossing the breakpoint remounts them with
 * fresh transforms instead of leaving stale ones behind.
 */
export function VibeMachineWord({
  word,
  layout,
  progress,
  boxW,
  boxH,
  pointerX,
  pointerY,
}: VibeMachineWordProps) {
  const origin = word.drift[0];
  const frames = framesFor(word, layout);
  const colors = wordColors(word);

  // Parallax fades out quickly once the system starts forming, and stays tiny
  // even at rest — this is a nudge, not a follow-the-cursor effect.
  const calm = useTransform(progress, (value) => Math.max(0, 1 - value * 2.4));
  const parallaxX = useTransform<number, number>(
    [calm, pointerX],
    ([c, pointer]: number[]) => pointer * word.depth * 8 * c,
  );
  const parallaxY = useTransform<number, number>(
    [calm, pointerY],
    ([c, pointer]: number[]) => pointer * word.depth * 8 * c,
  );

  const x = useTransform<number, number>(
    [progress, boxW, parallaxX],
    ([value, width, offset]: number[]) => {
      const current = sampleFrame(frames, value);
      return ((current.x - origin.x) / 100) * width + offset;
    },
  );

  const y = useTransform<number, number>(
    [progress, boxH, parallaxY],
    ([value, height, offset]: number[]) => {
      const current = sampleFrame(frames, value);
      return ((current.y - origin.y) / 100) * height + offset;
    },
  );

  const rotate = useTransform(progress, (value) => sampleFrame(frames, value).r);
  const scale = useTransform(progress, (value) => sampleFrame(frames, value).s);

  const backgroundColor = useTransform(progress, KEY_STOPS, colors.bg);
  const color = useTransform(progress, KEY_STOPS, colors.fg);

  return (
    <motion.div
      className="absolute -translate-y-1/2"
      style={{
        left: `${origin.x}%`,
        top: `${origin.y}%`,
        x,
        y,
        rotate,
        scale,
        transformOrigin: "0% 50%",
      }}
    >
      <div
        className="vm-float"
        style={
          {
            "--vm-dur": `${word.float.duration}s`,
            "--vm-delay": `${word.float.delay}s`,
          } as CSSProperties
        }
      >
        <motion.span
          className="block whitespace-nowrap border border-black px-2.5 py-1.5 font-mono text-label uppercase leading-none"
          style={{ backgroundColor, color }}
        >
          {word.label}
        </motion.span>
      </div>
    </motion.div>
  );
}
