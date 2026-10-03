/**
 * The categories of team HelloVibe builds for, from the source conversation
 * §03 TRUST STRIP.
 *
 * These are **not clients** and must never be presented as such. The source is
 * explicit — *"Не выдавать эти labels за клиентов"* — and it says the same thing
 * twice in English:
 *
 *   Do not invent client logos. If social proof is needed, use generic category
 *   labels rather than fake clients.
 *
 *   Never use fake metrics as social proof.
 *
 * So: no logos, no placeholder logo slots, no client counts, no "trusted by".
 * The sentence's verb is "Built for" for the same reason — it describes who the
 * studio is for, not who has hired it.
 *
 * If real client logos and permission to publish them ever arrive, this becomes
 * a separate task. Add an optional `logo` field here and render images instead
 * of labels; do not restructure the section.
 *
 * The labels themselves are localised and live in `messages/<locale>.json` under
 * `Trust.categories` — the ids below are both the list order and the message
 * keys, so the two halves cannot drift.
 */

/** One category of team the studio builds for. Doubles as its message key. */
export type TrustCategoryId = "startups" | "scaleUps" | "productTeams" | "brands";

export const trustCategories: readonly TrustCategoryId[] = [
  "startups",
  "scaleUps",
  "productTeams",
  "brands",
];
