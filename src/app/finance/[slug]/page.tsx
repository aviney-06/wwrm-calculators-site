import { notFound } from "next/navigation";
import { Annuity_Calculator } from "@/components/Finance/Annuity/Annuity_Calculator";
import { ProfitMargin_Calculator } from "@/components/Finance/ProfitMargin/ProfitMargin_Calculator";
import { RentalProperty_Calculator } from "@/components/Finance/RentalProperty/RentalProperty_Calculator";
import { FinanceCalculatorPageLayout } from "@/components/Finance/shared/FinanceCalculatorPageLayout";
import {
  FINANCE_EXTRA_BY_SLUG,
  FINANCE_EXTRA_CALCULATORS,
  type FinanceExtraCalculator,
} from "@/data/financeExtraCalculators";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return FINANCE_EXTRA_CALCULATORS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const config = FINANCE_EXTRA_BY_SLUG[slug];
  if (!config) return {};

  return generateCalculatorPageMetadata({
    path: `/finance/${slug}`,
    cmsSlug: slug,
    fallbackTitle: config.title,
    fallbackDescription: config.description,
  });
}

function FinanceTool({ config }: { config: FinanceExtraCalculator }) {
  switch (config.toolKey) {
    case "profit-margin":
      return <ProfitMargin_Calculator />;
    case "annuity":
      return <Annuity_Calculator />;
    case "rental-property":
      return <RentalProperty_Calculator />;
    default:
      return null;
  }
}

export default async function FinanceExtraCalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const config = FINANCE_EXTRA_BY_SLUG[slug];
  if (!config) notFound();

  const path = `/finance/${slug}`;

  return (
    <FinanceCalculatorPageLayout
      path={path}
      title={config.title}
      description={config.description}
      breadcrumbLabel={config.breadcrumbLabel}
    >
      <FinanceTool config={config} />
    </FinanceCalculatorPageLayout>
  );
}
