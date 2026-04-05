export type HomeCategoryLink = {
  label: string;
  href: string;
};

export type HomeCategorySectionData = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  links: HomeCategoryLink[];
  exploreHref: string;
  exploreLabel?: string;
  /** When true, list links and Explore All are non-interactive (e.g. coming soon). */
  disabled?: boolean;
};
