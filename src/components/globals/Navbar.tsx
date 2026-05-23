"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { HiChevronDown, HiMenu, HiX } from "react-icons/hi";

const navItems: {
  href: string;
  label: string;
  disabled?: boolean;
}[] = [
  { href: "/", label: "Home" },
  { href: "/health-fitness", label: "Health & Fitness" },
  { href: "/finance", label: "Finance", disabled: true },
  { href: "/maths", label: "Maths" },
  { href: "/conversion", label: "Conversion" },
];

const moreMenuLinks = [
  { href: "/technology", label: "Technology" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/education", label: "Education" },
  { href: "/other", label: "Other" },
] as const;

const drawerFooterLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
] as const;

function isActive(href: string, pathname: string | null) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname?.startsWith(`${href}/`);
}

function isMoreSectionActive(pathname: string | null) {
  return moreMenuLinks.some((link) => isActive(link.href, pathname));
}

function navLinkClass(href: string, pathname: string | null) {
  return isActive(href, pathname)
    ? "text-primary font-medium"
    : "font-medium text-neutral-1 hover:text-secondary";
}

function navDisabledClass() {
  return "cursor-not-allowed whitespace-nowrap text-sm font-normal text-neutral-1/35 md:text-[15px]";
}

function drawerLinkClass(href: string, pathname: string | null) {
  const active = isActive(href, pathname);
  return active
    ? "bg-primary/[0.14] font-semibold text-primary"
    : "font-medium text-neutral-1 hover:bg-neutral-3/90 active:bg-neutral-3";
}

function moreTriggerClass(pathname: string | null, open: boolean) {
  const active = isMoreSectionActive(pathname);
  if (active) return "text-primary font-medium";
  if (open) return "font-medium text-secondary";
  return "font-medium text-neutral-1 hover:text-secondary";
}

function MoreMenuDropdown({ pathname }: { pathname: string | null }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className={`inline-flex items-center gap-0.5 whitespace-nowrap text-sm transition-colors md:text-[15px] ${moreTriggerClass(pathname, open)}`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
      >
        More
        <HiChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-[60] min-w-[11rem] overflow-hidden rounded-md border border-neutral-3 bg-neutral-2 py-1 shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
        >
          {moreMenuLinks.map(({ href, label }) => {
            const active = isActive(href, pathname);
            return (
              <Link
                key={href}
                href={href}
                role="menuitem"
                className={`block px-3.5 py-2.5 text-sm transition-colors focus-visible:bg-neutral-3 focus-visible:outline-none ${
                  active
                    ? "bg-primary/[0.1] font-medium text-primary"
                    : "font-normal text-neutral-1 hover:bg-neutral-3/90"
                }`}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function MobileMoreSection({
  pathname,
  onNavigate,
}: {
  pathname: string | null;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(() =>
    isMoreSectionActive(pathname),
  );

  useEffect(() => {
    if (isMoreSectionActive(pathname)) setExpanded(true);
  }, [pathname]);

  const moreActive = isMoreSectionActive(pathname);

  return (
  <>
      <li className={`w-full border-t border-neutral-3`}>
        <button
          type="button"
          className={`flex min-h-12 w-full items-center justify-between rounded-none py-4 pl-6 pr-5 text-lg leading-snug tracking-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-[1.35rem] ${
            moreActive
              ? "bg-primary/[0.14] font-semibold text-primary"
              : "font-medium text-neutral-1 hover:bg-neutral-3/90"
          }`}
          aria-expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
        >
          More
          <HiChevronDown
            className={`h-5 w-5 shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
      </li>
      {expanded
        ? moreMenuLinks.map((link) => {
            const active = isActive(link.href, pathname);
            return (
              <li
                key={link.href}
                className="w-full border-t border-neutral-3 bg-neutral-3/30"
              >
                <Link
                  href={link.href}
                  className={`block min-h-11 w-full rounded-none py-3 pl-10 pr-5 text-base leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-[1.2rem] ${drawerLinkClass(link.href, pathname)}`}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })
        : null}
    </>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (prevPathnameRef.current === pathname) return;
    prevPathnameRef.current = pathname;
    setMenuOpen(false);
  }, [pathname]);

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
                alt="All1Calculators logo"
                width={200}
                height={40}
                className="h-13 w-auto object-contain"
                priority
              />
            </Link>

            <nav
              className="hidden md:absolute md:left-1/2 md:top-1/2 md:flex md:-translate-x-1/2 md:-translate-y-1/2 md:items-center md:gap-x-10"
              aria-label="Main"
            >
              {navItems.map(({ href, label, disabled }) =>
                disabled ? (
                  <span
                    key={href}
                    className={navDisabledClass()}
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
              <MoreMenuDropdown pathname={pathname} />
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
                {navItems.map(({ href, label, disabled }, index) => (
                  <li
                    key={href}
                    className={`w-full ${index > 0 ? "border-t border-neutral-3" : ""}`}
                  >
                    {disabled ? (
                      <span
                        className="block min-h-12 w-full cursor-not-allowed rounded-none py-4 pl-6 pr-5 text-lg font-normal leading-snug tracking-tight text-neutral-1/35 sm:text-[1.35rem]"
                        aria-disabled
                      >
                        {label}
                      </span>
                    ) : (
                      <Link
                        href={href}
                        className={`block min-h-12 w-full rounded-none py-4 pl-6 pr-5 text-lg leading-snug tracking-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-[1.35rem] ${drawerLinkClass(href, pathname)}`}
                        onClick={() => setMenuOpen(false)}
                        aria-current={
                          isActive(href, pathname) ? "page" : undefined
                        }
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
                <MobileMoreSection
                  pathname={pathname}
                  onNavigate={() => setMenuOpen(false)}
                />
              </ul>
            </div>

            <div className="shrink-0 border-t border-neutral-3 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
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
