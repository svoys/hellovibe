import { getTranslations } from "next-intl/server";

import { AIAuditVisual } from "@/components/home/AIAuditVisual";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { auditCta, auditDeliverables } from "@/data/ai-audit";

/** Anchor for the AI Audit block. */
export const AI_AUDIT_SECTION_ID = "ai-audit";

/**
 * Section 06 — AI AUDIT.
 *
 * The first block on the page whose job is conversion rather than explanation.
 * Everything above it answers "what do you do" and "how does it work"; this one
 * gives a visitor who has no brief yet a way in, because the audit is the
 * smallest thing HelloVibe sells and the natural first step.
 *
 * Server Component. The header is split — title left, description right — like
 * Services and the Product Journey, so the block does not read as a fourth
 * Hero. Only the panel crosses into the client bundle.
 *
 * The deliverables are real content in the DOM rather than decoration inside
 * the panel: they are the substance of the offer, and a screen reader should
 * get them as a list, not as a description of a picture.
 */
export async function AIAudit() {
  const t = await getTranslations("AIAudit");

  return (
    <section
      id={AI_AUDIT_SECTION_ID}
      aria-labelledby="ai-audit-title"
      className="border-t border-line"
    >
      <Container className="py-section-lg">
        <div className="hv-grid items-start gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <SectionHeader
              number="04"
              eyebrow={t("eyebrow")}
              tone="strong"
              titleId="ai-audit-title"
              title={t("headline")}
            />
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <p className="max-w-[44ch] text-body-lg text-pretty text-black/75">{t("description")}</p>
          </div>
        </div>

        <div className="hv-grid mt-16 items-start">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <p className="font-mono text-label uppercase text-black/70">{t("deliverablesLabel")}</p>

            <ol className="mt-5">
              {auditDeliverables.map((deliverable) => (
                <li
                  key={deliverable.id}
                  className="flex items-baseline gap-4 border-t border-line py-4 last:border-b"
                >
                  <span className="font-mono text-label text-black/70">{deliverable.number}</span>
                  <span className="text-body-lg text-black">
                    {t(`deliverables.${deliverable.id}`)}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/*
            Below `lg` this stacks under the deliverables, so a narrow-screen
            visitor reads what they get before seeing the interface that
            produces it.
          */}
          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
            <AIAuditVisual />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-label uppercase text-black/70">{t("microcopy")}</p>

          <ArrowLink href={auditCta.href} className="text-body-lg">
            {t("ctaLabel")}
          </ArrowLink>
        </div>
      </Container>
    </section>
  );
}
