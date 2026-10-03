"use client";

import { useLocale, useTranslations } from "next-intl";
import { useActionState, useEffect, useId, useRef } from "react";

import { submitContact } from "@/app/[locale]/contact/actions";
import { Button } from "@/components/ui/Button";
import {
  CONTACT_BUDGET_IDS,
  CONTACT_INTENT_IDS,
  CONTACT_STAGE_IDS,
  CONTACT_TIMING_IDS,
} from "@/data/contact";
import { contactEmail } from "@/data/navigation";
import {
  CONTACT_FIELDS,
  CONTACT_LOCALE_FIELD,
  EMPTY_CONTACT_VALUES,
  HONEYPOT_FIELD,
  type ContactErrors,
  type ContactFormState,
  type ContactValues,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

const INITIAL_STATE: ContactFormState = { status: "idle" };

/** One control look for every text field. The invalid border is the only variant. */
const CONTROL =
  "w-full rounded-control border bg-white px-4 py-3 text-body text-black transition-colors duration-150 placeholder:text-black/60";

const LEGEND = "text-body-lg font-medium text-black";

/** One radio option: the identifier that is submitted, and the label that is shown. */
type RadioOption = {
  /** Machine-readable value — see the header of `data/contact.ts`. */
  id: string;
  /** Localised text beside the control. */
  label: string;
};

type RadioGroupProps = {
  /** Id for the group's first control, so a failed submit can focus it. */
  id: string;
  name: string;
  question: string;
  options: readonly RadioOption[];
  value: string;
  error?: string;
  optional?: boolean;
  required?: boolean;
};

/**
 * A `fieldset` + `legend` rather than a list of labelled inputs: the question is
 * the group's accessible name, so a screen reader announces it once for the
 * group instead of once per option.
 *
 * The `value` of every radio is the option's `id` and the visible text is its
 * `label`. That split is the point of the whole form: what leaves the browser is
 * `use_ai_business`, not the sentence beside it, so the payload is identical in
 * both locales and does not change when a translator rewords a label.
 */
function RadioGroup({
  id,
  name,
  question,
  options,
  value,
  error,
  optional = false,
  required = false,
}: RadioGroupProps) {
  const t = useTranslations("ContactForm");
  const errorId = `${id}-error`;
  const legendId = `${id}-legend`;

  return (
    /*
     * `role="radiogroup"` is what carries `aria-required` / `aria-invalid`:
     * neither is supported by the `radio` role, and both describe the group as a
     * whole. The legend is wired up by hand because overriding the fieldset's
     * role takes it out of the path that names a group from its legend.
     */
    <fieldset
      role="radiogroup"
      aria-labelledby={legendId}
      aria-required={required || undefined}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? errorId : undefined}
    >
      <legend id={legendId} className={LEGEND}>
        {question}
        {optional ? (
          <span className="ml-3 text-small font-normal text-black/70">{t("optional")}</span>
        ) : null}
      </legend>

      <div className="mt-4 flex flex-col gap-3">
        {options.map((option, index) => (
          <label
            key={option.id}
            className="flex cursor-pointer items-start gap-3 text-body text-black/75 transition-colors duration-150 hover:text-black"
          >
            <input
              id={index === 0 ? id : undefined}
              type="radio"
              name={name}
              value={option.id}
              defaultChecked={value === option.id}
              required={required && index === 0}
              className="mt-1 size-4 shrink-0 accent-black"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      {error ? (
        <p id={errorId} className="mt-3 text-small font-medium text-black">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

type TextFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  type?: "text" | "email";
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
};

function TextField({
  id,
  name,
  label,
  value,
  type = "text",
  placeholder,
  autoComplete,
  required = false,
  optional = false,
  error,
}: TextFieldProps) {
  const t = useTranslations("ContactForm");
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className={LEGEND}>
        {label}
        {optional ? (
          <span className="ml-3 text-small font-normal text-black/70">{t("optional")}</span>
        ) : null}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={value}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(CONTROL, "mt-4", error ? "border-orange" : "border-line")}
      />

      {error ? (
        <p id={errorId} className="mt-2 text-small font-medium text-black">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * The contact form.
 *
 * Client Component only because it needs `useActionState` to render the result
 * of the Server Action. The action is a real server action, so the form still
 * submits and still validates with JavaScript disabled — the browser posts the
 * form, the action runs on the server, and the page comes back with the state
 * already rendered.
 *
 * Field order, question wording, option lists, submit label and microcopy are
 * all the source's. The only additions are the two words "Optional" and the
 * "nothing was sent" notice, which is operational copy rather than a claim.
 *
 * Validation is server-side; the `required`/`aria-required` attributes are
 * semantics for assistive tech, and the form is `noValidate` so the browser's
 * own bubbles never compete with the messages rendered below each field.
 *
 * ## Bilingual
 *
 * Every visible string comes from `ContactForm.*`. The option sets are built
 * here by pairing the ids in `data/contact.ts` with the labels in the catalogue,
 * so the *ids* are what the radio inputs submit while the reader sees translated
 * text. The hidden `locale` field is what lets the Server Action answer in the
 * right language — see `CONTACT_LOCALE_FIELD` in `lib/contact.ts`.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, INITIAL_STATE);
  const t = useTranslations("ContactForm");
  const locale = useLocale();
  const uid = useId();
  const noticeRef = useRef<HTMLDivElement>(null);

  /*
   * A failed submit has to be announced. Focus goes to the first invalid
   * control — or to the delivery notice — because the reader submitted from the
   * bottom of the form and would otherwise hear nothing change. The summary
   * carries no `role="alert"` on purpose: moving focus already announces it, and
   * both together would say everything twice.
   */
  useEffect(() => {
    if (state.status === "invalid") {
      const first = CONTACT_FIELDS.find((field) => state.errors[field]);
      if (first) document.getElementById(`${uid}-${first}`)?.focus();
    } else if (state.status === "undelivered") {
      noticeRef.current?.focus();
    }
  }, [state, uid]);

  const values: ContactValues =
    state.status === "invalid" || state.status === "undelivered"
      ? state.values
      : EMPTY_CONTACT_VALUES;
  const errors: ContactErrors = state.status === "invalid" ? state.errors : {};

  const fieldId = (field: string) => `${uid}-${field}`;

  /** Pairs one option set with its labels, in the source's order. */
  const options = (ids: readonly string[], group: string): RadioOption[] =>
    ids.map((id) => ({ id, label: t(`${group}.${id}`) }));

  if (state.status === "success") {
    return (
      <div className="mt-16 max-w-[52rem] border-t border-line pt-12">
        <h2 className="text-h3">{t("successHeading")}</h2>
        <p className="mt-4 text-body-lg text-black/75">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      aria-labelledby="contact-page-title"
      className="mt-16 flex max-w-[52rem] flex-col gap-12 border-t border-line pt-12"
    >
      {/*
        The locale the form was rendered in. A Server Action cannot read the
        `[locale]` segment, so the action is told instead of guessing — and it
        validates this value against `routing.locales` before using it.
      */}
      <input type="hidden" name={CONTACT_LOCALE_FIELD} value={locale} />

      {/*
        The honeypot. Hidden from sight and from assistive tech, and taken out of
        the tab order, so a real person can never fill it — see the Server
        Action, which answers anything that does exactly as it answers a real
        submission.
      */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={fieldId(HONEYPOT_FIELD)}>{t("honeypotLabel")}</label>
        <input
          id={fieldId(HONEYPOT_FIELD)}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.status === "undelivered" ? (
        <div ref={noticeRef} tabIndex={-1} className="border border-orange p-6">
          <h2 className="text-h4">{t("undeliveredHeading")}</h2>
          <p className="mt-3 text-body text-black/75">{t("undeliveredBody")}</p>
          <p className="mt-5">
            <a
              href={`mailto:${contactEmail}`}
              className="border-b border-line font-medium text-black transition-colors duration-150 hover:border-black"
            >
              {contactEmail}
            </a>
          </p>
        </div>
      ) : null}

      <RadioGroup
        id={fieldId("intent")}
        name="intent"
        question={t("intentQuestion")}
        options={options(CONTACT_INTENT_IDS, "intentOptions")}
        value={values.intent}
        error={errors.intent}
        required
      />

      <TextField
        id={fieldId("goal")}
        name="goal"
        label={t("goalQuestion")}
        placeholder={t("goalPlaceholder")}
        value={values.goal}
        error={errors.goal}
        required
      />

      <RadioGroup
        id={fieldId("stage")}
        name="stage"
        question={t("stageQuestion")}
        options={options(CONTACT_STAGE_IDS, "stageOptions")}
        value={values.stage}
        error={errors.stage}
        required
      />

      <RadioGroup
        id={fieldId("budget")}
        name="budget"
        question={t("budgetQuestion")}
        options={options(CONTACT_BUDGET_IDS, "budgetOptions")}
        value={values.budget}
        error={errors.budget}
        optional
      />

      <RadioGroup
        id={fieldId("timing")}
        name="timing"
        question={t("timingQuestion")}
        options={options(CONTACT_TIMING_IDS, "timingOptions")}
        value={values.timing}
        error={errors.timing}
        optional
      />

      <div className="hv-grid gap-y-8">
        <div className="col-span-4 md:col-span-4">
          <TextField
            id={fieldId("name")}
            name="name"
            label={t("nameLabel")}
            autoComplete="name"
            value={values.name}
            error={errors.name}
            required
          />
        </div>

        <div className="col-span-4 md:col-span-4">
          <TextField
            id={fieldId("email")}
            name="email"
            type="email"
            label={t("emailLabel")}
            autoComplete="email"
            value={values.email}
            error={errors.email}
            required
          />
        </div>

        <div className="col-span-4 md:col-span-8">
          <TextField
            id={fieldId("company")}
            name="company"
            label={t("companyLabel")}
            autoComplete="organization"
            value={values.company}
            error={errors.company}
            optional
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button type="submit" arrow disabled={pending}>
          {t("submitLabel")}
        </Button>
        <p className="text-small text-black/70">{t("microcopy")}</p>
      </div>
    </form>
  );
}
