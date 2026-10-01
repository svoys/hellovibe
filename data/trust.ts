/**
 * One category of team the studio builds for.
 *
 * This is deliberately not a client. See the note on {@link trustCategories}.
 */
export type TrustCategory = {
  /** Stable key. Also used to build the list item id. */
  id: string;
  /** Display label, rendered uppercase in mono. */
  label: string;
};

/**
 * The categories of team HelloVibe builds for, verbatim from the source
 * conversation §03 TRUST STRIP.
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
 */
export const trustCategories: readonly TrustCategory[] = [
  { id: "startups", label: "Startups" },
  { id: "scale-ups", label: "Scale-ups" },
  { id: "product-teams", label: "Product Teams" },
  { id: "brands", label: "Brands" },
];

/** The strip's only sentence, verbatim from the source conversation §03. */
export const trustStatement = "Built for ambitious teams building what’s next.";
