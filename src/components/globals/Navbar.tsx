"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const navItems: {
  href: string;
  label: string;
  disabled?: boolean;
}[] = [
  { href: "/", label: "Home" },
  { href: "/health-fitness", label: "Health & Fitness" },
  { href: "/finance", label: "Finance", disabled: true },
  { href: "/maths", label: "Maths", disabled: true },
  { href: "/other", label: "Other", disabled: true },
];

const drawerFooterLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
] as const;

function isActive(href: string, pathname: string | null) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname?.startsWith(`${href}/`);
}

function navLinkClass(href: string, pathname: string | null) {
  return isActive(href, pathname)
    ? "text-primary font-medium"
    : "text-neutral-1 hover:opacity-80 dark:text-zinc-300 dark:hover:opacity-90";
}

function drawerLinkClass(href: string, pathname: string | null) {
  const active = isActive(href, pathname);
  return active
    ? "bg-primary/[0.14] font-semibold text-primary"
    : "font-medium text-neutral-1 hover:bg-neutral-3/90 active:bg-neutral-3";
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const timer = window.setTimeout(() => {
      setMenuOpen(false);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 shrink-0 border-b border-neutral-3 bg-neutral-2 ${
          menuOpen ? "z-[102]" : "z-50"
        }`}
      >
        <div className="relative mx-auto max-w-[1600px]">
          <div className="flex h-14 items-center justify-between px-4 md:h-16 md:px-[100px]">
            <Link
              href="/"
              className="relative z-10 w-fit shrink-0"
              aria-label="Home"
            >
              <Image
                src="/AllOneCalc_Logo(1).png"
                alt="AllOneCalculators logo"
                width={200}
                height={40}
                className="h-13 w-auto object-contain"
                priority
              />
            </Link>

            <nav
              className="hidden md:absolute md:left-1/2 md:top-1/2 md:flex md:-translate-x-1/2 md:-translate-y-1/2 md:gap-x-10"
              aria-label="Main"
            >
              {navItems.map(({ href, label, disabled }) =>
                disabled ? (
                  <span
                    key={href}
                    className="cursor-not-allowed whitespace-nowrap text-sm font-normal text-neutral-1/45 md:text-[15px]"
                    aria-disabled
                  >
                    {label}
                  </span>
                ) : (
                  <Link
                    key={href}
                    href={href}
                    className={`whitespace-nowrap text-sm font-normal transition-colors md:text-[15px] ${navLinkClass(href, pathname)}`}
                  >
                    {label}
                  </Link>
                ),
              )}
            </nav>

            <button
              type="button"
              className="relative z-[103] -mr-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-neutral-1 transition-colors hover:bg-neutral-3/80 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <HiX className="h-6 w-6 shrink-0" aria-hidden />
              ) : (
                <HiMenu className="h-6 w-6 shrink-0" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[100] cursor-default border-0 bg-black/40 p-0 md:hidden"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <nav
            id="mobile-nav"
            className="mobile-nav-drawer fixed bottom-0 right-0 top-14 z-[101] flex w-[80vw] flex-col overflow-hidden bg-neutral-2 shadow-[-16px_0_40px_rgba(0,0,0,0.08)] md:hidden"
            aria-label="Main"
          >
            <div className="flex min-h-0 flex-1 flex-col justify-start overflow-y-auto overscroll-contain px-0 pb-6">
              <ul className="flex flex-col">
                {navItems.map(({ href, label, disabled }, index) => {
                  const active = isActive(href, pathname);
                  return (
                    <li
                      key={href}
                      className={`w-full ${index > 0 ? "border-t border-neutral-3" : ""}`}
                    >
                      {disabled ? (
                        <span
                          className="block min-h-12 w-full cursor-not-allowed rounded-none py-4 pl-6 pr-5 text-lg leading-snug tracking-tight text-neutral-1/45 sm:text-[1.35rem]"
                          aria-disabled
                        >
                          {label}
                        </span>
                      ) : (
                        <Link
                          href={href}
                          className={`block min-h-12 w-full rounded-none py-4 pl-6 pr-5 text-lg leading-snug tracking-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-[1.35rem] ${drawerLinkClass(href, pathname)}`}
                          onClick={() => setMenuOpen(false)}
                          aria-current={active ? "page" : undefined}
                        >
                          {label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="shrink-0 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 border border-t border-neutral-3">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[13px] text-neutral-1/45">
                {drawerFooterLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="transition-colors hover:text-primary"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </>
      ) : null}
    </>
  );
}
