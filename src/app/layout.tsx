import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/shell/header";
import { Footer } from "@/components/shell/footer";

export const metadata: Metadata = { title: { default: "NCPOR Polar Portal", template: "%s · NCPOR Polar Portal" }, description: "A demo knowledge and outreach portal for polar science.", metadataBase: new URL("http://localhost:3000") };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main">{children}</main><Footer /></body></html>;
}
