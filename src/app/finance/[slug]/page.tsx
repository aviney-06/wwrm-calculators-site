import { notFound } from "next/navigation";
import { FinanceCalculatorPageLayout } from "@/components/Finance/shared/FinanceCalculatorPageLayout";
import { FinanceToolRenderer } from "@/components/Finance/shared/FinanceToolRenderer";
import {
  FINANCE_BY_SLUG,
  FINANCE_CALCULATORS,
  type FinanceCalculator,
} from "@/data/financeCalculators";
import { generateCalculatorPageMetadata } from "@/lib/calculatorPageMetadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return FINANCE_CALCULATORS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const config = FINANCE_BY_SLUG[slug];
  if (!config) return {};

  return generateCalculatorPageMetadata({
    path: `/finance/${slug}`,
    cmsSlug: slug,
    fallbackTitle: config.title,
    fallbackDescription: config.description,
  });
}

export default async function FinanceCalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const config: FinanceCalculator | undefined = FINANCE_BY_SLUG[slug];
  if (!config) notFound();

  const path = `/finance/${slug}`;

  return (
    <FinanceCalculatorPageLayout
      path={path}
      title={config.title}
      description={config.description}
      breadcrumbLabel={config.breadcrumbLabel}
    >
      <FinanceToolRenderer config={config} />
    </FinanceCalculatorPageLayout>
  );
}
