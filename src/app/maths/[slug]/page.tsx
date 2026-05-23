import { notFound } from "next/navigation";
import { Calculus_Calculator } from "@/components/Maths/Calculus/Calculus_Calculator";
import { Density_Calculator } from "@/components/Maths/Density/Density_Calculator";
import { Exponent_Calculator } from "@/components/Maths/Exponent/Exponent_Calculator";
import { Integral_Calculator } from "@/components/Maths/Integral/Integral_Calculator";
import { Quartile_Calculator } from "@/components/Maths/Quartile/Quartile_Calculator";
import { RectangularPrism_Calculator } from "@/components/Maths/RectangularPrism/RectangularPrism_Calculator";
import { Root_Calculator } from "@/components/Maths/Root/Root_Calculator";
import { Simplify_Calculator } from "@/components/Maths/Simplify/Simplify_Calculator";
import { Square_Calculator } from "@/components/Maths/Square/Square_Calculator";
import { Variance_Calculator } from "@/components/Maths/Variance/Variance_Calculator";
import { MathsCalculatorPageLayout } from "@/components/Maths/shared/MathsCalculatorPageLayout";
import {
  MATHS_EXTRA_BY_SLUG,
  MATHS_EXTRA_CALCULATORS,
  type MathsExtraCalculator,
} from "@/data/mathsExtraCalculators";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return MATHS_EXTRA_CALCULATORS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const config = MATHS_EXTRA_BY_SLUG[slug];
  if (!config) return {};

  return generateCalculatorPageMetadata({
    path: `/maths/${slug}`,
    cmsSlug: slug,
    fallbackTitle: config.title,
    fallbackDescription: config.description,
  });
}

function MathsTool({ config }: { config: MathsExtraCalculator }) {
  switch (config.toolKey) {
    case "variance":
      return <Variance_Calculator />;
    case "quartile":
      return <Quartile_Calculator />;
    case "square":
      return <Square_Calculator />;
    case "integral":
      return <Integral_Calculator />;
    case "rectangular-prism":
      return <RectangularPrism_Calculator />;
    case "root":
      return <Root_Calculator />;
    case "density":
      return <Density_Calculator />;
    case "simplify":
      return <Simplify_Calculator />;
    case "exponent":
      return <Exponent_Calculator />;
    case "calculus":
      return <Calculus_Calculator />;
    default:
      return null;
  }
}

export default async function MathsExtraCalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const config = MATHS_EXTRA_BY_SLUG[slug];
  if (!config) notFound();

  const path = `/maths/${slug}`;

  return (
    <MathsCalculatorPageLayout
      path={path}
      title={config.title}
      description={config.description}
      breadcrumbLabel={config.breadcrumbLabel}
    >
      <MathsTool config={config} />
    </MathsCalculatorPageLayout>
  );
}
