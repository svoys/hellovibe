import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { ButtonVariant } from "@/types";

/**
 * 52px tall, small radius, no gradients, no shadows, no pill shape.
 * Motion is a single CSS colour transition — no animation library needed here.
 */
const BASE =
  "group inline-flex h-13 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-control px-6 text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-black text-white hover:bg-vibe hover:text-black",
  secondary: "border border-line text-black hover:border-black",
};

type SharedProps = {
  variant?: ButtonVariant;
  /** Renders a trailing arrow that shifts ~4px on hover. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export type ButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "type"> & {
    type?: "button" | "submit" | "reset";
  };

export type ButtonLinkProps = SharedProps & {
  href: string;
};

function ButtonContent({ arrow, children }: { arrow: boolean; children: ReactNode }) {
  return (
    <>
      {children}
      {arrow ? (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-150 group-hover:translate-x-1"
        />
      ) : null}
    </>
  );
}

/** Action button. Renders a real `<button>` with correct semantics. */
export function Button({
  variant = "primary",
  arrow = false,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={cn(BASE, VARIANTS[variant], className)} {...rest}>
      <ButtonContent arrow={arrow}>{children}</ButtonContent>
    </button>
  );
}

/** Same visual language, but navigational — renders a real `<a>`. */
export function ButtonLink({ variant = "primary", arrow = false, className, children, href }: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(BASE, VARIANTS[variant], className)}>
      <ButtonContent arrow={arrow}>{children}</ButtonContent>
    </Link>
  );
}
