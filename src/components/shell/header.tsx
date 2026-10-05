"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

const links = [{ href: "/explore", label: "Explore" }, { href: "/expeditions", label: "Expeditions" }, { href: "/archive", label: "Research archive" }, { href: "/stories", label: "Stories" }, { href: "/education", label: "Education" }, { href: "/admin/login", label: "Admin" }];
export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="utility">NCPOR POLAR KNOWLEDGE & OUTREACH PORTAL <span>DEMO ENVIRONMENT</span></div><div className="nav-wrap"><Link className="brand" href="/" aria-label="NCPOR Polar Portal home"><i /> <b>NCPOR</b><em>POLAR PORTAL</em></Link><nav className={open ? "nav open" : "nav"} aria-label="Primary">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}<Link className="nav-search" href="/archive"><Search size={17} /> Search archive</Link></nav><button className="menu-button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></header>;
}
