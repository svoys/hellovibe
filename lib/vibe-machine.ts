/**
 * Vibe Machine — deterministic choreography.
 *
 * The machine walks through five stages as the Hero track is scrolled:
 *
 *   Chaos → Strategy → System → Product → Outcome
 *
 * Ten words start scattered, drift toward an intentional structure, snap into a
 * three-column system, and one of them graduates into the outcome row.
 *
 * Everything here is a fixed value. There is no `Math.random()` anywhere, so
 * the server render and every client render agree — the machine looks the same
 * on every load, and a re-render never reshuffles it.
 *
 * Positions are percentages of the machine box, anchored at the word's LEFT
 * edge and vertical CENTRE (matching `transformOrigin: "0% 50%"`).
 *
 * ## Why the vocabulary below is not localised
 *
 * `MACHINE_WORDS`, `STAGES` and `SYSTEM_COLUMNS` are the one part of the site
 * that stays English in both locales, by decision — the same call the section
 * numbers (`01`–`12`) get. This diagram is a *system artefact*, not prose: ten
 * technical nouns in a monospace grid, plus the five beats they pass through.
 * Translating them would lengthen the chips enough to break the measured
 * geometry in `LAYOUT_*` (the slot positions are tuned to these exact string
 * widths), and the words are the same words an engineer would use in Russian
 * anyway. What *is* localised is everything around them: the accessible name of
 * the machine, its title, and the copy of the blocks that contain it — see
 * `Hero.machineLabel`, `Hero.machineTitle`, `Hero.machineStagesLabel` and
 * `Hero.machineSettledLabel` in `messages/<locale>.json`.
 *
 * If this is ever revisited, the strings to move are `label` on every entry of
 * `MACHINE_WORDS`, `label` on every entry of `STAGES`, and `SYSTEM_COLUMNS`.
 */

export type Frame = {
  /** Horizontal position, % of box width. */
  x: number;
  /** Vertical position, % of box height. */
  y: number;
  /** Rotation, degrees. */
  r: number;
  /** Scale. */
  s: number;
};

export type Tone = "vibe" | "orange" | "ink" | "outline";

export type MachineWord = {
  label: string;
  tone: Tone;
  /** Final-state override — PRODUCT graduates into the vibe-green outcome. */
  finalTone?: Tone;
  /** Pointer-parallax weight, 0–1. Higher reads as "closer to the camera". */
  depth: number;
  /** Idle float period and phase offset, in seconds. */
  float: { duration: number; delay: number };
  /** Chaos and Strategy keyframes. System and final come from the layout. */
  drift: [Frame, Frame];
  /**
   * System-state slot. Words fill the grid row-major, so the same index lands
   * in a different cell per layout. `"outcome"` pulls the word out of the grid
   * and onto the outcome row.
   */
  slot: number | "outcome";
};

/** Progress values (0–1) at which each keyframe is fully reached. */
export const KEY_STOPS: number[] = [0, 0.25, 0.5, 0.78];

export const STAGES = [
  { id: "chaos", label: "Chaos", from: 0 },
  { id: "strategy", label: "Strategy", from: 0.12 },
  { id: "system", label: "System", from: 0.38 },
  { id: "product", label: "Product", from: 0.62 },
  { id: "outcome", label: "Outcome", from: 0.85 },
] as const;

/** Which stage a given progress value belongs to. */
export function stageIndex(progress: number): number {
  let index = 0;
  for (let i = 0; i < STAGES.length; i += 1) {
    if (progress >= STAGES[i].from) index = i;
  }
  return index;
}

/**
 * Word colours. These hex values mirror the tokens in `app/globals.css` and are
 * repeated here on purpose: Motion interpolates colours numerically and cannot
 * resolve `var(--color-vibe)` mid-transition.
 *
 * Measured contrast against the paired foreground (WCAG 2.1):
 *   vibe    #c7ff3d on #111111 — 16.0:1
 *   orange  #ff6a3d on #111111 —  6.6:1
 *   ink     #111111 on #f5f3ee — 17.3:1
 *   outline #ffffff on #111111 — 18.9:1
 */
export const TONE_COLORS: Record<Tone, { bg: string; fg: string }> = {
  vibe: { bg: "#c7ff3d", fg: "#111111" },
  orange: { bg: "#ff6a3d", fg: "#111111" },
  ink: { bg: "#111111", fg: "#f5f3ee" },
  outline: { bg: "#ffffff", fg: "#111111" },
};

/** Column headers for the structured state. */
export const SYSTEM_COLUMNS = ["Inputs", "System", "Output"] as const;

export type MachineLayout = {
  /** x% for each system column. */
  columns: number[];
  /** y% for each system row. */
  rows: number[];
  /** y% of the column header row. */
  headerY: number;
  /** y% of the outcome row. */
  outcomeY: number;
  /** x% where the outcome rule starts and ends. */
  ruleFrom: number;
  ruleTo: number;
  /** x% of the OUTCOME marker. */
  outcomeLabelX: number;
  /**
   * The compact layout drops the INPUTS/SYSTEM/OUTPUT captions: two columns
   * cannot carry a readable three-column caption, and the stage rail already
   * spells the sequence out as real text.
   */
  showHeaders: boolean;
};

export const LAYOUT_DESKTOP: MachineLayout = {
  columns: [6, 38, 70],
  rows: [33, 47, 61],
  headerY: 20,
  outcomeY: 86,
  ruleFrom: 28,
  ruleTo: 56,
  outcomeLabelX: 58,
  showHeaders: true,
};

export const LAYOUT_COMPACT: MachineLayout = {
  columns: [6, 46],
  rows: [25, 36, 47, 58, 69],
  headerY: 15,
  outcomeY: 85,
  ruleFrom: 34,
  ruleTo: 58,
  outcomeLabelX: 60,
  showHeaders: false,
};

/**
 * Below this viewport width the machine switches to the compact layout. The
 * breakpoint is on the VIEWPORT, not on the measured box: once the grid splits
 * into copy + machine columns the box is narrow even on a wide screen, and the
 * three-column structure is still the right answer there.
 */
export const COMPACT_QUERY = "(max-width: 767.98px)";

const frame = (x: number, y: number, r: number, s: number): Frame => ({ x, y, r, s });

/**
 * The ten words and the slot each occupies once the system forms.
 *
 * Slots fill the grid row-major, so the desktop layout settles as:
 *   INPUTS   IDEA / DATA / CONTENT
 *   SYSTEM   AI / PROCESS / CODE
 *   OUTPUT   USERS / AUTOMATION / CREATIVE
 *
 * PRODUCT sits outside the grid on purpose — it graduates onto the outcome row.
 */
export const MACHINE_WORDS: MachineWord[] = [
  {
    label: "IDEA",
    tone: "vibe",
    depth: 0.9,
    float: { duration: 5.2, delay: 0 },
    drift: [frame(46, 14, -9, 1.4), frame(40, 17, -3, 1.15)],
    slot: 0,
  },
  {
    label: "DATA",
    tone: "outline",
    depth: 0.5,
    float: { duration: 6.1, delay: -1.2 },
    drift: [frame(3, 26, 7, 1), frame(5, 21, 2, 1)],
    slot: 3,
  },
  {
    label: "USERS",
    tone: "outline",
    depth: 0.7,
    float: { duration: 5.4, delay: -3.6 },
    drift: [frame(4, 88, -7, 0.95), frame(5, 62, -1, 1)],
    slot: 2,
  },
  {
    label: "PROCESS",
    tone: "ink",
    depth: 0.7,
    float: { duration: 5.6, delay: -2.4 },
    drift: [frame(20, 44, -5, 1.15), frame(6, 33, -1, 1)],
    slot: 4,
  },
  {
    label: "AI",
    tone: "vibe",
    depth: 0.8,
    float: { duration: 4.8, delay: -1.8 },
    drift: [frame(66, 66, 13, 1.55), frame(44, 44, 2, 1.2)],
    slot: 1,
  },
  {
    label: "AUTOMATION",
    tone: "outline",
    depth: 0.5,
    float: { duration: 6.6, delay: -2.9 },
    drift: [frame(28, 79, 4, 1), frame(6, 47, 1, 1)],
    slot: 5,
  },
  {
    label: "CONTENT",
    tone: "outline",
    depth: 0.6,
    float: { duration: 6.4, delay: -0.6 },
    drift: [frame(54, 46, 10, 0.95), frame(48, 32, 3, 1)],
    slot: 6,
  },
  {
    label: "CODE",
    tone: "ink",
    depth: 0.9,
    float: { duration: 6, delay: -0.3 },
    drift: [frame(60, 88, -10, 1.1), frame(58, 60, 2, 1)],
    slot: 7,
  },
  {
    label: "CREATIVE",
    tone: "outline",
    depth: 0.6,
    float: { duration: 5.9, delay: -4.2 },
    drift: [frame(35, 60, 8, 1.05), frame(30, 69, -1, 1)],
    slot: 8,
  },
  {
    label: "PRODUCT",
    tone: "orange",
    finalTone: "vibe",
    depth: 1,
    float: { duration: 5.8, delay: -3.1 },
    drift: [frame(5, 60, -12, 1.25), frame(6, 82, -2, 1.05)],
    slot: "outcome",
  },
];

/** Where a word sits once the system has formed, for a given layout. */
export function systemFrame(word: MachineWord, layout: MachineLayout): Frame {
  if (word.slot === "outcome") {
    return frame(layout.columns[0], layout.outcomeY, 0, 1.45);
  }
  const column = word.slot % layout.columns.length;
  const row = Math.floor(word.slot / layout.columns.length);
  return frame(layout.columns[column], layout.rows[row], 0, 1);
}

/** The four keyframes sampled by {@link sampleFrame}, in KEY_STOPS order. */
export function framesFor(word: MachineWord, layout: MachineLayout): Frame[] {
  const target = systemFrame(word, layout);
  // PRODUCT approaches the outcome row from slightly above, so the last leg
  // reads as a settle rather than a slide.
  const settled =
    word.slot === "outcome"
      ? frame(target.x, target.y - 7, 0, 1.1)
      : target;
  return [word.drift[0], word.drift[1], settled, target];
}

/** Smoothstep — eases each segment in and out without overshoot. */
const smooth = (t: number) => t * t * (3 - 2 * t);

/** Piecewise interpolation between the keyframes, eased per segment. */
export function sampleFrame(frames: Frame[], progress: number): Frame {
  const last = KEY_STOPS.length - 1;
  if (progress <= KEY_STOPS[0]) return frames[0];
  if (progress >= KEY_STOPS[last]) return frames[last];

  let i = 0;
  while (i < last - 1 && progress > KEY_STOPS[i + 1]) i += 1;

  const span = KEY_STOPS[i + 1] - KEY_STOPS[i];
  const t = smooth((progress - KEY_STOPS[i]) / span);
  const a = frames[i];
  const b = frames[i + 1];

  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    r: a.r + (b.r - a.r) * t,
    s: a.s + (b.s - a.s) * t,
  };
}

/**
 * Colour keyframes aligned with KEY_STOPS. A word keeps its tone through
 * Strategy, drains to neutral as the System forms, and only the outcome piece
 * takes on the vibe green at the end.
 */
export function wordColors(word: MachineWord) {
  const start = TONE_COLORS[word.tone];
  const neutral = TONE_COLORS.outline;
  const end = TONE_COLORS[word.finalTone ?? "outline"];
  return {
    bg: [start.bg, start.bg, neutral.bg, end.bg],
    fg: [start.fg, start.fg, neutral.fg, end.fg],
  };
}
