import Image from "next/image";
import Link from "next/link";

const calculatorLinks = [
  { label: "BMI Calculator", href: "/health-fitness/bmi-calculator" },
  { label: "TDEE Calculator", href: "/health-fitness/tdee-calculator" },
  { label: "Scientific Calculator", href: "/maths/scientific-calculator" },
  { label: "Health & fitness", href: "/health-fitness" },
  { label: "Finance calculators", href: "/finance" },
  { label: "Maths calculators", href: "/maths" },
] as const;

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Contact", href: "/contact" },
] as const;

const footerBlue = "bg-[#206ba4]";

export function Footer() {
  return (
    <footer className={`shrink-0 ${footerBlue} text-neutral-2`}>
      <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-[100px] md:py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block w-fit" aria-label="Home">
              <Image
                src="/AllOneCalc_Logo.png"
                alt="AllOneCalculators"
                width={200}
                height={44}
                className="h-10 w-auto object-contain object-left"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/85">
              Free online calculators for finance, health, and more.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              Calculators
            </h2>
            <ul className="flex flex-col gap-2.5 text-sm">
              {calculatorLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/90 transition-colors hover:text-white hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              Company
            </h2>
            <ul className="flex flex-col gap-2.5 text-sm">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/90 transition-colors hover:text-white hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-white/75">
          © {new Date().getFullYear()} AllOneCalculators. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
