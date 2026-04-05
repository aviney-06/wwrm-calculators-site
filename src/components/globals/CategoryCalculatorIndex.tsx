import Link from "next/link";
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/globals/Breadcrumbs";

type LinkItem = { href: string; label: string };

type Props = {
  breadcrumbItems: BreadcrumbItem[];
  title: string;
  description: string;
  links: LinkItem[];
};

/**
 * Directory layout for category landing pages (Finance, Health & Fitness, etc.):
 * italic blue breadcrumb trail, black title + subtitle, bulleted list of blue links.
 */
export function CategoryCalculatorIndex({
  breadcrumbItems,
  title,
  description,
  links,
}: Props) {
  return (
    <div className="w-full min-w-0">
      <Breadcrumbs className="mb-5" items={breadcrumbItems} />
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-black md:text-[28px]">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-black md:text-base">
          {description}
        </p>
      </header>
      <ul className="list-outside list-disc space-y-2.5 pl-6 text-[15px] marker:text-secondary">
        {links.map(({ href, label }) => (
          <li key={href} className="pl-1">
            <Link
              href={href}
              className="text-secondary underline-offset-2 hover:underline"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
