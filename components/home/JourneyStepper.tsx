"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

import { JourneyVisual } from "@/components/home/JourneyVisual";
import { journeyStages } from "@/data/product-journey";
import { REDUCED_MOTION_QUERY, useMediaQuery } from "@/lib/media-query";
import { cn } from "@/lib/utils";

/**
 * Where the rail turns from a vertical list into a horizontal track.
 *
 * Must stay in sync with the `.pj-line` / `.pj-fill` media query in
 * `app/globals.css` and with the `lg:` utilities below — all three describe the
 * same breakpoint, and `aria-orientation` has to match what is on screen.
 */
export const RAIL_HORIZONTAL_QUERY = "(min-width: 64rem)";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LAST = journeyStages.length - 1;

/**
 * Section 03 — HOW WE WORK, as an interactive stepper.
 *
 * The pattern is a tablist, because "one of four things is showing" is exactly
 * what a tablist is for and it brings the keyboard contract with it.
 *
 * Every panel stays in the DOM and is hidden with the `hidden` attribute, so
 * the full copy is present in the server-rendered HTML — a crawler or a
 * JavaScript-less browser still gets all four stages. That rules out a remount
 * on switch, so the swap is driven by an `animate` state change instead of a
 * `key`. Visually identical, and it keeps the content indexable.
 *
 * Client Component. It is the only `"use client"` file in the section.
 */
export function JourneyStepper() {
  const [active, setActive] = useState(0);
  const t = useTranslations("Journey");
  /*
   * `useMediaQuery`, not Motion's `useReducedMotion()` — one rule for the whole
   * codebase. Motion resolves the preference at module load, so it is already
   * `true` on the first client render while the server rendered `false`; here it
   * only feeds a `transition`, but using the same hook everywhere keeps anyone
   * from copying it into a place where it would break hydration.
   */
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const horizontal = useMediaQuery(RAIL_HORIZONTAL_QUERY);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const reduced = Boolean(reducedMotion);

  /**
   * Both arrow pairs work at every width. On the vertical rail up/down is the
   * natural pair, on the horizontal rail left/right is — supporting both means
   * a keyboard user can never get stuck because the layout changed under them.
   * This is a deliberate superset of the ARIA pattern.
   */
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // Move relative to the tab that actually has focus rather than the selected
    // one. Roving tabindex keeps the two in step for ordinary keyboard use, but
    // a screen reader can put focus on a tab without activating it, and the
    // arrow keys should still start from wherever the user is.
    const focused = tabRefs.current.indexOf(document.activeElement as HTMLButtonElement);
    const current = focused === -1 ? active : focused;

    let next: number;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = current === LAST ? 0 : current + 1;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = current === 0 ? LAST : current - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = LAST;
        break;
      default:
        return;
    }

    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div className="pj-track">
        <span aria-hidden="true" className="pj-line" />
        <span
          aria-hidden="true"
          className="pj-fill"
          style={{ "--pj-progress": active / LAST } as CSSProperties}
        />

        <div
          role="tablist"
          aria-label={t("stagesLabel")}
          aria-orientation={horizontal ? "horizontal" : "vertical"}
          onKeyDown={onKeyDown}
          className="pj-tablist grid grid-cols-1 lg:grid-cols-4"
        >
          {journeyStages.map((stage, index) => {
            const selected = index === active;

            return (
              <button
                key={stage.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`journey-tab-${stage.id}`}
                aria-controls={`journey-panel-${stage.id}`}
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                className="pj-tab group flex w-full items-center gap-4 py-3 text-left lg:items-start lg:gap-3 lg:py-0 lg:pr-8"
              >
                <span aria-hidden="true" className="pj-node" />

                <span className="flex min-w-0 flex-col gap-1.5">
                  <span className="flex items-center gap-2 font-mono text-label uppercase text-black/70">
                    <span>{stage.number}</span>
                    <span aria-hidden="true" className="h-px w-3 bg-line" />
                    <span>{t(`stages.${stage.id}.phase`)}</span>
                  </span>

                  <span
                    className={cn(
                      "text-body font-medium transition-colors duration-150",
                      selected ? "text-black" : "text-black/70 group-hover:text-black",
                    )}
                  >
                    {t(`stages.${stage.id}.title`)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 border border-line bg-white lg:mt-12">
        {journeyStages.map((stage, index) => {
          const selected = index === active;

          return (
            <div
              key={stage.id}
              role="tabpanel"
              id={`journey-panel-${stage.id}`}
              aria-labelledby={`journey-tab-${stage.id}`}
              hidden={!selected}
              tabIndex={0}
              className="focus-visible:outline-offset-[-3px]"
            >
              <motion.div
                initial={false}
                animate={{ opacity: selected ? 1 : 0, y: selected ? 0 : 8 }}
                transition={reduced ? { duration: 0 } : { duration: 0.26, ease: EASE }}
                className="hv-grid gap-y-8 px-6 py-8 lg:px-10 lg:py-10"
              >
                <div className="col-span-4 md:col-span-8 lg:col-span-6">
                  {/*
                    The panel box must not change height when the reader moves
                    between stages, or everything below it jumps under the
                    pointer. Two things would otherwise vary it: the
                    descriptions wrap to a different number of lines at each
                    width, and DISCOVER lists three items where the other stages
                    list four. Reserving both heights makes every panel exactly
                    as tall as the tallest one.

                    The reserved values are measured, not guessed. One line of
                    `text-body-lg` is `1.45em`, so `5.8em` is four lines, `4.35em`
                    is three and `2.9em` is two. The longest description needs
                    four lines on a 320px phone, three up to `md`, and two from
                    `md` up. `8.25rem` is four items at the widest breakpoint, so
                    it is a few pixels generous on a phone.
                  */}
                  <p className="max-w-[52ch] text-body-lg text-pretty text-black/75 min-h-[5.8em] min-[384px]:min-h-[4.35em] md:min-h-[2.9em]">
                    {t(`stages.${stage.id}.description`)}
                  </p>

                  <p className="mt-8 font-mono text-label uppercase text-black/70">
                    {t("includesLabel")}
                  </p>

                  <ul className="mt-4 flex min-h-[8.25rem] flex-col gap-2.5">
                    {(t.raw(`stages.${stage.id}.items`) as readonly string[]).map((item) => (
                      <li key={item} className="flex items-center gap-3 text-body text-black/75">
                        <span aria-hidden="true" className="h-px w-4 shrink-0 bg-line" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-span-4 md:col-span-8 lg:col-span-6">
                  <JourneyVisual
                    kind={stage.visual}
                    metaphor={t(`stages.${stage.id}.metaphor`)}
                    active={selected}
                    reduced={reduced}
                  />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
