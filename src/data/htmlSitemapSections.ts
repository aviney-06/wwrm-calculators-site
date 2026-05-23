import type { CalculatorLink } from "@/data/calculatorCategoryLinks";
import {
  FINANCE_CALCULATOR_LINKS,
  HEALTH_FITNESS_CALCULATOR_LINKS,
  MATHS_CALCULATOR_LINKS,
  OTHER_CALCULATOR_LINKS,
  TECHNOLOGY_CALCULATOR_LINKS,
  CONVERSION_CALCULATOR_LINKS,
  VEHICLES_CALCULATOR_LINKS,
  EDUCATION_CALCULATOR_LINKS,
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
  {
    title: "Finance",
    links: [{ href: "/finance", label: "Finance" }, ...FINANCE_CALCULATOR_LINKS],
  },
  {
    title: "Math",
    links: [{ href: "/maths", label: "Math" }, ...MATHS_CALCULATOR_LINKS],
  },
  {
    title: "Technology",
    links: [
      { href: "/technology", label: "Technology" },
      ...TECHNOLOGY_CALCULATOR_LINKS,
    ],
  },
  {
    title: "Conversion",
    links: [
      { href: "/conversion", label: "Conversion" },
      ...CONVERSION_CALCULATOR_LINKS,
    ],
  },
  {
    title: "Vehicles",
    links: [
      { href: "/vehicles", label: "Vehicles" },
      ...VEHICLES_CALCULATOR_LINKS,
    ],
  },
  {
    title: "Education",
    links: [
      { href: "/education", label: "Education" },
      ...EDUCATION_CALCULATOR_LINKS,
    ],
  },
  {
    title: "Other",
    links: [{ href: "/other", label: "Other" }, ...OTHER_CALCULATOR_LINKS],
  },
];
