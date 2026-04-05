import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  /** Omit on the current page segment */
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

/**
 * Italic, medium-blue trail with `/` separators (no spaces), left-aligned.
 */
export function Breadcrumbs({ items, className = "" }: Props) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="m-0 flex list-none flex-wrap items-baseline gap-0 p-0 text-sm italic text-secondary">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-baseline">
              {index > 0 ? (
                <span aria-hidden className="shrink-0 select-none px-1">
                  /
                </span>
              ) : null}
              {isLast || !item.href ? (
                <span
                  className="text-secondary"
                  {...(isLast ? { "aria-current": "page" as const } : {})}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-secondary transition-colors hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
