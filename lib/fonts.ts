import { Geist, Geist_Mono } from "next/font/google";

/**
 * The two faces, defined once.
 *
 * They live outside `app/[locale]/layout.tsx` because there is now a second
 * document that has to load them: `app/global-not-found.tsx` renders its own
 * `<html>` and cannot go through the locale layout. Calling `Geist()` in both
 * files would create two `next/font` instances for the same face — two
 * stylesheets, two sets of CSS variables, and a coin flip over which one wins.
 */

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** The class list both documents put on `<html>`. */
export const fontVariables = `${geistSans.variable} ${geistMono.variable}`;
