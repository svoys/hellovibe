import {
  LAYOUT_COMPACT,
  LAYOUT_DESKTOP,
  MACHINE_WORDS,
  SYSTEM_COLUMNS,
  systemFrame,
  type MachineLayout,
  type Tone,
} from "@/lib/vibe-machine";

/**
 * The Vibe Machine, assembled — the closing half of the Hero's narrative.
 *
 * The source asks for exactly this ("Можно вернуть один элемент из Hero: THE
 * VIBE MACHINE — но теперь он находится в собранном состоянии: OUTCOME"), so
 * this is the Hero's own machine at its final keyframe and nothing else: no
 * scroll, no pointer parallax, no float, no status changes. `MACHINE_WORDS`,
 * `LAYOUT_*` and `systemFrame` come from `lib/vibe-machine.ts`, so the
 * vocabulary and the geometry are defined once and cannot drift from the Hero.
 *
 * A Server Component. The settled state is fully determined by the data, so
 * there is nothing to compute on the client and no hydration surface — the
 * whole block ships zero client JavaScript.
 *
 * ## Why the responsive swap is CSS, not `useMediaQuery`
 *
 * The Hero picks its layout with `useMediaQuery(COMPACT_QUERY)`. That is the
 * right tool there because the machine is already a client component driven by
 * Motion values. Here it would buy nothing and cost a client boundary, so the
 * two layouts are both rendered and toggled at the same 768px breakpoint with
 * `md:hidden` / `hidden md:block`. Same breakpoint, same result, no JS.
 */

/**
 * Settled-state word colours for a near-black surface.
 *
 * The Hero's palette is built for its white panel, where `outline` is a
 * white-filled chip with black text and a black border. Dropped onto
 * `--color-black` unchanged, that becomes a bright white block. The two tones
 * that actually appear once the system has settled are therefore inverted: the
 * machine resolves to white-bordered, white-labelled chips plus the single
 * vibe-green outcome chip — the Hero's final frame with the surface flipped.
 *
 * `orange` and `ink` are listed so the record is total, but neither survives to
 * the settled state: `wordColors()` ends every word at `finalTone ?? "outline"`.
 */
const DARK_TONE: Record<Tone, { bg: string; fg: string }> = {
  outline: { bg: "transparent", fg: "var(--color-white)" },
  vibe: { bg: "var(--color-vibe)", fg: "var(--color-black)" },
  orange: { bg: "var(--color-orange)", fg: "var(--color-black)" },
  ink: { bg: "transparent", fg: "var(--color-white)" },
};

/** The panel is one image: ten scattered words resolved into a system. */
const SETTLED_LABEL =
  "The Vibe Machine, assembled: its ten words have settled into inputs, system and output, and the product has resolved into a green outcome.";

/** Hairline colour for the editorial grid, the inverse of `--color-line` on white. */
const GRID_LINE = "rgba(255, 255, 255, 0.12)";

function SettledMachine({ layout }: { layout: MachineLayout }) {
  return (
    <div className="cta-machine relative select-none overflow-hidden border border-white bg-black">
      {/* Editorial grid */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
        {[1, 2, 3, 4, 5].map((i) => (
          <line
            key={`v${i}`}
            x1={`${(i / 6) * 100}%`}
            x2={`${(i / 6) * 100}%`}
            y1="0"
            y2="100%"
            stroke={GRID_LINE}
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
            stroke={GRID_LINE}
            strokeWidth="1"
          />
        ))}
      </svg>

      {/*
        Status bar. The Hero's HUD, frozen on the last stage — it names the
        object and states where it finished, which is the whole point of the
        bookend. Real text, not decoration.
      */}
      <div className="absolute inset-x-0 top-0 z-10 flex h-9 items-center justify-between border-b border-white/25 px-3 font-mono text-label uppercase text-white/70">
        <span>The Vibe Machine</span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="inline-block size-2 bg-orange" />
          <span>05 / 05 · Outcome</span>
        </span>
      </div>

      {/* Column captions — dropped in the compact layout, as in the Hero */}
      {layout.showHeaders
        ? SYSTEM_COLUMNS.map((caption, index) => (
            <span
              key={caption}
              className="absolute -translate-y-1/2 font-mono text-label font-medium uppercase text-white/70"
              style={{ left: `${layout.columns[index]}%`, top: `${layout.headerY}%` }}
            >
              {caption}
            </span>
          ))
        : null}

      {/* Product → Outcome */}
      <div
        aria-hidden="true"
        className="absolute h-px -translate-y-1/2 bg-white"
        style={{
          left: `${layout.ruleFrom}%`,
          top: `${layout.outcomeY}%`,
          width: `${layout.ruleTo - layout.ruleFrom}%`,
        }}
      />

      <span
        className="absolute flex -translate-y-1/2 items-center gap-2 font-mono text-label font-medium uppercase text-white"
        style={{ left: `${layout.outcomeLabelX}%`, top: `${layout.outcomeY}%` }}
      >
        <span aria-hidden="true" className="inline-block size-3 border border-white bg-vibe" />
        Outcome
      </span>

      {MACHINE_WORDS.map((word) => {
        const frame = systemFrame(word, layout);
        const tone = DARK_TONE[word.finalTone ?? "outline"];
        return (
          <span
            key={word.label}
            className="absolute whitespace-nowrap border border-white px-2.5 py-1.5 font-mono text-label uppercase leading-none"
            style={{
              left: `${frame.x}%`,
              top: `${frame.y}%`,
              transform: `translateY(-50%) scale(${frame.s})`,
              transformOrigin: "0% 50%",
              backgroundColor: tone.bg,
              color: tone.fg,
            }}
          >
            {word.label}
          </span>
        );
      })}
    </div>
  );
}

export function FinalCtaVisual() {
  return (
    <div role="img" aria-label={SETTLED_LABEL}>
      <div className="md:hidden">
        <SettledMachine layout={LAYOUT_COMPACT} />
      </div>
      <div className="hidden md:block">
        <SettledMachine layout={LAYOUT_DESKTOP} />
      </div>
    </div>
  );
}
