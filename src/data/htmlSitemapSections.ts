import type { CalculatorLink } from "@/data/calculatorCategoryLinks";
import {
  FINANCE_CALCULATOR_LINKS,
  HEALTH_FITNESS_CALCULATOR_LINKS,
  MATHS_CALCULATOR_LINKS,
  OTHER_CALCULATOR_LINKS,
} from "@/data/calculatorCategoryLinks";

export type HtmlSitemapSection = {
  title: string;
  links: CalculatorLink[];
};

/** Single source for the HTML sitemap page — category index first, then tools. */
export const HTML_SITEMAP_SECTIONS: HtmlSitemapSection[] = [
  {
    title: "Health & fitness",
    links: [
      { href: "/health-fitness", label: "Health & fitness" },
      ...HEALTH_FITNESS_CALCULATOR_LINKS,
    ],
  },
  // {
  //   title: "Finance",
  //   links: [{ href: "/finance", label: "Finance" }, ...FINANCE_CALCULATOR_LINKS],
  // },
  // {
  //   title: "Math",
  //   links: [{ href: "/maths", label: "Math" }, ...MATHS_CALCULATOR_LINKS],
  // },
  // {
  //   title: "Other",
  //   links: [...OTHER_CALCULATOR_LINKS],
  // },
];
