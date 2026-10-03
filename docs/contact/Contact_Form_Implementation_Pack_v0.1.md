# Contact Form — Implementation Pack v0.1

Production completion pass. Commit `3893da8`
(`feat: complete production site integration`).

---

## 1. What this covers

The last four things standing between the shipped site and a deployable one:

1. `components/home/FinalCta.tsx` connected to `app/page.tsx` — **already done**,
   no change was needed. Verified, not assumed: `FinalCta` has been rendered after
   `FAQ` since the block was built.
2. `/contact` — the real form.
3. `app/sitemap.ts` + `app/robots.ts`.
4. `README.md` — it still claimed the repository "contains **only the
   foundation**", which had been false for a dozen blocks.

Nothing visual changed. The accepted direction, the section rhythm and the copy
already on the page are untouched.

## 2. Source of truth for the form

Two sections of the source, and only those:

- **Contact form** — the field list, and the validation rules (which fields are
  required, and that email must be format-checked).
- **Contact form content** — the five questions and their option lists, the
  submit label `Let's talk`, and the microcopy `No pitch deck required.`

Every one of those strings lives in `data/contact.ts`, verbatim, with typographic
apostrophes per the site convention (`What's your approximate budget?`). Nothing
in the form was written for the form.

### The one decision the source left open

The source says the budget field is *"optional or required depending on
commercial preference"*. It is **optional** here. A lead is never blocked on a
number the reader may not have yet, and an unanswered budget is still a lead.

### What was added, and why it is not a claim

Two strings are not the source's:

- the word **Optional** beside the two optional groups and the optional text
  field — the reader cannot otherwise tell which fields they may skip;
- the **"Nothing was sent."** notice (§5).

Both are operational copy. Neither asserts anything about the business.

## 3. Shape: one page, five fieldsets

The source presents the form as *Step 01 … Step 05*. That numbering is a spec
artefact — it describes the order the questions were written in, not a wizard.

The form is therefore **one page**: five `fieldset` groups, all visible, one
submit. Reasons, in order of weight:

- less client JavaScript, and no state machine to get wrong;
- everything is on screen, so a reader can see how long the form is before
  starting it;
- no step boundary for a screen reader or a keyboard to fall out of;
- the questions read as a sequence anyway, because that is the order they are in.

## 4. Validation

`lib/contact.ts` holds the rules as pure functions; `app/contact/actions.ts` is
the only caller.

| Field | Rule |
|---|---|
| `intent` | required — **must be one of the five options** |
| `goal` | required, free text, ≤ 2000 chars |
| `stage` | required — **must be one of the five options** |
| `budget` | optional — but if present, must be one of the five options |
| `timing` | optional — but if present, must be one of the four options |
| `name` | required, ≤ 200 chars |
| `email` | required, ≤ 254 chars, must match a basic format |
| `company` | optional, ≤ 200 chars |

Two things worth stating explicitly:

**The choice fields are checked against the approved option lists, not merely for
emptiness.** A crafted POST cannot put arbitrary text into a field the UI renders
as a fixed set. This is verified — see §7, "a crafted value in a fixed-option
field is rejected".

**`name` is required even though the source's validation list does not mention
it.** It is one of the source's fields, a message with no name is not actionable,
and the success copy promises "we'll be in touch". `company` stays optional: the
source does not list it, and a solo founder has none.

Validation is **server-side only**. The `required` and `aria-required` attributes
are semantics for assistive tech, not a gate — nothing from the browser is
trusted. The form is `noValidate` so the browser's own bubbles never compete with
the messages rendered under each field.

## 5. Delivery is not connected — and the form says so

This is the most important decision in the pack.

The source's flow is
`Client → Server Action → Validation → Email provider / CRM → Success state`.
The provider step is an open decision: the source names no vendor, and
`.env.example` reserves only `CONTACT_EMAIL` and `EMAIL_API_KEY`.

So `lib/contact-delivery.ts` is a single, deliberately unconnected seam that
returns `not-configured`. A **valid** submission therefore renders:

> **Nothing was sent.**
> Automatic delivery is not connected yet, so this form cannot send your message.
> Write to us directly and we'll pick it up from there.
>
> hello@hellovibe.ru

The alternative — showing `Got it. Thanks — we'll be in touch soon.` — would lie
to the reader and silently lose the lead. **A success screen for a message nobody
received is worse than an honest failure.** The `success` state is fully wired and
renders the moment a transport is added; it is simply not reachable before then.

To connect it, keep the signature of `deliverContactMessage` and replace the body
with the provider call. The action already treats a non-`ok` outcome as "not
delivered", so **no other file needs to change**.

## 6. Anti-spam

A honeypot field named `fax_number`, hidden three ways at once:

- `sr-only` on its wrapper — clipped to 1×1, so a person never sees it;
- `aria-hidden="true"` — never announced;
- `tabIndex={-1}` — never focusable.

The Server Action answers anything in that field with the **same `success` shape
a real submission gets**, so the trap cannot be detected by probing. The honeypot
is enforced on the server, so it works with JavaScript disabled too.

A caveat worth recording: while delivery is unconnected, the honeypot path and
the real path *do* differ (the trap gets `Got it.`, a real reader gets
`Nothing was sent.`). That divergence disappears the moment a transport is
connected, because the honeypot already returns the steady-state answer. It is
left as-is deliberately rather than special-cased to today's unreachable state.

No CAPTCHA, no rate limiting, no IP logging. The source asks for "basic
anti-spam", and a CAPTCHA on a five-field form costs more conversions than it
saves. **If this ever needs a second layer, that is a decision to raise, not to
add quietly.**

## 7. Progressive enhancement is real, not asserted

The form posts natively. With JavaScript disabled the browser sends the form
itself and the page comes back with the errors already rendered. That is not a
claim — it is tested, in two independent ways:

**a. The form is server-rendered.** `action="" method="POST"
enctype="multipart/form-data"`, plus Next's own hidden fields
(`$ACTION_REF_1`, `$ACTION_1:0`, `$ACTION_1:1`, `$ACTION_KEY`). All five
questions and all nineteen options are in the HTML before any script runs.

**b. A scriptless POST returns the right answer.** POSTing only the action fields
returns HTTP 200 with **exactly five** error nodes, the correct messages, and the
form rendered back for refilling.

Clicking the button through CDP was tried first and is **not** a valid test: the
button sits below the fold and `DOM.getBoxModel` returns document coordinates, so
the synthetic click lands on nothing. The direct POST exercises the identical
code path and is deterministic.

## 8. Accessibility notes

- **`role="radiogroup"` is on the `fieldset`, not the radios.** `aria-required`
  and `aria-invalid` are not supported by the `radio` role — they describe the
  group. Overriding the fieldset's role takes it out of the path that names a
  group from its `legend`, so the legend is wired up by hand with
  `aria-labelledby`. (This is also what the lint rule was complaining about.)
- **Focus moves on a failed submit** — to the first invalid control, or to the
  "nothing was sent" notice, because the reader submitted from the bottom of the
  form and would otherwise hear nothing change. The notice carries **no**
  `role="alert"`: moving focus already announces it, and both together would say
  everything twice.
- **The honeypot is never keyboard-reachable** and is never hit-testable.
- Every control carries a visible focus ring.

## 9. Sitemap and robots

`app/sitemap.ts` derives the four pillar routes from `servicePillars`, so a
pillar cannot exist without appearing in the sitemap. Nine routes, and no 404s by
construction.

`lastModified` is **deliberately omitted**: there is no per-route timestamp to
report, and stamping every URL with the build time would tell crawlers the whole
site changed on every deploy — worse than saying nothing.

`app/robots.ts` allows everything and advertises the sitemap. There is no private
area, no staging path and no search page, so there is nothing to disallow.

Both read the origin from `lib/site.ts`, which falls back to
`http://localhost:3000` when `NEXT_PUBLIC_SITE_URL` is unset. **That fallback is
not a production value** — see §11.

## 10. Verification

Run against the **production build**, not the dev server.

| Harness | Result |
|---|---|
| `tsc --noEmit` (fresh build-info, not the incremental cache) | 0 |
| `eslint .` (whole project) | 0 |
| `next build` | compiled, typechecked, 14 static pages |
| `hv-links.mjs` | 11/11 routes, every href and anchor resolves |
| `hv-pages-copy.mjs` | 152/152 content assertions |
| `hv-pillars.mjs` | all pillar assertions |
| `hv-home-final.mjs` | 49/49 — section order, the dark seam, 8 widths |
| `hv-routes-console.mjs` | 132/132 — every route at 1440 and 390 |
| `hv-contact.mjs` | 105/105 — validation, honeypot, keyboard, no-JS |

The build produces exactly the expected route set: `/`, `/services`,
`/services/{strategy,systems,products,creative}`, `/work`, `/about`, `/contact`,
`/sitemap.xml`, `/robots.txt`, `/_not-found`. Nothing extra.

### Four measurement bugs worth remembering

Every one of these first looked like a defect in the form. None was.

1. **`sr-only` keeps a 1×1 box, and the input inside it reports its own 233×25
   layout box.** `overflow: hidden` clips painting, not layout. "Is it visible?"
   cannot be answered by the input's own `getBoundingClientRect()`.
2. **On success the form is gone entirely**, so a form-reading snapshot returns
   "no form" — and both assertions about the success state fail on a page that is
   correct.
3. **The RSC flight payload echoes submitted values back** so the form can be
   refilled. Searching raw HTML for a crafted value therefore always finds it.
   Search *visible* text.
4. **`DOM.getBoxModel` returns document coordinates** while
   `Input.dispatchMouseEvent` expects viewport coordinates, so a click on
   anything below the fold silently misses.

## 11. Known gaps

- **`NEXT_PUBLIC_SITE_URL` must be set in production.** Until it is,
  `metadataBase` and the `Sitemap:` line in `robots.txt` both point at
  `http://localhost:3000`.
- **Delivery is unconnected** (§5). The form is honest about it, but it is not
  yet a lead-capture channel.
- **`/work/[slug]`** is still deferred — the source defers it until real cases
  exist, and inventing them is forbidden.
- **`.next/prod-verify*` build directories** have accumulated. Each verification
  build needs a fresh `distDir` because the default `.next` is protected by a
  bulk-delete guard in this environment, and the guard blocks the build's own
  cleanup once it has deleted 50 files in a turn. Cleaning them up needs
  approval.
