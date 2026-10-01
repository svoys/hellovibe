/**
 * Case studies and the copy for Section 07 — CASES.
 *
 * The source conversation states its rule five times — never invent clients,
 * logos, metrics, testimonials, awards, partnerships or results — and then
 * supplies three worked example cards that break it (`B2B SaaS`, `Startup`,
 * `Consumer Brand`, `working MWP in 6 weeks`). There are no such clients on
 * record, so this file takes the rule over the examples and the section renders
 * its empty state. See `docs/cases/Cases_Implementation_Pack_v0.1.md`.
 */

/**
 * One case study, shaped exactly as the source specifies.
 *
 * Every factual field is optional. The source is explicit that
 * *"all optional factual fields must remain optional"* — a case with no
 * verified result must be publishable without one, which is why
 * `Currently in development` and `Early-stage prototype` are acceptable
 * values for `result` rather than reasons to withhold the case.
 */
export type CaseStudy = {
  /** Route segment under `/work`. */
  slug: string;
  /** Which kind of work this was. One of {@link workCategories}' labels. */
  category: string;
  /** Case title. */
  title: string;
  /** One-line summary. */
  description: string;
  /** What wasn't working. */
  problem?: string;
  /** Where AI created leverage. */
  opportunity?: string;
  /** What HelloVibe created. */
  build?: string;
  /** What changed. Verified only — otherwise say the work is early. */
  result?: string;
  /** Verified numbers only. Never estimate one to fill the field. */
  metrics?: string[];
  /** Technologies and systems involved. */
  tags: string[];
  /** Path under `public/`, once a real image exists. */
  image?: string;
  /** Whether the case is ready to be shown. */
  published: boolean;
};

/**
 * No verified cases yet — **intentionally empty**.
 *
 * Do not populate this to make the section look fuller. `Cases` renders its
 * empty state *because* this array is empty; that is the mechanism, not a
 * placeholder. Real entries go here with `published: true` and the block
 * switches over without a layout change.
 */
export const caseStudies: readonly CaseStudy[] = [];

/** A kind of work HelloVibe does. */
export type WorkCategory = {
  /** Stable key. */
  id: string;
  /** Category name — the row's heading. */
  label: string;
  /** The artefacts that sit under it. */
  work: string;
};

/**
 * The four categories, taken from the source's own list of "possible
 * categories" for the empty state.
 *
 * The artefacts under each are lifted from the brand spec's service
 * definitions. A category describes the *practice*, not a client — which is
 * exactly why these are safe to render while the three example case cards in
 * the source are not. See the pack §"What I decided".
 */
export const workCategories: readonly WorkCategory[] = [
  { id: "ai-system", label: "AI System", work: "Workflows, agents, integrations" },
  { id: "ai-product", label: "AI Product", work: "Discovery, prototype, MWP, MVP" },
  {
    id: "creative-engine",
    label: "Creative Engine",
    work: "Content systems, image and video, campaigns",
  },
  { id: "internal-experiment", label: "Internal Experiment", work: "Prototypes and internal builds" },
];

export const casesEyebrow = "Selected work";

/** The source's empty-state replacement for the whole block. */
export const casesHeadline = "Things we’re building.";

/**
 * Written here, not recovered — the source specifies the empty state but never
 * writes its body copy. It restates the source's own policy, which is the
 * honest reason this block looks the way it does.
 */
export const casesSupporting =
  "No published case studies yet. We’d rather show nothing than show work we can’t back up — so until the first ones are real, here’s what’s in the workshop.";

/** Also written here, not recovered. */
export const casesCta = {
  prompt: "Working on something similar?",
  label: "Start a project",
  href: "/contact",
} as const;
